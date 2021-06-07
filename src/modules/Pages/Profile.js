import React from "react";
import { makeStyles } from "@material-ui/core";
import { Row, Col } from "react-grid-system";
import ReactLoading from "react-loading";

import CompleteProfile from "../Profile/CompleteProfile";

import ProfileHeader from "../Profile/ProfileHeader";
import ProfileActions from '../Profile/ProfileActions'

const useStyles = makeStyles((theme) => ({
  root: {
  },
  loadingContainer: {
    height: "80vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    marginBottom: theme.spacing(2)
  }
}));

const ProfilePage = ({ data, refetch, loading }) => {
  const classes = useStyles();

  if (loading)
    return (
      <div className={classes.loadingContainer}>
        <ReactLoading type="bubbles" color="#14213d" height={150} width={200} />
      </div>
    );

  if (data && data.me && !data.me.setted)
    return (
      <div className={classes.root}>
        <Row>
          <Col md={0} lg={3}></Col>
          <Col md={12} lg={6}>
            <CompleteProfile refetch={refetch} />
          </Col>
        </Row>
      </div>
    );

  if (data && data.me && data.me.setted) {
    const user = data.me;

    return (
      <div>
        <Row>
          <Col md={3}>
            <div className={classes.container}>
            <ProfileHeader
              avatar={user.avatar}
              username={user.username}
              name={user.displayName}
            />
            </div>
            <div className={classes.container}>
            <ProfileActions
            />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
};

export default ProfilePage;
