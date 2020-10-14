import Avatar from "@material-ui/core/Avatar";
import getTimeString from "../../utils/get-time-string";
import LikeButtons from "../commons/like-buttons";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import {Tooltip} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    postInfo: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: theme.palette.grey[500],
        fontWeight: 700,
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
        }
    },
    avatar: {
        backgroundColor: theme.palette.primary.main
    },
    avatarSmall: {
        width: '1.2rem',
        height: '1.2rem',
        fontSize: '0.8rem'
    },
    username: {
        color: theme.palette.text.primary
    },
    postInfoItem: {
        margin: theme.spacing(0, 2),
        [theme.breakpoints.down('md')]: {
            margin: '4px 0',
        }
    },
    iconTextItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.grey[400],
        '& p': {
            margin: theme.spacing(0, 1),
            color: theme.palette.grey[500],
        }
    }
}));

interface ItemInfoProps {
    type: 'comment' | 'post',
    isLogin: boolean,
    username: string,
    avatarUrl: string
    created: string,
    id: string,
    likes: number,
    dislikes: number,
    isLiked: -1 | 0 | 1 | undefined,
    viewCount?: number,
    small?: boolean
}

const ItemInfo: React.FC<ItemInfoProps> = ({type, isLogin, username, avatarUrl, created, id, likes, dislikes, isLiked, small, viewCount}) => {
    const classes = useStyles();
    const _isLiked = isLogin ? isLiked : undefined;

    return (
        <div className={classes.postInfo}>
            <div className={classes.postInfoItem}>
                <Avatar
                    variant="rounded"
                    className={small ? `${classes.avatar} ${classes.avatarSmall}` : classes.avatar}
                    src={avatarUrl}
                >
                    { username.charAt(0) }
                </Avatar>
            </div>
            <div className={`${classes.postInfoItem} ${classes.username}`}>
                { username }
            </div>
            <div className={classes.postInfoItem}>
                { getTimeString(created) }
            </div>
            <div className={classes.postInfoItem}>
                <LikeButtons type={type} id={id} likes={likes} dislikes={dislikes} isLiked={_isLiked}/>
            </div>
            {
                viewCount !== undefined &&
                <div className={classes.postInfoItem}>
                    <Tooltip title="Page View" aria-label="Page View">
                        <div className={classes.iconTextItem}>
                            <ChromeReaderModeIcon/>
                            <p>{viewCount}</p>
                        </div>
                    </Tooltip>
                </div>
            }
        </div>
    )
};

export default ItemInfo
