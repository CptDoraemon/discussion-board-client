import {defaultState, State} from "../state";
import {ConfettiActions, ConfettiActionTypes} from "../actions/confetti";


function confetti (
    state = defaultState.confetti,
    action: ConfettiActions
): State['confetti'] {
    switch (action.type) {
        case ConfettiActionTypes.OPEN_CONFETTI:
            return true;
        case ConfettiActionTypes.CLOSE_CONFETTI:
            return false;
        default:
            return state
    }
}

export default confetti;