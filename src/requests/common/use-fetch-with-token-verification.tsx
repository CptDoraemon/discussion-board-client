import urls from "../urls";
import {useDispatch, useStore} from 'react-redux'
import { refreshToken as refreshTokenAction } from '../../redux/actions/login-status'
import {State} from "../../redux/state";
import useRedirectToLogin from "../../utils/redirects/use-redirect-to-login";

/**
 * enhanced fetch with JWT token verification, and token refreshing when needed
 * return a promise of actual fetch if token is valid or refreshed successfully
 * if specified by @param redirect, redirect to login page if token is invalid or expired
 * no need to pass Authorization Header in @param options
 */
const useFetchWithTokenVerification = () => {
    const state = useStore<State>().getState();
    const isLogin = state.loginStatus.isLogin;
    const refreshToken = state.loginStatus.token.refresh;
    const dispatch = useDispatch();
    const redirectToLogin = useRedirectToLogin();

    const getAccessHeader = (token?: string) => ({
        'Authorization': `Bearer ${token || state.loginStatus.token.access}`
    });

    const fetchWithTokenVerification = async (redirect: boolean, url: RequestInfo, options: RequestInit): Promise<Response> => {
        try {
            // delete Authorization header in options in case it is provided
            if (options.headers !== undefined) {
                const headers = options.headers as Record<string, string>;
                if (headers['Authorization']) {
                    delete headers['Authorization'];
                    options.headers = {...headers}
                }
            }

            const noAuthenticationHandler = (): Promise<Response> => {
                // don't worry about unsolved promise memory leak
                // https://stackoverflow.com/questions/20068467/does-never-resolved-promise-cause-memory-leak
                if (redirect) {
                    return new Promise((resolve, reject) => {
                        redirectToLogin();
                    });
                } else {
                    return fetch(url, {
                        ...options
                    })
                }
            };

            // not login
            if (!isLogin) {
                return noAuthenticationHandler();
            }

            // verify if access token still valid
            const res = await fetch(urls.verifySession, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAccessHeader()
                }
            });
            const json = await res.json();
            if (json.status === 'success') {
                // access token still valid
                options.headers = {
                    ...options.headers,
                    ...getAccessHeader()
                };
                return fetch(url, {...options})
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
                options.headers = {
                    ...options.headers,
                    ...getAccessHeader(refreshJson.data.access)
                };
                return fetch(url, {...options})
            }

            // refresh failed
            return noAuthenticationHandler();
        } catch (e) {
            console.log(e);
            return new Promise((resolve, reject) => {
                reject(e.messages);
            });
        }
    };

    return fetchWithTokenVerification
};

export default useFetchWithTokenVerification;