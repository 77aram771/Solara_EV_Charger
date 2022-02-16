import React, {useContext} from "react"
import {Image, Platform, Text} from "react-native"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
// import {useColorScheme} from "react-native-appearance"
import {windowHeight} from "../../shared/Const"
import Context from "../../../Context"

const Tab = createBottomTabNavigator()

export const TabNavigator = () => {

    // const scheme = useColorScheme()

    const {showTabBar} = useContext(Context)

    return (
        <Tab.Navigator
            initialRouteName={'Услуги'}
            tabBarOptions={{
                style: Platform.OS !== 'ios' ? {
                    height: windowHeight / 11,
                    paddingBottom: 15
                }
                : ''
            }}
        >
            <Tab.Screen
                name=""
                component={}
                options={{
                    headerShown: false,
                    // tabBarLabel: ({focused}) => (
                    //     <Text style={{color: focused ? Red : GreyLight4, fontSize: 10}}>Услуги</Text>
                    // ),
                    // tabBarIcon: ({focused}) => (
                    //     <Image
                    //         source={focused ? IconServiceActive : IconService}
                    //         style={{width: 16, marginTop: 10}}
                    //         resizeMode={'contain'}
                    //     />
                    // ),

                    tabBarVisible: showTabBar,
                }}
            />
        </Tab.Navigator>
    )
}
