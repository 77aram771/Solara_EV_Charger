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
        width: "100%",
        flexWrap: "wrap",
        color,
        fontFamily: "Roboto_700Bold",
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
