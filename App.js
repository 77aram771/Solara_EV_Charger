import React, {useEffect, useState} from 'react'
import {ImageBackground, Platform} from "react-native"
import Constants from "expo-constants"
import * as Location from "expo-location"
import Geocoder from 'react-native-geocoding'
import AppLoading from 'expo-app-loading'
import {useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold} from '@expo-google-fonts/roboto'
import {setCustomText} from 'react-native-global-props'
// import * as SplashScreen from 'expo-splash-screen'
import Context from "./Context"
import {SafeAreaView} from 'react-native-safe-area-context'
import RootNavigation from "./src/navigation"
import {Provider} from 'react-redux'
import {store} from './src/store'
import {Google_Key} from "./src/shared/Const"
import ImgSplashScreenArm from './src/assets/images/img-splashscreen-arm.png'
import ImgSplashScreenRu from './src/assets/images/img-splashscreen-ru.png'
import ImgSplashScreenEn from './src/assets/images/img-splashscreen-en.png'

Geocoder.init(Google_Key, {language: "ru"})

export default function App() {

    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
        Roboto_700Bold
    })

    const customTextProps = {style: {fontFamily: 'Roboto_400Regular'}}

    const [check, setCheck] = useState(false)
    const [location, setLocation] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
    const [userAddress, setUserAddress] = useState('')
    const [showTabBar, setShowTabBar] = useState(false)

    const handleCheck = () => setCheck(true)

    const handleHideTabBar = (bool) => setShowTabBar(bool)

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
            // console.log('location', location)
            Geocoder.from(location.coords.latitude, location.coords.longitude)
                .then((json) => {
                    let addressComponent = `${json.results[0].address_components[1].long_name} ${json.results[0].address_components[0].long_name}`
                    console.log(addressComponent)
                    setUserAddress(addressComponent)
                })
                .catch((error) => console.warn(error))
        })()
    }, [])

    if (!fontsLoaded) {
        return <AppLoading/>
    } else {
        if (location === null) {
            return (
                <ImageBackground source={ImgSplashScreenArm} style={{width: '100%', height: '100%'}}/>
            )
        } else {
            return (
                <Context.Provider
                    value={{
                        check: check,
                        location: location,
                        userAddress: userAddress,
                        showTabBar: showTabBar,
                        handleCheck: () => handleCheck(),
                        handleHideTabBar: (bool) => handleHideTabBar(bool),
                    }}
                >
                    <Provider store={store}>
                        <SafeAreaView style={{flex: 1}} edges={['top']}>
                            <RootNavigation/>
                        </SafeAreaView>
                    </Provider>
                </Context.Provider>
            )
        }

    }
}
