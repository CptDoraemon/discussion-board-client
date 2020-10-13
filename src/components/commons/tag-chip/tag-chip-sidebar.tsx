import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import { fade } from '@material-ui/core/styles/colorManipulator';
import TagChipCommon from "./tag-chip-common";

interface TagChipSideBarProps {
  text: string,
  to: string
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    width: '100%'
  },
  chipRoot: {
    padding: 2,
    borderRadius: 2,
    height: 'auto',
    width: '100%',
    backgroundColor: fade(theme.palette.primary.light, 0),
    transitions: theme.transitions.create(['background-color']),
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
    '&:focus': {
      backgroundColor: theme.palette.secondary.light,
    }
  },
  chipLabel: {
    fontSize: theme.typography.caption.fontSize,
    textTransform: 'capitalize'
    // fontWeight: 700
  }
}));

const TagChipSideBar: React.FC<TagChipSideBarProps> = ({text, to}) => {
  const classes = useStyles();

  return (
    <TagChipCommon text={text} classes={classes} to={to}/>
  );
};

export default TagChipSideBar
