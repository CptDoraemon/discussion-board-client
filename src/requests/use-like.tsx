import {useState} from "react";
import {useDispatch} from "react-redux";
import urls from "./urls";
import {openSnackbar} from "../redux/actions/snackbar";
import {PostData} from "../components/post-list/post";
import useFetchWithTokenVerification from "./use-fetch-with-token-verification";

type Type = 'post' | 'comment';
type Action = 1 | 0 | -1;

const useLike = (type: Type, id: string) => {
    const fetchWithTokenVerification = useFetchWithTokenVerification();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [updatedData, setUpdatedData] = useState<PostData | null>(null);
    const dispatch = useDispatch();

    const like = async (
        action: Action
    ) => {
        try {
            if (loading) return;

            // reset states
            setError(false);
            setLoading(true);

            //
            const res = await fetchWithTokenVerification(true, urls.like, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': '123123'
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