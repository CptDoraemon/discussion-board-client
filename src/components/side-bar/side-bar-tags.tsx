import React, {useMemo} from "react";
import {makeStyles} from "@material-ui/core/styles";
import SideBarSection from "./common/side-bar-section";
import useGetTagList from "../../requests/use-get-tag-list";
import SideBarListView from "./common/side-bar-list-view";
import routes from "../../routes";

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

  const items = useMemo(() => {
    return data?.map(obj => ({
      text: obj.tag.toLowerCase(),
      to: routes.getPostList({tag: obj.tag}),
      number: obj.count
    }))
  }, [data]);

  return (
    <SideBarSection isLoading={loading} title={'tags'} error={error}>
      {
        items && <SideBarListView items={items}/>
      }
    </SideBarSection>
  )
};

export default SideBarTags
