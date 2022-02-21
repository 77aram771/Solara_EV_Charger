import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {HomeScreen} from "../../screens/HomeScreen"

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
        </Home.Navigator>
    )
}
