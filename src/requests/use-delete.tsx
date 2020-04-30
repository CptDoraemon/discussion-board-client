import {useState} from "react";
import {useDispatch} from "react-redux";
import urls from "./urls";
import {openSnackbar} from "../redux/actions/snackbar";
import useFetchWithTokenVerification from "./common/use-fetch-with-token-verification";
import {useHistory} from "react-router-dom";

const useDelete = () => {
    const fetchWithTokenVerification = useFetchWithTokenVerification();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    let history = useHistory();

    const deletePost = async (
        id: number
    ) => {
        try {
            if (loading) return;

            // reset states
            setError(false);
            setLoading(true);

            //
            const res = await fetchWithTokenVerification(true, urls.deletePost(id), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await res.json();
            setLoading(false);
            if (json.status === 'success') {
                history.replace('/');
                dispatch(openSnackbar('Post deleted'));
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

    return [loading, error, deletePost] as [typeof loading, typeof error, typeof deletePost]
};

export default useDelete