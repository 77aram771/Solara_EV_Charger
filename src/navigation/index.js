import React, {useContext} from "react"
import {NavigationContainer} from '@react-navigation/native'
import Context from "../../Context"
import {AppearanceProvider} from 'react-native-appearance'
import {StatusBar} from "expo-status-bar"
import {WelcomeScreen} from "../screens/WelcomeScreen"
import {MyDrawer} from "./DrawerStack"
import {MySin} from "../shared/Colors"

function RootNavigation() {

    const {check} = useContext(Context)

    return (
        <AppearanceProvider>
            <StatusBar style="light" backgroundColor={MySin} animated={true}/>
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
