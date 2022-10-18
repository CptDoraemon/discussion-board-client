import React, {useRef} from "react";
import {useMount} from 'react-use';
import {makeStyles} from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";
import { useParams } from "react-router-dom";
import useGetPostDetail from "../../requests/use-get-post-detail";
import {Skeleton} from "@material-ui/lab";
import CommentList from "./comment-list";
import ItemInfo from "./item-info";
import Box from "@material-ui/core/Box";
import useInsertedHTMLStyle from "./inserted-html-style";
import DeleteButton from "../commons/delete-button";
import EditButton from "../commons/edit-button";
import TagChip from "../commons/tag-chip/tag-chip";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: theme.spacing(1, 0, 0, 0)
    },
    paper: {
        width: '100%',
        padding: theme.spacing(4)
    },
    loading: {
        width: '100%',
        height: '500px',
    },
    center: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

interface PostDetailProps {
    isLogin: boolean
}

const PostDetail: React.FC<PostDetailProps> = ({isLogin}) => {
    const classes = useStyles();
    const insertedHTMLClasses = useInsertedHTMLStyle();
    const HTMLStringContainerRef = useRef<HTMLDivElement>(null);

    const { postID } = useParams();
    const [loading, error, data, fetchPostDetail] = useGetPostDetail();
    useMount(() => {
        fetchPostDetail(parseInt(postID || '1'))
    });

    let content;
    if (loading) {
        content = (
            <div className={classes.loading}>
                <Skeleton variant="rect" width={'100%'} height={'100%'}/>
            </div>
        )
    } else if (error) {
        content = (
            <Box className={classes.center} height={500}>
                <h1>Server error</h1>
            </Box>
        )
    } else if (data) {
        content = (
            <>
                <Paper className={classes.paper} elevation={0}>
                    <Box width={'100%'}>
                        <TagChip text={data.tag} size={'normal'}/>
                    </Box>
                    <h1> {data.title} </h1>
                    <ItemInfo
                        type={'post'}
                        isLogin={isLogin}
                        username={data.owner.username}
                        avatarUrl={data.owner.avatar_url}
                        created={data.created}
                        id={data.id}
                        likes={data.likes}
                        dislikes={data.dislikes}
                        isLiked={data.is_liked}
                        viewCount={data.view_count}
                        edited={data.edited}
                    />
                    <Box className={classes.center} my={2}>
                        {
                            isLogin && data.is_owner &&
                                <>
                                    <DeleteButton id={parseInt(data.id)}/>
                                    <EditButton id={parseInt(data.id)}/>
                                </>
                        }
                    </Box>
                    <Box width={'100%'} height={'40px'}> </Box>
                    <div dangerouslySetInnerHTML={{__html: data.content}} className={insertedHTMLClasses.root} ref={HTMLStringContainerRef}/>
                </Paper>
                <CommentList comments={data.comments} isLogin={isLogin} postID={data.id} data={data.comments_data}/>
            </>
        )
    }

    return (
        <div className={classes.root}>
            { content }
        </div>
    )

};

export default PostDetail
