import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import SideBarSection from "./side-bar-section";
import TagChipSideBar from "../commons/tag-chip/tag-chip-sidebar";

const useStyles = makeStyles((theme) => ({

}));

interface SideBarTagsProps {

}

const SideBarPopular: React.FC<SideBarTagsProps> = () => {
  const classes = useStyles();
  // const [
  //   loading,
  //   error,
  //   data
  // ] = useGetTagList();
  const data = [
    'Victoria Falls, ON',
    'React router difference between component and render',
    'Contemporary Front-end Architectures',
    'Cross-Origin Resource Sharing (CORS)',
    'AWS Certifications'
  ];

  return (
    <SideBarSection isLoading={false} title={'popular posts'}>
      {
        data.map(tag => <TagChipSideBar text={tag} to={`/`} key={tag}/>)
      }
    </SideBarSection>
  )
};

export default SideBarPopular
