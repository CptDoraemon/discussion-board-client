import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Paper, Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import ThumbDownRoundedIcon from '@material-ui/icons/ThumbDownRounded';
import useLike from "../../requests/useLike";
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import {Link} from "react-router-dom";
import getTimeString from "../../utils/get-time-string";
import LikeButtons from "../commons/like-buttons";

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
        },
        '& h2:hover': {
            color: theme.palette.primary.main,
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
    actionItem: {
        margin: theme.spacing(0, 2)
    }
}));

const Post: React.FC<PostProps> = ({isLogin, data}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={0}>
                <Avatar variant="square" className={classes.avatar}>
                    N
                </Avatar>
                <div className={classes.content}>
                    <div className={classes.title}>
                        <Link to={`/post/${data.id}`}>
                            <h2>
                                { data.title }
                            </h2>
                        </Link>
                    </div>
                    <div className={classes.author}>
                        <Typography variant={'caption'} component={'div'}>
                            <Box>
                                { data.owner.username }
                            </Box>
                        </Typography>
                    </div>
                    <div className={classes.actionArea}>
                        <div className={classes.actionItem}>
                            <LikeButtons type={'post'} id={data.id} likes={data.likes} dislikes={data.dislikes} isLiked={data.is_liked}/>
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