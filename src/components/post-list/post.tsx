import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import useGetPostList from "../../requests/useGetPostList";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(10, 0)
    }
}));

interface PostProps {

}

const Post: React.FC<PostProps> = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            post
        </div>
    )
};

export default Post