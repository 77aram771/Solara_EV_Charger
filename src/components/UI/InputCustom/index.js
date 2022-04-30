import React from "react"
import { Image, TextInput, View } from "react-native"
import { styles } from "./style"
import { TextCustom } from "../TextCustom"
import { BrightGray, SunsetOrange } from "../../../shared/Colors"

export const InputCustom = ({
  value,
  handle,
  placeholder,
  placeholderTextColor,
  keyboardType = "default",
  multiline,
  numberOfLines,
  textAlignVertical = "center",
  error,
  errorText,
  icon,
  iconWidth,
  iconHeight,
  secureTextEntry = false,
  maxLength,
  disable = true,
  backgroundColor
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, {
          borderColor: error ? SunsetOrange : BrightGray,
          position: "relative",
          paddingRight: icon ? 50 : 20,
          backgroundColor
        }]}
        value={value}
        onChangeText={value => handle(value)}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={textAlignVertical}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
        editable={disable}
      />
      {
        icon
          ? (
            <Image
              source={icon}
              style={[styles.icon, { width: iconWidth, height: iconHeight }]}
            />
          )
          : null
      }
      {
        error
          ? (
            <TextCustom
              text={errorText}
              textAlign={"left"}
              marginBottom={10}
              fontSize={12}
              color={SunsetOrange}
              fontWeight={"400"}
              marginLeft={20}
            />
          )
          : null
      }
    </View>
  )
}