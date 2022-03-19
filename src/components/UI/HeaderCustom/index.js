import React from "react"
import {Image, TouchableOpacity, View} from "react-native"
import IconArrowBack from '../../../assets/icon/arrow2.png'
import {TextCustom} from "../TextCustom"
import {White} from "../../../shared/Colors"
import {styles} from "./style"

export const HeaderCustom = ({text, backgroundColor, handleBack}) => {
    return (
        <View style={[styles.container, {backgroundColor}]}>
            <TouchableOpacity style={{width: 50, height: 50, borderWidth: 1, borderColor: 'red'}} onPress={() => handleBack()}>
                <Image source={IconArrowBack} style={{width: 20, height: 20}}/>
            </TouchableOpacity>
            <TextCustom text={text} color={White} fontSize={20}/>
            <View style={{width: 20, height: 20}}>

            </View>
        </View>
    )
}
