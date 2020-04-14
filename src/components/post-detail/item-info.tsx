import Avatar from "@material-ui/core/Avatar";
import getTimeString from "../../utils/get-time-string";
import LikeButtons from "../commons/like-buttons";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
    }
}));

interface ItemInfoProps {
    type: 'comment' | 'post',
    username: string,
    created: string,
    id: string,
    likes: number,
    dislikes: number,
    isLiked: -1 | 0 | 1 | undefined
}

const ItemInfo: React.FC<ItemInfoProps> = ({type, username, created, id, likes, dislikes, isLiked}) => {
    const classes = useStyles();

    return (
        <div className={classes.postInfo}>
            <div className={classes.postInfoItem}>
                <Avatar variant="square" className={classes.avatar}>
                    N
                </Avatar>
            </div>
            <div className={classes.postInfoItem}>
                { username }
            </div>
            <div className={classes.postInfoItem}>
                { getTimeString(created) }
            </div>
            <div className={classes.postInfoItem}>
                <LikeButtons type={type} id={id} likes={likes} dislikes={dislikes} isLiked={isLiked}/>
            </div>
        </div>
    )
};

export default ItemInfo