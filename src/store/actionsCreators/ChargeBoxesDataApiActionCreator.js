import { Alert } from "react-native"
import axios from "axios"
import { Tokakey } from "../../shared/Const"
import { fetchData, fetchSuccess, fetchError } from "../actions/ChargeBoxesDataApiAction"

export const GetChargeBoxesData = (url) => (dispatch) => {
  dispatch(fetchData())
  if (url !== null) {
    return new Promise(async () => {
      axios
        .get(url, { headers: { tokakey: Tokakey } })
        .then(response => {
          dispatch(fetchSuccess(response.data))
        })
        .catch(e => {
          dispatch(fetchError(e.response.data.message))
          Alert.alert(
            `${e?.response?.data?.name} ${e?.response?.data?.status}`,
            `${e?.response?.data?.message}`,
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          )
        })
    })
  } else {
    dispatch(fetchSuccess(null))
    dispatch(fetchError(""))
  }
}
