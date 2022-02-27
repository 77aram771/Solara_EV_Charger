import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {HomeScreen} from "../../screens/HomeScreen"
import {QRScannerScreen} from "../../screens/HomeScreen/QRScannerScreen"
import {FilterScreen} from "../../screens/HomeScreen/FilterScreen";

export const HomeStack = () => {

    const Home = createStackNavigator()

    return (
        <Home.Navigator
            initialRouteName="Home"
            screenOptions={{headerShown: false}}
        >
            <Home.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerTitle: '',
                    headerTransparent: true,
                }}
            />
            <Home.Screen
                name="QRScanner"
                component={QRScannerScreen}
                options={{
                    headerTitle: '',
                    headerTransparent: true,
                }}
            />
            <Home.Screen
                name="Filter"
                component={FilterScreen}
                options={{
                    headerTitle: '',
                    headerTransparent: true,
                }}
            />
        </Home.Navigator>
    )
}
