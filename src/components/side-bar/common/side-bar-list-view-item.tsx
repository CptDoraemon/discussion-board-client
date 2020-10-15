import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import { fade } from '@material-ui/core/styles/colorManipulator';
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";

interface SideBarListViewItemProps {
  text: string,
  to: string,
  number: number,
  barPercentage: string
}

const useStyles = (barWidth: string) => makeStyles((theme) => ({
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
    position: 'relative',
    '&:hover $barItem': {
      height: '100%',
      width: '100%',
      transition: theme.transitions.create(['height', 'width']),
    },
  },
  label: {
    width: '100%',
    fontSize: theme.typography.caption.fontSize,
    fontWeight: 700,
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
  },
  barWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    borderRadius: theme.shape.borderRadius
  },
  barItem: {
    backgroundColor: fade(theme.palette.secondary.light, 0.5),
    height: '50%',
    width: barWidth,
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create(['height', 'width'])
  }
}));

const SideBarListViewItem: React.FC<SideBarListViewItemProps> = ({text, to, number, barPercentage}) => {
  const classes = useStyles(barPercentage)();

  return (
    <Button component={Link} to={to} classes={{root: classes.root, label: classes.label}}>
      <div className={classes.text} style={{zIndex: 2}}>
        {text}
      </div>
      <div className={classes.number} style={{zIndex: 2}}>
        {number}
      </div>
      <div className={classes.barWrapper} style={{zIndex: 1}}>
        <div className={classes.barItem}>

        </div>
      </div>
    </Button>
  );
};

export default SideBarListViewItem
