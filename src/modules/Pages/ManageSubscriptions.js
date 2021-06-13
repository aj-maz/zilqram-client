import React, { useState } from "react";
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

import { gql, useQuery, useMutation } from "@apollo/client";

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
    cursor: 'pointer'
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
    marginBottom: theme.spacing(2),
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
    marginBottom: theme.spacing(1),
  },
}));

const CREATE_TIER = gql`
  mutation createTier(
    $title: String!
    $description: String!
    $icon: String
    $benefits: [String]
  ) {
    createTier(
      title: $title
      description: $description
      icon: $icon
      benefits: $benefits
    ) {
      _id
    }
  }
`;

const MY_TIERS = gql`
  query myTiers {
    myTiers {
      _id
      title
      description
      icon
      benefits
    }
  }
`;

const REMOVE_TIER = gql`
  mutation removeTier($_id: ID!) {
    removeTier(_id: $_id)
  }
`;

const ManageSubscriptions = () => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [benefits, setBenefits] = useState(new Set());
  const [icon, setIcon] = useState("bronze");

  const { data, loading, error, refetch } = useQuery(MY_TIERS);

  const [createTier] = useMutation(CREATE_TIER);
  const [removeTier] = useMutation(REMOVE_TIER);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setBenefits(new Set());
    setIcon("bronze");
  };

  const handleBenefit = (benefit) => {
    if (benefits.has(benefit)) {
      const lb = new Set([...benefits]);
      lb.delete(benefit);
      setBenefits(lb);
    } else {
      const lb = new Set([...benefits]);
      lb.add(benefit);
      setBenefits(lb);
    }
  };

  const renderBenefits = (benefits) => {
    return benefits
      .map((benefit) => {
        if (benefit == "ec") return "Exclusive Content";
        if (benefit == "gc") return "Group Conversation";
        if (benefit == "dm") return "Direct Message";
      })
      .join(", ");
  };

  const renderIcon = (icon) => {
    switch (icon) {
      case "d1":
        return (
          <div className={classes.tierIcon}>
            <D1 className={classes.tierIconIcon} />
          </div>
        );
      case "d2":
        return (
          <div className={classes.tierIcon}>
            <D2 className={classes.tierIconIcon} />
          </div>
        );
      case "gold":
        return (
          <div className={classes.tierIcon}>
            <Gold className={classes.tierIconIcon} />
          </div>
        );
      case "silver":
        return (
          <div className={classes.tierIcon}>
            <Silver className={classes.tierIconIcon} />
          </div>
        );
      case "bronze":
        return (
          <div className={classes.tierIcon}>
            <Bronze className={classes.tierIconIcon} />
          </div>
        );
    }
  };

  return (
    <div className={classes.root}>
      <Row>
        <Col md={6}>
          <div className={classes.section}>
            <Typography variant="h5">Define Your Tiers</Typography>
          </div>
          <div className={classes.section}>
            <TextField
              variant="filled"
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={classes.section}>
            <TextField
              variant="filled"
              fullWidth
              label="Description"
              multiline
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={classes.section}>
            <Typography variant="h6">Benefits</Typography>
            <div className={classes.benefitRow}>
              <div
                onClick={() => handleBenefit("ec")}
                className={classes.benefitItem}
              >
                <Checkbox checked={benefits.has("ec")} />
                <Typography variant="body1">Exclusive Content</Typography>
              </div>
              <div
                onClick={() => handleBenefit("gc")}
                className={classes.benefitItem}
              >
                <Checkbox checked={benefits.has("gc")} />
                <Typography variant="body1">Group Conversation</Typography>
              </div>
              <div
                onClick={() => handleBenefit("dm")}
                className={classes.benefitItem}
              >
                <Checkbox checked={benefits.has("dm")} />
                <Typography variant="body1">Direct Message</Typography>
              </div>
            </div>
          </div>
          <div className={classes.section}>
            <Typography variant="h6">Choose an icon</Typography>
            <div className={classes.iconsRow}>
              <Paper
                onClick={() => setIcon("d1")}
                className={
                  icon === "d1" ? classes.selectedIconItem : classes.iconItem
                }
              >
                <D1 className={classes.iconIcon} />
              </Paper>
              <Paper
                onClick={() => setIcon("d2")}
                className={
                  icon === "d2" ? classes.selectedIconItem : classes.iconItem
                }
              >
                <D2 className={classes.iconIcon} />
              </Paper>
              <Paper
                onClick={() => setIcon("gold")}
                className={
                  icon === "gold" ? classes.selectedIconItem : classes.iconItem
                }
              >
                <Gold className={classes.iconIcon} />
              </Paper>
              <Paper
                onClick={() => setIcon("silver")}
                className={
                  icon === "silver"
                    ? classes.selectedIconItem
                    : classes.iconItem
                }
              >
                <Silver className={classes.iconIcon} />
              </Paper>
              <Paper
                onClick={() => setIcon("bronze")}
                className={
                  icon === "bronze"
                    ? classes.selectedIconItem
                    : classes.iconItem
                }
              >
                <Bronze className={classes.iconIcon} />
              </Paper>
            </div>
          </div>
          <div className={classes.section}>
            <Button
              disabled={!title || !description || benefits.size == 0}
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => {
                createTier({
                  variables: {
                    title,
                    description,
                    benefits: [...benefits],
                    icon,
                  },
                })
                  .then(() => {
                    resetForm();
                    refetch();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Add Tier
            </Button>
          </div>
        </Col>
        <Col md={6}>
          <Typography variant="h5">Your tiers</Typography>
          {data ? (
            !data.myTiers.length ? (
              <Typography variant="body1">
                You Don't have any Tier Yet
              </Typography>
            ) : (
              data.myTiers.map((tier) => (
                <div key={tier._id} className={classes.section}>
                  <Paper className={classes.tierItem}>
                    {renderIcon(tier.icon)}
                    <div className={classes.tierInfo}>
                      <div className={classes.subSection}>
                        <Typography className={classes.tierName} variant="h6">
                          {tier.title}
                        </Typography>
                        <Button
                          className={classes.marginButton}
                          color="primary"
                        >
                          Create NFT
                        </Button>
                        <Button
                          onClick={() => {
                            removeTier({ variables: { _id: tier._id } })
                              .then(() => refetch())
                              .catch((err) => console.log(err));
                          }}
                          color="secondary"
                        >
                          Delete
                        </Button>
                      </div>
                      <div className={classes.subSection}>
                        <Typography variant="body1">
                          {tier.description}
                        </Typography>
                      </div>
                      <div className={classes.subSection}>
                        <Typography variant="body2">
                          Benefits: {renderBenefits(tier.benefits)}
                        </Typography>
                      </div>
                    </div>
                  </Paper>
                </div>
              ))
            )
          ) : (
            <Typography variant="h6">Loading ...</Typography>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ManageSubscriptions;
