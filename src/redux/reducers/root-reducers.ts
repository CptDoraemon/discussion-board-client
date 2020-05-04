import {combineReducers} from "redux";
import loginStatus from "./login-status";
import snackbar from "./snakbar";
import confetti from "./confetti";

const rootReducers = combineReducers({
    loginStatus,
    snackbar,
    confetti
});

export default rootReducers;