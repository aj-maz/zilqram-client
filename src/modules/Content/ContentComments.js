import React from "react";
import {
  makeStyles,
  Avatar,
  Typography,
  Divider,
  TextField,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  commentContainer: {
    padding: theme.spacing(1),
    display: "flex",
  },
  commentAuthorAvatar: {
    width: 60,
    height: 60,
    marginRight: theme.spacing(2),
  },
  commentInput: {
    bottom: 0,
    minHeight: 75,
    border: "1px solid #e8e8e8",
    background: theme.palette.background.paper,
    boxSizing: "border-box",
    padding: theme.spacing(1),
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  filedContainer: {
    width: "calc(100% - 120px)",
    display: "inline-block",
    padding: theme.spacing(1),
  },
  actionContainer: {
    width: 100,
    display: "inline-block",
  },
}));

const ContentComments = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.comments}>
        <Divider />
        <div className={classes.commentContainer}>
          <Avatar
            src={"/images/sample1.png"}
            className={classes.commentAuthorAvatar}
          />
          <div className={classes.commentContent}>
            <Typography variant="body1">Dorsa Hosseini</Typography>
            <Typography variant="body2">
              glish. Many desktop publishing packages and web page editors now
              use Lorem Ipsum as their default model text, and a search for
              'lorem ipsum' will uncover many web sites still in their infancy.
              Various versions
            </Typography>
          </div>
        </div>
        <Divider />
        <div className={classes.commentContainer}>
          <Avatar
            src={"/images/sample1.png"}
            className={classes.commentAuthorAvatar}
          />
          <div className={classes.commentContent}>
            <Typography variant="body1">Dorsa Hosseini</Typography>
            <Typography variant="body2">
              glish. Many desktop publishing packages and web page editors now
              use Lorem Ipsum as their default model text, and a search for
              'lorem ipsum' will uncover many web sites still in their infancy.
              Various versions
            </Typography>
          </div>
        </div>
        <Divider />
        <div className={classes.commentContainer}>
          <Avatar
            src={"/images/sample1.png"}
            className={classes.commentAuthorAvatar}
          />
          <div className={classes.commentContent}>
            <Typography variant="body1">Dorsa Hosseini</Typography>
            <Typography variant="body2">
              glish. Many desktop publishing packages and web page editors now
              use Lorem Ipsum as their default model text, and a search for
              'lorem ipsum' will uncover many web sites still in their infancy.
              Various versions
            </Typography>
          </div>
        </div>
        <Divider />
        <div className={classes.commentContainer}>
          <Avatar
            src={"/images/sample1.png"}
            className={classes.commentAuthorAvatar}
          />
          <div className={classes.commentContent}>
            <Typography variant="body1">Dorsa Hosseini</Typography>
            <Typography variant="body2">
              glish. Many desktop publishing packages and web page editors now
              use Lorem Ipsum as their default model text, and a search for
              'lorem ipsum' will uncover many web sites still in their infancy.
              Various versions
            </Typography>
          </div>
        </div>
      </div>
      <Divider />

      <div className={classes.commentInput}>
        <div className={classes.filedContainer}>
          <TextField variant="filled" multiline label="Comment" fullWidth />
        </div>
        <div className={classes.actionContainer}>
          <Button fullWidth color="primary">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentComments;
