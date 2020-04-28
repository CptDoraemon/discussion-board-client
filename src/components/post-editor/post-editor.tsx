import React, {FormEvent, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import 'quill/dist/quill.snow.css';
import {FormControl, FormHelperText, Input, InputLabel, Paper} from "@material-ui/core";
import useInputField from "../../utils/use-input-field";
import {postTitleValidator} from "../../utils/validators";
import {GenericClickButton} from "../commons/generic-button";
import usePostSubmission from "../../requests/use-post-submission";
import ErrorMessage from "../commons/error-message";
import useEditor from "./use-editor";
import useGetPostDetail from "../../requests/use-get-post-detail";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

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
    const [needData, setNeedData] = useState(true);
    const [postDetailLoading, postDetailError, postDetailData, fetchPostDetail] = useGetPostDetail();

    useEffect(() => {
        if (postID === undefined) {
            setNeedData(false)
        } else {
            fetchPostDetail(parseInt(postID))
        }
    }, []);

    const showEditor = !needData || postDetailData !== null;

    return (
        <Paper className={classes.root} elevation={0}>
            {
                !showEditor &&
                    <Box width={"100%"} height={500} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
                        {
                            postDetailError ?
                                "Cannot retrieve post data at the moment" :
                                <CircularProgress color="primary" />
                        }
                    </Box>
            }
            {
                !needData &&
                    <PostEditorForm />
            }
            {
                postDetailData !== null &&
                    <PostEditorForm
                        updatePost={{
                            title: postDetailData.title,
                            content: postDetailData.content,
                            postID: parseInt(postDetailData.id)
                        }}
                    />
            }
        </Paper>
    )
};

interface PostEditorFormProps {
    updatePost?: {
        title: string,
        content: string,
        postID: number
    }
}

const PostEditorForm: React.FC<PostEditorFormProps> = ({updatePost}) => {
    // create new post if updatePost === undefined
    // else update existing post
    const classes = useStyles();

    const [editor, getObjectURLArray, setContent] = useEditor(ID);
    const [title, titleChangeHandler, titleError, titleErrorMessage, validateTitle] = useInputField(updatePost === undefined ? "" : updatePost.title, postTitleValidator);
    const [loading, error, errorMessage, submit, submitted] = usePostSubmission();

    useEffect(() => {
        if (!editor || updatePost === undefined) return;
        setContent(updatePost.content)
    }, [editor, updatePost]);

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        if (!validateTitle()) return;

        if (!editor) return;
        if (updatePost === undefined) {
            submit(title, editor.root.innerHTML, getObjectURLArray())
        } else {
            submit(title, editor.root.innerHTML, getObjectURLArray(), updatePost.postID)
        }
    };

    return (
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
            <GenericClickButton onClick={submitHandler} width={'250px'} text={submitted ? 'Submitted' : 'Submit'} disabled={submitted || loading}/>
            <ErrorMessage loading={loading} error={error} errorMessage={errorMessage}/>
        </form>
    )
};

export default PostEditor