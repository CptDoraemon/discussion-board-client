import {useState} from "react";
import urls from "./urls";
import { useDispatch } from 'react-redux'
import { updateLoginStatus } from "../redux/actions/login-status";
import {openSnackbarWithConfetti} from "../redux/actions/snackbar";
import useRedirectBack from "../utils/redirects/use-redirect-back";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const goBack = useRedirectBack();

    const login = (
        email: string,
        password: string
    ) => {
        if (loading) return;

        // reset states
        setError(false);
        setErrorMessage('');

        // start fetching
        setLoading(true);
        fetch(urls.login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then((res) => res.json())
            .then(json => {
                setLoading(false);

                if (json.status === 'success') {
                    const username = json.data.username;
                    dispatch(updateLoginStatus({
                        isLogin: true,
                        username: username,
                        token: {
                            access: json.data.access,
                            refresh: json.data.refresh
                        }
                    }));
                    goBack();
                    dispatch(openSnackbarWithConfetti(`Welcome back ${username}`));
                } else {
                    setError(true);
                    if (json.status === 'error') {
                        setErrorMessage(json.message)
                    } else {
                        setErrorMessage('Server unavailable, please try again later.')
                    }
                }
            })
            .catch(e => {
                setLoading(false);

                setError(true);
                setErrorMessage('Server unavailable, please try again later.')
            });
    };

    return [loading, error, errorMessage, login] as [boolean, boolean, string, typeof login]

};

export default useLogin