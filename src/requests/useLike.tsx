import useGetAuthorizationHeader from "./useGetAuthorizationHeader";
import useVerifyToken from "./useVerifyToken";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";
import urls from "./urls";
import {openSnackbar} from "../redux/actions/snackbar";
import {PostData} from "../components/post-list/post";

type Type = 'post' | 'comment';
type Action = 1 | 0 | -1;

const useLike = (type: Type, id: string) => {
    const accessHeader = useGetAuthorizationHeader();
    const validateToken = useVerifyToken();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [updatedData, setUpdatedData] = useState<PostData | null>(null);
    const dispatch = useDispatch();
    let history = useHistory();
    let location = useLocation();

    const like = async (
        action: Action
    ) => {
        try {
            if (loading) return;

            // reset states
            setError(false);
            setLoading(true);

            // redirect to login if token not valid
            const isTokenValid = await validateToken();
            if (!isTokenValid) {
                setLoading(false);
                history.push("/login");
                return
            }

            //
            const res = await fetch(urls.like, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...accessHeader
                },
                body: JSON.stringify({
                    "target_type": type,
                    "target_id": id,
                    action
                })
            });
            const json = await res.json();
            setLoading(false);
            if (json.status === 'success') {
                console.log(json);
                setUpdatedData(json.data)
            } else {
                dispatch(openSnackbar(json.message));
                setError(true)
            }
        } catch (e) {
            console.log(e);
            setLoading(false);
            setError(true);
            dispatch(openSnackbar('Server is not available please try again later'));
        }
    };

    return [loading, error, updatedData, like] as [typeof loading, typeof error, typeof updatedData, typeof like]
};

export default useLike