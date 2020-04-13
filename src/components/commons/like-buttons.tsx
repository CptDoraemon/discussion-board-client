import IconButton from "@material-ui/core/IconButton";
import ThumbUpRoundedIcon from "@material-ui/icons/ThumbUpRounded";
import green from "@material-ui/core/colors/green";
import ThumbDownRoundedIcon from "@material-ui/icons/ThumbDownRounded";
import red from "@material-ui/core/colors/red";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    likeButtons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '-14px'
    },
    buttonText: {
        lineHeight: 1,
        color: theme.palette.grey["500"],
        fontSize: '0.875rem',
        fontWeight: 700,
    },
    button: {
        color: theme.palette.grey["400"],
        fontSize: '1.25rem'
    },
}));

interface LikeButtonsProps {
    disabled: boolean,
    likes: number,
    dislikes: number,
    likeHandler: () => void,
    dislikeHandler: () => void,
    likedByUser: boolean,
    dislikedByUser: boolean
}

const LikeButtons: React.FC<LikeButtonsProps> = ({disabled, likes, dislikes, likeHandler, dislikeHandler, likedByUser, dislikedByUser}) => {
    const classes = useStyles();

    return (
        <div className={classes.likeButtons}>
            <IconButton aria-label="like post" disabled={disabled} onClick={likeHandler}>
                <ThumbUpRoundedIcon className={classes.button} style={likedByUser ? {color: green[300]} : {}}/>
            </IconButton>
            <div className={classes.buttonText}>
                { likes }
            </div>
            <IconButton aria-label="dislike post" disabled={disabled} onClick={dislikeHandler}>
                <ThumbDownRoundedIcon className={classes.button} style={dislikedByUser ? {color: red[300]} : {}}/>
            </IconButton>
            <div className={classes.buttonText}>
                { dislikes }
            </div>
        </div>
    )
};

export default LikeButtons