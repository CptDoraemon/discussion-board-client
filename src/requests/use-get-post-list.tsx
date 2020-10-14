import {useEffect} from "react";
import urls from "./urls";
import useProtectedGet from "./common/use-protected-get";

export interface PostListPost {
    id: string
    title: string,
    content: string,
    likes: number,
    dislikes: number,
    created: string,
    comments: number
    owner: {
        email: string,
        username: string,
        avatar_url: string
    },
    tag: string,
    "is_liked"?: 0 | 1 | -1,
    view_count: number
}

export interface PostListData {
    posts: PostListPost[],
    total_pages: number
    current_page: number
}


const useGetPostList = ({tag, page}: {tag: string | null, page: string}) => {
    const url = urls.getPostList({tag, page});

    const {
        loading,
        error,
        data,
        doGet
    } = useProtectedGet<PostListData>(url, false, false);

    useEffect(() => {
        doGet(url, false)
    }, [tag, page]);

    return [loading, error, data] as [typeof loading, typeof error, typeof data]
};

export default useGetPostList
