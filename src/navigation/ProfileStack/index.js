import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {ProfileScreen} from "../../screens/ProfileScreen"

export const ProfileStack = () => {

    const Profile = createStackNavigator()

    return (
        <Profile.Navigator
            initialRouteName="Home"
            screenOptions={{headerShown: false}}
        >
            <Profile.Screen
                name="Home"
                component={ProfileScreen}
                options={{
                    headerTitle: '',
                    headerTransparent: true,
                }}
            />
        </Profile.Navigator>
    )
}
