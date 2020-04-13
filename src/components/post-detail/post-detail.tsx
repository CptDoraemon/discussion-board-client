import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";
import { useParams } from "react-router-dom";
import useGetPostDetail from "../../requests/useGetPostDetail";
import {Skeleton} from "@material-ui/lab";
import Avatar from "@material-ui/core/Avatar";
import getTimeString from "../../utils/get-time-string";
import LikeButtons from "../commons/like-buttons";
import useLike from "../../requests/useLike";


const useStyles = makeStyles((theme) => ({
    root: {
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
    postInfo: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
        }
    },
    avatar: {
        margin: 0
    },
    postInfoItem: {
        margin: theme.spacing(0, 2),
        [theme.breakpoints.down('md')]: {
            margin: '4px 0',
        }
    },
    postContent: {
        marginTop: '40px'
    }
}));

export interface PostDetailData {
    id: string,
    owner: {
        email: string,
        username: string
    }
    likes: number,
    dislikes: number,
    comments: []
    title: string,
    content: string,
    created: string,
}

interface PostDetailProps {

}

const PostDetail: React.FC<PostDetailProps> = () => {
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
            <div>
                <h1> {data.title} </h1>
                <div className={classes.postInfo}>
                    <div className={classes.postInfoItem}>
                        <Avatar variant="square" className={classes.avatar}>
                            N
                        </Avatar>
                    </div>
                    <div className={classes.postInfoItem}>
                        { data.owner.username }
                    </div>
                    <div className={classes.postInfoItem}>
                        { getTimeString(data.created) }
                    </div>
                    <div className={classes.postInfoItem}>
                        <LikeButtons
                            disabled={false}
                            likes={data.likes}
                            dislikes={data.dislikes}
                            likeHandler={() => false}
                            dislikeHandler={() => false}
                            likedByUser={false}
                            dislikedByUser={false}
                        />
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{__html: data.content}} className={classes.postContent}/>
            </div>
        )
    }

    return (
        <Paper className={classes.root} elevation={0}>
            { content }
        </Paper>
    )

};

export default PostDetail