import { SIGN_UP_ACTION_TYPES } from "../actionsType/SignUpActionTypes"

const initialState = {
  loading: false,
  data: null,
  error: ""
}

const SignUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_ACTION_TYPES.API_PENDING:
      return {
        ...state,
        loading: true
      }
    case SIGN_UP_ACTION_TYPES.API_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false
      }
    case SIGN_UP_ACTION_TYPES.API_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    default:
      return state
  }
}

export default SignUpReducer
