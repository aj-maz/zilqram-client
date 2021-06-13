import { useEffect, useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { Row, Col, Container } from "react-grid-system";
import { gql, useQuery } from "@apollo/client";
import { Zilliqa } from "@zilliqa-js/zilliqa";

import ProfileHeader from "../Profile/ProfileHeader";

import ContentActions from "../Content/ContentActions";
import ContentMeta from "../Content/ContentMeta";
import ContentLikedBy from "../Content/ContentLikedBy";
import ContentPicture from "../Content/ContentPicture";
import ContentHeader from "../Content/ContentHeader";
import ContentZweet from "../Content/ContentZweet";
import NFTCard from "../NFT/NFTCard";

const zilliqa = new Zilliqa("https://dev-api.zilliqa.com");

const useStyles = makeStyles((theme) => ({
  root: {},
  section: {
    marginBottom: theme.spacing(2),
  },
  profileHeader: {
    position: "sticky",
    width: "100%",
    top: theme.spacing(2),
  },
}));

const CONTENTS = gql`
  query contents {
    contents {
      _id
      body
      variant
      owner {
        _id
        displayName
        username
        avatar
        followers
      }
      likes
      likers
      createdAt
      exclusive
    }
  }
`;

const COLLECTIONS = gql`
  query nftCollections {
    nftCollections {
      _id
      contractAddress
    }
  }
`;

function shuffle(array) {
  var currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return [...array];
}

const HomePage = ({ me }) => {
  const classes = useStyles();
  const [tokensURI, setTokenURIs] = useState(null);

  const {
    data: contents,
    loading: contentLoading,
    error,
    refetch,
  } = useQuery(CONTENTS);

  const { data: collectionData, loading: collectionLoading } =
    useQuery(COLLECTIONS);

  useEffect(() => {
    if (collectionData) {
      const contractsAddress = collectionData.nftCollections
        .filter(({ contractAddress }) => contractAddress)
        .map(({ contractAddress }) => contractAddress);

      let a = [];

      contractsAddress.forEach((contractAddress) => {
        const contract = zilliqa.contracts.at(contractAddress);

        contract.getState().then((contractState) => {
          if (contractState) {
            a = [
              ...a,
              ...Object.values(contractState.token_uris).map(
                (tokenUri, index) => ({
                  tokenUri,
                  tokenId: index + 1,
                  collection: collectionData.nftCollections.find(
                    (coll) => coll.contractAddress === contractAddress
                  ),
                })
              ),
            ];
          }
        });
      });

      setTimeout(() => {
        setTokenURIs(shuffle(a));
      }, 5000);
    }
  }, [collectionData]);

  return (
    <div>
      <Row>
        <Col lg={8}>
          <Row style={{ marginBottom: "2em" }}>
            <Col md={12}>
              <Typography variant="h4">Hot Contents</Typography>
            </Col>
          </Row>
          <Row>
            {contentLoading ? (
              <Typography variant="h6">Loading ...</Typography>
            ) : (
              <>
                <Col lg={6}>
                  {[...contents.contents.filter((c, i) => i % 2 === 0)]
                    .reverse()
                    .map((content) => (
                      <ContentMeta key={content._id}>
                        <ContentHeader
                          image={content.owner.avatar}
                          displayName={content.owner.displayName}
                          createdAt={content.createdAt}
                          owner={content.owner}
                          exclusive={content.exclusive}
                          me={me}
                          refetch={refetch}
                        />
                        {content.variant === "zweet" ? (
                          <ContentZweet body={content.body} />
                        ) : (
                          <ContentPicture image={content.body} />
                        )}

                        <ContentActions
                          liked={content.likers.includes(me._id)}
                          id={content._id}
                          likes={content.likes}
                          refetch={refetch}
                        />
                      </ContentMeta>
                    ))}
                </Col>
                <Col lg={6}>
                  {[...contents.contents.filter((c, i) => i % 2 !== 0)]
                    .reverse()
                    .map((content) => (
                      <ContentMeta>
                        <ContentHeader
                          image={content.owner.avatar}
                          displayName={content.owner.displayName}
                          createdAt={content.createdAt}
                          exclusive={content.exclusive}
                          me={me}
                          owner={content.owner}
                          refetch={refetch}

                        />
                        {content.variant === "zweet" ? (
                          <ContentZweet body={content.body} />
                        ) : (
                          <ContentPicture image={content.body} />
                        )}

                        <ContentActions
                          liked={content.likers.includes(me._id)}
                          id={content._id}
                          refetch={refetch}
                          likes={content.likes}
                        />
                      </ContentMeta>
                    ))}
                </Col>
              </>
            )}
          </Row>
        </Col>
        <Col lg={4}>
          <Row style={{ marginBottom: "2em" }}>
            <Col md={12}>
              <Typography variant="h4">Hot NFTs</Typography>
            </Col>
          </Row>
          <Row>
            {!tokensURI ? (
              <Typography variant="h6">Loading ...</Typography>
            ) : (
              <Col lg={12}>
                {[...tokensURI].reverse().map((token) => (
                  <NFTCard
                    token_uri={token.tokenUri}
                    collection={token.collection}
                    tokenId={token.tokenId}
                  />
                ))}
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
