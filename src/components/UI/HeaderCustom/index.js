import React from "react"
import {Image, TouchableOpacity, View} from "react-native"
import IconArrowBack from '../../../assets/icon/arrow2.png'
import {TextCustom} from "../TextCustom"
import {White} from "../../../shared/Colors"
import {styles} from "./style"
import Constants from "expo-constants"

export const HeaderCustom = ({
                                 text,
                                 backgroundColor,
                                 handleBack,
                                 backArrowHide = false,
                                 borderBottomEndRadius = 15,
                                 borderBottomStartRadius = 15,
                                 androidModalHeader = false
                             }) => {
    return (
        <View
            style={[styles.container, {
                backgroundColor,
                height: !androidModalHeader ? Constants.statusBarHeight + 70 : 70,
                paddingTop: !androidModalHeader ? Constants.statusBarHeight : 0,
                borderBottomEndRadius,
                borderBottomStartRadius
            }]}
        >
            {
                backArrowHide
                    ? (
                        <View
                            style={{
                                width: 50,
                                height: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        />
                    )
                    : (
                        <TouchableOpacity
                            style={{
                                width: 50,
                                height: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onPress={() => handleBack()}
                        >
                            <Image source={IconArrowBack} style={{width: 20, height: 20}}/>
                        </TouchableOpacity>
                    )
            }

            <TextCustom text={text} color={White} fontSize={20} textAlign={'center'}/>
            <View style={{width: 50, height: 50}}/>
        </View>
    )
}
