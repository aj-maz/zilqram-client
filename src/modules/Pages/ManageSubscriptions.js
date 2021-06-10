import React from "react";
import {
  makeStyles,
  Typography,
  TextField,
  Checkbox,
  Paper,
  Button,
} from "@material-ui/core";
import { Row, Col } from "react-grid-system";
import { ReactComponent as D1 } from "./subcons/d1.svg";
import { ReactComponent as D2 } from "./subcons/d2.svg";
import { ReactComponent as Gold } from "./subcons/gold.svg";
import { ReactComponent as Silver } from "./subcons/silver.svg";
import { ReactComponent as Bronze } from "./subcons/bronze.svg";

const useStyles = makeStyles((theme) => ({
  root: {},
  section: {
    marginBottom: theme.spacing(2),
  },
  benefitRow: {
    display: "flex",
    justifyContent: "space-between",
  },
  benefitItem: {
    display: "flex",
    alignItems: "center",
  },
  iconsRow: {
    display: "flex",
    justifyContent: "space-between",
  },
  iconItem: {
    // width: '20%',
    padding: theme.spacing(1),
    boxSizing: "borderBox",
    textAlign: "center",
    marginRight: theme.spacing(2),
    cursor: "pointer",
  },
  selectedIconItem: {
    padding: theme.spacing(1),
    boxSizing: "borderBox",
    display: "flex",
    marginRight: theme.spacing(2),
    cursor: "pointer",
    border: `2px solid ${theme.palette.primary.main}`,
    justifyContent: "center",
    alignItems: "center",
  },
  iconIcon: {
    width: "80%",
  },
  tierFirstRow: {
    display: "flex",
    justifyContent: "space-between",
  },
  tierItem: {
    padding: theme.spacing(2),
    display: "flex",
  },
  tierIcon: {
    width: 180,
    marginRight: theme.spacing(4),
    marginTop: theme.spacing(1),
  },
  tierName: {
    display: "inline-block",
    marginRight: theme.spacing(2),
  },
  marginButton: {
    marginRight: theme.spacing(2),
  },
  subSection: {
      marginBottom: theme.spacing(1)
  }
}));

const ManageSubscriptions = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Row>
        <Col md={6}>
          <div className={classes.section}>
            <Typography variant="h5">Define Your Tiers</Typography>
          </div>
          <div className={classes.section}>
            <TextField variant="filled" fullWidth label="Title" />
          </div>
          <div className={classes.section}>
            <TextField
              variant="filled"
              fullWidth
              label="Description"
              multiline
            />
          </div>
          <div className={classes.section}>
            <Typography variant="h6">Benefits</Typography>
            <div className={classes.benefitRow}>
              <div className={classes.benefitItem}>
                <Checkbox />
                <Typography variant="body1">Exclusive Content</Typography>
              </div>
              <div className={classes.benefitItem}>
                <Checkbox />
                <Typography variant="body1">Group Conversation</Typography>
              </div>
              <div className={classes.benefitItem}>
                <Checkbox />
                <Typography variant="body1">Direct Message</Typography>
              </div>
            </div>
          </div>
          <div className={classes.section}>
            <Typography variant="h6">Choose an icon</Typography>
            <div className={classes.iconsRow}>
              <Paper className={classes.iconItem}>
                <D1 className={classes.iconIcon} />
              </Paper>
              <Paper className={classes.iconItem}>
                <D2 className={classes.iconIcon} />
              </Paper>
              <Paper className={classes.selectedIconItem}>
                <Gold className={classes.iconIcon} />
              </Paper>
              <Paper className={classes.iconItem}>
                <Silver className={classes.iconIcon} />
              </Paper>
              <Paper className={classes.iconItem}>
                <Bronze className={classes.iconIcon} />
              </Paper>
            </div>
          </div>
          <div className={classes.section}>
            <Button fullWidth variant="contained" color="primary">
              Add Tier
            </Button>
          </div>
        </Col>
        <Col md={6}>
          <Typography variant="h5">Your tiers</Typography>
          <div className={classes.section}>
            <Paper className={classes.tierItem}>
              <div className={classes.tierIcon}>
                <D1 className={classes.tierIconIcon} />
              </div>
              <div className={classes.tierInfo}>
                <div className={classes.subSection}>
                  <Typography className={classes.tierName} variant="h6">
                    Diamond
                  </Typography>
                  <Button className={classes.marginButton} color="primary">Create NFT</Button>
                  <Button color="secondary">Delete</Button>
                </div>
                <div className={classes.subSection}>
                  <Typography variant="body1">
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that
                  </Typography>
                </div>
                <div className={classes.subSection}>
                  <Typography variant="body2">
                    Benefits: Exclusive Content, Group Conversation, Direct
                    Message
                  </Typography>
                </div>
              </div>
            </Paper>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ManageSubscriptions;
