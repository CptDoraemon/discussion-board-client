import {useState} from "react";
import { useDispatch } from 'react-redux'
import {logout as logoutAction} from "../redux/actions/login-status";
import {openSnackbar} from "../redux/actions/snackbar";
import useRedirectToHome from "../utils/redirects/use-redirect-to-home";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const toHome = useRedirectToHome();

    const clientSideLogout = () => {
        dispatch(logoutAction());
        toHome();

        dispatch(openSnackbar('Logout succeeded'))
    };

    const logout = () => {
        clientSideLogout()
    };

    return [loading, logout] as [typeof loading, typeof logout]

};

export default useLogout