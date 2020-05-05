import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducers from "./reducers/root-reducers";
import {defaultState} from "./state";

import { createLogger } from 'redux-logger'
const loggerMiddleware = createLogger();


export default function configureStore() {
    if (process.env.DEBUG === 'true') {
        return createStore(
            rootReducers,
            defaultState,
            applyMiddleware(thunkMiddleware, loggerMiddleware)
        )
    } else {
        return createStore(
            rootReducers,
            defaultState,
            applyMiddleware(thunkMiddleware)
        )
    }
}