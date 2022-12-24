import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"
import { MyDrawer } from "./DrawerStack"
import { SafeAreaProvider } from "react-native-safe-area-context"
// import { TabNavigator } from "./TabNavigator"


function RootNavigation() {

  return (
    <SafeAreaProvider>
        <StatusBar
          style={"dark"}
          animated={true}
          translucent={true}
          networkActivityIndicatorVisible={true}
          hideTransitionAnimation={"slide"}
        />
        <NavigationContainer>
          {/* <TabNavigator /> */}
          <MyDrawer />
        </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default RootNavigation
