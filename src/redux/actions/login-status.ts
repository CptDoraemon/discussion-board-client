import {State, defaultState} from "../state";

export enum LoginStatusActionTypes {
    'UPDATE_LOGIN_STATUS'='UPDATE_LOGIN_STATUS',
    'LOGOUT'='LOGOUT',
    'REFRESH_TOKEN'='REFRESH_TOKEN'
}

export type LoginStatusAction = ReturnType<typeof logout> | ReturnType<typeof updateLoginStatus> | ReturnType<typeof refreshToken>

export function logout() {
    return {
        type: LoginStatusActionTypes.LOGOUT as typeof LoginStatusActionTypes.LOGOUT,
        newStatus: defaultState.loginStatus
    }
}

export function updateLoginStatus(newStatus: State['loginStatus']) {
    return {
        type: LoginStatusActionTypes.UPDATE_LOGIN_STATUS as typeof LoginStatusActionTypes.UPDATE_LOGIN_STATUS,
        newStatus
    }
}

export function refreshToken(newAccessToken: State['loginStatus']['token']['access']) {
    return {
        type: LoginStatusActionTypes.REFRESH_TOKEN as typeof LoginStatusActionTypes.REFRESH_TOKEN,
        newAccessToken
    }
}