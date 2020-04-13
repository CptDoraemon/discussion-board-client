import {useEffect, useState} from "react";
import urls from "./urls";
import {useStore} from "react-redux";
import {State} from "../redux/state";
import useGetAuthorizationHeader from "./useGetAuthorizationHeader";
import useVerifyToken from "./useVerifyToken";
import {PostDetailData} from "../components/post-detail/post-detail";

const useGetPostDetail = (postID: number) => {
    const isLogin = useStore<State>().getState().loginStatus.isLogin;
    const accessHeader = useGetAuthorizationHeader();
    const validateToken = useVerifyToken();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState<PostDetailData | null>(null);

    useEffect(() => {
        fetchPostDetail()
    }, [isLogin, postID]);

    const fetchPostDetail = async (
    ) => {
        try {
            if (loading) return;

            // reset states
            setError(false);

            // validate token if logged in
            let hasValidToken = false;
            if (isLogin) {
                hasValidToken  = await validateToken()
            }

            // start fetching
            setLoading(true);
            const res = await fetch(urls.getPostDetail(postID), {
                method: 'GET',
                headers: hasValidToken ? {...accessHeader} : {}
            });
            const json = await res.json();
            setLoading(false);
            console.log(json);

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