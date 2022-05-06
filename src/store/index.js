import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
// import { createLogger } from "redux-logger"
import AuthReducer from "./reducer/AuthReducer"
import ForgotPasswordReducer from "./reducer/ForgotPasswordReducer"
import CarMakeReducer from "./reducer/CarMakeReducer"
import CarModalReducer from "./reducer/CarModalReducer"
import SignUpReducer from "./reducer/SignUpReducer"
import ConfirmCodeReducer from "./reducer/ConfirmCodeReducer"
import ChargeBoxesDataReducer from "./reducer/ChargeBoxesDataReducer"

const appReducers = combineReducers({
  AuthReducer,
  ForgotPasswordReducer,
  CarMakeReducer,
  CarModalReducer,
  SignUpReducer,
  ConfirmCodeReducer,
  ChargeBoxesDataReducer
})

const rootReducer = (state, action) => appReducers(state, action)

// const logger = createLogger()

export const store = createStore(rootReducer, applyMiddleware(thunk))
