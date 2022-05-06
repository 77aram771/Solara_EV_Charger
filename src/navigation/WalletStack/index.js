import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { WalletScreen } from "../../screens/WalletScreen"
import { horizontalAnimation } from "../../shared/MockData"

export const WalletStack = () => {

  const Wallet = createStackNavigator()

  return (
    <Wallet.Navigator
      initialRouteName="Wallet"
      screenOptions={horizontalAnimation}
    >
      <Wallet.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          headerTitle: "",
          headerTransparent: true
        }}
      />
    </Wallet.Navigator>
  )
}
