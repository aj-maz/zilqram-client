import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Common/Header";

import HomePage from "./Pages/Home";
import ProfilePage from './Pages/Profile'

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    margin: theme.spacing(2),
  },
  section: {
    marginBottom: theme.spacing(2),
  },
}));

const Routes = () => {
  const classes = useStyles();

  const [zilpayConnection, setZilpayConenction] = useState(false);

  useEffect(() => {
    if (!zilpayConnection) {
      window.zilPay.wallet.connect().then(() => {
        setZilpayConenction(true);
      });
    }
  }, []);

  return (
    <Router>
      <div>
        <Header
          zilpayConnection={zilpayConnection}
          setZilpayConenction={setZilpayConenction}
        />
        <div className={classes.content}>
          <Switch>
            <Route path="/profile">
              <ProfilePage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default Routes;
