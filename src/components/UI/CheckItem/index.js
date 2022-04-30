import React from "react"
import {Image, TouchableOpacity} from "react-native"
import {TextCustom} from "../TextCustom"
import {MineShaft} from "../../../shared/Colors"
import {styles} from "./style"
import IconCheck from '../../../assets/icon/check1.png'
import IconCheckActive from '../../../assets/icon/check2.png'

export const CheckItem = ({text, bool = true, handle}) => {
    return (
        <TouchableOpacity onPress={() => handle()} style={styles.container}>
            {
                bool
                    ? <Image source={IconCheckActive} style={{width: 25, height: 25, marginRight: 20}}/>
                    : <Image source={IconCheck} style={{width: 25, height: 25, marginRight: 20}}/>
            }
            <TextCustom text={text} color={MineShaft} fontSize={15} fontWeight={'400'}/>
        </TouchableOpacity>
    )
}
