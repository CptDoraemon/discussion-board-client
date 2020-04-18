import {useState} from "react";
import urls from "./urls";
import useGetAuthorizationHeader from "./use-get-authorization-header";
import useVerifyToken from "./use-verify-token";
import useRedirectToLogin from "../utils/use-redirect-to-login";

const usePostSubmission = () => {
    const accessHeader = useGetAuthorizationHeader();
    const validateToken = useVerifyToken();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const redirectToLogin = useRedirectToLogin();

    const submit = async (
        title: string,
        content: string
    ) => {
        try {
            if (loading || submitted) return;

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
            const res = await fetch(urls.createPost, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...accessHeader
                },
                body: JSON.stringify({
                    title,
                    content
                })
            });
            const json = await res.json();
            setLoading(false);
            if (json.status === 'success') {
                console.log(json)
                setSubmitted(true)
            } else {
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

    return [loading, error, errorMessage, submit, submitted] as [typeof loading, typeof error, typeof errorMessage, typeof submit, typeof submitted]
};

export default usePostSubmission