import { CONFIRM_CODE_ACTION_TYPES } from "../actionsType/ConfirmCodeActionTypes.js"

export const fetchData = () => ({
  type: CONFIRM_CODE_ACTION_TYPES.API_PENDING
})

export const fetchSuccess = (data) => ({
  type: CONFIRM_CODE_ACTION_TYPES.API_SUCCESS,
  payload: data
})

export const fetchError = (error) => ({
  type: CONFIRM_CODE_ACTION_TYPES.API_ERROR,
  payload: error
})
