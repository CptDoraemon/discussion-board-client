import {defaultState, State} from "../state";
import {LoginStatusAction, LoginStatusActionTypes} from "../actions/login-status";


function loginStatus(
    state = defaultState.loginStatus,
    action: LoginStatusAction
) {
    switch (action.type) {
        case LoginStatusActionTypes.UPDATE_LOGIN_STATUS:
            return action.newStatus;
        case LoginStatusActionTypes.LOGOUT:
            return action.newStatus;
        default:
            return state
    }
}

export default loginStatus;