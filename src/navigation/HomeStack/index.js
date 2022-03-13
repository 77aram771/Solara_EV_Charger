import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {HomeScreen} from "../../screens/HomeScreen"
import {QRScannerScreen} from "../../screens/HomeScreen/QRScannerScreen"
import {FilterScreen} from "../../screens/HomeScreen/FilterScreen"
import {BookScreen} from "../../screens/HomeScreen/BookScreen"
import {BookTypeScreen} from "../../screens/HomeScreen/BookTypeScreen"
import {LoadChargeScreen} from "../../screens/HomeScreen/LoadChargeScreen"

const config = {
    animation: 'timing',
    config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};

export const HomeStack = () => {

    const Home = createStackNavigator()

    return (
        <Home.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                gestureDirection: 'horizontal',
                gestureEnabled: true,
                animationEnabled: true,
                animationTypeForReplace: 'push',
            }}
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
            <Home.Screen
                name="Book"
                component={BookScreen}
                options={{
                    headerTitle: '',
                    headerTransparent: true,
                }}
            />
            <Home.Screen
                name="BookType"
                component={BookTypeScreen}
                options={{
                    headerTitle: '',
                    headerTransparent: true,
                }}
            />
            <Home.Screen
                name="LoadCharge"
                component={LoadChargeScreen}
                options={{
                    headerTitle: '',
                    headerTransparent: true,
                }}
            />
        </Home.Navigator>
    )
}
