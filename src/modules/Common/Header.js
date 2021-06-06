import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

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

const ME = gql`
  query me {
    me {
      _id
      username
      displayName
      avatar
      bio
      setted
      createdAt
      updatedAt
      addresses
      nounce
    }
  }
`;

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

const Header = ({ alertError }) => {
  const classes = useStyles();

  const { client, data, loading, error, refetch } = useQuery(ME);

  const [getNounce] = useMutation(GET_NOUNCE);
  const [getToken] = useMutation(GET_TOKEN);

  console.log(data, loading, error);

  const renderOptions = () => {
    if (loading) return <div>Loading ...</div>;
    if (data && data.me)
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
            const address = window.zilPay.wallet.defaultAccount.base16;
            window.zilPay.wallet
              .connect()
              .then((r) => {
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
            CypherMe
          </Typography>
          {renderOptions()}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withError(Header);
