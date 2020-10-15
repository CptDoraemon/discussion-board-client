import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {CircularProgress} from "@material-ui/core";
import BrokenImageIcon from '@material-ui/icons/BrokenImage';

interface SideBarSectionProps {
  isLoading?: boolean,
  title?: string,
  error?: boolean
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'calc(100% - 16px)',
    margin: theme.spacing(1),
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      margin: theme.spacing(1, 0),
    }
  },
  main: {
    width: '80%',
    minHeight: '100px',
    padding: theme.spacing(2, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    padding: theme.spacing(0.25, 1),
    fontWeight: 700,
    textTransform: 'uppercase',
    fontSize: theme.typography.caption.fontSize,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    width: '100%',
    borderRadius: theme.shape.borderRadius
  },
  titleText: {
    padding: theme.spacing(0, 1),
  }
}));

const SideBarSection: React.FC<SideBarSectionProps> = ({children, isLoading, title, error}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={0}>
      {
        title &&
        <div className={classes.title}>{title}</div>
      }
      <div className={classes.main}>
        {
          isLoading && <CircularProgress color="primary" size={25}/>
        }
        {
          error && <BrokenImageIcon color='disabled'/>
        }
        {
          !isLoading && !error && children
        }
      </div>
    </Paper>
  )
};

export default SideBarSection
