import {useEffect, useState} from "react";
import urls from "./urls";
import {PostData} from "../components/post-list/post";
import {useStore} from "react-redux";
import {State} from "../redux/state";
import useGetAuthorizationHeader from "./use-get-authorization-header";
import useVerifyToken from "./use-verify-token";

const useGetPostList = () => {
    const isLogin = useStore<State>().getState().loginStatus.isLogin;
    const accessHeader = useGetAuthorizationHeader();
    const validateToken = useVerifyToken();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState<PostData[] | null>(null);

    useEffect(() => {
        fetchPostList()
    }, [isLogin]);

    const fetchPostList = async (
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
            const res = await fetch(urls.getPostList, {
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

export default useGetPostList