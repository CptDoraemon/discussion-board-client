import React, {useMemo} from "react";
import {makeStyles} from "@material-ui/core/styles";
import SideBarListViewItem from "./side-bar-list-view-item";

type Items = {
  text: string,
  number: number,
  to: string
}[]

interface TagChipSideBarProps {
  items: Items
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'relative'
  }
}));

const SideBarListView: React.FC<TagChipSideBarProps> = ({items}) => {
  const classes = useStyles();
  const bars = useMemo(() => {
    const maxCount = items.reduce((a, b) => Math.max(a, b.number), 0);
    return items.map(item => `${(item.number/maxCount*100).toFixed(2)}%`)
  }, [items]);

  return (
    <div className={classes.root}>
      {
        items.map((item, index) => <SideBarListViewItem key={item.text} text={item.text} to={item.to} number={item.number} barPercentage={bars[index]}/>)
      }
    </div>
  );
};

export default SideBarListView
