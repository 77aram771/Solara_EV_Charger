import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {WalletScreen} from "../../screens/WalletScreen"

export const WalletStack = () => {

    const Wallet = createStackNavigator()

    return (
        <Wallet.Navigator
            initialRouteName="Wallet"
            screenOptions={{headerShown: false}}
        >
            <Wallet.Screen
                name="Wallet"
                component={WalletScreen}
                options={{
                    headerTitle: '',
                    headerTransparent: true,
                }}
            />
        </Wallet.Navigator>
    )
}
