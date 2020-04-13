import IconButton from "@material-ui/core/IconButton";
import ThumbUpRoundedIcon from "@material-ui/icons/ThumbUpRounded";
import green from "@material-ui/core/colors/green";
import ThumbDownRoundedIcon from "@material-ui/icons/ThumbDownRounded";
import red from "@material-ui/core/colors/red";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import useLike from "../../requests/useLike";

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
    type: 'post' | 'comment',
    id: string
    likes: number,
    dislikes: number,
    isLiked: 0 | 1 | -1 | undefined
}

const LikeButtons: React.FC<LikeButtonsProps> = ({type, id, likes, dislikes, isLiked}) => {
    const classes = useStyles();

    const [likeLoading, likeError, updatedData, like] = useLike(type, id);
    if (updatedData !== null) {
        likes = updatedData.likes;
        dislikes = updatedData.dislikes;
        if (updatedData['is_liked'] !== undefined) {
            isLiked = updatedData['is_liked']
        }
    }

    const likedByUser = isLiked === 1;
    const dislikedByUser = isLiked === -1;

    const likeToggler = () => {
        likedByUser ? like(0) : like(1);
    };

    const dislikeToggler = () => {
        dislikedByUser ? like(0) : like(-1);
    };

    return (
        <div className={classes.likeButtons}>
            <IconButton aria-label={`like ${type}`} disabled={likeLoading} onClick={likeToggler}>
                <ThumbUpRoundedIcon className={classes.button} style={likedByUser ? {color: green[300]} : {}}/>
            </IconButton>
            <div className={classes.buttonText}>
                { likes }
            </div>
            <IconButton aria-label={`dislike ${type}`} disabled={likeLoading} onClick={dislikeToggler}>
                <ThumbDownRoundedIcon className={classes.button} style={dislikedByUser ? {color: red[300]} : {}}/>
            </IconButton>
            <div className={classes.buttonText}>
                { dislikes }
            </div>
        </div>
    )
};

export default LikeButtons