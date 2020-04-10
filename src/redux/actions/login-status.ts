import {State, defaultState} from "../state";

export enum LoginStatusActionTypes {
    'UPDATE_LOGIN_STATUS'='UPDATE_LOGIN_STATUS',
    'LOGOUT'='LOGOUT'
}

export interface LoginStatusAction {
    type: LoginStatusActionTypes,
    newStatus: State['loginStatus']
}

export function logout() {
    return {
        type: LoginStatusActionTypes.LOGOUT,
        newStatus: defaultState
    }
}

export function updateLoginStatus(newStatus: State['loginStatus']) {
    return {
        type: LoginStatusActionTypes.UPDATE_LOGIN_STATUS,
        newStatus
    }
}