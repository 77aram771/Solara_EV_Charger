import React, { useContext, useState } from "react"
import { View, Platform, ActivityIndicator } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { styles } from "./style"
import { Fiord, Manatee, MySin } from "../../../shared/Colors"
import { ButtonCustom } from "../../../components/UI/ButtonCustom"
import { lang } from "../../../shared/Lang"
import Context from "../../../../Context"
import IconPassword from "../../../assets/icon/password2.png"
import { HeaderCustom } from "../../../components/UI/HeaderCustom"
import { InputCustom } from "../../../components/UI/InputCustom"
import { DismissKeyboard } from "../../../components/DismissKeyboard"
import { regPassword } from "../../../shared/MockData"
import { API_URL } from "../../../shared/Const"

export const ChangePasswordScreen = ({ navigation }) => {

  const { countryCode } = useContext(Context)

  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(false)
  const [passwordErrorMessage] = useState(lang[countryCode].wrongPassword)
  const [newPassword, setNewPassword] = useState("")
  const [newPasswordError, setNewPasswordError] = useState(false)
  const [newPasswordErrorMessage] = useState(lang[countryCode].wrongPassword)
  const [RPassword, setRPassword] = useState("")
  const [RPasswordError, setRPasswordError] = useState(false)
  const [RPasswordErrorMessage] = useState(lang[countryCode].wrongPassword)
  const [loader, setLoader] = useState(false)

  const handlePassword = (value) => {
    setPassword(value)
    if (value.length >= 6) {
      if (regPassword.test(value)) {
        setPasswordError(false)
      } else {
        setPasswordError(true)
      }
    } else {
      setPasswordError(false)
    }
  }

  const handleNewPassword = (value) => {
    setNewPassword(value)
    if (value.length >= 6) {
      if (regPassword.test(value)) {
        setNewPasswordError(false)
      } else {
        setNewPasswordError(true)
      }
    } else {
      setNewPasswordError(false)
    }
  }

  const handleRPassword = (value) => {
    setRPassword(value)
    if (value.length > 1) {
      if (value === newPassword) {
        setRPasswordError(false)
      } else {
        setRPasswordError(true)
      }
    } else {
      setRPasswordError(false)
    }
  }

  const handleSave = async () => {
    const Token = await AsyncStorage.getItem("token")
    if (regPassword.test(password)) {
      setPasswordError(false)
      if (regPassword.test(newPassword)) {
        setNewPasswordError(false)
        if (RPassword === newPassword) {
          setRPasswordError(false)
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
            console.log("requestOptions", requestOptions)
            fetch(`${API_URL}/users/change-password?access-token=${Token}`, requestOptions)
              .then((res) => {
                setLoader(false)
                navigation.navigate("Profile")
              })
              .catch(error => {
                setLoader(false)
                console.log("error", error)
              })
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
            errorText={passwordErrorMessage}
            secureTextEntry={true}
          />
          <InputCustom
            placeholder={lang[countryCode].newPassword}
            value={newPassword}
            handle={value => handleNewPassword(value)}
            placeholderTextColor={Manatee}
            error={newPasswordError}
            errorText={newPasswordErrorMessage}
            secureTextEntry={true}
          />
          <InputCustom
            placeholder={lang[countryCode].rpassword}
            value={RPassword}
            handle={value => handleRPassword(value)}
            placeholderTextColor={Manatee}
            error={RPasswordError}
            errorText={RPasswordErrorMessage}
            secureTextEntry={true}
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
            icon={IconPassword}
            iconWidth={24}
            iconHeight={24}
            iconPositionLeft={false}
            borderRadius={12}
          />
        </View>
      </DismissKeyboard>
    </View>
  )
}
