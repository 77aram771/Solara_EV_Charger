import React, {useContext} from "react"
import {NavigationContainer} from '@react-navigation/native'
import {Platform} from "react-native"
import {StatusBar} from "expo-status-bar"
import {AppearanceProvider} from 'react-native-appearance'
import Context from "../../Context"
import {WelcomeScreen} from "../screens/WelcomeScreen"
import {MyDrawer} from "./DrawerStack"
import {MySin} from "../shared/Colors"

function RootNavigation() {

    const {check} = useContext(Context)

    return (
        <AppearanceProvider>
            <StatusBar
                style={Platform.OS === 'ios' ? 'dark' : 'light'}
                backgroundColor={MySin}
                animated={true}
                translucent={true}
                networkActivityIndicatorVisible={true}
                hideTransitionAnimation={'slide'}
            />
            <NavigationContainer>
                {
                    !check
                        ? <MyDrawer/>
                        : <WelcomeScreen/>
                }
            </NavigationContainer>
        </AppearanceProvider>

    )
}

export default RootNavigation
