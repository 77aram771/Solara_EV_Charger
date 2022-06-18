import React from "react"
import { Image, TextInput, TouchableOpacity, View } from "react-native"
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
  iconClick = null,
  secureTextEntry = false,
  maxLength,
  disable = true,
  backgroundColor
}) => {
  return (
    <View style={styles.container}>
      <View style={{ width: "100%", position: "relative", justifyContent: "center", alignItems: "center" }}>
        <TextInput
          style={[styles.input, {
            borderColor: error ? SunsetOrange : BrightGray,
            backgroundColor,
            height: numberOfLines && 100,
            paddingRight: icon ? 60 : 0
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
          iconClick !== null
            ? (
              <TouchableOpacity
                onPress={iconClick}
                style={[styles.iconBox, {
                  width: iconWidth,
                  height: iconHeight
                }]}
              >
                <Image
                  source={icon}
                  style={{ width: iconWidth, height: iconHeight }}
                />
              </TouchableOpacity>
            )
            : icon
              ? (
                <View
                  style={[styles.iconBox, {
                    width: iconWidth,
                    height: iconHeight
                  }]}
                >
                  <Image
                    source={icon}
                    style={{ width: iconWidth, height: iconHeight }}
                  />
                </View>
              )
              : null
        }
      </View>
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