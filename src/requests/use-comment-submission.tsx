import {useState} from "react";
import urls from "./urls";
import useReload from "../utils/use-reload";
import useFetchWithTokenVerification from "./use-fetch-with-token-verification";

const useCommentSubmission = () => {
    const fetchWithTokenVerification = useFetchWithTokenVerification();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const reload = useReload();

    const submit = async (
        content: string,
        parentPost: string,
        parentComment: string | null
    ) => {
        try {
            if (loading) return;

            // reset states
            setError(false);
            setErrorMessage(' ');
            setLoading(true);

            //
            const res = await fetchWithTokenVerification(true, urls.createComment, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'content': content,
                    'parent_post': parentPost,
                    'parent_comment': parentComment
                })
            });
            const json = await res.json();
            setLoading(false);
            if (json.status === 'success') {
                reload()
            } else {
                console.log(json);
                setErrorMessage(json.message);
                setError(true)
            }
        } catch (e) {
            console.log(e);
            setLoading(false);
            setErrorMessage('Server is not available please try again later');
            setError(true)
        }
    };

    return [loading, error, errorMessage, submit] as [typeof loading, typeof error, typeof errorMessage, typeof submit]
};

export default useCommentSubmission