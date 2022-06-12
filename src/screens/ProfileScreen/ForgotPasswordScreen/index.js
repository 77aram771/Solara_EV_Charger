import React, { useContext, useEffect, useState } from "react"
import { ActivityIndicator, Platform, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { styles } from "./style"
import { Fiord, Green, Manatee, MineShaft, MySin, SunsetOrange, White } from "../../../shared/Colors"
import { lang } from "../../../shared/Lang"
import Context from "../../../../Context"
import { InputCustom } from "../../../components/UI/InputCustom"
import { DismissKeyboard } from "../../../components/DismissKeyboard"
import { ButtonCustom } from "../../../components/UI/ButtonCustom"
import { HeaderCustom } from "../../../components/UI/HeaderCustom"
import { TextCustom } from "../../../components/UI/TextCustom"
import { ForgotPasswordApi } from "../../../store/actionsCreators/ForgotPasswordApiActionCreator"
import { regEmail } from "../../../shared/MockData"
import { API_URL } from "../../../shared/Const"
import IconEmail from "../../../assets/icon/email1.png"
import IconDirection from "../../../assets/icon/direction2.png"

export const ForgotPasswordScreen = ({ navigation }) => {

  const { countryCode } = useContext(Context)

  const dispatch = useDispatch()

  const forgotPasswordData = useSelector(state => state?.ForgotPasswordReducer.data)
  const forgotPasswordLoader = useSelector(state => state?.ForgotPasswordReducer.loading)
  const forgotPasswordError = useSelector(state => state?.ForgotPasswordReducer.error)

  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState(false)
  const [emailErrorMessage] = useState(lang[countryCode].wrongЕmail)

  useEffect(() => {
    return navigation.addListener("focus", () => {
      dispatch(ForgotPasswordApi(null))
    })
  }, [navigation])

  useEffect(() => {
    console.log("forgotPasswordData", forgotPasswordData)
    if (forgotPasswordData === 200) {
      setTimeout(() => {
        navigation.goBack()
      }, 4000)
    }
  }, [forgotPasswordData])

  const handleEmail = (value) => {
    setEmail(value)
    setEmailError(false)
  }

  const handleSend = () => {
    if (regEmail.test(email)) {
      setEmailError(false)
      dispatch(ForgotPasswordApi(`${API_URL}/auth/reset-password`, { email }))
    } else {
      setEmailError(true)
    }
  }

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <HeaderCustom
          handleBack={() => navigation.goBack()}
          backgroundColor={MySin}
          text={lang[countryCode].changePasswordTitle}
        />
        <View style={styles.mineBox}>
          <View style={{ width: "100%" }}>
            <TextCustom
              text={lang[countryCode].writeYourEmailAddressAndFollowTheMarkedFootprints}
              fontSize={14}
              color={MineShaft}
              fontWeight={"400"}
              textAlign={"left"}
              marginTop={50}
              marginBottom={15}
            />
          </View>
          <InputCustom
            placeholder={lang[countryCode].email}
            value={email}
            handle={value => handleEmail(value)}
            placeholderTextColor={Manatee}
            icon={IconEmail}
            keyboardType={"email-address"}
            iconWidth={25}
            iconHeight={25}
            error={emailError}
            errorText={emailErrorMessage}
          />
          {
            forgotPasswordLoader
              ? (
                <ActivityIndicator size="large" color={MySin} animating={true} style={{ marginVertical: 20 }} />
              )
              : null
          }
          {
            forgotPasswordError
              ? (
                <TextCustom text={forgotPasswordError} color={SunsetOrange} fontSize={14} fontWeight={"500"} />
              )
              : null
          }
          {
            forgotPasswordData
              ? (
                <TextCustom
                  text={lang[countryCode].yourNewPasswordSentYourEmail}
                  color={Green}
                  fontSize={14}
                  fontWeight={"500"}
                />
              )
              : null
          }
          <ButtonCustom
            text={lang[countryCode].send}
            backgroundColor={Fiord}
            color={MySin}
            width={"100%"}
            paddingTop={Platform.OS === "ios" ? 14 : 8}
            paddingBottom={Platform.OS === "ios" ? 14 : 8}
            click={handleSend}
            fontSize={18}
            fontWeight={"700"}
            icon={IconDirection}
            iconWidth={18}
            iconHeight={18}
            iconPositionLeft={false}
            borderRadius={16}
            borderColor={White}
            borderWidth={1}
            marginTop={5}
            disabled={forgotPasswordLoader}
          />
        </View>
      </View>
    </DismissKeyboard>
  )
}
