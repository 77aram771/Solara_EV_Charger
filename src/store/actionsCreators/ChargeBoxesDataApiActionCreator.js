import axios from "axios"
import { fetchData, fetchSuccess, fetchError } from "../actions/ChargeBoxesDataApiAction"

export const GetChargeBoxesData = (url) => (dispatch) => {
  dispatch(fetchData())
  if (url !== null) {
    return new Promise(async () => {
      axios
        .get(url, { headers: { tokakey: "f9cbdcf0b9bc49ec15e2098127a0052997b5fda5" } })
        .then(response => {
          dispatch(fetchSuccess(response.data))
        })
        .catch(e => {
          console.log('e', e)
          dispatch(fetchError(e.response.data.message))
        })
    })
  } else {
    dispatch(fetchSuccess(null))
    dispatch(fetchError(""))
  }
}