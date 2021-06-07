import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import Header from "./Common/Header";

import HomePage from "./Pages/Home";
import ProfilePage from "./Pages/Profile";
import CollectionsPage from "./Pages/Collections";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    margin: theme.spacing(2),
  },
  section: {
    marginBottom: theme.spacing(2),
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

const Routes = () => {
  const classes = useStyles();

  const [zilpayConnection, setZilpayConenction] = useState(false);
  const { client, data, loading, error, refetch } = useQuery(ME);

  useEffect(() => {
    if (!zilpayConnection) {
      window.zilPay.wallet.connect().then(() => {
        setZilpayConenction(true);
      });
    }
  }, []);

  return (
    <Router>
      <div className={classes.root}>
        <Header
          zilpayConnection={zilpayConnection}
          setZilpayConenction={setZilpayConenction}
          client={client}
          data={data}
          loading={loading}
          error={error}
          refetch={refetch}
        />
        <div className={classes.content}>
          <Switch>
            <Route path="/profile">
              <ProfilePage loading={loading} data={data} refetch={refetch} />
            </Route>
            <Route path="/collections">
              <CollectionsPage />
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
