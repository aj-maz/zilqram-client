import React from "react";
import { makeStyles, Typography, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 360,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: theme.spacing(4),
    cursor: "pointer",
  },
  container: {
    textAlign: "center",
    width: "100%",
  },
  image: {
    width: "100%",
    height: 320,
    borderRadius: `4px 4px 0px 0px`,
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
  },
}));

const CollectionCard = ({ image, name }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <div className={classes.container}>
        <img src={image} className={classes.image} />
        <Typography className={classes.title} variant="h6">
          {name}
        </Typography>
      </div>
    </Paper>
  );
};

export default CollectionCard;
