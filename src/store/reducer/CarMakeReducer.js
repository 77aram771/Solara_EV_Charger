import { CAR_MAKE_ACTION_TYPES } from "../actionsType/CarMakeActionTypes"

const initialState = {
  loading: false,
  data: null,
  error: ""
}

const CarMakeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CAR_MAKE_ACTION_TYPES.API_PENDING:
      return {
        ...state,
        loading: true
      }
    case CAR_MAKE_ACTION_TYPES.API_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false
      }
    case CAR_MAKE_ACTION_TYPES.API_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    default:
      return state
  }
}

export default CarMakeReducer
