import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducers from "./reducers/root-reducers";
import {defaultState} from "./state";
// import rootReducers from "./reducers/root-reducers";

// import { createLogger } from 'redux-logger'
// const loggerMiddleware = createLogger();


export default function configureStore() {
    return createStore(
        rootReducers,
        defaultState,
        // applyMiddleware(thunkMiddleware)
        // applyMiddleware(thunkMiddleware, loggerMiddleware)
    )
}