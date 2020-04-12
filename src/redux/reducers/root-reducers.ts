import {combineReducers} from "redux";
import loginStatus from "./login-status";
import snackbar from "./snakbar";

const rootReducers = combineReducers({
    loginStatus,
    snackbar
});

export default rootReducers;