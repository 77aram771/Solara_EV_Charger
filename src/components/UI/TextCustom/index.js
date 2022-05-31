import React from "react"
import { Text } from "react-native"

export const TextCustom = ({
  text,
  color,
  fontSize,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  textAlign = "left",
  fontFamily,
  fontWeight,
  wrap = false
}) => {
  return (
    <Text style={{
      fontSize,
      color,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      textAlign,
      fontFamily,
      fontWeight,
      flex: wrap ? 1 : 0,
    }}>
      {text}
    </Text>
  )
}
