export interface State {
    loginStatus: {
        isLogin: boolean,
        username: string,
        token: {
            access: string,
            refresh: string
        }
    },
    snackbar: {
        open: boolean,
        message: string
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
    },
    snackbar: {
        open: false,
        message: ''
    }
};