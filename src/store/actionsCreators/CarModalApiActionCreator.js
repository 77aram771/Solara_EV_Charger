import axios from "axios"
import { fetchData, fetchSuccess, fetchError } from "../actions/CarModalApiAction"

export const GetCarModal = (url) => (dispatch) => {
  dispatch(fetchData())
  return new Promise(async () => {
    axios
      .get(url,
        { headers: { tokakey: "f9cbdcf0b9bc49ec15e2098127a0052997b5fda5" } }
      )
      .then(response => {
        dispatch(fetchSuccess(response.data))
      })
      .catch(e => {
        dispatch(fetchError(e.response.data.message))
      })
  })
}