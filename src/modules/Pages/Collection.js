import React from "react";
import {
  makeStyles,
  IconButton,
  Avatar,
  Typography,
  Button,
  Divider,
  Container,
} from "@material-ui/core";
import { CameraAlt, Edit } from "@material-ui/icons";
import { Row, Col } from "react-grid-system";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const useStyles = makeStyles((theme) => ({
  root: {},
  coverContainer: {
    width: "100%",
    background: "#b2b2b2",
    height: 250,
    position: "relative",
    //  borderBottom: `1px solid ${theme.palette.primary.main}`
  },
  collectionActions: {
    position: "absolute",
    top: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    right: theme.spacing(1),
  },
  actionBtn: {
    marginBottom: theme.spacing(1),
  },
  cover: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
  infoRow: {
    margin: "0px !important",
    textAlign: "center",
    position: "relative",
    top: -75,
  },
  avatar: {
    width: 150,
    height: 150,
    border: `4px solid ${theme.palette.secondary.main}`,
    display: "inline-block",
  },
  avatarContainer: {
    marginBottom: theme.spacing(1),
  },
  collectionName: {
    marginBottom: theme.spacing(1),
  },
  infoItem: {
    display: "inline-block",
    padding: `0px ${theme.spacing(1)}px`,
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    width: 70,
  },
  infoItems: {
    display: "flex",
    justifyContent: "space-evenly",
    marginBottom: theme.spacing(2),
  },
  sectionTitle: {
    display: "inline-block",
    marginRight: theme.spacing(2),
  },
  singleItem: {
    height: 400,
  },
  divider: {
    marginBottom: theme.spacing(1),
  },
  row: {
    marginBottom: theme.spacing(1),
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
    }
  }
`;

const CollectionPage = () => {
  const classes = useStyles();

  const { _id } = useParams();

  console.log(_id)

  const { data, loading, error } = useQuery(NFT_COLLECTION, { variables: { _id } });

  if(loading) return <div>Loading</div>

  if(!data) <div>404</div>


  const collection = data.nftCollection

  console.log(collection)

  const coverAddress = false
  const avatarAddress = `${process.env.REACT_APP_FILE_URL}/${collection.logo}`;

  const isOwner = true;


  return (
    <div className={classes.root}>
      <div className={classes.coverContainer}>
        {coverAddress && <img src={coverAddress} className={classes.cover} />}
        {isOwner && (
          <div className={classes.collectionActions}>
            <IconButton className={classes.actionBtn}>
              <CameraAlt />
            </IconButton>
            <IconButton className={classes.actionBtn}>
              <Edit />
            </IconButton>
          </div>
        )}
      </div>
      <Row className={classes.infoRow}>
        <Col lg={3} md={2} sm={1} xs={0}></Col>
        <Col lg={6} md={8} sm={10} xs={12}>
          <div className={classes.avatarContainer}>
            <Avatar src={avatarAddress} className={classes.avatar} />
          </div>
          <div className={classes.infoSection}>
            <Typography className={classes.collectionName} variant="h4">
              {collection.name}
            </Typography>
            <div className={classes.infoItems}>
              <div className={classes.infoItem}>
                <div className={classes.infoItemValue}>
                  <Typography variant="h5">2</Typography>
                </div>
                <div className={classes.infoItemTitle}>
                  <Typography variant="h6">Item</Typography>
                </div>
              </div>
              <div className={classes.infoItem}>
                <div className={classes.infoItemValue}>
                  <Typography variant="h5">1</Typography>
                </div>
                <div className={classes.infoItemTitle}>
                  <Typography variant="h6">Owner</Typography>
                </div>
              </div>
            </div>
            <Typography variant="body1">
              {collection.description}
            </Typography>
          </div>
        </Col>
      </Row>

      <Container>
        <Row className={classes.row}>
          <Col md={12}>
            <Typography className={classes.sectionTitle} variant="h5">
              Items
            </Typography>
            <Button varaint="text" color="primary">
              Add New Item
            </Button>
          </Col>
        </Row>
        <Divider className={classes.divider} />

        <Row className={classes.row}>
          <Col md={3}>
            <div className={classes.singleItem}>Here it is an item</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CollectionPage;
