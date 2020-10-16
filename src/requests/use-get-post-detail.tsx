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
    tag: string,
    is_liked: 0 | 1 | -1 | undefined,
    is_owner?: boolean,
    view_count: number
}

const useGetPostDetail = () => {
    const {
        loading,
        error,
        data,
        doGet,
    } = useProtectedGet<PostDetailData>('', false, false);

    useSetTitle(data?.title);

    const fetchPostDetail = (postID: number) => {
        doGet(urls.getPostDetail(postID), false);
    };

    return [loading, error, data, fetchPostDetail] as [typeof loading, typeof error, typeof data, typeof fetchPostDetail]

};

export default useGetPostDetail
