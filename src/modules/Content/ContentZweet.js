import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  image: {
    width: "100%",
  },
}));

const ContentZweet = ({ body }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="body1">{body}</Typography>
    </div>
  );
};

export default ContentZweet;
