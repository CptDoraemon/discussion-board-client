export interface State {
    loginStatus: {
        isLogin: boolean,
        username: string,
        token: {
            access: string,
            refresh: string
        }
    }
}

export const defaultState: State = {
    loginStatus: {
        isLogin: false,
        username: '',
        token: {
            access: '',
            refresh: ''
        }
    }
};