import React, { useEffect, useState, useRef } from "react"
import { ImageBackground, Platform, LogBox, View } from "react-native"
import Constants from "expo-constants"
import * as Location from "expo-location"
import Geocoder from "react-native-geocoding"
import * as Notifications from "expo-notifications"
import { Provider } from "react-redux"
import "react-native-gesture-handler"
import axios from "axios"
import Context from "./Context"
import RootNavigation from "./src/navigation"
import { store } from "./src/store"
import { API_URL, Google_Key, Tokakey } from "./src/shared/Const"
import { lang } from "./src/shared/Lang"
import * as Device from "expo-device"
import AsyncStorage from "@react-native-async-storage/async-storage"
import ImgSplashScreenRu from "./src/assets/images/img-splashscreen-ru.png"
import ImgSplashScreenEn from "./src/assets/images/img-splashscreen-en.png"
import ImgSplashScreenArm from "./src/assets/images/img-splashscreen-arm.png"

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
  "EventEmitter.removeListener",
  "Overwriting fontFamily style attribute preprocessor",
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'."
])

Geocoder.init(Google_Key, { language: "en" })

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
});

Notifications.requestPermissionsAsync({
  ios: {
    allowAlert: true,
    allowBadge: true,
    allowSound: true,
    allowAnnouncements: true
  }
});

// axios.interceptors.response.use(response => {
//   console.log('response', response.data)
//   return response;
// }, error => {
//   console.log('error', error)
//   if (error.response.status === 401) {
//     (async () => {
//       await AsyncStorage.removeItem("token")
//     })()
//   }
//   return error;
// });

export default function App() {

  const [location, setLocation] = useState(null)
  const [userAddress, setUserAddress] = useState("")
  const [showTabBar, setShowTabBar] = useState(false)
  const [load, setLoad] = useState(true)
  const [countryCode, setCountryCode] = useState("en")
  const [sumKW, setSumKW] = useState("")
  const [checkFilter, setCheckFilter] = useState(false)

  useEffect(() => {
    (async () => {
      const c = await AsyncStorage.getItem("countryCode")
      if (c !== null) {
        setCountryCode(c)
      }
    })()
  }, [countryCode])

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("response", response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      // console.log("Notification token", token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C"
      });
    }
    // console.log('token', token)
    return token;
  }

  const handleHideTabBar = (bool) => setShowTabBar(bool)

  const handleCountryCode = (code) => setCountryCode(code)

  const handleCheckFilter = () => {
    setCheckFilter(true)
    // setTimeout(() => {
    //   setCheckFilter(false)
    // }, 2000)
  }

  useEffect(() => {
    setTimeout(() => {
      setLoad(false)
    }, 3000)
  }, [])

  useEffect(() => {
    (async () => {
      await axios.get(
        `${API_URL}/data/get-kw-price`,
        { headers: { tokakey: Tokakey } }
      )
        .then(res => setSumKW(res?.data?.price))
        .catch(e => console.log("e", e.response))
    })()
  }, [])

  const handleLocationUser = async () => {
    if (Platform.OS === "android" && !Constants.isDevice) {
      alert("Oops, this will not work on Snack in an Android emulator. Try it on your device!")
      return
    }
    let { status } = await Location.requestForegroundPermissionsAsync()
    Location.installWebGeolocationPolyfill()
    if (status !== "granted") {
      alert(lang[countryCode].permissionToAccessLocationWasDenied)
      return
    }
    let location = await Location.getCurrentPositionAsync({})
    setLocation(location)
    Geocoder.from(location.coords.latitude, location.coords.longitude)
      .then((json) => {
        let addressComponent = `${json.results[0].address_components[1].long_name} ${json.results[0].address_components[0].long_name}`
        setUserAddress(addressComponent)
      })
      .catch(e => console.warn(e))
  }

  if (load) {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        {
          countryCode === "ru"
            ? <ImageBackground source={ImgSplashScreenRu} style={{ width: "100%", height: "100%" }} />
            : null
        }
        {
          countryCode === "en"
            ? <ImageBackground source={ImgSplashScreenEn} style={{ width: "100%", height: "100%" }} />
            : null
        }
        {
          countryCode === "ar"
            ? <ImageBackground source={ImgSplashScreenArm} style={{ width: "100%", height: "100%" }} />
            : null
        }
      </View>
    )
  } else {
    return (
      <Context.Provider
        value={{
          location: location,
          userAddress: userAddress,
          showTabBar: showTabBar,
          countryCode: countryCode,
          sumKW: sumKW,
          checkFilter: checkFilter,
          handleHideTabBar: (bool) => handleHideTabBar(bool),
          handleCountryCode: (code) => handleCountryCode(code),
          handleLocationUser: () => handleLocationUser(),
          handleCheckFilter: () => handleCheckFilter(),
          expoPushToken: expoPushToken
        }}
      >
        <Provider store={store}>
          <RootNavigation />
        </Provider>
      </Context.Provider>
    )
  }
}
