import React from "react"
import { View } from "react-native"
import { Fiord, MySin, White } from "../../shared/Colors"
import { ButtonCustom } from "../../components/UI/ButtonCustom"
import { windowWidth } from "../../shared/Const"
import { TextCustom } from "../../components/UI/TextCustom"
import IconCancel from "../../assets/icon/cancel.png"
import IconCheck from "../../assets/icon/check2.png"

export const SmallModal = ({ handleFirstButton, handleSecondButton, titleFirstButton, titleSecondButton, title }) => {

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <View
        style={{
          width: windowWidth / 1.1,
          backgroundColor: White,
          borderRadius: 20,
          paddingHorizontal: 20,
          paddingVertical: 20,
          justifyContent: "center",
          alignItems: "flex-start"
        }}
      >
        <View style={{ marginBottom: 15 }}>
          <TextCustom text={title} color={Fiord} fontSize={13} fontWeight={"700"} />
        </View>
        <View
          style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
        >
          <ButtonCustom
            text={titleFirstButton}
            paddingBottom={7}
            paddingTop={7}
            borderRadius={10}
            fontSize={16}
            color={Fiord}
            click={handleFirstButton}
            borderColor={Fiord}
            borderWidth={2}
            backgroundColor={White}
            width={"47%"}
            fontWeight={"700"}
            alignItems={"center"}
            icon={IconCancel}
            iconWidth={20}
            iconHeight={20}
          />
          <ButtonCustom
            text={titleSecondButton}
            paddingBottom={7}
            paddingTop={7}
            borderRadius={10}
            fontSize={16}
            color={MySin}
            click={handleSecondButton}
            borderColor={Fiord}
            borderWidth={2}
            backgroundColor={Fiord}
            width={"47%"}
            fontWeight={"700"}
            alignItems={"center"}
            icon={IconCheck}
            iconWidth={20}
            iconHeight={20}
          />
        </View>
      </View>
    </View>
  )
}
