import React from 'react'
import {Image, TouchableOpacity} from "react-native"
import {TextCustom} from "../TextCustom"
import {styles} from "./style"

export const ButtonCustom = ({
                                 width,
                                 height,
                                 backgroundColor,
                                 borderRadius,
                                 marginLeft,
                                 marginRight,
                                 marginTop,
                                 marginBottom,
                                 color,
                                 text,
                                 fontSize,
                                 fontWeight,
                                 fontFamily,
                                 click,
                                 borderWidth,
                                 borderColor,
                                 icon,
                                 iconWidth,
                                 iconHeight,
                                 iconPositionLeft = false
                             }) => {
    return (
        <TouchableOpacity
            onPress={() => click()}
            style={[styles.container, {
                width,
                height,
                backgroundColor,
                borderRadius,
                marginLeft,
                marginRight,
                marginTop,
                marginBottom,
                borderWidth,
                borderColor,
                flexDirection: iconPositionLeft ? 'row-reverse' : 'row'
            }]}
        >
            {
                icon
                    ? <Image source={icon} style={{width: iconWidth, height: iconHeight, marginRight: 10}} resizeMode={"contain"}/>
                    : null
            }
            <TextCustom text={text} color={color} fontSize={fontSize} fontFamily={fontFamily} fontWeight={fontWeight}/>
        </TouchableOpacity>
    )
}
