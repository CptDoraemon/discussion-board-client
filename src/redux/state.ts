export interface State {
    loginStatus: {
        isLogin: boolean,
        username: string
    }
}

export const defaultState: State = {
    loginStatus: {
        isLogin: false,
        username: ''
    }
};