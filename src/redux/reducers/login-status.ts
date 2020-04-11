import {defaultState, State} from "../state";
import {LoginStatusAction, LoginStatusActionTypes} from "../actions/login-status";


function loginStatus(
    state = defaultState.loginStatus,
    action: LoginStatusAction
): State['loginStatus'] {
    switch (action.type) {
        case LoginStatusActionTypes.UPDATE_LOGIN_STATUS:
            return action.newStatus;
        case LoginStatusActionTypes.LOGOUT:
            return action.newStatus;
        case LoginStatusActionTypes.REFRESH_TOKEN:
            const newStatus = Object.assign({}, state);
            newStatus.token.access = action.newAccessToken;
            return newStatus;
        default:
            return state
    }
}

export default loginStatus;