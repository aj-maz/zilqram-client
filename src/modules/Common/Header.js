import React, { useEffect, useState } from "react";
import { makeStyles, Avatar } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import { ExitToApp, Home } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

import { useMutation, gql, useQuery } from "@apollo/client";

import withError from "./withError";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
}));

const GET_NOUNCE = gql`
  mutation getNounce($address: String!) {
    getNounce(address: $address)
  }
`;

const GET_TOKEN = gql`
  mutation getToken(
    $address: String!
    $signedMessage: String!
    $publicKey: String!
  ) {
    getToken(
      address: $address
      signedMessage: $signedMessage
      publicKey: $publicKey
    )
  }
`;

const Header = ({
  alertError,
  setZilpayConenction,
  zilpayConnection,
  client,
  data,
  loading,
  error,
  refetch,
}) => {
  const classes = useStyles();

  const [getNounce] = useMutation(GET_NOUNCE);
  const [getToken] = useMutation(GET_TOKEN);

  const history = useHistory();

  useEffect(() => {
    if (data && data.me && zilpayConnection) {
      if (!data.me.setted) {
        history.push("/profile");
      }
    }
  }, [data, zilpayConnection]);

  const renderOptions = () => {
    if (loading) return <div>Loading ...</div>;
    if (data && data.me && zilpayConnection)
      return (
        <div>
          <div className={classes.grow} />
          <div>
            <IconButton onClick={() => history.push("/")} color="inherit">
              <Home />
            </IconButton>
            <IconButton onClick={() => history.push("/messenger")} color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => history.push("/profile")}
            >
              <AccountCircle />
            </IconButton>
            <IconButton
              edge="end"
              onClick={() => {
                localStorage.setItem("token", "");
                client.resetStore();
                refetch();
                history.push('/')
              }}
              color="inherit"
            >
              <ExitToApp />
            </IconButton>
          </div>
        </div>
      );

    return (
      <Button
        onClick={() => {
          if (typeof window.zilPay === "undefined") {
            alertError("You need ZilPay to signin.");
          } else {
            // Update the store and localstorage
            window.zilPay.wallet
              .connect()
              .then(() => setZilpayConenction(true))
              .then(() => {
                const address = window.zilPay.wallet.defaultAccount.base16;
                getNounce({
                  variables: {
                    address,
                  },
                })
                  .then(({ data }) => data.getNounce)
                  .then((nounce) => window.zilPay.wallet.sign(nounce))
                  .then(({ signature: signedMessage, publicKey }) => {
                    return getToken({
                      variables: {
                        signedMessage,
                        address,
                        publicKey,
                      },
                    });
                  })
                  .then(({ data }) => {
                    // Handle Storing JWT logic !!!
                    const token = data.getToken;
                    localStorage.setItem("token", token);
                    refetch();
                  })
                  .catch((err) => {
                    alertError("Sign does not match.");
                  });
              })
              .catch((err) => alertError(err));
          }
        }}
        color="inherit"
      >
        Login
      </Button>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            onClick={() => history.push("/")}
            variant="h6"
            className={classes.title}
          >
            Ziliqist
          </Typography>
          {renderOptions()}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withError(Header);
