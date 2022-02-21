import React, {useContext} from "react"
import {NavigationContainer} from '@react-navigation/native'
import Context from "../../Context"
import {AppearanceProvider} from 'react-native-appearance'
import {StatusBar} from "expo-status-bar"
import {WelcomeScreen} from "../screens/WelcomeScreen"
import {TabNavigator} from "./TabNavigator"

function RootNavigation() {

    const {check} = useContext(Context)

    return (
        <AppearanceProvider>
            <StatusBar style="dark" backgroundColor={'transparent'} animated={true}/>
            <NavigationContainer>
                {
                    !check
                        ? <TabNavigator/>
                        : <WelcomeScreen/>
                }
            </NavigationContainer>
        </AppearanceProvider>

    )
}

export default RootNavigation
