import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";
import { useParams } from "react-router-dom";
import useGetPostDetail from "../../requests/use-get-post-detail";
import {Skeleton} from "@material-ui/lab";
import CommentList from "./comment-list";
import ItemInfo from "./item-info";
import {CommentData} from "./comment-item";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        padding: theme.spacing(4)
    },
    loading: {
        width: '100%',
        height: '500px'
    },
    error: {
        width: '100%',
        height: '500px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    postContent: {
        marginTop: '40px'
    }
}));

export interface PostDetailData {
    id: string,
    owner: {
        email: string,
        username: string,
        avatar_url: string
    }
    likes: number,
    dislikes: number,
    comments: number,
    comments_data: CommentData[]
    title: string,
    content: string,
    created: string,
    is_liked: 0 | 1 | -1 | undefined
}

interface PostDetailProps {
    isLogin: boolean
}

const PostDetail: React.FC<PostDetailProps> = ({isLogin}) => {
    const classes = useStyles();

    const { postID } = useParams();
    const [loading, error, data] = useGetPostDetail(parseInt(postID || '1'));

    // const [likeLoading, likeError, updatedData, like] = useLike('post', postID);

    let content;
    if (loading) {
        content = (
            <div className={classes.loading}>
                <Skeleton variant="rect" width={'100%'} height={60} />
                { (new Array(10)).fill(0).map((_, i) => <Skeleton variant="text" width={'100%'} key={i}/>)}
            </div>
        )
    } else if (error) {
        content = (
            <div className={classes.error}>
                <h1>Server error</h1>
            </div>
        )
    } else if (data) {
        content = (
            <>
                <Paper className={classes.paper} elevation={0}>
                    <h1> {data.title} </h1>
                    <ItemInfo type={'post'} username={data.owner.username} avatarUrl={data.owner.avatar_url} created={data.created} id={data.id} likes={data.likes} dislikes={data.dislikes} isLiked={data.is_liked}/>
                    <div dangerouslySetInnerHTML={{__html: data.content}} className={classes.postContent}/>
                </Paper>
                <CommentList comments={data.comments} isLogin={isLogin} postID={data.id} data={data.comments_data}/>
            </>
        )
    }

    return (
        <div className={classes.root}>
            { content }
        </div>
    )

};

export default PostDetail