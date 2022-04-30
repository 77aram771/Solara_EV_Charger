import axios from "axios"
import { fetchData, fetchSuccess, fetchError } from "../actions/CarMakeApiAction"

export const GetCarMake = (url) => (dispatch) => {
  dispatch(fetchData())
  return new Promise(async () => {
    axios
      .get(url, {headers: {
          tokakey: 'f9cbdcf0b9bc49ec15e2098127a0052997b5fda5'
        }})
      .then(response => {
        dispatch(fetchSuccess(response.data))
      })
      .catch(error => {
        console.log('error', error)
        dispatch(fetchError(error.response.data.message))
      })
  })
}