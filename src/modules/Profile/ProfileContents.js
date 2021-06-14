import React, { useState, useEffect } from "react";
import { makeStyles, AppBar, Tabs, Tab, Typography } from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";
import { Row, Col } from "react-grid-system";
import ReactLoading from "react-loading";
import { Zilliqa } from "@zilliqa-js/zilliqa";

import AddContent from "../Content/AddContent";

import ContentActions from "../Content/ContentActions";
import ContentMeta from "../Content/ContentMeta";
import ContentLikedBy from "../Content/ContentLikedBy";
import ContentPicture from "../Content/ContentPicture";
import ContentHeader from "../Content/ContentHeader";
import ContentZweet from "../Content/ContentZweet";
import CollectionCard from "../Collections/CollectionCard";
import NFTCard from "../NFT/NFTCard";

const zilliqa = new Zilliqa("https://dev-api.zilliqa.com");

const useStyles = makeStyles((theme) => ({
  root: {},
  section: {
    marginBottom: theme.spacing(2),
  },
  loadingContainer: {
    height: 360,
    width: 320,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const USER_CONTENTS = gql`
  query userContents($userId: ID!) {
    userContents(userId: $userId) {
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

const USER_NFT_COLLECTIONS = gql`
  query userNftCollections($userId: ID!) {
    userNftCollections(userId: $userId) {
      _id
      logo
      name
      contractAddress
    }
  }
`;

const ProfileContents = ({ me, user, setNftCounts, setContentCounts }) => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);
  const [tokensURI, setTokenURIs] = useState(null);

  const { data, loading, error, refetch } = useQuery(USER_CONTENTS, {
    userId: user._id
  });

  const { data: collectionsData, loading: collectionLoading } = useQuery(
    USER_NFT_COLLECTIONS,
    {
      variables: { userId: user._id },
    }
  );

  useEffect(() => {
    if (data) {
      setContentCounts(data.userContents.length);
    }
  }, [data]);

  useEffect(() => {
    if (collectionsData) {
      const contractsAddress = collectionsData.userNftCollections
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
                  collection: collectionsData.userNftCollections.find(
                    (coll) => coll.contractAddress === contractAddress
                  ),
                })
              ),
            ];
          }
        });
      });

      setTimeout(() => {
        setTokenURIs(a);
        setNftCounts(a.length);
      }, 5000);
    }
  }, [collectionsData]);

  if (!data) return <Typography varaint="h5">Loading ...</Typography>;

  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <AppBar position="static">
          <Tabs
            value={selectedTab}
            onChange={(e, v) => setSelectedTab(v)}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Posts" />
            <Tab label="NFTs" />
            <Tab label="Collections" />
          </Tabs>
        </AppBar>
      </div>
      <div className={classes.section}>
        {selectedTab === 0 && (
          <div>
            {me._id === user._id && (
              <div className={classes.section}>
                <AddContent refetch={refetch} />
              </div>
            )}

            <div className={classes.section}>
              <Row>
                <Col lg={6}>
                  {[...data.userContents.filter((c, i) => i % 2 === 0)]
                    .reverse()
                    .map((content) => (
                      <ContentMeta key={content._id}>
                        <ContentHeader
                          image={content.owner.avatar}
                          displayName={content.owner.displayName}
                          createdAt={content.createdAt}
                          exclusive={content.exclusive}
                          owner={content.owner}
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
                  {[...data.userContents.filter((c, i) => i % 2 !== 0)]
                    .reverse()
                    .map((content) => (
                      <ContentMeta>
                        <ContentHeader
                          image={content.owner.avatar}
                          displayName={content.owner.displayName}
                          createdAt={content.createdAt}
                          exclusive={content.exclusive}
                          owner={content.owner}
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
                          refetch={refetch}
                          likes={content.likes}
                        />
                      </ContentMeta>
                    ))}
                </Col>
              </Row>
            </div>
          </div>
        )}
        <Row>
          {selectedTab === 2 &&
            (collectionLoading ? (
              <div className={classes.loadingContainer}>
                <ReactLoading
                  type="bubbles"
                  color="#14213d"
                  height={150}
                  width={200}
                />
              </div>
            ) : (
              collectionsData &&
              collectionsData.userNftCollections.map((coll) => (
                <Col key={coll._id} lg={4} key={coll._id}>
                  <CollectionCard
                    image={`${process.env.REACT_APP_FILE_URL}/${coll.logo}`}
                    name={coll.name}
                    _id={coll._id}
                  />
                </Col>
              ))
            ))}
        </Row>
        <Row>
          {selectedTab === 1 &&
            (!tokensURI ? (
              <Typography variant="h6">Loading ...</Typography>
            ) : (
              [...tokensURI].reverse().map((token) => (
                <Col lg={4}>
                  <NFTCard
                    token_uri={token.tokenUri}
                    collection={token.collection}
                    tokenId={token.tokenId}
                  />
                </Col>
              ))
            ))}
        </Row>
      </div>
    </div>
  );
};

export default ProfileContents;
