import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Divider, Fade, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ItemInfo from "./item-info";
import ChatIcon from '@material-ui/icons/Chat';
import Button from "@material-ui/core/Button";
import SubCommentItem from "./sub-comment-item";
import CommentInput from "./comment-input";


const useStyles = makeStyles((theme) => ({
    root: {
        margin: '20px 0',
        width: '100%',
        padding: theme.spacing(2)
    },
    content: {
        margin: '32px'
    },
    commentButton: {
        margin: '0 32px',
        color: theme.palette.grey[500],
    },
    subCommentPanel: {
        width: 'calc(100% - 32px)',
        margin: '8px 0 8px 32px',
        border: `1px solid ${theme.palette.grey[400]}`,
        borderRadius: '5px',
        padding: theme.spacing(2)
    }
}));

interface CommentBaseData {
    id: string,
    owner: {
        username: string,
        email: string,
        avatar_url: string
    }
    likes: number,
    dislikes: number,
    content: string,
    created: string,
    isLiked: -1 | 0 | 1 | undefined
}

export interface CommentData extends CommentBaseData {
    sub_comments: CommentBaseData[]
}

export interface SubCommentData extends CommentBaseData {}


interface CommentItemProps {
    data: CommentData,
    postID: string,
    isLogin: boolean
}

const CommentItem: React.FC<CommentItemProps> = ({data, postID, isLogin}) => {
    const classes = useStyles();

    const [isCommentPanelOpen, setIsCommentPanelOpen] = useState(false);

    return (
        <Paper className={classes.root} elevation={0}>
            <ItemInfo type={'comment'} username={data.owner.username} avatarUrl={data.owner.avatar_url} created={data.created} id={data.id} likes={data.likes} dislikes={data.dislikes} isLiked={data.isLiked} small/>
            <div className={classes.content}>
                { data.content }
            </div>
            <Button
                variant="outlined"
                className={classes.commentButton}
                disableElevation
                startIcon={<ChatIcon />}
                onClick={() => setIsCommentPanelOpen(prev => !prev)}
                size={'small'}
            >
                { data.sub_comments.length }
            </Button>

            {
                isCommentPanelOpen &&
                <Fade in={isCommentPanelOpen} timeout={1000}>
                    <div className={classes.subCommentPanel}>
                        { !data.sub_comments.length && <Box textAlign={'center'}>No comment yet</Box> }
                        { data.sub_comments.map((item, i) => <SubCommentItem data={item} key={i}/>) }
                        { isLogin && <CommentInput parentPost={postID} parentComment={data.id}/> }
                    </div>
                </Fade>
            }
        </Paper>
    )

};

export default CommentItem