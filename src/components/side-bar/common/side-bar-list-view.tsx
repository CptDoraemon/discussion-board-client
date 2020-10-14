import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import SideBarListViewItem from "./side-bar-list-view-item";

interface TagChipSideBarProps {
  items: {
    text: string,
    number: number,
    to: string
  }[]
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  itemsRoot: {
    width: '100%',
  }
}));

const SideBarListView: React.FC<TagChipSideBarProps> = ({items}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.itemsRoot}>
        {
          items.map(item => <SideBarListViewItem key={item.text} text={item.text} to={item.to} number={item.number}/>)
        }
      </div>
    </div>
  );
};

export default SideBarListView
