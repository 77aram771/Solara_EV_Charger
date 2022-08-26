import React, { useContext, useState } from "react"
import { View, Platform, ActivityIndicator, Alert } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { styles } from "./style"
import { Fiord, Manatee, MySin, SunsetOrange } from "../../../shared/Colors"
import { ButtonCustom } from "../../../components/UI/ButtonCustom"
import { lang } from "../../../shared/Lang"
import Context from "../../../../Context"
import IconPassword from "../../../assets/icon/password2.png"
import { HeaderCustom } from "../../../components/UI/HeaderCustom"
import { InputCustom } from "../../../components/UI/InputCustom"
import { DismissKeyboard } from "../../../components/DismissKeyboard"
import { regPassword } from "../../../shared/MockData"
import { API_URL } from "../../../shared/Const"
import { TextCustom } from "../../../components/UI/TextCustom"

export const ChangePasswordScreen = ({ navigation }) => {

  const { countryCode } = useContext(Context)

  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [newPasswordError, setNewPasswordError] = useState(false)
  const [RPassword, setRPassword] = useState("")
  const [RPasswordError, setRPasswordError] = useState(false)
  const [loader, setLoader] = useState(false)
  const [showErrorMassage, setShowErrorMassage] = useState(false)

  const handlePassword = (value) => {
    setPassword(value)
    setPasswordError(false)
  }

  const handleNewPassword = (value) => {
    setNewPassword(value)
    setNewPasswordError(false)
  }

  const handleRPassword = (value) => {
    setRPassword(value)
    setRPasswordError(false)
  }

  const handleSave = async () => {
    const Token = await AsyncStorage.getItem("token")
    if (password.length > 1) {
      setPasswordError(false)
      if (regPassword.test(newPassword)) {
        setNewPasswordError(false)
        if (RPassword === newPassword) {
          setRPasswordError(false)
          if (password === newPassword) {
            setShowErrorMassage(true)
          } else {
            if (Token !== null) {
              setLoader(true)
              const myHeaders = new Headers()
              myHeaders.append("tokakey", "f9cbdcf0b9bc49ec15e2098127a0052997b5fda5")

              const formdata = new FormData()
              formdata.append("current_password", password)
              formdata.append("password", newPassword)
              formdata.append("repeat_password", RPassword)

              const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow"
              }

              fetch(`${API_URL}/users/change-password?access-token=${Token}`, requestOptions)
                .then(() => {
                  setLoader(false)
                  navigation.navigate("Profile")
                })
                .catch(e => {
                  setLoader(false)
                  Alert.alert(
                    `${e?.response?.data?.name} ${e?.response?.data?.status}`,
                    `${e?.response?.data?.message}`,
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                  );
                  console.log("e", e)
                })
            }
            setRPasswordError(false)
          }
        } else {
          setRPasswordError(true)
        }
      } else {
        setNewPasswordError(true)
      }
    } else {
      setPasswordError(true)
    }
  }

  return (
    <View style={styles.container}>
      <HeaderCustom
        text={lang[countryCode].changePassword}
        backgroundColor={MySin}
        handleBack={() => navigation.goBack("")}
      />
      <DismissKeyboard>
        <View style={styles.mineBox}>
          <InputCustom
            placeholder={lang[countryCode].password}
            value={password}
            handle={value => handlePassword(value)}
            placeholderTextColor={Manatee}
            error={passwordError}
            errorText={lang[countryCode].wrongPassword}
            secureTextEntry={true}
          />
          <InputCustom
            placeholder={lang[countryCode].newPassword}
            value={newPassword}
            handle={value => handleNewPassword(value)}
            placeholderTextColor={Manatee}
            error={newPasswordError}
            errorText={lang[countryCode].wrongPassword}
            secureTextEntry={true}
          />
          <InputCustom
            placeholder={lang[countryCode].rpassword}
            value={RPassword}
            handle={value => handleRPassword(value)}
            placeholderTextColor={Manatee}
            error={RPasswordError}
            errorText={lang[countryCode].wrongPassword}
            secureTextEntry={true}
          />
          {
            loader
              ? <ActivityIndicator size="large" color={MySin} animating={true} style={{ marginVertical: 20 }} />
              : null
          }
          {
            showErrorMassage
              ? <TextCustom text={lang[countryCode].theOldPasswordIsTheSameAsTheNewPassword} color={SunsetOrange} fontSize={14} fontWeight={"500"} />
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
            icon={IconPassword}
            iconWidth={24}
            iconHeight={24}
            iconPositionLeft={false}
            borderRadius={12}
            disabled={loader}
          />
        </View>
      </DismissKeyboard>
    </View>
  )
}
