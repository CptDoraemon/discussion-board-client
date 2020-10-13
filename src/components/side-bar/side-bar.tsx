import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import SideBarTop from "./side-bar-top";
import SideBarTags from "./side-bar-tags";

interface SideBarProps {
    isLogin: boolean
}

const useStyles = makeStyles((theme) => ({

}));

const SideBar: React.FC<SideBarProps> = ({isLogin}) => {
    const classes = useStyles();

    return (
      <>
          <SideBarTop isLogin={isLogin}/>
          <SideBarTags/>
      </>
    )
};

export default SideBar
