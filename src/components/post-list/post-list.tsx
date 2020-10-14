import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import useGetPostList from "../../requests/use-get-post-list";
import Skeleton from '@material-ui/lab/Skeleton';
import {Box, Typography} from "@material-ui/core";
import Post from "./post";
import ServerWakingNotification from "./server-waking-notification";
import Pagination from "../pagination/pagination";
import Paper from "@material-ui/core/Paper";
import useQuery from "../../utils/use-query";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    }
}));

interface PostListProps {
    isLogin: boolean,
    tag: string | null,
    page: string
}

const PostList: React.FC<PostListProps> = ({isLogin, tag, page}) => {
    const classes = useStyles();
    const [loading, error, data] = useGetPostList({tag, page});
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
    } else if (error) {
        content = (
            <Typography variant={'body1'} component={'h2'}>
                <Box fontWeight={700} color={'primary.main'} textAlign={'center'}>
                    Server is unavailable now, please try again later
                </Box>
            </Typography>
        )
    } else if (data) {
        content = (
          <>
              { data.posts.map((_, i) =>  <Post key={i} isLogin={isLogin} data={_}/> ) }
              <Pagination count={data?.total_pages || 1} page={data?.current_page || 1}/>
          </>
        )
    }

    return (
        <div className={classes.root}>
            <ServerWakingNotification isLoaded={isLoaded}/>
            { content }
        </div>
    )
};

export default PostList
