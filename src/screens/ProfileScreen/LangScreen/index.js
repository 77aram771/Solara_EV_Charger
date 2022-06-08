import React, { useContext, useState } from "react"
import { Image, TouchableOpacity, View } from "react-native"
import { HeaderCustom } from "../../../components/UI/HeaderCustom"
import { MineShaft, MySin } from "../../../shared/Colors"
import { lang } from "../../../shared/Lang"
import { styles } from "./style"
import { TextCustom } from "../../../components/UI/TextCustom"
import { langData } from "../../../shared/MockData"
import Context from "../../../../Context"
import IconCheck from "../../../assets/icon/icon-check.png"

const RenderLangItem = ({ icon, title, active, handle }) => {
  return (
    <TouchableOpacity onPress={handle} style={active ? styles.langItemActive : styles.langItem}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={icon} style={{ width: 40, height: 40, marginRight: 30 }} />
        <TextCustom
          text={title}
          color={MineShaft}
          fontSize={16}
          fontWeight={"700"}
        />
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        {
          active
            ? <Image source={IconCheck} style={{ width: 25, height: 25 }} />
            : null
        }
      </View>
    </TouchableOpacity>
  )
}

export const LangScreen = ({ navigation }) => {

  const { handleCountryCode, countryCode } = useContext(Context)

  const [data, setData] = useState(langData)

  const handleActive = (id) => {
    setData(data.map(item => {
      item.active = false
      if (item.id === id) {
        handleCountryCode(item.countryCode)
        navigation.goBack()
        item.active = true
      }
      return item
    }))
  }

  return (
    <View style={styles.container}>
      <HeaderCustom
        handleBack={() => navigation.goBack()}
        backgroundColor={MySin}
        text={lang[countryCode].languageSelection}
      />
      <View style={styles.langBox}>
        {
          data.map(item => {
            return (
              <RenderLangItem
                key={item?.id}
                icon={item?.icon}
                title={item?.title}
                active={item?.active}
                handle={() => handleActive(item?.id)}
              />
            )
          })
        }
      </View>
    </View>
  )
}