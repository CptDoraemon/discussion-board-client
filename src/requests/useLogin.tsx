import {useState} from "react";
import urls from "./urls";
import {useHistory, useLocation} from "react-router-dom";
import { useDispatch } from 'react-redux'
import { updateLoginStatus } from "../redux/actions/login-status";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    let history = useHistory();
    let location = useLocation();

    const login = (
        email: string,
        password: string
    ) => {
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
                    dispatch(updateLoginStatus({
                        isLogin: true,
                        username: json.data.username,
                        token: {
                            access: json.data.access,
                            refresh: json.data.refresh
                        }
                    }));
                    let { from }: any = location.state || { from: { pathname: "/" } };
                    history.replace(from);
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