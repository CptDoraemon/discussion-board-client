import {useState} from "react";
import urls from "./urls";
import useGetAuthorizationHeader from "./use-get-authorization-header";
import useVerifyToken from "./use-verify-token";
import useRedirectToLogin from "../utils/use-redirect-to-login";
import useReload from "../utils/use-reload";

const useCommentSubmission = () => {
    const accessHeader = useGetAuthorizationHeader();
    const validateToken = useVerifyToken();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const redirectToLogin = useRedirectToLogin();
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

            // redirect to login if token not valid
            const isTokenValid = await validateToken();
            if (!isTokenValid) {
                setLoading(false);
                redirectToLogin();
                return
            }

            //
            const res = await fetch(urls.createComment, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...accessHeader
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