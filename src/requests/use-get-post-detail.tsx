import {useState} from "react";
import urls from "./urls";
import {PostDetailData} from "../components/post-detail/post-detail";
import useSetTitle from "../utils/use-set-title";
import useFetchWithTokenVerification from "./use-fetch-with-token-verification";

const useGetPostDetail = () => {
    const fetchWithTokenVerification = useFetchWithTokenVerification();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState<PostDetailData | null>(null);

    useSetTitle(data?.title);

    const fetchPostDetail = async (
        postID: number
    ) => {
        try {
            if (loading) return;

            // reset states
            setError(false);

            // start fetching
            setLoading(true);
            const res = await fetchWithTokenVerification(false, urls.getPostDetail(postID), {
                method: 'GET',
            });
            const json = await res.json();
            setLoading(false);

            if (json.status === 'success') {
                console.log(json.data);
                setData(json.data)
            } else {
                console.log(json);
                setError(true);
            }
        } catch (e) {
            setLoading(false);
            console.log(e);
            setError(true);
        }
    };

    return [loading, error, data, fetchPostDetail] as [typeof loading, typeof error, typeof data, typeof fetchPostDetail]

};

export default useGetPostDetail