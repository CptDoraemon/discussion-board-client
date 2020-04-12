import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import Quill from 'quill'
import {makeStyles} from "@material-ui/core/styles";
import 'quill/dist/quill.snow.css';

const ID = 'editor';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    editor: {
        width: '100%',
        height: '300px'
    }
}));

const PostEditor: React.FC = () => {
    const classes = useStyles();
    const {postID} = useParams();

    useEffect(() => {
        const quill = new Quill(`#${ID}`, {
            modules: {
                toolbar: [
                    [{header: [1, 2, false]}],
                    ['bold', 'italic', 'underline'],
                    ['image', 'code-block']
                ]
            },
            placeholder: 'Compose an epic...',
            theme: 'snow'  // or 'bubble'
        })
    }, []);

    return (
        <div className={classes.root}>
            <div id={ID} className={classes.editor}/>
        </div>
    )
};

export default PostEditor