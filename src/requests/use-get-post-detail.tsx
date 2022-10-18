import urls from "./urls";
import useSetTitle from "../utils/use-set-title";
import useProtectedGet from "./common/use-protected-get";
import {useMemo} from "react";
import {CommentData} from "../components/post-detail/comment-item";

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
    edited: string,
    tag: string,
    is_liked: 0 | 1 | -1 | undefined,
    is_owner?: boolean,
    view_count: number,
    is_pinned: boolean | undefined
}

const useGetPostDetail = () => {
    const {
        loading,
        error,
        data,
        doGet,
    } = useProtectedGet<PostDetailData>('', false);

    useSetTitle(data?.title);

    const fetchPostDetail = (postID: number) => {
        doGet(urls.getPostDetail(postID), false);
    };

    return [loading, error, data, fetchPostDetail] as [typeof loading, typeof error, typeof data, typeof fetchPostDetail]
};

export default useGetPostDetail
