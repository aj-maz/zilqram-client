import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { Row, Col } from "react-grid-system";
import { gql, useQuery } from "@apollo/client";
import ReactLoading from "react-loading";

import CreateCollectionCard from "../Collections/CreateCollectionCard";
import CollectionCard from "../Collections/CollectionCard";

const useStyles = makeStyles((theme) => ({
  root: {},
  row: {
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

const MY_NFT_COLLECTIONS = gql`
  query myNftCollections {
    myNftCollections {
      _id
      logo
      name
    }
  }
`;

const CollectionsPage = () => {
  const classes = useStyles();

  const { data, loading, error } = useQuery(MY_NFT_COLLECTIONS);

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
        {loading ? (
          <div className={classes.loadingContainer}>
            <ReactLoading
              type="bubbles"
              color="#14213d"
              height={150}
              width={200}
            />
          </div>
        ) : (
          data && data.myNftCollections.map((coll) => (
            <Col lg={3} key={coll._id}>
              <CollectionCard
                image={`${process.env.REACT_APP_FILE_URL}/${coll.logo}`}
                name={coll.name}
                _id={coll._id}
              />
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default CollectionsPage;
