import { Typography, makeStyles, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
}));

const ContentLikedBy = ({ likes }) => {
  const classes = useStyles();
  if (!likes) return null;

  return (
    <div>
      <Typography className={classes.root} variant="body2">
        Liked by {likes} people.
      </Typography>
    </div>
  );
};

export default ContentLikedBy;
