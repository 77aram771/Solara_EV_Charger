import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { fetchData, fetchSuccess, fetchError } from "../actions/AuthApiAction"
import { API_URL, Tokakey } from "../../shared/Const";
import { Platform } from "react-native";

export const AuthSignIn = (url, body, expoPushToken) => (dispatch) => {

  dispatch(fetchData())
  if (url !== null) {
    return new Promise(async () => {
      axios
        .post(url, body)
        .then(response => {
          axios.post(
            `${API_URL}/users/register-device?access-token=${response?.data?.access_token}`,
            { device_id: expoPushToken, is_ios: Platform.OS === "ios" ? 1 : 0 },
            { headers: { tokakey: Tokakey } }
          )
            .then(res => {
              console.log("res =============>>>>>>>>>", res?.data)
            })
            .catch(e => console.log("e", e.response))
          AsyncStorage.setItem("token", response?.data?.access_token)
          AsyncStorage.setItem("userData", JSON.stringify(response?.data))
          dispatch(fetchSuccess(response.data))
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
