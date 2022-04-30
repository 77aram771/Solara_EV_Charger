import axios from "axios"
import { fetchData, fetchSuccess, fetchError } from "../actions/SignUpApiAction"

export const PostSignUp = (url, body) => (dispatch) => {
  dispatch(fetchData())
  if (url !== null) {
    return new Promise(async () => {
      axios
        .post(url, body)
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