import { CAR_MAKE_ACTION_TYPES } from "../actionsType/CarMakeActionTypes.js"

export const fetchData = () => ({
  type: CAR_MAKE_ACTION_TYPES.API_PENDING
})

export const fetchSuccess = (data) => ({
  type: CAR_MAKE_ACTION_TYPES.API_SUCCESS,
  payload: data
})

export const fetchError = (error) => ({
  type: CAR_MAKE_ACTION_TYPES.API_ERROR,
  payload: error
})
