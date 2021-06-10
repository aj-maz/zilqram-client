import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    textAlign: "center",
    background: theme.palette.secondary.main,
    color: "black",
    bottom: 0,
    width: '100%',
    boxSizing: 'border-box'
  },
  type: {
      fontSize: '0.9em'
  }
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.type} variant="h6">
        Made with passion and coffee for Zilliqa Hackathon.
      </Typography>
    </div>
  );
};

export default Footer;
