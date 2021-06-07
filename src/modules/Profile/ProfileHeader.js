import React from "react";
import { makeStyles, Typography, Avatar, Paper } from "@material-ui/core";
import { Row, Col, Container } from "react-grid-system";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  primary: {
    position: "relative",
    marginBottom: theme.spacing(2),
  },
  image: {
    display: "inline-block",
  },
  avatar: {
    width: 80,
    height: 80,
  },
  info: {
    display: "inline-block",
    marginLeft: theme.spacing(2),
    position: "absolute",
  },
  secondary: {
    textAlign: "center",
  },
  metaItem: {
    cursor: "pointer",
  },
}));

const ProfileHeader = ({
  name,
  username,
  followers = 0,
  followings = 0,
  contents = 0,
  nfts = 0,
  avatar,
  isMe,
}) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <div className={classes.primary}>
        <div className={classes.image}>
          <Avatar
            className={classes.avatar}
            src={
              avatar ? `${process.env.REACT_APP_FILE_URL}/${avatar}` : avatar
            }
          />
        </div>
        <div className={classes.info}>
          <Typography className={classes.name} variant="h6">
            {name}
          </Typography>
          <div className={classes.actions}>
            <Typography variant="subtitle2">@{username}</Typography>
          </div>
        </div>
      </div>
      <div className={classes.secondary}>
        <Container>
          <Row>
            <Col className={classes.metaItem} xs={6}>
              <Typography variant="body1" className={classes.metaTitle}>
                Followins
              </Typography>
              <Typography variant="button" className={classes.metaValue}>
                {followings}
              </Typography>
            </Col>
            <Col className={classes.metaItem} xs={6}>
              <Typography variant="body1" className={classes.metaTitle}>
                Followers
              </Typography>
              <Typography variant="button" className={classes.metaValue}>
                {followers}
              </Typography>
            </Col>
          </Row>
          <Row style={{ marginTop: "1em" }}>
            <Col className={classes.metaItem} xs={6}>
              <Typography variant="body1" className={classes.metaTitle}>
                NFTs
              </Typography>
              <Typography variant="button" className={classes.metaValue}>
                {nfts}
              </Typography>
            </Col>
            <Col className={classes.metaItem} xs={6}>
              <Typography variant="body1" className={classes.metaTitle}>
                Contents
              </Typography>
              <Typography variant="button" className={classes.metaValue}>
                {contents}
              </Typography>
            </Col>
          </Row>
        </Container>
      </div>
    </Paper>
  );
};

export default ProfileHeader;
