import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Divider, FormControl, FormHelperText, Input, InputLabel, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import {GenericClickButton} from "../commons/generic-button";
import ErrorMessage from "../commons/error-message";
import CommentInput from "./comment-input";
import CommentItem, {CommentData} from "./comment-item";


const useStyles = makeStyles((theme) => ({
    root: {
        margin: '60px 0',
        width: '100%',
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
            <Typography variant={'body1'} component={'div'}>
                <Box fontWeight={700}>
                    { `${comments} ${comments > 1 ? 'comments' : 'comment'}` }
                </Box>
            </Typography>
            <Divider />

            {
                data.map((itemData, i) => <CommentItem data={itemData} postID={postID} key={i} isLogin={isLogin}/>)
            }

            <div>
                {
                    isLogin ?
                        <CommentInput parentPost={postID} parentComment={null}/> :
                        <div className={classes.loginToLeaveMessage}>
                            Login to leave a comment
                        </div>
                }
            </div>
        </div>
    )

};

export default CommentList