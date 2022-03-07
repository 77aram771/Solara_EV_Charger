import * as React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {TabNavigator} from "../TabNavigator"
import {FilterScreen} from "../../screens/HomeScreen/FilterScreen"

const Drawer = createDrawerNavigator()

export const MyDrawer = () => {
    return (
        <Drawer.Navigator
            statusBarAnimation={'fade'}
            drawerStyle={{width: '100%'}}
            drawerContent={({navigation}) => <FilterScreen navigation={navigation} />}
            edgeWidth={0}
        >
            <Drawer.Screen
                name="TabNavigator"
                component={TabNavigator}
                options={{swipeEnabled: false}}
            />
        </Drawer.Navigator>
    )
}
