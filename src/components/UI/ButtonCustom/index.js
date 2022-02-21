import React from 'react'
import {Button, TouchableOpacity} from "react-native"
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
                                 click
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
            }]}
        >
            <TextCustom text={text} color={color} fontSize={fontSize} fontFamily={fontFamily} fontWeight={fontWeight}/>
        </TouchableOpacity>
    )
}
