import {useStore} from "react-redux";
import {State} from "../redux/state";

const useGetAuthorizationHeader = () => {
    const state = useStore<State>().getState();
    const accessToken = state.loginStatus.token.access;

    const accessHeader = {
        'Authorization': `Bearer ${accessToken}`
    };

    return accessHeader
};

export default useGetAuthorizationHeader