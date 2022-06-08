import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { fetchData, fetchSuccess, fetchError } from "../actions/SignUpApiAction"

export const PostConfirmCode = (url, body) => (dispatch) => {
  dispatch(fetchData())
  if (url !== null) {
    return new Promise(async () => {
      axios
        .post(url, body, { headers: { tokakey: "f9cbdcf0b9bc49ec15e2098127a0052997b5fda5" } })
        .then(response => {
          console.log('response PostConfirmCode', response)
          AsyncStorage.setItem("token", response?.data?.access_token)
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