import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Typography,
  IconButton,
  Paper,
  Button,
  AppBar,
  Tabs,
  Tab,
  Avatar,
} from "@material-ui/core";
import { Refresh, Share, MoreVert } from "@material-ui/icons";
import { Row, Col, Container } from "react-grid-system";
import { useParams, useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import axios from "axios";

import ContentActions from "../Content/ContentActions";
import ContentMeta from "../Content/ContentMeta";
import ContentLikedBy from "../Content/ContentLikedBy";
import ContentPicture from "../Content/ContentPicture";
import ContentHeader from "../Content/ContentHeader";
import ContentComments from "../Content/ContentComments";

import NFTCard from "../NFT/NFTCard";

//TODO zill price must be getted from an api

const zillPrice = 0.1112;

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  actionMenu: {
    position: "absolute",
    right: 0,
  },
  actionBtn: {
    marginLeft: theme.spacing(1),
    zIndex: 1000,
  },
  noMarginRow: {
    marginRight: "0 !important",
    marginLeft: "0 !important",
  },
  collectionName: {
    color: theme.palette.primary.main,
    cursor: "pointer",
    marginBottom: theme.spacing(1),
  },
  tokenName: {
    marginBottom: theme.spacing(3),
  },

  metaInfoContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
  },
  owner: {
    cursor: "pointer",
    color: theme.palette.secondary.main,
  },
  pricingContainer: {
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  additionalInfoTabs: {
    marginBottom: theme.spacing(2),
  },
  propItem: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  propContainer: {
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    border: `1px solid ${theme.palette.primary.main}`,
  },
  collectionAvatar: {
    width: 100,
    height: 100,
    marginRight: theme.spacing(3),
  },
  collectionCont: {
    display: "flex",
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "3em",
    marginBottom: theme.spacing(1),
  },
  contractLink: {
    color: theme.palette.primary.main,
    textDecoration: "none",
  },
  moreOfThis: {
    marginTop: theme.spacing(3),
    position: "relative",
  },
  moreOfThisTitle: {
    marginBottom: theme.spacing(2),
  },
  viewColBtn: {
    position: "absolute",
    top: 0,
    right: 0,
  },
}));

const NFT_COLLECTION = gql`
  query nftCollection($_id: ID!) {
    nftCollection(_id: $_id) {
      _id
      name
      logo
      creator {
        _id
        username
        displayName
        avatar
        bio
        setted
        createdAt
        updatedAt
        addresses
      }
      description
      contractAddress
      cover
    }
  }
`;

const NFTDetailPage = () => {
  const classes = useStyles();
  const { contractId, tokenId } = useParams();
  const [selectedTab, setSelectedTab] = useState(0);
  const [currentToken, setCurrentToken] = useState(null);
  const [tokenUris, setTokenUris] = useState(null);
  const history = useHistory();

  const { data, loading, error, refetch } = useQuery(NFT_COLLECTION, {
    variables: { _id: contractId },
  });

  useEffect(() => {
    if (data && data.nftCollection) {
      const collection = data.nftCollection;
      if (collection.contractAddress) {
        const contract = window.zilPay.contracts.at(collection.contractAddress);

        contract.getState().then((contractState) => {
          setTokenUris(
            Object.values(contractState.token_uris)
              .map((item, index) => ({ uri: item, id: index + 1 }))
              .filter((item, index) => {
                return item.id !== Number(tokenId);
              })
              .slice(0, 4)
          );

          const currTokenUri = contractState.token_uris[tokenId];
          if (currTokenUri) {
            axios
              .get(currTokenUri)
              .then(function ({ data }) {
                // handle success
                setCurrentToken(data);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
      }
    }
  }, [data, contractId, tokenId]);

  if (loading || !currentToken)
    return <Typography variant="h4">Loading ...</Typography>;

  const properties = currentToken.properties;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const renderAdditionalInfo = () => {
    switch (selectedTab) {
      case 0:
        return (
          <div>
            <Typography variant="body1">{currentToken.description}</Typography>
            <Row>
              {properties.map((prop, index) => (
                <Col
                  className={classes.propItem}
                  key={index}
                  lg={3}
                  md={4}
                  sm={6}
                >
                  <div className={classes.propContainer}>
                    <Typography variant="body1">{prop.traitType}</Typography>
                    <Typography variant="body2">{prop.value}</Typography>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        );
      case 1:
        return (
          <div className={classes.collectionCont}>
            <Avatar
              src={`${process.env.REACT_APP_FILE_URL}/${data.nftCollection.logo}`}
              className={classes.collectionAvatar}
            />
            <div className={classes.collectionInfoCon}>
              <Typography variant="h5">{data.nftCollection.name}</Typography>
              <Typography className={classes.collectionDesc} variant="body1">
                {data.nftCollection.description}
              </Typography>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <div className={classes.detailRow}>
              <div className={classes.detailType}>
                <Typography variant="h6">Contract Address</Typography>
              </div>
              <div className={classes.detailValue}>
                <a
                  target="_blank"
                  style={{ textDecoration: "none" }}
                  href={`https://viewblock.io/zilliqa/address/${data.nftCollection.contractAddress}?network=testnet`}
                >
                  <Typography className={classes.contractLink} variant="h6">
                    {data.nftCollection.contractAddress.substring(0, 15)}...
                  </Typography>
                </a>
              </div>
            </div>
            <div className={classes.detailRow}>
              <div className={classes.detailType}>
                <Typography variant="h6">Token ID</Typography>
              </div>
              <div className={classes.detailValue}>
                <Typography className={classes.contractLink} variant="h6">
                  #{tokenId}
                </Typography>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Container className={classes.root}>
      <div className={classes.actionMenu}>
        <IconButton className={classes.actionBtn}>
          <Refresh />
        </IconButton>
        <IconButton className={classes.actionBtn}>
          <Share />
        </IconButton>
        <IconButton className={classes.actionBtn}>
          <MoreVert />
        </IconButton>
      </div>
      <Row>
        <Col md={6} lg={5}>
          <div className={classes.nftCard}>
            <ContentMeta>
              <ContentPicture src={currentToken.image} />
              <ContentActions />
              <ContentLikedBy likes={12} />
              <ContentComments />
            </ContentMeta>
          </div>
        </Col>
        <Col md={6} lg={7}>
          <Typography variant="body2" className={classes.collectionName}>
            {data.nftCollection.name}
          </Typography>
          <Typography variant="h4" className={classes.tokenName}>
            {currentToken.name} - #{tokenId}
          </Typography>
          <div className={classes.metaInfoContainer}>
            <div className={classes.metaInfoItem}>
              <Typography variant="body1">
                Owned By <span className={classes.owner}>Ajand</span>
              </Typography>
            </div>
            <div className={classes.metaInfoItem}>
              <Typography variant="body1">Views: 23</Typography>
            </div>
          </div>
          {/*<Paper className={classes.pricingContainer}>
            <Typography className={classes.pricingTitle} variant="h6">
              Current Price: 53 $ZIL ({formatter.format(53 * zillPrice)})
            </Typography>
            <Button variant="contained" color="secondary">
              Buy Now
            </Button>
  </Paper>*/}

          <div className={classes.additionalInfo}>
            <AppBar className={classes.additionalInfoTabs} position="static">
              <Tabs
                value={selectedTab}
                onChange={(e, nv) => setSelectedTab(nv)}
                aria-label="simple tabs example"
              >
                <Tab label="Description" />
                <Tab label="About Collection" />
                <Tab label="Details" />
              </Tabs>
            </AppBar>
            {renderAdditionalInfo()}
          </div>
          <div className={classes.moreOfThis}>
            <Typography className={classes.moreOfThisTitle} variant="h5">
              More from this collection
            </Typography>
            <Button
              className={classes.viewColBtn}
              variant="text"
              color="primary"
              onClick={() =>
                history.push(`/collection/${data.nftCollection._id}`)
              }
            >
              View Collection
            </Button>
            <Row>
              {tokenUris.map((token) => (
                <Col key={token.id} md={6}>
                  <NFTCard
                    token_uri={token.uri}
                    collection={data.nftCollection}
                    tokenId={token.id}
                  />
                </Col>
              ))}
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NFTDetailPage;
