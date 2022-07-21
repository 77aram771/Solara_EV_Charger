import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { fetchData, fetchSuccess, fetchError } from "../actions/AuthApiAction"
import { Alert } from "react-native";

export const AuthSignIn = (url, body) => (dispatch) => {
  dispatch(fetchData())
  if (url !== null) {
    return new Promise(async () => {
      axios
        .post(url, body)
        .then(response => {
          AsyncStorage.setItem("token", response?.data?.access_token)
          dispatch(fetchSuccess(response.data))
        })
        .catch(e => {
          dispatch(fetchError(error.response.data.message))
          Alert.alert(
            `${e?.response?.data?.name} ${e?.response?.data?.status}`,
            `${e?.response?.data?.message}`,
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
        })
    })
  } else {
    dispatch(fetchSuccess(null))
    dispatch(fetchError(""))
  }
}