import {useState} from "react";
import urls from "./urls";
import {useHistory, useLocation} from "react-router-dom";
import { useDispatch } from 'react-redux'
import {logout as logoutAction} from "../redux/actions/login-status";
import {openSnackbar} from "../redux/actions/snackbar";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    let history = useHistory();
    let location = useLocation();

    const clientSideLogout = () => {
        dispatch(logoutAction());
        let { from }: any = location.state || { from: { pathname: "/" } };
        history.replace(from);

        dispatch(openSnackbar('Logout succeeded'))
    };

    const logout = () => {
        clientSideLogout()
    };

    return [loading, error, errorMessage, logout] as [boolean, boolean, string, typeof logout]

};

export default useLogout