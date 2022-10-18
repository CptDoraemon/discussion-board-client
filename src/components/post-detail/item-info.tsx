import Avatar from "@material-ui/core/Avatar";
import getTimeString from "../../utils/get-time-string";
import LikeButtons from "../commons/like-buttons";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import {Grid, Tooltip, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.grey[500],
        fontWeight: 700,
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
    edited?: string,
    id: string,
    likes: number,
    dislikes: number,
    isLiked: -1 | 0 | 1 | undefined,
    viewCount?: number,
    small?: boolean
}

const ItemInfo: React.FC<ItemInfoProps> = ({type, isLogin, username, avatarUrl, created, edited, id, likes, dislikes, isLiked, small, viewCount}) => {
    const classes = useStyles();
    const _isLiked = isLogin ? isLiked : undefined;

    return (
      <Grid container spacing={4} className={classes.root} alignItems={'center'}>
          <Grid item>

              <Grid container alignItems={'center'} spacing={2}>
                  <Grid item>
                      <Avatar
                        variant="rounded"
                        className={small ? `${classes.avatar} ${classes.avatarSmall}` : classes.avatar}
                        src={avatarUrl}
                      >
                          { username.charAt(0) }
                      </Avatar>
                  </Grid>
                  <Grid item>
                      <span className={classes.username}>{ username }</span>
                  </Grid>
              </Grid>

          </Grid>

          <Grid item>
              <LikeButtons type={type} id={id} likes={likes} dislikes={dislikes} isLiked={_isLiked}/>
          </Grid>

          {
              viewCount !== undefined &&
                <Grid item>
                    <Tooltip title="Page View" aria-label="Page View">
                        <div className={classes.iconTextItem}>
                            <ChromeReaderModeIcon/>
                            <p>{viewCount}</p>
                        </div>
                    </Tooltip>
                </Grid>
          }

            <Grid item xs={12}>
                <Grid container spacing={2} alignItems={'center'} className={classes.root}>
                    <Grid item xs={12}>
                        Created: { getTimeString(created) }
                    </Grid>

                    {
                      edited !== undefined && getTimeString(created) !== getTimeString(edited) &&
                      <Grid item xs={12}>
                          Edited: { getTimeString(edited) }
                      </Grid>
                    }
                </Grid>
            </Grid>
      </Grid>
    )
};

export default ItemInfo
