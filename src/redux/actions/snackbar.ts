import {ThunkDispatch} from "redux-thunk";
import {State} from "../state";
import {ConfettiActions, openConfetti} from "./confetti";

export enum SnackbarActionTypes {
    'CLOSE_SNACKBAR'='CLOSE_SNACKBAR',
    'OPEN_SNACKBAR'='OPEN_SNACKBAR',
}

export type SnackbarAction = ReturnType<typeof openSnackbar> | ReturnType<typeof closeSnackbar>

export function openSnackbarWithConfetti(message: string) {
    return (dispatch: ThunkDispatch<State, null, ConfettiActions>) => {
        dispatch(openSnackbar(message));
        window.setTimeout(() => dispatch(openConfetti()), 300)
    };
}

export function openSnackbar(message: string) {
    return {
        type: SnackbarActionTypes.OPEN_SNACKBAR as typeof SnackbarActionTypes.OPEN_SNACKBAR,
        message
    }
}

export function closeSnackbar() {
    return {
        type: SnackbarActionTypes.CLOSE_SNACKBAR as typeof SnackbarActionTypes.CLOSE_SNACKBAR,
    }
}
