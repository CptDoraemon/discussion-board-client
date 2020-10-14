import React, {useMemo} from "react";
import {makeStyles} from "@material-ui/core/styles";
import SideBarSection from "./side-bar-section";
import useGetTagList from "../../requests/use-get-tag-list";
import TagChipSideBar from "../commons/tag-chip/tag-chip-sidebar";

const useStyles = makeStyles((theme) => ({

}));

interface SideBarTagsProps {

}

const SideBarTags: React.FC<SideBarTagsProps> = () => {
  const classes = useStyles();
  const [
    loading,
    error,
    data
  ] = useGetTagList();

  return (
    <SideBarSection isLoading={loading} title={'tags'} error={error}>
      {
        data && data.map(tag => <TagChipSideBar text={tag[1]} to={`/?tag=${tag[0]}`} key={tag[1]}/>)
      }
    </SideBarSection>
  )
};

export default SideBarTags
