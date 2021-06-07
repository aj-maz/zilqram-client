import React from "react";
import { makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  button: {
    marginBottom: theme.spacing(1),
  },
}));

const ProfileActions = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        className={classes.button}
      >
        New Post
      </Button>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        className={classes.button}
      >
        Mint a NFT
      </Button>
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        className={classes.button}
      >
        Create Collection
      </Button>
      <Button
        variant="text"
        color="primary"
        fullWidth
        className={classes.button}
      >
        Manage Subscriptions
      </Button>
    </div>
  );
};

export default ProfileActions;
