import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import useGetPostList from "../../requests/useGetPostList";
import {Paper} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import ThumbDownRoundedIcon from '@material-ui/icons/ThumbDownRounded';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getTimeString = (ms: number) => {
    const date = new Date();
    const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()} - ${hour}:${minute}`
};

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
            margin: theme.spacing(1, 0),
        }
    },
    actionArea: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: theme.palette.grey["500"],
        fontSize: '0.875rem',
        fontWeight: 700,
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

interface PostProps {
    isLogin: boolean
}

const Post: React.FC<PostProps> = ({isLogin}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={0}>
                <Avatar variant="square" className={classes.avatar}>
                    N
                </Avatar>
                <div className={classes.content}>
                    <div className={classes.title}>
                        <h2>
                            This is the title title title title
                        </h2>
                    </div>
                    <div className={classes.actionArea}>
                        <div className={`${classes.actionItem} ${classes.likeButtons}`}>
                            <IconButton aria-label="like post">
                                <ThumbUpRoundedIcon className={classes.button}/>
                            </IconButton>
                            <div className={classes.buttonText}>
                                12
                            </div>
                            <IconButton aria-label="dislike post" >
                                <ThumbDownRoundedIcon className={classes.button}/>
                            </IconButton>
                            <div className={classes.buttonText}>
                                9
                            </div>
                        </div>
                        <div className={classes.actionItem}>
                            55 comments
                        </div>
                        <div className={classes.actionItem}>
                            { getTimeString(Date.now()) }
                        </div>
                    </div>
                </div>
            </Paper>
        </div>
    )
};

export default Post