import React from "react"
import { Text } from "react-native"

export const TitleCustom = ({
  text,
  color,
  marginBottom,
  marginTop,
  marginLeft,
  marginRight,
  fontSize = 16,
  textDecorationLine,
  textAlign = "center"
}) => {

  return (
    <Text
      style={{
        color,
        fontSize,
        marginBottom,
        marginTop,
        marginLeft,
        marginRight,
        textDecorationLine,
        textAlign
      }}
    >
      {text}
    </Text>
  )
}
