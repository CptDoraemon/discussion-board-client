import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import SideBarSection from "./side-bar-section";
import TagChipSideBar from "../commons/tag-chip/tag-chip-sidebar";
import useGetPopularPosts from "../../requests/use-get-popular-posts";
import routes from "../../routes";

const useStyles = makeStyles((theme) => ({

}));

interface SideBarTagsProps {

}

const SideBarPopular: React.FC<SideBarTagsProps> = () => {
  const classes = useStyles();
  const [loading, error, data] = useGetPopularPosts();

  return (
    <SideBarSection isLoading={loading} title={'popular posts'} error={error}>
      {
        data?.posts.map(post => <TagChipSideBar text={post.title} to={routes.getPostDetail(post.id)} key={post.title}/>)
      }
    </SideBarSection>
  )
};

export default SideBarPopular
