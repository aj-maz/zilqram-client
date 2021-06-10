import React, { useState } from "react";
import { makeStyles, AppBar, Tabs, Tab } from "@material-ui/core";

import AddContent from '../Content/AddContent'

const useStyles = makeStyles((theme) => ({
  root: {},
  section: {
    marginBottom: theme.spacing(2)
  }
}));

const ProfileContents = () => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <AppBar position="static">
          <Tabs
            value={selectedTab}
            onChange={(e, v) => setSelectedTab(v)}
            variant="scrollable"
            centered
            scrollButtons="auto"
          >
            <Tab label="Posts" />
            <Tab label="NFTs" />
            <Tab label="Collections" />
            <Tab label="Saves" />
          </Tabs>
        </AppBar>
      </div>
      <div className={classes.section}>
        <AddContent />
      </div>
    </div>
  );
};

export default ProfileContents;
