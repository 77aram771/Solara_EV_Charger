import React from 'react'
import {Image, TouchableOpacity, View} from "react-native"
import {styles} from "./style"
import {TextCustom} from "../TextCustom"
import IconArrow from "../../../assets/icon/dropdown.png"
import {MineShaft} from "../../../shared/Colors"

export const AccordionCustom = ({title, text, active, handle}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handle} style={styles.item}>
                <TextCustom text={title}/>
                <Image source={IconArrow} style={{width: 15, height: 15, transform: [{ rotate: active ? '180deg' : '0deg'}]}}/>
            </TouchableOpacity>
            {
                active
                    ? <TextCustom text={text} color={MineShaft} fontSize={14} fontWeight={'400'}/>
                    : null
            }
        </View>
    )
}