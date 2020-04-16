import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ItemInfo from "./item-info";
import {SubCommentData} from "./comment-item";


const useStyles = makeStyles((theme) => ({
    root: {
        // margin: theme.spacing(2, 0),
        width: '100%',
    },
    content: {
        margin: '32px'
    },
}));

interface SubCommentItemProps {
    data: SubCommentData
}

const SubCommentItem: React.FC<SubCommentItemProps> = ({data}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ItemInfo type={'comment'} username={data.owner.username} avatarUrl={data.owner.avatar_url} created={data.created} id={data.id} likes={data.likes} dislikes={data.dislikes} isLiked={data.isLiked} small/>
            <div className={classes.content}>
                { data.content }
            </div>
        </div>
    )

};

export default SubCommentItem