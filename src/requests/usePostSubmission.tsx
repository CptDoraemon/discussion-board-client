import {useState} from "react";
import urls from "./urls";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { updateLoginStatus } from "../redux/actions/login-status";
import { openSnackbar } from "../redux/actions/snackbar";
import useGetAuthorizationHeader from "./useGetAuthorizationHeader";
import useVerifyToken from "./useVerifyToken";

const usePostSubmission = () => {
    const accessHeader = useGetAuthorizationHeader();
    const validateToken = useVerifyToken();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    let history = useHistory();
    let location = useLocation();

    const submit = async (
        title: string,
        content: string
    ) => {
        try {
            // reset states
            setError(false);
            setErrorMessage(' ');
            setLoading(true);

            // redirect to login if token not valid
            const isTokenValid = await validateToken();
            if (!isTokenValid) {
                setLoading(false);
                history.push("/login");
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

    return [loading, error, errorMessage, submit] as [typeof loading, typeof error, typeof errorMessage, typeof submit]
};

export default usePostSubmission