import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Person';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  //  maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  selected: {
    background: theme.palette.secondary.main,
    '&:hover': {
      background: theme.palette.secondary.main,

    }
  }
}));

export default function FolderList() {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem button>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Nanu Estesmadi" secondary="Jun 13, 2021" />
      </ListItem>
      <ListItem className={classes.selected} button>
        <ListItemAvatar>
          <Avatar src="/images/pp.jpeg" />
        </ListItemAvatar>
        <ListItemText primary="Ajand Mardalizad" secondary="Jun 12, 2021" />
      </ListItem>
      <ListItem  button>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText   primary="Moji Janjuri" secondary="Jun 12, 2021" />
      </ListItem>
   
    </List>
  );
}
