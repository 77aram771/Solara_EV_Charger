import React from "react"
import { Image, TouchableOpacity, View } from "react-native"
import ToggleSwitch from "toggle-switch-react-native"
import { TextCustom } from "../TextCustom"
import { Manatee, Mercurysolid, MySin } from "../../../shared/Colors"

export const ButtonCustom = ({
  width,
  height,
  backgroundColor,
  borderRadius,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
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
  iconMarginRight = 10,
  justifyContent = "center",
  alignItems = "center",
  iconPositionLeft = false,
  disabled = false,
  switchButton = false,
  switchActive,
  iconUri
}) => {
  return (
    <TouchableOpacity
      onPress={() => click()}
      disabled={disabled}
      style={{
        width,
        height,
        backgroundColor,
        borderRadius,
        marginLeft,
        marginRight,
        marginTop,
        marginBottom,
        paddingLeft,
        paddingRight,
        paddingTop,
        paddingBottom,
        borderWidth,
        borderColor,
        flexDirection: iconPositionLeft ? "row-reverse" : "row",
        justifyContent,
        alignItems
      }}
    >
      <View style={{
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center"
      }}>
        {
          icon
            ? (
              iconUri
                ? (
                  <Image
                    source={{ uri: icon }}
                    style={{
                      width: iconWidth,
                      height: iconHeight,
                      marginRight: iconMarginRight
                    }}
                    resizeMode={"contain"}
                  />
                )
                : (
                  <Image
                    source={icon}
                    style={{
                      width: iconWidth,
                      height: iconHeight,
                      marginRight: iconMarginRight
                    }}
                    resizeMode={"contain"}
                  />
                )

            )
            : null
        }
        {
          text
            ? (
              <TextCustom
                text={text}
                color={color}
                fontSize={fontSize}
                fontFamily={fontFamily}
                fontWeight={fontWeight}
              />
            )
            : null
        }
      </View>
      {
        switchButton
          ? (
            <ToggleSwitch
              onToggle={click}
              isOn={switchActive}
              onColor={Manatee}
              offColor={Mercurysolid}
              size="small"
              animationSpeed={200}
              thumbOnStyle={{ backgroundColor: MySin }}
            />
          )
          : null
      }
    </TouchableOpacity>
  )
}
