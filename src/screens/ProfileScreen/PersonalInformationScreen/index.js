import React, { useContext, useState } from "react"
import { View, Platform, ActivityIndicator } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { styles } from "./style"
import { Fiord, Manatee, MySin, Silver, White } from "../../../shared/Colors"
import { ButtonCustom } from "../../../components/UI/ButtonCustom"
import { lang } from "../../../shared/Lang"
import Context from "../../../../Context"
import IconCheck from "../../../assets/icon/check2.png"
import IconPassword from "../../../assets/icon/password3.png"
import { HeaderCustom } from "../../../components/UI/HeaderCustom"
import { InputCustom } from "../../../components/UI/InputCustom"
import { DismissKeyboard } from "../../../components/DismissKeyboard"
import { API_URL } from "../../../shared/Const"
import { regName } from "../../../shared/MockData"

export const PersonalInformationScreen = ({ navigation, route }) => {

  const { countryCode } = useContext(Context)

  const [name, setName] = useState(route.params.user.full_name)
  const [nameError, setNameError] = useState(false)
  const [nameErrorMessage] = useState(lang[countryCode].wrongName)
  const [loader, setLoader] = useState(false)

  const handleName = (value) => {
    setName(value)
    if (value.length > 0) {
      if (regName.test(value)) {
        setNameError(false)
      } else {
        setNameError(true)
      }
    } else {
      setNameError(false)
    }
  }

  const handleSave = async () => {
    const Token = await AsyncStorage.getItem("token")
    if (name.length > 0) {
      setNameError(false)
      if (Token !== null) {
        setLoader(true)
        await axios.post(`${API_URL}/users/update-profile?access-token=${Token}`, {
          full_name: name
        }, {
          headers: {
            tokakey: "f9cbdcf0b9bc49ec15e2098127a0052997b5fda5"
          }
        })
          .then(res => {
            setLoader(false)
            if (res.status === 200) {
              navigation.goBack()
            }
          })
          .catch(e => {
            setLoader(false)
            console.log("e", e)
          })
      }
    } else {
      setNameError(true)
    }
  }

  return (
    <View style={styles.container}>
      <HeaderCustom
        text={lang[countryCode].personalInformation}
        backgroundColor={MySin}
        handleBack={() => navigation.goBack()}
      />
      <DismissKeyboard>
        <View style={styles.mineBox}>
          <InputCustom
            placeholder={`${lang[countryCode].name} ${lang[countryCode].surname}`}
            value={name}
            handle={value => handleName(value)}
            placeholderTextColor={Manatee}
            error={nameError}
            errorText={nameErrorMessage}
          />
          <InputCustom
            placeholder={lang[countryCode].phone}
            value={route.params.user.phone_number}
            placeholderTextColor={Manatee}
            disable={false}
            backgroundColor={Silver}
          />
          <InputCustom
            placeholder={lang[countryCode].email}
            value={route.params.user.email}
            placeholderTextColor={Manatee}
            disable={false}
            backgroundColor={Silver}
          />
          {
            loader
              ? (
                <ActivityIndicator size="large" color={MySin} animating={true} style={{ marginVertical: 20 }} />
              )
              : null
          }
          <ButtonCustom
            text={lang[countryCode].save}
            backgroundColor={Fiord}
            color={MySin}
            width={"100%"}
            marginTop={15}
            marginBottom={20}
            paddingTop={Platform.OS === "ios" ? 14 : 8}
            paddingBottom={Platform.OS === "ios" ? 14 : 8}
            click={handleSave}
            fontSize={18}
            fontWeight={"700"}
            icon={IconCheck}
            iconWidth={24}
            iconHeight={24}
            iconPositionLeft={false}
            borderRadius={12}
          />
        </View>
      </DismissKeyboard>
      <ButtonCustom
        text={lang[countryCode].changePassword}
        backgroundColor={White}
        color={Fiord}
        width={"100%"}
        marginTop={5}
        marginBottom={20}
        paddingTop={Platform.OS === "ios" ? 14 : 8}
        paddingBottom={Platform.OS === "ios" ? 14 : 8}
        click={() => navigation.navigate("ChangePassword")}
        fontSize={18}
        fontWeight={"700"}
        icon={IconPassword}
        iconWidth={24}
        iconHeight={24}
        iconPositionLeft={false}
        borderRadius={12}
        borderColor={Fiord}
        borderWidth={1}
      />
    </View>
  )
}
