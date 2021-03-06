import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Divider, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CommentInput from "./comment-input";
import CommentItem, {CommentData} from "./comment-item";
import ThemeLink from "../commons/theme-link";


const useStyles = makeStyles((theme) => ({
    root: {
        margin: '60px 0',
        width: '100%',
    },
    paper: {
        width: '100%',
        padding: theme.spacing(4)
    },
    loginToLeaveMessage: {
        width: '100%',
        height: '200px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        color: theme.palette.grey[600]
    }
}));

interface CommentListProps {
    isLogin: boolean,
    comments: number,
    postID: string,
    data: CommentData[]
}

const CommentList: React.FC<CommentListProps> = ({isLogin, comments, postID, data}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={0}>
                <Typography variant={'body1'} component={'div'}>
                    <Box fontWeight={700}>
                        { `${comments} ${comments > 1 ? 'comments' : 'comment'}` }
                    </Box>
                </Typography>
                <Divider />
            </Paper>

                {
                    data.map((itemData, i) => <CommentItem data={itemData} postID={postID} key={i} isLogin={isLogin}/>)
                }

            <Paper className={classes.paper} elevation={0}>
                {
                    isLogin ?
                        <CommentInput parentPost={postID} parentComment={null}/> :
                        <div className={classes.loginToLeaveMessage}>
                            <span>
                                <ThemeLink text={'Login'} to={'/login'} fromState/>
                                {` to leave a comment`}
                            </span>
                        </div>
                }
            </Paper>
        </div>
    )

};

export default CommentList