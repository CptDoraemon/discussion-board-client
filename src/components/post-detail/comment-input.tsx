import {FormControl, FormHelperText, Input, InputLabel, TextField} from "@material-ui/core";
import {GenericClickButton} from "../commons/generic-button";
import ErrorMessage from "../commons/error-message";
import React, {FormEvent} from "react";
import useInputField from "../../utils/use-input-field";
import {commentValidator} from "../../utils/validators";
import {makeStyles} from "@material-ui/core/styles";
import useCommentSubmission from "../../requests/useCommentSubmission";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: '16px 0'
    },
    input: {
        width: '100%',
    }
}));

interface CommentInputProps {
    parentPost: string,
    parentComment: string | null
}

const CommentInput: React.FC<CommentInputProps> = ({parentPost, parentComment}) => {
    const classes = useStyles();
    const [comment, commentChangeHandler, commentError, commentErrorMessage, validateComment] = useInputField('', commentValidator);
    const [loading, error, errorMessage, submit] = useCommentSubmission();

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();

        if (!validateComment()) return;
        submit(comment, parentPost, parentComment)
    };

    return (
        <form className={classes.root}>
            <TextField
                id="comment-input"
                label="Leave comment"
                name="comment"
                value={comment}
                onChange={commentChangeHandler}
                error={commentError}
                helperText={commentError && commentErrorMessage ? commentErrorMessage : ' '}
                variant="outlined"
                className={classes.input}
            />

            <GenericClickButton onClick={submitHandler} width={'250px'} text={'Submit'} disabled={loading}/>
            <ErrorMessage loading={loading} error={error} errorMessage={errorMessage}/>
        </form>
    )
};

export default CommentInput