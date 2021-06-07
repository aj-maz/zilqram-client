import React from "react";
import { makeStyles, Paper, Typography, Button } from "@material-ui/core";
import { Collections } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    height: 360,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(2)

  },
  container: {
    textAlign: "center",
    margin: theme.spacing(2),
    width: '100%'
  },
  Icon: {
    width: 80,
    height: 80,
  },
  title: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
  },
  button: {
      marginBottom: theme.spacing(1)
  },
  subtitle: {
      cursor: 'pointer',
      color: theme.palette.primary.main,
      marginTop: theme.spacing(1)
  }
}));

const CreateCollectionCard = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <div className={classes.container}>
        <Collections className={classes.Icon} />
        <Typography variant="h6" className={classes.title}>
          Create new collection
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          className={classes.button}
        >
          Create
        </Button>
        <Typography variant="body1" className={classes.subtitle}>
          or add an existing contract
        </Typography>
      </div>
    </Paper>
  );
};

export default CreateCollectionCard;
