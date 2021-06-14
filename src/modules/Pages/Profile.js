import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Row, Col } from "react-grid-system";
import ReactLoading from "react-loading";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import CompleteProfile from "../Profile/CompleteProfile";

import ProfileHeader from "../Profile/ProfileHeader";
import ProfileActions from "../Profile/ProfileActions";
import ProfileContents from "../Profile/ProfileContents";

const useStyles = makeStyles((theme) => ({
  root: {},
  loadingContainer: {
    height: "80vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    marginBottom: theme.spacing(2),
  },
}));

const User = gql`
  query user($_id: ID!) {
    user(_id: $_id) {
      _id
      username
      displayName
      avatar
      bio
      setted
      createdAt
      updatedAt
      addresses
      followers
      followings
    }
  }
`;

const ProfilePage = ({ data, refetch, loading }) => {
  const classes = useStyles();

  const [nftCounts, setNftCounts] = useState(0);
  const [contentCounts, setContentCounts] = useState(0);

  const params = useParams();

  const { userId } = params;

  const { data: userData, loading: userLoading } = useQuery(User, {
    variables: { _id: userId ? userId : "" },
  });

  console.log(userId, userData);

  if (userId && userLoading)
    return (
      <div className={classes.loadingContainer}>
        <ReactLoading type="bubbles" color="#14213d" height={150} width={200} />
      </div>
    );

  if (userId && userData) {
    const user = userData.user;

    console.log("i know im here");

    const me = me ? data.me : {};

    return (
      <div>
        <Row>
          <Col md={3}>
            <div className={classes.container}>
              <ProfileHeader
                avatar={user.avatar}
                username={user.username}
                name={user.displayName}
                nfts={nftCounts}
                contents={contentCounts}
                followers={user.followers ? user.followers.legnth : 0}
                followings={user.followings ? user.followings.legnth : 0}
              />
            </div>
          </Col>
          <Col md={9}>
            <ProfileContents
              setNftCounts={setNftCounts}
              setContentCounts={setContentCounts}
              user={user}
              me={me}
            />
          </Col>
        </Row>
      </div>
    );
  }

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

    const me = data.me;

    return (
      <div>
        <Row>
          <Col md={3}>
            <div className={classes.container}>
              <ProfileHeader
                avatar={user.avatar}
                username={user.username}
                name={user.displayName}
                nfts={nftCounts}
                contents={contentCounts}
                followers={user.followers ? user.followers.legnth : 0}
                followings={user.followings ? user.followings.legnth : 0}
              />
            </div>
            <div className={classes.container}>
              <ProfileActions />
            </div>
          </Col>
          <Col md={9}>
            <ProfileContents
              setNftCounts={setNftCounts}
              setContentCounts={setContentCounts}
              user={user}
              me={me}
            />
          </Col>
        </Row>
      </div>
    );
  }
};

export default ProfilePage;
