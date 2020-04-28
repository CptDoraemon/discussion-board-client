import React, {useEffect, useRef} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";
import { useParams } from "react-router-dom";
import useGetPostDetail from "../../requests/use-get-post-detail";
import {Skeleton} from "@material-ui/lab";
import CommentList from "./comment-list";
import ItemInfo from "./item-info";
import {CommentData} from "./comment-item";
import Box from "@material-ui/core/Box";
import useInsertedHTMLStyle from "./inserted-html-style";
import DeleteButton from "../commons/delete-button";
import EditButton from "../commons/edit-button";
import TagChip from "../commons/tag-chip";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        padding: theme.spacing(4)
    },
    loading: {
        width: '100%',
        height: '500px'
    },
    center: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

export interface PostDetailData {
    id: string,
    owner: {
        email: string,
        username: string,
        avatar_url: string
    }
    likes: number,
    dislikes: number,
    comments: number,
    comments_data: CommentData[]
    title: string,
    content: string,
    created: string,
    tag: string,
    is_liked: 0 | 1 | -1 | undefined,
    is_owner?: boolean
}

interface PostDetailProps {
    isLogin: boolean
}

const PostDetail: React.FC<PostDetailProps> = ({isLogin}) => {
    const classes = useStyles();
    const insertedHTMLClasses = useInsertedHTMLStyle();
    const HTMLStringContainerRef = useRef<HTMLDivElement>(null);

    const { postID } = useParams();
    const [loading, error, data, fetchPostDetail] = useGetPostDetail();
    useEffect(() => {
        fetchPostDetail(parseInt(postID || '1'))
    }, []);

    let content;
    if (loading) {
        content = (
            <div className={classes.loading}>
                <Skeleton variant="rect" width={'100%'} height={60} />
                { (new Array(10)).fill(0).map((_, i) => <Skeleton variant="text" width={'100%'} key={i}/>)}
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
                        username={data.owner.username}
                        avatarUrl={data.owner.avatar_url}
                        created={data.created}
                        id={data.id}
                        likes={data.likes}
                        dislikes={data.dislikes}
                        isLiked={data.is_liked}
                    />
                    <Box className={classes.center} my={2}>
                        {
                            data.is_owner &&
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