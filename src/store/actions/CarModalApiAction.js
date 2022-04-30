import { CAR_MODAL_ACTION_TYPES } from "../actionsType/CarModalActionTypes.js"

export const fetchData = () => ({
  type: CAR_MODAL_ACTION_TYPES.API_PENDING
})

export const fetchSuccess = (data) => ({
  type: CAR_MODAL_ACTION_TYPES.API_SUCCESS,
  payload: data
})

export const fetchError = (error) => ({
  type: CAR_MODAL_ACTION_TYPES.API_ERROR,
  payload: error
})
