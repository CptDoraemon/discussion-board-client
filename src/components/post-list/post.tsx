import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import useGetPostList from "../../requests/useGetPostList";
import {Box, Paper, Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import ThumbDownRoundedIcon from '@material-ui/icons/ThumbDownRounded';
import useLike from "../../requests/useLike";

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getTimeString = (ISOString: string) => {
    const date = new Date(ISOString);
    const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()} - ${hour}:${minute}`
};

export interface PostData {
    id: string
    title: string,
    content: string,
    likes: number,
    dislikes: number,
    created: string,
    comments: number
    owner: {
        email: string,
        username: string
    },
    "is_liked"?: 0 | 1 | -1
}

interface PostProps {
    isLogin: boolean,
    data: PostData
}

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1, 0)
    },
    paper: {
        width: '100%',
        minHeight: '100px',
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    avatar: {
        margin: theme.spacing(1)
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    title: {
        margin: theme.spacing(0, 2),
        '& h2': {
            fontSize: '1.25rem',
            fontWeight: 700,
            color: theme.palette.text.primary,
            margin: theme.spacing(0),
        }
    },
    author: {
        margin: theme.spacing(0, 2),
    },
    actionArea: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: theme.palette.grey["500"],
        fontSize: '0.875rem',
        fontWeight: 700,
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
        }
    },
    likeButtons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        color: theme.palette.grey["400"],
        fontSize: '1.25rem'
    },
    buttonText: {
        lineHeight: 1
    },
    actionItem: {
        margin: theme.spacing(0, 2)
    }
}));

const Post: React.FC<PostProps> = ({isLogin, data}) => {
    const classes = useStyles();

    const [likeLoading, likeError, updatedData, like] = useLike('post', data.id);
    if (updatedData !== null) data = updatedData;

    const likedByUser = data['is_liked'] === 1;
    const dislikedByUser = data['is_liked'] === -1;

    const likeToggler = () => {
        likedByUser ? like(0) : like(1);
    };

    const dislikeToggler = () => {
        dislikedByUser ? like(0) : like(-1);
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={0}>
                <Avatar variant="square" className={classes.avatar}>
                    N
                </Avatar>
                <div className={classes.content}>
                    <div className={classes.title}>
                        <h2>
                            { data.title }
                        </h2>
                    </div>
                    <div className={classes.author}>
                        <Typography variant={'caption'} component={'div'}>
                            <Box>
                                { data.owner.username }
                            </Box>
                        </Typography>
                    </div>
                    <div className={classes.actionArea}>
                        <div className={`${classes.actionItem} ${classes.likeButtons}`}>
                            <IconButton aria-label="like post" disabled={likeLoading} onClick={likeToggler}>
                                <ThumbUpRoundedIcon className={classes.button} style={likedByUser ? {color: 'green'} : {}}/>
                            </IconButton>
                            <div className={classes.buttonText}>
                                { data.likes }
                            </div>
                            <IconButton aria-label="dislike post" disabled={likeLoading} onClick={dislikeToggler}>
                                <ThumbDownRoundedIcon className={classes.button} style={dislikedByUser ? {color: 'red'} : {}}/>
                            </IconButton>
                            <div className={classes.buttonText}>
                                { data.dislikes }
                            </div>
                        </div>
                        <div className={classes.actionItem}>
                            { `${data.comments} ${data.comments > 1 ? 'comments' : 'comment'}` }
                        </div>
                        <div className={classes.actionItem}>
                            { getTimeString(data.created) }
                        </div>
                    </div>
                </div>
            </Paper>
        </div>
    )
};

export default Post