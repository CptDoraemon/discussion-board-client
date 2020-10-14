import React, {useMemo} from "react";
import {makeStyles} from "@material-ui/core/styles";
import SideBarSection from "./common/side-bar-section";
import useGetPopularPosts from "../../requests/use-get-popular-posts";
import SideBarListView from "./common/side-bar-list-view";
import routes from "../../routes";

const useStyles = makeStyles((theme) => ({

}));

interface SideBarTagsProps {

}

const SideBarPopular: React.FC<SideBarTagsProps> = () => {
  const classes = useStyles();
  const [loading, error, data] = useGetPopularPosts();

  const items = useMemo(() => {
    return data?.posts.map(post => ({
      text: post.title,
      to: routes.getPostDetail(post.id),
      number: post.view_count
    }))
  }, [data]);

  return (
    <SideBarSection isLoading={loading} title={'popular posts'} error={error}>
      {
        items && <SideBarListView items={items}/>
      }
    </SideBarSection>
  )
};

export default SideBarPopular
