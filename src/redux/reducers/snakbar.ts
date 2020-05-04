import {defaultState, State} from "../state";
import {SnackbarAction, SnackbarActionTypes} from "../actions/snackbar";


function snackbar (
    state = defaultState.snackbar,
    action: SnackbarAction
): State['snackbar'] {
    switch (action.type) {
        case SnackbarActionTypes.OPEN_SNACKBAR:
            return {
                open: true,
                message: action.message
            };
        case SnackbarActionTypes.CLOSE_SNACKBAR:
            return defaultState.snackbar;
        default:
            return state
    }
}

export default snackbar;