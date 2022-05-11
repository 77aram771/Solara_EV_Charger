import axios from "axios"
import { fetchData, fetchSuccess, fetchError } from "../actions/SignUpApiAction"

export const PostConfirmCode = (url, body) => (dispatch) => {
  dispatch(fetchData())
  if (url !== null) {
    return new Promise(async () => {
      axios
        .post(url, body, {
          headers: {
            tokakey: "f9cbdcf0b9bc49ec15e2098127a0052997b5fda5"
          }
        })
        .then(response => {
          dispatch(fetchSuccess(response))
        })
        .catch(error => {
          dispatch(fetchError(error.response.data.message))
        })
    })
  } else {
    dispatch(fetchSuccess(null))
    dispatch(fetchError(""))
  }
}