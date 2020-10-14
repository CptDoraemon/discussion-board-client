import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import useGetPostList from "../../requests/use-get-post-list";
import Skeleton from '@material-ui/lab/Skeleton';
import {Box, Typography} from "@material-ui/core";
import Post from "./post";
import ServerWakingNotification from "./server-waking-notification";
import Pagination from "../pagination/pagination";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    pagination: {
        width: '100%',
        padding: theme.spacing(2, 0)
    }
}));

interface PostListProps {
    isLogin: boolean
    tag: string | null
}

const PostList: React.FC<PostListProps> = ({isLogin, tag}) => {
    const classes = useStyles();
    const [loading, error, data] = useGetPostList(tag || null);
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
    } else {
        content = data?.posts.map((_, i) =>  <Post key={i} isLogin={isLogin} data={_}/> )
    }

    return (
        <div className={classes.root}>
            <ServerWakingNotification isLoaded={isLoaded}/>
            { content }
            <Paper className={classes.pagination} elevation={0}>
                <Pagination count={10} page={1} onChange={() => false}/>
            </Paper>
        </div>
    )
};

export default PostList
