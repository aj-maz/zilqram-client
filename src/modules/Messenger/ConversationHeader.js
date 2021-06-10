import React from "react";
import { makeStyles, Typography, Avatar, IconButton } from "@material-ui/core";
import { MoreVert } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 70,
    borderBottom: `1px solid #e8e8e8`,
    padding: theme.spacing(1),
    boxSizing: "border-box",
    background: theme.palette.background.paper,
    textAlign: "left",
  },
  leftContainer: {
    display: 'flex'
  },
  avatar: {
    display: "inline-block",
    width: 55,
    height: 55
  },
  infoContainer: {
    display: "flex",
    flexDirection: 'column',
    marginLeft: theme.spacing(2)
  },
  rightContainer: {
      display: 'flex',
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1)
  },
  iconBtn: {
      marginLeft: theme.spacing(1)
  }
}));

const ConversationHeader = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.leftContainer}>
        <Avatar className={classes.avatar} src="/images/sample1.png" />
        <div className={classes.infoContainer}>
          <Typography className={classes.title} variant="h6">
            Ajand Mardalizad
          </Typography>
          <Typography className={classes.subtitle} variant="body2">
            @ajand - online
          </Typography>
        </div>
      </div>
      <div className={classes.rightContainer}>
        <div className={classes.iconBtn}>
            <IconButton>
                <MoreVert />
            </IconButton>
        </div>
        <div className={classes.iconBtn}>
            <IconButton>
                <MoreVert />
            </IconButton>
        </div>    <div className={classes.iconBtn}>
            <IconButton>
                <MoreVert />
            </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ConversationHeader;
