import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import { fade } from '@material-ui/core/styles/colorManipulator';
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";

interface SideBarListViewItemProps {
  text: string,
  to: string,
  number: number
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    width: '100%',
    padding: 2,
    borderRadius: 2,
    height: 'auto',
    backgroundColor: fade(theme.palette.primary.light, 0),
    transitions: theme.transitions.create(['background-color']),
    color: theme.palette.text.primary,
    justifyContent: 'flex-start',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
    '&:focus': {
      backgroundColor: theme.palette.secondary.light,
    }
  },
  label: {
    width: '100%',
    fontSize: theme.typography.caption.fontSize,
    textTransform: 'capitalize',
    padding: '2px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    flex: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  number: {
    textAlign: 'end',
    paddingLeft: '4px'
  }
}));

const SideBarListViewItem: React.FC<SideBarListViewItemProps> = ({text, to, number}) => {
  const classes = useStyles();

  return (
    <Button component={Link} to={to} classes={{root: classes.root, label: classes.label}}>
      <div className={classes.text}>
        {text}
      </div>
      <div className={classes.number}>
        {number}
      </div>
    </Button>
  );
};

export default SideBarListViewItem
