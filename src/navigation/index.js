import React, {useContext} from "react"
import {NavigationContainer} from '@react-navigation/native'
import Context from "../../Context"
// import {TabNavigator} from "./TabNavigator"
import {AppearanceProvider} from 'react-native-appearance'
import {StatusBar} from "expo-status-bar"
import {Welcome} from "../screens/WelcomeScreen"

function RootNavigation() {

    const {logIn} = useContext(Context)

    return (
        <AppearanceProvider>
            <StatusBar/>
            <NavigationContainer>
                {/*{*/}
                {/*    !logIn*/}
                {/*        ? <TabNavigator/>*/}
                {/*        : <LogInStackScreen/>*/}
                {/*}*/}
                <Welcome/>
            </NavigationContainer>
        </AppearanceProvider>

    )
}

export default RootNavigation
