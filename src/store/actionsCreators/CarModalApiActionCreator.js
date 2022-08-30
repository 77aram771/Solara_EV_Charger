import axios from "axios"
import { fetchData, fetchSuccess, fetchError } from "../actions/CarModalApiAction"
import { Tokakey } from "../../shared/Const"

export const GetCarModal = (url) => (dispatch) => {
  dispatch(fetchData())
  return new Promise(async () => {
    axios
      .get(url,
        { headers: { tokakey: Tokakey } }
      )
      .then(response => {
        dispatch(fetchSuccess(response.data))
      })
      .catch(e => {
        dispatch(fetchError(e.response.data.message))
      })
  })
}