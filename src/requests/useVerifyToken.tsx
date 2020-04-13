import urls from "./urls";
import {useDispatch, useStore} from 'react-redux'
import useGetAuthorizationHeader from "./useGetAuthorizationHeader";
import { refreshToken as refreshTokenAction } from '../redux/actions/login-status'
import {State} from "../redux/state";

const useVerifyToken = () => {
    const state = useStore<State>().getState();
    const isLogin = state.loginStatus.isLogin;
    const refreshToken = state.loginStatus.token.access;

    const accessHeader = useGetAuthorizationHeader();
    const dispatch = useDispatch();

    const validate = () => {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                // not login
                if (!isLogin) {
                    resolve(false);
                    return
                }

                // verify if access token still valid
                const res = await fetch(urls.verifySession, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                ...accessHeader
                            }
                });
                const json = await res.json();
                if (json.status === 'success') {
                    // access token still valid
                    resolve(true);
                    return
                }

                // access token not valid
                // try refresh
                const refreshRes = await fetch(urls.refresh, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        refresh: refreshToken
                    })
                });
                const refreshJson = await refreshRes.json();
                if (refreshJson.status === 'success') {
                    // refresh successful
                    dispatch(refreshTokenAction(refreshJson.data.access));
                    resolve(true);
                    return
                }

                // refresh failed
                resolve(false);

            } catch (e) {
                console.log(e);
                resolve(false)
            }
        });
    };

    return validate

};

export default useVerifyToken