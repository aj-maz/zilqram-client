import { makeStyles, Typography, IconButton, Paper } from "@material-ui/core";
import {
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  Subject,
  Forward,
} from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    height: theme.spacing(7),
    borderRadius: 0
  },
  leftButtons: {
    position: "absolute",
    left: theme.spacing(1),
    top: theme.spacing(0.5)
  },
  rightButtons: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(0.5)

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

const ContentActions = ({ liked }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.leftButtons}>
        {liked ? (
          <IconButton>
            <Favorite className={classes.liked} />
          </IconButton>
        ) : (
          <IconButton className={classes.notLiked}>
            <FavoriteBorder />
          </IconButton>
        )}
        <IconButton>
          <ChatBubbleOutline />
        </IconButton>
      </div>

      <div className={classes.rightButtons}>
        <IconButton>
          <Subject />
        </IconButton>
        <IconButton>
          <Forward />
        </IconButton>
      </div>
    </div>
  );
};

export default ContentActions;
