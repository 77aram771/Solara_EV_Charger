import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import AuthReducer from "./reducer/AuthReducer"

const appReducers = combineReducers({
    AuthReducer,
})

const rootReducer = (state, action) => appReducers(state, action)

const logger = createLogger()

export const store = createStore(rootReducer, applyMiddleware(thunk, logger))
