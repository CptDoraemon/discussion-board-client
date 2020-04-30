import {useEffect} from "react";
import urls from "./urls";
import {PostData} from "../components/post-list/post";
import useProtectedGet from "./common/use-protected-get";

const useGetPostList = (tag: string | null) => {
    const url = tag === null ?
        urls.getPostList :
        urls.getPostListWithTag(tag);

    const {
        loading,
        error,
        data,
        doGet
    } = useProtectedGet<PostData[]>(url, false, false);

    useEffect(() => {
        doGet(url, false)
    }, [tag]);

    return [loading, error, data] as [typeof loading, typeof error, typeof data]
};

export default useGetPostList