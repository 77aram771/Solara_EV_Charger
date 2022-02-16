import React, {useEffect, useState} from 'react'
import {Platform} from "react-native"
import Constants from "expo-constants"
import * as Location from "expo-location"
import Geocoder from 'react-native-geocoding'
import AppLoading from 'expo-app-loading'
import {useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold} from '@expo-google-fonts/roboto'
import {setCustomText} from 'react-native-global-props'
import Context from "./Context"
import {SafeAreaView} from 'react-native-safe-area-context'
import RootNavigation from "./src/navigation"
import {Provider} from 'react-redux'
import {store} from './src/store'
import {Google_Key} from "./src/shared/Const"

Geocoder.init(Google_Key, {language: "ru"})

export default function App() {

    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
        Roboto_700Bold
    })
    const [logIn, setLogIn] = useState(false)
    const [location, setLocation] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)

    const customTextProps = {style: {fontFamily: 'Roboto_400Regular'}}

    setCustomText(customTextProps)

    useEffect(() => {
        (async () => {
            if (Platform.OS === 'android' && !Constants.isDevice) {
                setErrorMsg('Oops, this will not work on Snack in an Android emulator. Try it on your device!')
                return
            }
            let {status} = await Location.requestForegroundPermissionsAsync()
            Location.installWebGeolocationPolyfill()
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied')
                return
            }
            let location = await Location.getCurrentPositionAsync({})
            setLocation(location)
            Geocoder.from(location.coords.latitude, location.coords.longitude)
                .then((json) => {
                    let addressComponent = `${json.results[0].address_components[1].long_name} ${json.results[0].address_components[0].long_name}`
                    console.log(addressComponent)
                })
                .catch((error) => console.warn(error))
        })()
    }, [])

    if (!fontsLoaded) {
        return <AppLoading/>
    } else {
        return (
            <Context.Provider value={{logIn: logIn}}>
                <Provider store={store}>
                    <SafeAreaView style={{flex: 1}} edges={['top']}>
                        <RootNavigation/>
                    </SafeAreaView>
                </Provider>
            </Context.Provider>
        )
    }
}
