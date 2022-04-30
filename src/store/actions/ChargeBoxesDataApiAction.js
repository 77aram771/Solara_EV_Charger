import { CHARGE_BOXES_DATA_ACTION_TYPES } from "../actionsType/ChargeBoxesDataActionTypes.js"

export const fetchData = () => ({
  type: CHARGE_BOXES_DATA_ACTION_TYPES.API_PENDING
})

export const fetchSuccess = (data) => ({
  type: CHARGE_BOXES_DATA_ACTION_TYPES.API_SUCCESS,
  payload: data
})

export const fetchError = (error) => ({
  type: CHARGE_BOXES_DATA_ACTION_TYPES.API_ERROR,
  payload: error
})
