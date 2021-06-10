import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {},
  button: {
    marginBottom: theme.spacing(1),
  },
}));

const ProfileActions = () => {
  const classes = useStyles();
  const history = useHistory()

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
        onClick={() => history.push('/collections')}
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
        onClick={() => history.push('/subscriptions')}
      >
        Manage Subscriptions
      </Button>
    </div>
  );
};

export default ProfileActions;
