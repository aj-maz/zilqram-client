import React from "react";
import { makeStyles, Typography, Paper } from "@material-ui/core";
import { useHistory } from 'react-router-dom'

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
    width: '100%',
    height: '100%'
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

const CollectionCard = ({ image, name , _id}) => {
  const classes = useStyles();
  const history = useHistory()
  return (
    <Paper onClick={() => history.push(`/collection/${_id}`)} className={classes.root}>
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

export default CollectionCard;
