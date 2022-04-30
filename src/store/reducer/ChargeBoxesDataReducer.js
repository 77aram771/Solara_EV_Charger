import { CHARGE_BOXES_DATA_ACTION_TYPES } from "../actionsType/ChargeBoxesDataActionTypes"

const initialState = {
  loading: false,
  data: null,
  error: ""
}

const ChargeBoxesDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHARGE_BOXES_DATA_ACTION_TYPES.API_PENDING:
      return {
        ...state,
        loading: true
      }
    case CHARGE_BOXES_DATA_ACTION_TYPES.API_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false
      }
    case CHARGE_BOXES_DATA_ACTION_TYPES.API_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    default:
      return state
  }
}

export default ChargeBoxesDataReducer
