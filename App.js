import React, { useEffect, useState } from "react"
import { ImageBackground, Platform, LogBox } from "react-native"
import Constants from "expo-constants"
import * as Location from "expo-location"
import Geocoder from "react-native-geocoding"
import AppLoading from "expo-app-loading"
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from "@expo-google-fonts/roboto"
import { setCustomText } from "react-native-global-props"
// import * as SplashScreen from 'expo-splash-screen'
import Context from "./Context"
import RootNavigation from "./src/navigation"
import { Provider } from "react-redux"
import { store } from "./src/store"
import { API_URL, Google_Key } from "./src/shared/Const"
import ImgSplashScreenArm from "./src/assets/images/img-splashscreen-arm.png"
import axios from "axios"
// import AsyncStorage from "@react-native-async-storage/async-storage"
// import ImgSplashScreenRu from './src/assets/images/img-splashscreen-ru.png'
// import ImgSplashScreenEn from './src/assets/images/img-splashscreen-en.png'

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state"
])

Geocoder.init(Google_Key, { language: "ru" })

export default function App() {

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  })

  const customTextProps = { style: { fontFamily: "Roboto_400Regular" } }

  const [check, setCheck] = useState(false)
  const [location, setLocation] = useState(null)
  const [setErrorMsg] = useState(null)
  const [userAddress, setUserAddress] = useState("")
  const [showTabBar, setShowTabBar] = useState(false)
  const [load, setLoad] = useState(true)
  const [countryCode, setCountryCode] = useState("en")
  const [sumKW, setSumKW] = useState("")

  const handleCheck = async () => setCheck(true)

  const handleHideTabBar = (bool) => setShowTabBar(bool)

  const handleCountryCode = (code) => setCountryCode(code)

  setCustomText(customTextProps)

  useEffect(() => {
    (async () => {
      await handleLocationUser()
    })()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoad(false)
    }, 3000)
  }, [])

  useEffect(() => {
    (async () => {
      await axios.get(
        `${API_URL}/data/get-kw-price?language=ru=${countryCode}`,
        { headers: { tokakey: "f9cbdcf0b9bc49ec15e2098127a0052997b5fda5" } }
      )
        .then(res => setSumKW(res?.data?.price))
        .catch(e => console.log("e", e.response))
    })()
  }, [])

  const handleLocationUser = async () => {
    if (Platform.OS === "android" && !Constants.isDevice) {
      setErrorMsg("Oops, this will not work on Snack in an Android emulator. Try it on your device!")
      return
    }
    let { status } = await Location.requestForegroundPermissionsAsync()
    Location.installWebGeolocationPolyfill()
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied")
      return
    }
    let location = await Location.getCurrentPositionAsync({})
    setLocation(location)
    Geocoder.from(location.coords.latitude, location.coords.longitude)
      .then((json) => {
        let addressComponent = `${json.results[0].address_components[1].long_name} ${json.results[0].address_components[0].long_name}`
        setUserAddress(addressComponent)
      })
      .catch(error => console.warn(error))
  }

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    if (load) {
      return (
        <ImageBackground source={ImgSplashScreenArm} style={{ width: "100%", height: "100%" }} />
      )
    } else {
      return (
        <Context.Provider
          value={{
            check: check,
            location: location,
            userAddress: userAddress,
            showTabBar: showTabBar,
            countryCode: countryCode,
            sumKW: sumKW,
            handleCheck: () => handleCheck(),
            handleHideTabBar: (bool) => handleHideTabBar(bool),
            handleCountryCode: (code) => handleCountryCode(code),
            handleLocationUser: () => handleLocationUser()
          }}
        >
          <Provider store={store}>
            <RootNavigation />
          </Provider>
        </Context.Provider>
      )
    }

  }
}
