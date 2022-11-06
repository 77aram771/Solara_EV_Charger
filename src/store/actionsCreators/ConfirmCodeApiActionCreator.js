import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { fetchData, fetchSuccess, fetchError } from "../actions/SignUpApiAction"
import { Tokakey } from "../../shared/Const"

export const PostConfirmCode = (url, body) => (dispatch) => {
  dispatch(fetchData())
  if (url !== null) {
    return new Promise(async () => {
      axios
        .post(url, body, { headers: { tokakey: Tokakey } })
        .then(response => {
          AsyncStorage.setItem("token", response?.data)
          dispatch(fetchSuccess(response))
        })
        .catch(e => {
          dispatch(fetchError(e.response.data.message))
        })
    })
  } else {
    dispatch(fetchSuccess(null))
    dispatch(fetchError(""))
  }
}
