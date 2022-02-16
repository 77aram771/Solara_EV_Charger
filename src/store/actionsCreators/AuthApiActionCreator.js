import axios from 'axios'
import {fetchData, fetchSuccess, fetchError} from '../actions/AuthApiAction'
import {AsyncStorage} from "react-native";

export const AuthSignIn = (url, body) => (dispatch) => {
    dispatch(fetchData())
    return new Promise(() => {
        axios
            .post(url, body)
            .then((response) => {
                dispatch(fetchSuccess(response))
            })
            .catch((error) => {
                dispatch(fetchError(error))
            })
    })
}

export const AuthLogOut = (url) => async (dispatch) => {
    // const token = await AsyncStorage.getItem("Token");
    dispatch(fetchData())
    dispatch(null)
    // return new Promise(() => {
    //     axios
    //         .post(url, {headers: {'Authorization': `Bearer ${token}`}})
    //         .then((response) => {
    //             dispatch(null)
    //             console.log('response logout', response)
    //         })
    //         .catch((error) => {
    //             console.log('response error', error)
    //             dispatch(fetchError(error))
    //             console.log(error)
    //         })
    //
    // })
}


