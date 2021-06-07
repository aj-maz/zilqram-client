import React, { useState } from "react";
import { makeStyles, AppBar, Tabs, Tab } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const ProfileContents = () => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <div className={classes.root}>
      <div className={classes.root}>
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
    </div>
  );
};

export default ProfileContents;
