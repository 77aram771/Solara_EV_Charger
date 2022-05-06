import React, { useContext, useEffect, useState } from "react"
import { View, Platform, TouchableOpacity, ActivityIndicator } from "react-native"
import { styles } from "./style"
import { Fiord, Manatee, MineShaft, MySin, SunsetOrange } from "../../../shared/Colors"
import { lang } from "../../../shared/Lang"
import Context from "../../../../Context"
import { ButtonCustom } from "../../../components/UI/ButtonCustom"
import { HeaderCustom } from "../../../components/UI/HeaderCustom"
import { InputCustom } from "../../../components/UI/InputCustom"
import { DismissKeyboard } from "../../../components/DismissKeyboard"
import { TextCustom } from "../../../components/UI/TextCustom"
import { TitleCustom } from "../../../components/UI/TitleCustom"
import IconLogin from "../../../assets/icon/login.png"
import { useDispatch, useSelector } from "react-redux"
import { PostConfirmCode } from "../../../store/actionsCreators/ConfirmCodeApiActionCreator"
import { API_URL } from "../../../shared/Const"
import { PostSignUp } from "../../../store/actionsCreators/SignUpApiActionCreator"

export const ConfirmCodeScreen = ({ navigation, route }) => {

  const { countryCode } = useContext(Context)

  const dispatch = useDispatch()

  const confirmCodeData = useSelector(state => state?.ConfirmCodeReducer.data)
  const confirmCodeLoader = useSelector(state => state?.ConfirmCodeReducer.loading)
  const confirmCodeError = useSelector(state => state?.ConfirmCodeReducer.error)

  const [code, setCode] = useState("")
  const [codeError, setCodeError] = useState(false)
  const [codeErrorMessage] = useState(lang[countryCode].wrongPassword)

  useEffect(() => {
    if (confirmCodeData !== null) {
      if (confirmCodeData.status === 200) {
        dispatch(PostConfirmCode(null))
        navigation.navigate("SignIn")
      }
    }
  }, [confirmCodeData])

  const handleCode = (value) => {
    if (value.length === 0) {
      setCodeError(false)
    } else if (value.length === 6) {
      setCodeError(false)
    } else {
      setCodeError(true)
    }
    setCode(value)
  }

  const handleConfirm = () => {
    if (code.length === 6) {
      setCodeError(false)
      dispatch(PostConfirmCode(`${API_URL}/auth/approve-account`, {
        id: route.params.userId,
        code
      }))
    } else {
      setCodeError(true)
    }
  }

  const handelSendSmsAgain = () => {
    dispatch(PostSignUp(`${API_URL}/auth/sign-up`, route.params))
  }

  return (
    <View style={styles.container}>
      <HeaderCustom
        text={lang[countryCode].confirmCode}
        backgroundColor={MySin}
        handleBack={() => navigation.goBack("")}
      />
      <DismissKeyboard>
        <View style={styles.mineBox}>
          <TitleCustom text={lang[countryCode].confirmCode} fontSize={20} color={MineShaft} marginBottom={10} />
          <TextCustom text={lang[countryCode].confirmText} color={MineShaft} fontSize={13} marginBottom={10} />
          <InputCustom
            placeholder={lang[countryCode].code}
            value={code}
            handle={value => handleCode(value)}
            placeholderTextColor={Manatee}
            error={codeError}
            errorText={codeErrorMessage}
            keyboardType={"numeric"}
          />
          {
            confirmCodeLoader
              ? (
                <ActivityIndicator size="large" color={MySin} animating={true} style={{ marginVertical: 20 }} />
              )
              : null
          }
          {
            confirmCodeError
              ? (
                <TextCustom text={confirmCodeError} color={SunsetOrange} fontSize={14} fontWeight={"500"} />
              )
              : null
          }
          <ButtonCustom
            text={lang[countryCode].confirm}
            backgroundColor={Fiord}
            color={MySin}
            width={"100%"}
            marginTop={15}
            marginBottom={20}
            paddingTop={Platform.OS === "ios" ? 14 : 8}
            paddingBottom={Platform.OS === "ios" ? 14 : 8}
            click={handleConfirm}
            fontSize={18}
            fontWeight={"700"}
            icon={IconLogin}
            iconWidth={24}
            iconHeight={24}
            iconPositionLeft={false}
            borderRadius={12}
          />
          <TouchableOpacity onPress={handelSendSmsAgain}>
            <TextCustom
              text={lang[countryCode].sendAgain}
              color={MineShaft}
              fontSize={14}
              textAlign={"center"}
              fontWeight={"500"}
            />
          </TouchableOpacity>
        </View>
      </DismissKeyboard>
    </View>
  )
}
