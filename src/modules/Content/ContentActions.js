import { useState } from "react";
import {
  makeStyles,
  Typography,
  IconButton,
  Paper,
  Divider,
} from "@material-ui/core";
import {
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  ChatBubble,
  Subject,
  Forward,
} from "@material-ui/icons";
import { gql, useMutation } from "@apollo/client";

import ContentLikedBy from "./ContentLikedBy";
import ContentComments from "./ContentComments";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    height: theme.spacing(7),
    borderRadius: 0,
  },
  leftButtons: {
    position: "absolute",
    left: theme.spacing(1),
    top: theme.spacing(0.5),
  },
  rightButtons: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(0.5),
  },
  liked: {
    color: theme.palette.error.main,
  },
  notLiked: {
    "&:hover": {
      color: theme.palette.error.main,
    },
  },
}));

const LIKE_CONTENT = gql`
  mutation likeContent($_id: ID!) {
    likeContent(_id: $_id)
  }
`;

const LIKE_NFT = gql`
  mutation likeNFT($_id: ID!) {
    likeNFT(_id: $_id)
  }
`;

const ContentActions = ({ liked, refetch, id, likes, nft }) => {
  const classes = useStyles();
  const [likeContent] = useMutation(LIKE_CONTENT);
  const [likeNFT] = useMutation(LIKE_NFT);

  const [commentOpen, setCommentOpen] = useState(false);
  return (
    <div>
      <Divider />
      <div className={classes.root}>
        <div className={classes.leftButtons}>
          {liked ? (
            <IconButton
              onClick={() => {
                if (nft) {
                  likeNFT({ variables: { _id: id } })
                    .then(() => refetch())
                    .catch((err) => console.log(err));
                } else {
                  likeContent({ variables: { _id: id } })
                    .then(() => refetch())
                    .catch((err) => console.log(err));
                }
              }}
            >
              <Favorite className={classes.liked} />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                if (nft) {
                  console.log(nft);
                  likeNFT({ variables: { _id: id } })
                    .then(() => refetch())
                    .catch((err) => console.log(err));
                } else {
                  likeContent({ variables: { _id: id } })
                    .then(() => refetch())
                    .catch((err) => console.log(err));
                }
              }}
              className={classes.notLiked}
            >
              <FavoriteBorder />
            </IconButton>
          )}
          <IconButton onClick={() => setCommentOpen(!commentOpen)}>
            {commentOpen ? <ChatBubble /> : <ChatBubbleOutline />}
          </IconButton>
        </div>

        <div className={classes.rightButtons}>
          {/*
                  <IconButton>
            <Subject />
          </IconButton>
          <IconButton>
            <Forward />
          </IconButton>

        */}
        </div>
      </div>
      <ContentLikedBy likes={likes} />
      {commentOpen && <ContentComments id={id} />}
    </div>
  );
};

export default ContentActions;
