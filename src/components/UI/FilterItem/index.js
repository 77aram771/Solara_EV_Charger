import React from 'react'
import {styles} from "./style"
import {Image, View} from "react-native"
import {TextCustom} from "../TextCustom"
import {MineShaft, MySin, White} from "../../../shared/Colors"
import ToggleSwitch from 'toggle-switch-react-native'

export const FilterItem = ({text, active, handleSwitch, icon, borderShow = true}) => {

    return (
        <View
            style={[styles.container, {
                borderBottomWidth: !borderShow ? 0 : 1,
                marginBottom: !borderShow ? 0 : 15,
            }]}
        >
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                {
                    icon
                        ? <Image source={icon} style={{width: 18, height: 18}}/>
                        : null
                }
                <TextCustom text={text} fontSize={18} color={MineShaft} fontWeight={'400'} marginLeft={icon ? 10 : 0}/>
            </View>
            <ToggleSwitch
                isOn={active}
                onColor="#979798"
                offColor="#e5e5e5"
                size="small"
                animationSpeed={200}
                thumbOnStyle={{backgroundColor: MySin}}
                onToggle={handleSwitch}
            />
        </View>
    )
}
