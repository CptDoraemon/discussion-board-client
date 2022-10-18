import React, {FormEvent, useEffect, useRef, useState} from "react";
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
import useGetTagList, {TagList} from "../../requests/use-get-tag-list";
import TagSelector from "./tag-selector";
import {useMount} from "react-use/esm";

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        width: '100%',
        padding: theme.spacing(2),
        '& .ql-toolbar': {
            position: 'sticky',
            top: 88,
            backgroundColor: '#fff',
            zIndex: 1
        }
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
    const [tagListLoading, tagListError, tagList] = useGetTagList();

    useMount(() => {
        if (postID === undefined) {
            setNeedData(false)
        } else {
            fetchPostDetail(parseInt(postID))
        }
    });
    const showEditor = (!needData || postDetailData !== null) && tagList !== null;

    return (
        <Paper className={classes.root} elevation={0}>
            {
                !showEditor &&
                    <Box width={"100%"} height={500} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
                        {
                            postDetailError || tagListError ?
                                "Cannot retrieve post data at the moment" :
                                <CircularProgress color="primary" />
                        }
                    </Box>
            }
            {
                !needData && showEditor &&
                    <PostEditorForm tagList={tagList || []}/>
            }
            {
                postDetailData !== null && showEditor &&
                    <PostEditorForm
                        tagList={tagList || []}
                        updatePost={{
                            title: postDetailData.title,
                            content: postDetailData.content,
                            postID: parseInt(postDetailData.id),
                            tag: postDetailData.tag
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
        postID: number,
        tag: string
    },
    tagList: TagList
}

const ID = 'editor';
const PostEditorForm: React.FC<PostEditorFormProps> = ({updatePost, tagList}) => {
    // create new post if updatePost === undefined
    // else update existing post
    const classes = useStyles();

    const defaultTitle = updatePost === undefined ? "" : updatePost.title;
    const defaultTag = updatePost === undefined ? tagList[0].tag : updatePost.tag;
    const [editor, getObjectURLArray, setContent] = useEditor(ID);
    const [title, titleChangeHandler, titleError, titleErrorMessage, validateTitle] = useInputField(defaultTitle, postTitleValidator);
    const [tag, setTag] = useState<string>(defaultTag);
    const [loading, error, errorMessage, submit, submitted] = usePostSubmission();

    const isEditorHydrated = useRef(false);
    useEffect(() => {
        if (!editor || updatePost === undefined) return;
        if (isEditorHydrated.current) return;
        setContent(updatePost.content);
        isEditorHydrated!.current = true;
    }, [editor, setContent, updatePost]);

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        if (!validateTitle()) return;

        if (!editor) return;
        if (updatePost === undefined) {
            submit(title, tag, editor.root.innerHTML, getObjectURLArray())
        } else {
            submit(title, tag, editor.root.innerHTML, getObjectURLArray(), updatePost.postID)
        }
    };

    const tagChangeHandler = (e: any) => {
        setTag(e.target.value)
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

            <Box mb={2}>
                {'Tag: '}
                <TagSelector tagList={tagList} tagValue={tag} tagChangeHandler={tagChangeHandler}/>
            </Box>

            <div id={ID} className={classes.editor}/>
            <GenericClickButton onClick={submitHandler} width={'250px'} text={submitted ? 'Submitted' : 'Submit'} disabled={submitted || loading}/>
            <Box mt={1}>
                <ErrorMessage loading={loading} error={error} errorMessage={errorMessage} spinnerSize={25}/>
            </Box>
        </form>
    )
};

export default PostEditor
