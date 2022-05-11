import React, { useContext } from "react"
import { Image, Platform } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { windowHeight } from "../../shared/Const"
import Context from "../../../Context"
import { HomeStack } from "../HomeStack"
import { WalletStack } from "../WalletStack"
import { ProfileStack } from "../ProfileStack"
import IconPointActive from "../../assets/icon/menu-map1.png"
import IconPoint from "../../assets/icon/menu-map2.png"
import IconWalletActive from "../../assets/icon/menu-pay1.png"
import IconWallet from "../../assets/icon/menu-pay2.png"
import IconProfileActive from "../../assets/icon/menu-user1.png"
import IconProfile from "../../assets/icon/menu-user2.png"

const Tab = createBottomTabNavigator()

export const TabNavigator = () => {

  const { showTabBar } = useContext(Context)

  return (
    <Tab.Navigator
      lazy={true}
      initialRouteName={"HomeStack"}
      tabBarOptions={{
        style: Platform.OS !== "ios" ? {
            height: windowHeight / 11,
            paddingBottom: 15
          }
          : ""
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? IconPointActive : IconPoint}
              style={{ width: 35, height: 35, marginTop: 10 }}
              resizeMode={"contain"}
            />
          ),
          tabBarVisible: showTabBar,
          tabBarLabel: () => {
            return null
          }
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? IconProfileActive : IconProfile}
              style={{ width: 35, height: 35, marginTop: 10 }}
              resizeMode={"contain"}
            />
          ),
          tabBarVisible: showTabBar,
          tabBarLabel: () => {
            return null
          }
        }}
      />
      <Tab.Screen
        name="WalletStack"
        component={WalletStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? IconWalletActive : IconWallet}
              style={{ width: 35, height: 35, marginTop: 10 }}
              resizeMode={"contain"}
            />
          ),
          tabBarVisible: showTabBar,
          tabBarLabel: () => {
            return null
          }
        }}
      />
    </Tab.Navigator>
  )
}
