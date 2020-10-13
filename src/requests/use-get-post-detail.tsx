import urls from "./urls";
import {PostDetailData} from "../components/post-detail/post-detail";
import useSetTitle from "../utils/use-set-title";
import useProtectedGet from "./common/use-protected-get";
import {useMemo} from "react";

const useGetPostDetail = () => {
    const {
        loading,
        error,
        data,
        doGet,
    } = useProtectedGet<PostDetailData>('', false, false);

    useSetTitle(data?.title);

    const fetchPostDetail = useMemo(() => {
        return (
          postID: number
        ) => {
            doGet(urls.getPostDetail(postID), false);
        };
    }, []);

    return [loading, error, data, fetchPostDetail] as [typeof loading, typeof error, typeof data, typeof fetchPostDetail]

};

export default useGetPostDetail
