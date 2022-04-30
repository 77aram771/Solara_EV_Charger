import { FORGOT_PASSWORD_ACTION_TYPES } from "../actionsType/ForgotPasswordActionTypes"

const initialState = {
  loading: false,
  data: null,
  error: ""
}

const ForgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_ACTION_TYPES.API_PENDING:
      return {
        ...state,
        loading: true
      }
    case FORGOT_PASSWORD_ACTION_TYPES.API_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false
      }
    case FORGOT_PASSWORD_ACTION_TYPES.API_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    default:
      return state
  }
}

export default ForgotPasswordReducer
