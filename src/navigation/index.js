import React, {useContext} from "react"
import {NavigationContainer} from '@react-navigation/native'
import {StatusBar} from "expo-status-bar"
import {AppearanceProvider} from 'react-native-appearance'
import Context from "../../Context"
import {WelcomeScreen} from "../screens/WelcomeScreen"
import {MyDrawer} from "./DrawerStack"
import {SafeAreaProvider} from 'react-native-safe-area-context'

function RootNavigation() {

    const {check} = useContext(Context)

    return (
        <SafeAreaProvider>
            <AppearanceProvider>
                <StatusBar
                    style={'dark'}
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
        </SafeAreaProvider>

    )
}

export default RootNavigation
