import React, { useEffect, useState } from "react";
import { makeStyles, Typography, Paper } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 360,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: theme.spacing(4),
    cursor: "pointer",
    marginBottom: theme.spacing(2),
  },
  container: {
    textAlign: "center",
    width: "100%",
  },
  image: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    overflow: "hidden",
    width: "100%",
    height: 320,
    borderRadius: `4px 4px 0px 0px`,
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
  },
}));

const NFTCard = ({ token_uri, collection, tokenId }) => {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get(token_uri)
      .then(function ({ data }) {
        setImage(data.image);
        setName(data.name);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading)
    return (
      <Typography
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading ...
      </Typography>
    );

  return (
    <Paper onClick={() => {
      history.push(`/nft/${collection._id}/${tokenId}`)
    }} className={classes.root}>
      <div className={classes.container}>
        <div className={classes.imageContainer}>
          <img src={image} className={classes.image} />
        </div>
        <Typography className={classes.title} variant="h6">
          {name}
        </Typography>
      </div>
    </Paper>
  );
};

export default NFTCard;
