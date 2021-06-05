import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

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

const Header = ({ alertError }) => {
  const classes = useStyles();

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
          <Button
            onClick={() => {
              if (typeof window.zilPay === "undefined") {
                alertError("You need ZilPay to signin.");
              } else {
                const message =
                  "Here we are you fuckers lal alalala alallalalal";

                window.zilPay.wallet
                  .connect()
                  .then((r) => window.zilPay.wallet.sign(message))
                  .then((signed) => console.log(signed))
                  .catch((err) => alertError(err));
              }
            }}
            color="inherit"
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withError(Header);
