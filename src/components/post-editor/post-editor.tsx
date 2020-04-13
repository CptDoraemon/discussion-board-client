import React, {FormEvent, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Quill from 'quill'
import {makeStyles} from "@material-ui/core/styles";
import 'quill/dist/quill.snow.css';
import {FormControl, FormHelperText, Input, InputLabel, Paper} from "@material-ui/core";
import useInputField from "../../utils/use-input-field";
import {postTitleValidator} from "../../utils/validators";
import {GenericClickButton} from "../commons/generic-button";
import usePostSubmission from "../../requests/usePostSubmission";
import ErrorMessage from "../commons/error-message";

const ID = 'editor';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: theme.spacing(2)
    },
    editor: {
        width: '100%',
        minHeight: '300px',
        marginBottom: '16px',
    },
    title: {
        width: '100%',
    }
}));

const PostEditor: React.FC = () => {
    const classes = useStyles();
    const {postID} = useParams();

    const [quill, setQuill] = useState<any>(null);
    const [title, titleChangeHandler, titleError, titleErrorMessage, validateTitle] = useInputField('', postTitleValidator);
    const [loading, error, errorMessage, submit, submitted] = usePostSubmission();

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        if (!validateTitle()) return;

        submit(title, quill.root.innerHTML)
    };

    useEffect(() => {
        const quillInstance = new Quill(`#${ID}`, {
            modules: {
                toolbar: [
                    [{header: [1, 2, false]}],
                    ['bold', 'italic', 'underline'],
                    ['image', 'code-block']
                ]
            },
            placeholder: 'Compose an epic...',
            theme: 'snow'  // or 'bubble'
        });

        setQuill(quillInstance)
    }, []);

    return (
        <Paper className={classes.root} elevation={0}>

            <form>
                <FormControl className={classes.title}>
                    <InputLabel htmlFor="post-editor-title">Title</InputLabel>
                    <Input
                        id="post-editor-title"
                        aria-describedby="post-editor-title-helper-text"
                        value={title}
                        onChange={titleChangeHandler}
                    />
                    <FormHelperText id="post-editor-title-helper-text" error={titleError}>{titleError && titleErrorMessage ? titleErrorMessage : ' '}</FormHelperText>
                </FormControl>

                <div id={ID} className={classes.editor}/>
                <GenericClickButton onClick={submitHandler} width={'250px'} text={submitted ? 'Submitted' : 'Submit'} disabled={submitted}/>
                <ErrorMessage loading={loading} error={error} errorMessage={errorMessage}/>
            </form>
        </Paper>
    )
};

export default PostEditor