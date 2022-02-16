import {AUTH_ACTION_TYPES} from '../actionsType/AuthActionTypes.js'

export const fetchData = () => ({
    type: AUTH_ACTION_TYPES.API_PENDING,
})

export const fetchSuccess = (data) => ({
    type: AUTH_ACTION_TYPES.API_SUCCESS,
    payload: data,
})

export const fetchError = (error) => ({
    type: AUTH_ACTION_TYPES.API_ERROR,
    payload: error,
})
