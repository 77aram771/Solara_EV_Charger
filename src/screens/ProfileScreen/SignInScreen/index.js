import React, { useContext, useEffect, useState } from "react"
import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useDispatch, useSelector } from "react-redux"
import { styles } from "./style"
import { Fiord, Manatee, MineShaft, MySin, SunsetOrange, White } from "../../../shared/Colors"
import { lang } from "../../../shared/Lang"
import Context from "../../../../Context"
import { TitleCustom } from "../../../components/UI/TitleCustom"
import { InputCustom } from "../../../components/UI/InputCustom"
import { DismissKeyboard } from "../../../components/DismissKeyboard"
import { ButtonCustom } from "../../../components/UI/ButtonCustom"
import { TextCustom } from "../../../components/UI/TextCustom"
import { AuthSignIn } from "../../../store/actionsCreators/AuthApiActionCreator"
import { HeaderCustom } from "../../../components/UI/HeaderCustom"
import { regEmail } from "../../../shared/MockData"
import IconSolara from "../../../assets/icon/icon-solara.png"
import IconEmail from "../../../assets/icon/email1.png"
import IconPassword from "../../../assets/icon/password1.png"
import IconLogin from "../../../assets/icon/login.png"
import IconEyeClose from "../../../assets/icon/icon-dont-eye.png"
import IconEye from "../../../assets/icon/icon-eye.png"

export const SignInScreen = ({ navigation, route }) => {

  const { countryCode } = useContext(Context)

  const dispatch = useDispatch()

  const userData = useSelector(state => state?.AuthReducer.data)
  const userLoader = useSelector(state => state?.AuthReducer.loading)
  const userError = useSelector(state => state?.AuthReducer.error)

  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState(false)
  const [emailErrorMessage] = useState(lang[countryCode].wrongЕmail)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(false)
  const [showPassword, setShowPassword] = useState(true)
  const [passwordErrorMessage] = useState("please enter password")

  useEffect(() => {
    return navigation.addListener("focus", () => {
      dispatch(AuthSignIn(null))
    })
  }, [navigation])

  useEffect(() => {
    (async () => {
      const Token = await AsyncStorage.getItem("token")
      if (Token !== null) {
        navigation.goBack()
      }
    })()
  }, [userData])

  const handleEmail = (value) => {
    setEmail(value)
    setEmailError(false)
  }

  const handlePassword = (value) => {
    setPassword(value)
    setPasswordError(false)
  }

  const handleShowPassword = () => setShowPassword(!showPassword)

  const handleEnter = async () => {
    if (email.length > 0 && regEmail.test(email)) {
      setEmailError(false)
      if (password.length >= 6) {
        await route.params.handleLogIn(email, password)
        setPasswordError(false)
      } else {
        setPasswordError(true)
      }
    } else {
      setEmailError(true)
    }
  }

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <HeaderCustom
                text={""}
                backgroundColor={MySin}
                handleBack={() => navigation.goBack()}
                backArrowHide={false}
                borderBottomEndRadius={0}
                borderBottomStartRadius={0}
              />
              <View style={styles.headerBox}>
                <Image
                  source={IconSolara}
                  style={{ width: 100, height: 100, position: "absolute", bottom: -45 }}
                />
              </View>
              <View style={styles.mineBox}>
                <TitleCustom
                  text={lang[countryCode].enter}
                  fontSize={24}
                  color={Fiord}
                  marginBottom={25}
                />
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
                  disable={true}
                />
                <InputCustom
                  placeholder={lang[countryCode].password}
                  value={password}
                  handle={value => handlePassword(value)}
                  placeholderTextColor={Manatee}
                  icon={password.length > 1 ? showPassword ? IconEyeClose : IconEye : IconPassword}
                  iconWidth={25}
                  iconHeight={25}
                  iconClick={password.length > 1 ? () => handleShowPassword() : null}
                  secureTextEntry={showPassword}
                  error={passwordError}
                  errorText={passwordErrorMessage}
                  disable={true}
                />
                {
                  userLoader
                    ? (
                      <ActivityIndicator size="large" color={MySin} animating={true} style={{ marginVertical: 20 }} />
                    )
                    : null
                }
                {
                  userError
                    ? (
                      <TextCustom text={userError} color={SunsetOrange} fontSize={14} fontWeight={"500"} />
                    )
                    : null
                }
                <ButtonCustom
                  text={lang[countryCode].enter}
                  backgroundColor={Fiord}
                  color={MySin}
                  width={"100%"}
                  marginTop={5}
                  paddingTop={Platform.OS === "ios" ? 14 : 8}
                  paddingBottom={Platform.OS === "ios" ? 14 : 8}
                  click={handleEnter}
                  fontSize={18}
                  fontWeight={"700"}
                  icon={IconLogin}
                  iconWidth={18}
                  iconHeight={18}
                  iconPositionLeft={false}
                  borderRadius={16}
                  borderColor={White}
                  borderWidth={1}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate("ForgotPassword")}
                  style={{ marginTop: 20 }}
                >
                  <TextCustom
                    text={lang[countryCode].rememberPassword}
                    color={MineShaft}
                    fontSize={14}
                    textAlign={"center"}
                    fontWeight={"500"}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.footerBox} onPress={() => navigation.navigate("SignUp")}>
              <TextCustom
                text={lang[countryCode].youAreNotRegistered}
                color={MineShaft}
                fontSize={14}
                textAlign={"center"}
                fontWeight={"500"}
              />
              <TitleCustom
                text={lang[countryCode].registration}
                fontSize={24}
                color={Fiord}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </DismissKeyboard>
  )
}
