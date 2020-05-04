import {ThunkDispatch} from "redux-thunk";
import {State} from "../state";

export enum ConfettiActionTypes {
    'CLOSE_CONFETTI'='CLOSE_CONFETTI',
    'OPEN_CONFETTI'='OPEN_CONFETTI',
}

export type ConfettiActions = ReturnType<typeof openConfetti>

export function openConfetti(): any {
    return (dispatch: ThunkDispatch<State, null, ConfettiActions>) => {
        dispatch(_openConfetti());
        window.setTimeout(() => dispatch(_closeConfetti()), 2000)
    }
}

function _openConfetti() {
    return {
        type: ConfettiActionTypes.OPEN_CONFETTI as typeof ConfettiActionTypes.OPEN_CONFETTI,
    }
}

function _closeConfetti() {
    return {
        type: ConfettiActionTypes.CLOSE_CONFETTI as typeof ConfettiActionTypes.CLOSE_CONFETTI,
    }
}
