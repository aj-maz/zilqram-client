import { Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1)
  }
}))

const ContentMeta = ({ children }) => {
  const classes = useStyles()
  return <Paper className={classes.root}>{children}</Paper>;
};

export default ContentMeta;
