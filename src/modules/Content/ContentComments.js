import React, { useState } from "react";
import {
  makeStyles,
  Avatar,
  Typography,
  Divider,
  TextField,
  Button,
} from "@material-ui/core";
import { useHistory } from 'react-router-dom'
import { gql, useQuery, useMutation } from "@apollo/client";

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

const COMMENTS = gql`
  query comments($belongsTo: ID!) {
    comments(belongsTo: $belongsTo) {
      _id
      body
      createdAt
      owner {
        _id
        avatar
        displayName
      }
    }
  }
`;

const CREATE_COMMENT = gql`
  mutation createComment($body: String!, $belongsTo: ID!) {
    createComment(body: $body, belongsTo: $belongsTo) {
      _id
    }
  }
`;

const ContentComments = ({ id }) => {
  const classes = useStyles();
  const [body, setBody] = useState("");
  const [createCommnet] = useMutation(CREATE_COMMENT);

  const history = useHistory()

  const { data, loading, error, refetch } = useQuery(COMMENTS, {
    variables: { belongsTo: id },
  });

  if (!data) return <Typography variant="h6">Loading ...</Typography>;

  return (
    <div className={classes.root}>
      <div className={classes.comments}>
        {data.comments.map((comment) => (
          <div key={comment._id}>
            <Divider />
            <div key={comment._id} className={classes.commentContainer}>
              <Avatar
                src={`${process.env.REACT_APP_FILE_URL}/${comment.owner.avatar}`}
                className={classes.commentAuthorAvatar}
              />
              <div className={classes.commentContent}>
                <Typography onClick={() => history.push(`/user/${comment.owner._id}`)} style={{cursor: 'pointer'}} variant="body1">
                  {comment.owner.displayName}
                </Typography>
                <Typography variant="body2">
                  {comment.body}
                </Typography>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Divider />

      <div className={classes.commentInput}>
        <div className={classes.filedContainer}>
          <TextField
            value={body}
            onChange={(e) => setBody(e.target.value)}
            variant="filled"
            multiline
            label="Comment"
            fullWidth
          />
        </div>
        <div className={classes.actionContainer}>
          <Button
            onClick={() => {
              createCommnet({
                variables: { body, belongsTo: id },
              }).then(() => {
                refetch();
                setBody("");
              });
            }}
            disabled={!body}
            fullWidth
            color="primary"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentComments;
