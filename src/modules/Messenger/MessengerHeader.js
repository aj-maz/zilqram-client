import React from "react";
import {
  makeStyles,
  IconButton,
  TextField,
  InputBase,
  fade
} from "@material-ui/core";
import { Add, Search } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: "1px solid #e8e8e8",
    padding: theme.spacing(0.5),
    height: 70,
    boxSizing: 'border-box',
  },
  addButton: {
    position: "absolute",
    left: theme.spacing(1),
    top: theme.spacing(1.1)
  },
  search: {
    position: 'absolute',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
   // marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '70%',
    right: 0,
    top: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: "inherit"
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  iconSearch: {
    color: '#999',

  }
}));

const ConversationListHeader = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <IconButton className={classes.addButton}>
        <Add />
      </IconButton>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <Search className={classes.iconSearch} />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
    </div>
  );
};

export default ConversationListHeader;
