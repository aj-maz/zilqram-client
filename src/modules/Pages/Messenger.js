import React from "react";
import { makeStyles, Paper } from "@material-ui/core";
import { Row, Col } from "react-grid-system";

import ConversationList from "../Messenger/ConversationList";
import MessengerHeader from "../Messenger/MessengerHeader";
import ConversationHeader from '../Messenger/ConversationHeader'
import ConversationFooter from '../Messenger/ConversationFooter'

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
  },
  container: {
    textAlign: "center",
    height: "calc(100vh - 102px)",
    position: "relative",
  },
  sidebar: {
    background: theme.palette.background.paper,
    display: "inline-block",
    width: 300,
    height: "100%",
    borderRight: `1px solid #e8e8e8`,
    boxSizing: "border-box",
    position: "absolute",
    top: 0,
    left: 0,
  },
  conversationList: {
    overflow: "auto",
    height: "calc(100% - 70px)"
  },
  messages: {
    background: "#f8f8f8",
    display: "inline-block",
    width: `calc(100% - 300px)`,
    height: "100%",
    position: "absolute",
    top: 0,
    right: 0,
  },
}));

const MessengerPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.sidebar}>
          <MessengerHeader />
          <div className={classes.conversationList}>
            <ConversationList />
          </div>
        </div>

        <div className={classes.messages}>
          <ConversationHeader />
          <div></div>
          <ConversationFooter />
        </div>
      </div>
    </div>
  );
};

export default MessengerPage;
