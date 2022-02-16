import React from 'react'
import {Text} from "react-native"

export const TextCustom = ({
                               text,
                               color,
                               fontSize,
                               marginTop,
                               marginBottom,
                               marginLeft,
                               marginRight,
                               textAlign = 'left',
                               fontFamily = 'Roboto_400Regular'
                           }) => {
    return (
        <Text style={{fontSize, color, marginTop, marginBottom, marginLeft, marginRight, textAlign, fontFamily}}>
            {text}
        </Text>
    )
}
