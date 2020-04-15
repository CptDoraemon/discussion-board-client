import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import useGetPostList from "../../requests/useGetPostList";
import Skeleton from '@material-ui/lab/Skeleton';
import {Box, CircularProgress, Typography} from "@material-ui/core";
import Post, {PostData} from "./post";

const useStyles = makeStyles((theme) => ({
    root: {
        // padding: theme.spacing(0, 2)
    }
}));

interface PostListProps {
    isLogin: boolean
}

const PostList: React.FC<PostListProps> = ({isLogin}) => {
    const classes = useStyles();

    const [loading, error, data] = useGetPostList();

    let content;
    if (loading) {
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
        content = data?.map((_, i) => {
            return (
                <Post key={i} isLogin={isLogin} data={_}/>
            )
        })
    }

    return (
        <div className={classes.root}>
            { content }
        </div>
    )
};

export default PostList