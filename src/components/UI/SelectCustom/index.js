import React from 'react'
import {Image, Platform, View} from "react-native"
import RNPickerSelect from 'react-native-picker-select'
import {styles} from "./style"
import {TextCustom} from "../TextCustom"
import {BrightGray, Manatee, MineShaft, SunsetOrange} from "../../../shared/Colors"

export const SelectCustom = ({
                                 data,
                                 handle,
                                 value,
                                 placeholder,
                                 placeholderTextColor,
                                 error,
                                 errorText,
                                 icon,
                                 iconWidth,
                                 iconHeight,
                             }) => {
    return (
        <View style={[styles.container, {borderColor: error ? SunsetOrange : BrightGray}]}>
            <RNPickerSelect
                placeholder={placeholder}
                items={data}
                onValueChange={value => handle(value)}
                style={{
                    inputIOS: {
                        fontSize: 14,
                        paddingHorizontal: 10,
                        paddingVertical: 16,
                        paddingLeft: 20,
                        color: MineShaft,
                        paddingRight: 30,
                    },
                    placeholder: {
                        color: placeholderTextColor,
                    },
                    inputAndroid: {
                        fontSize: 14,
                        color: MineShaft,
                        paddingVertical: 8,
                        paddingLeft: 20,
                        borderRadius: 15,
                    },
                }}
                value={value}
                useNativeAndroidPickerStyle={false}
                Icon={() => {
                    return <Image
                        source={icon}
                        style={[styles.icon, {width: iconWidth, height: iconHeight}]}
                    />
                }}
            />
            {
                error
                    ? (
                        <TextCustom
                            text={errorText}
                            textAlign={'left'}
                            marginBottom={10}
                            fontSize={12}
                            color={SunsetOrange}
                            fontWeight={'400'}
                            marginLeft={20}
                        />
                    )
                    : null
            }
        </View>
    )
}