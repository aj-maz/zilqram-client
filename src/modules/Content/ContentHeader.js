import {
  makeStyles,
  Avatar,
  Button,
  Typography,
  IconButton,
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import moment from "moment";
import { gql, useMutation } from "@apollo/client";
import { useHistory} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    position: "relative",
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
    alignItems: "center",
  },
  displayName: {
    fontSize: theme.spacing(2),
    marginRight: theme.spacing(1),
    cursor: 'pointer'
  },
  more: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  exclusive: {
    color: theme.palette.secondary.main,
  },
}));

const FOLLOW = gql`
  mutation followUser($following: ID!) {
    followUser(following: $following)
  }
`;

const ContentHeader = ({
  image,
  displayName,
  followed,
  createdAt,
  exclusive,
  owner,
  me,
  refetch
}) => {
  const classes = useStyles();

  const [follow] = useMutation(FOLLOW);

  const history = useHistory()

  return (
    <div className={classes.root}>
      <Avatar
        src={`${process.env.REACT_APP_FILE_URL}/${image}`}
        className={classes.avatar}
      />
      <div className={classes.info}>
        <div className={classes.infoTop}>
          <Typography onClick={() => history.push(`/user/${owner._id}`)} className={classes.displayName} variant="body2">
            {displayName.length > 20
              ? `${displayName.substr(0, 20)}...`
              : displayName}
          </Typography>

          {me && owner._id !== me._id &&
            (owner.followers.includes(me._id) ? (
              <Button  onClick={() => {
                follow({
                  variables: {
                    following: owner._id,
                  },
                }).then(() => {
                  refetch()
                })
              }} variant="text" size="small" color="secondary">
                Unfollow
              </Button>
            ) : (
              <Button
                onClick={() => {
                  follow({
                    variables: {
                      following: owner._id,
                    },
                  }).then(() => {
                    refetch()
                  })
                }}
                variant="outlined"
                size="small"
                color="primary"
              >
                Follow
              </Button>
            ))}
        </div>
        <Typography variant="overline">
          {" "}
          {moment(Number(createdAt)).fromNow()}{" "}
          {exclusive && (
            <Typography className={classes.exclusive} variant="caption">
              {" "}
              EXCLUSIVE
            </Typography>
          )}{" "}
        </Typography>
      </div>
      <IconButton className={classes.more}>
        <MoreVert />
      </IconButton>
    </div>
  );
};

export default ContentHeader;
