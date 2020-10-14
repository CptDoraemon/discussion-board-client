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
        data && data.map(obj => <TagChipSideBar text={obj.tag.toLowerCase()} to={`/?tag=${obj.tag}`} key={obj.tag}/>)
      }
    </SideBarSection>
  )
};

export default SideBarTags
