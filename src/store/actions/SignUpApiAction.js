import { SIGN_UP_ACTION_TYPES } from "../actionsType/SignUpActionTypes.js"

export const fetchData = () => ({
  type: SIGN_UP_ACTION_TYPES.API_PENDING
})

export const fetchSuccess = (data) => ({
  type: SIGN_UP_ACTION_TYPES.API_SUCCESS,
  payload: data
})

export const fetchError = (error) => ({
  type: SIGN_UP_ACTION_TYPES.API_ERROR,
  payload: error
})
