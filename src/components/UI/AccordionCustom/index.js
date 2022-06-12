import React from "react"
import { Image, TouchableOpacity, View } from "react-native"
import { styles } from "./style"
import { TextCustom } from "../TextCustom"
import { MineShaft } from "../../../shared/Colors"
import IconArrow from "../../../assets/icon/dropdown.png"

export const AccordionCustom = ({ title, text, active, handle }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handle} style={styles.item}>
        <View style={{width: '90%'}}>
          <TextCustom text={title} />
        </View>
        <View style={{ width: 20, alignItems: "flex-end"}}>
          <Image
            source={IconArrow}
            style={{ width: 15, height: 15, transform: [{ rotate: active ? "180deg" : "0deg" }] }}
          />
        </View>
      </TouchableOpacity>
      {
        active
          ? <TextCustom text={text} color={MineShaft} fontSize={14} fontWeight={"400"} />
          : null
      }
    </View>
  )
}