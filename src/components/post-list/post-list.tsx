import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({

}));

interface PostListProps {

}

const PostList: React.FC<PostListProps> = () => {
    const classes = useStyles();

    return (
        <div>
            post list
        </div>
    )
};

export default PostList