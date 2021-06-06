import { makeStyles, Avatar, Button, Typography, IconButton } from "@material-ui/core";
import { MoreVert } from '@material-ui/icons'
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    position: "relative"
  },
  info: {
    display: "inline-block",
  },
  avatar: {
    display: "inline-block",
    width: 50,
    height: 50,
    marginRight: theme.spacing(1),
  },
  infoTop: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
  },
  displayName: {
      fontSize: theme.spacing(2),
      marginRight: theme.spacing(1)
  },
  more: {
      position: "absolute",
      top: theme.spacing(1),
      right: theme.spacing(1)
  }
}));

const ContentHeader = ({ image, displayName, followed }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Avatar src={image} className={classes.avatar} />
      <div className={classes.info}>
        <div className={classes.infoTop}>
          <Typography className={classes.displayName} variant="body2">
            {" "}
            {displayName}
          </Typography>

          {followed ? (
            <Button variant="text" size="small" color="secondary">
              Unfollow
            </Button>
          ) : (
            <Button  variant="outlined" size="small" color="primary" >
              Follow
            </Button>
          )}
        </div>
        <Typography variant="overline"> {moment().fromNow()}</Typography>
      </div>
      <IconButton  className={classes.more}>
          <MoreVert />
      </IconButton>
    </div>
  );
};

export default ContentHeader;
