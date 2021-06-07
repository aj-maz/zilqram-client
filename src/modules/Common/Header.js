import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
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
          <Button
            onClick={() => {
              localStorage.setItem("token", "");
              client.resetStore();
              refetch();
            }}
            color="inherit"
          >
            Logout
          </Button>
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
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Ziliqist
          </Typography>
          {renderOptions()}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withError(Header);
