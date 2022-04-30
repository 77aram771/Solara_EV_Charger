import { FORGOT_PASSWORD_ACTION_TYPES } from "../actionsType/ForgotPasswordActionTypes"

export const fetchData = () => ({
  type: FORGOT_PASSWORD_ACTION_TYPES.API_PENDING
})

export const fetchSuccess = (data) => ({
  type: FORGOT_PASSWORD_ACTION_TYPES.API_SUCCESS,
  payload: data
})

export const fetchError = (error) => ({
  type: FORGOT_PASSWORD_ACTION_TYPES.API_ERROR,
  payload: error
})
