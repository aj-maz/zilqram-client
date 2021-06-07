import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { Row, Col } from "react-grid-system";

import CreateCollectionCard from "../Collections/CreateCollectionCard";
import CollectionCard from '../Collections/CollectionCard'

const useStyles = makeStyles((theme) => ({
  root: {},
  row: {
    marginBottom: theme.spacing(2)
  }
}));

const CollectionsPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Row className={classes.row}>
        <Col lg={12}>
          <Typography variant="h5">My Collections</Typography>
          <Typography variant="body1">
            Create collections, upload digital creations, and sell NFTs to your
            fans - all for free! You can also manage smart contracts that you
            created outside of Ziliqist.
          </Typography>
        </Col>
      </Row>
      <Row>
        <Col lg={3}>
          <CreateCollectionCard />
        </Col>
        <Col lg={3}>
          <CollectionCard image="/images/sample1.png" name="Hotsa" />
        </Col>
        <Col lg={3}></Col>
        <Col lg={3}></Col>
      </Row>
    </div>
  );
};

export default CollectionsPage;
