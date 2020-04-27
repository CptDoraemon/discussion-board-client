import {useEffect, useState} from "react";
import urls from "./urls";
import {useStore} from "react-redux";
import {State} from "../redux/state";
import {PostDetailData} from "../components/post-detail/post-detail";
import useSetTitle from "../utils/use-set-title";
import useFetchWithTokenVerification from "./use-fetch-with-token-verification";

const useGetPostDetail = (postID: number) => {
    const isLogin = useStore<State>().getState().loginStatus.isLogin;
    const fetchWithTokenVerification = useFetchWithTokenVerification();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState<PostDetailData | null>(null);

    useSetTitle(data?.title);

    useEffect(() => {
        fetchPostDetail()
    }, [isLogin, postID]);

    const fetchPostDetail = async (
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

    return [loading, error, data] as [typeof loading, typeof error, typeof data]

};

export default useGetPostDetail