import React from "react";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));

export interface PostDetailData {

}

interface CommentListProps {

}

const CommentList: React.FC<CommentListProps> = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            comments
        </div>
    )

};

export default CommentList