import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {GenericLinkButton} from "../commons/generic-button";
import SideBarSection from "./common/side-bar-section";

interface SideBarTopProps {
  isLogin: boolean
}

const useStyles = makeStyles((theme) => ({
  rowWrapper: {
    width: '100%',
    margin: '8px 0'
  }
}));

const SideBarTop: React.FC<SideBarTopProps> = ({isLogin}) => {
  const classes = useStyles();

  return (
    <SideBarSection>
      <div className={classes.rowWrapper}>
        <GenericLinkButton link={'/edit-post'} width={'100%'} text={'Create Post'}/>
      </div>
      {
        isLogin &&
        <div className={classes.rowWrapper}>
          <GenericLinkButton link={'/account-setting'} width={'100%'} text={'Account Settings'}/>
        </div>
      }
    </SideBarSection>
  )
};

export default SideBarTop
