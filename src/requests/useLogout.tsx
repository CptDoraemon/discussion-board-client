import {useState} from "react";
import { useDispatch } from 'react-redux'
import {logout as logoutAction} from "../redux/actions/login-status";
import {openSnackbar} from "../redux/actions/snackbar";
import useRedirectBack from "../utils/use-redirect-back";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const goBack = useRedirectBack();

    const clientSideLogout = () => {
        dispatch(logoutAction());
        goBack();

        dispatch(openSnackbar('Logout succeeded'))
    };

    const logout = () => {
        clientSideLogout()
    };

    return [loading, error, errorMessage, logout] as [boolean, boolean, string, typeof logout]

};

export default useLogout