import {useEffect, useState} from "react";
import urls from "./urls";
import {PostData} from "../components/post-list/post";
import {useStore} from "react-redux";
import {State} from "../redux/state";
import useFetchWithTokenVerification from "./use-fetch-with-token-verification";

const useGetPostList = (tag: string | null) => {
    const isLogin = useStore<State>().getState().loginStatus.isLogin;
    const fetchWithTokenVerification = useFetchWithTokenVerification();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState<PostData[] | null>(null);

    useEffect(() => {
        fetchPostList(tag)
    }, [isLogin, tag]);

    const fetchPostList = async (
        tag: string | null
    ) => {
        try {
            if (loading) return;

            // reset states
            setError(false);

            // start fetching
            setLoading(true);
            const url = tag === null ?
                urls.getPostList :
                urls.getPostListWithTag(tag);
            const res = await fetchWithTokenVerification(false, url, {
                method: 'GET'
            });
            const json = await res.json();
            setLoading(false);

            if (json.status === 'success') {
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

export default useGetPostList