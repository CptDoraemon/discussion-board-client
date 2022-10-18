import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Skeleton from '@material-ui/lab/Skeleton';
import {Box} from "@material-ui/core";
import Post from "./post";
import useGetPinnedPosts from "../../requests/use-get-pinned-posts";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  tags: {
    padding: theme.spacing(2, 2),
    margin: theme.spacing(1, 0),
    width: "100%",
  },
}));

interface PostListProps {
  isLogin: boolean,
}

const PinnedPosts: React.FC<PostListProps> = ({isLogin}) => {
  const classes = useStyles();
  const {loading, data} = useGetPinnedPosts();
  const isLoaded = data !== null;

  let content;
  if (loading || !isLoaded) {
    content = (new Array(10)).fill(0).map((_, i) => {
      return (
        <Box width='100%' my={1} borderRadius={'5px'} key={i} overflow={'hidden'}>
          <Skeleton variant="rect" animation="wave" width={'100%'} height={150}/>
        </Box>
      )
    })
  } else if (data) {
    content = (
      <>
        { data.posts.map((_, i) =>  <Post key={i} isLogin={isLogin} data={_}/> ) }
      </>
    )
  }

  return (
    <div className={classes.root}>
      { content }
    </div>
  )
};

export default PinnedPosts
