import axios from "axios"
import { fetchData, fetchSuccess, fetchError } from "../actions/ForgotPasswordApiAction"

export const ForgotPasswordApi = (url, body) => (dispatch) => {
  dispatch(fetchData())
  if (url !== null) {
    return new Promise(async () => {
      axios
        .post(url, body)
        .then(response => {
          dispatch(fetchSuccess(response.status))
        })
        .catch((error) => {
          dispatch(fetchError(error.response.data.message))
        })
    })
  } else {
    dispatch(fetchSuccess(null))
    dispatch(fetchError(''))
  }
}