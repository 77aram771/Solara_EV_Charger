import React, { useContext, useEffect, useState } from "react"
import { View, Image, KeyboardAvoidingView, Platform, ScrollView, Text, ActivityIndicator } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import Checkbox from "expo-checkbox"
import { styles } from "./style"
import { Fiord, Manatee, MySin, SunsetOrange, White } from "../../../shared/Colors"
import { lang } from "../../../shared/Lang"
import Context from "../../../../Context"
import { regEmail, regName, regPassword, regPhone } from "../../../shared/MockData"
import { API_URL } from "../../../shared/Const"
import { TitleCustom } from "../../../components/UI/TitleCustom"
import { InputCustom } from "../../../components/UI/InputCustom"
import { DismissKeyboard } from "../../../components/DismissKeyboard"
import { ButtonCustom } from "../../../components/UI/ButtonCustom"
import { SelectCustom } from "../../../components/UI/SelectCustom"
import { GetCarModal } from "../../../store/actionsCreators/CarModalApiActionCreator"
import { PostSignUp } from "../../../store/actionsCreators/SignUpApiActionCreator"
import { TextCustom } from "../../../components/UI/TextCustom"
import { HeaderCustom } from "../../../components/UI/HeaderCustom"
import IconSolara from "../../../assets/icon/icon-solara.png"
import IconLogin from "../../../assets/icon/login.png"
import IconArrowDown from "../../../assets/icon/dropdown.png"
import IconEyeClose from "../../../assets/icon/icon-dont-eye.png"
import IconEye from "../../../assets/icon/icon-eye.png"

export const SignUpScreen = ({ navigation }) => {

  const { countryCode } = useContext(Context)

  const dispatch = useDispatch()

  const carMakeData = useSelector(state => state?.CarMakeReducer.data)
  const carModalData = useSelector(state => state?.CarModalReducer.data)
  // const carMakeLoader = useSelector(state => state?.CarMakeReducer.loading)
  // const carMakeError = useSelector(state => state?.CarMakeReducer.error)
  const signUpData = useSelector(state => state?.SignUpReducer.data)
  const signUpLoader = useSelector(state => state?.SignUpReducer.loading)
  const signUpError = useSelector(state => state?.SignUpReducer.error)

  const [name, setName] = useState("")
  const [nameError, setNameError] = useState(false)
  const [nameErrorMessage] = useState(lang[countryCode].wrongName)
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState(false)
  const [emailErrorMessage] = useState(lang[countryCode].wrongЕmail)
  const [phone, setPhone] = useState("+374")
  const [phoneError, setPhoneError] = useState(false)
  const [phoneErrorMessage] = useState(lang[countryCode].wrongPhone)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(lang[countryCode].wrongPassword)
  const [auto, setAuto] = useState(null)
  const [autoId, setAutoId] = useState(null)
  const [autoMaxLength, setAutoMaxLength] = useState(null)
  const [autoData, setAutoData] = useState([])
  const [autoDataError, setAutoDataError] = useState(false)
  const [autoDataErrorMessage] = useState(lang[countryCode].chooseAuto)
  const [autoModal, setAutoModal] = useState(null)
  const [autoModalId, setAutoModalId] = useState(null)
  const [autoModalData, setAutoModalData] = useState([])
  const [autoModalError, setAutoModalError] = useState(false)
  const [autoModalErrorMessage] = useState(lang[countryCode].chooseModal)
  const [isSelected, setSelection] = useState(false)
  const [isSelectedError, setIsSelectedError] = useState(false)
  const [showPassword, setShowPassword] = useState(true)

  useEffect(() => {
    const newArr = []
    setAutoMaxLength(carMakeData?._meta?.totalCount)
    carMakeData?.data.map(item => {
      const newItem = {
        label: item.title,
        value: item.title
      }
      newArr.push(newItem)
    })
    setAutoData(newArr)
  }, [carMakeData])

  useEffect(() => {
    if (auto) {
      dispatch(GetCarModal(`${API_URL}/car-model/?page=1&per-page=${autoMaxLength}&car_make_id=${autoId}&title=${auto}&language=${countryCode}`))
    }
  }, [auto])

  useEffect(() => {
    if (carModalData !== null) {
      const newArr = []
      carModalData.data.map(item => {
        const newItem = {
          label: item.title,
          value: item.title
        }
        newArr.push(newItem)
      })
      setAutoModalData(newArr)
    }
  }, [carModalData])

  useEffect(() => {
    if (signUpData !== null) {
      if (signUpData.status === 200) {
        navigation.navigate("ConfirmCode", {
          email,
          password,
          phone_number: phone,
          full_name: name,
          car_make_id: autoId,
          car_model_id: autoModalId,
          userId: signUpData?.data?.id
        })
        dispatch(PostSignUp(null))
      }
    }
  }, [signUpData])

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
    setNameError(false)
  }

  const handleEmail = (value) => {
    setEmail(value)
    setEmailError(false)
  }

  const handlePhone = (value) => {
    setPhone(value)
    setPhoneError(false)
  }

  const handlePassword = (value) => {
    setPassword(value)

    const passwordInputValue = value.trim()
    const uppercaseRegExp = /(?=.*?[A-Z])/
    const lowercaseRegExp = /(?=.*?[a-z])/
    const digitsRegExp = /(?=.*?[0-9])/
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/
    const minLengthRegExp = /.{8,}/
    const passwordLength = value.length
    const uppercasePassword = uppercaseRegExp.test(passwordInputValue)
    const lowercasePassword = lowercaseRegExp.test(passwordInputValue)
    const digitsPassword = digitsRegExp.test(passwordInputValue)
    const specialCharPassword = specialCharRegExp.test(passwordInputValue)
    const minLengthPassword = minLengthRegExp.test(passwordInputValue)
    let errMsg

    if (passwordLength === 0) {
      setPasswordError(false)
    } else if (!uppercasePassword) {
      errMsg = lang[countryCode].atLeastOneUppercase
      setPasswordError(true)
    } else if (!lowercasePassword) {
      errMsg = lang[countryCode].atLeastOneLowercase
      setPasswordError(true)
    } else if (!digitsPassword) {
      errMsg = lang[countryCode].atLeastOneDigit
      setPasswordError(true)
    } else if (!specialCharPassword) {
      errMsg = lang[countryCode].atLeastOneSpecialCharacters
      setPasswordError(true)
    } else if (!minLengthPassword) {
      errMsg = lang[countryCode].atLeastMinimumCharacters
      setPasswordError(true)
    } else {
      errMsg = ""
      setPasswordError(false)
    }
    setPasswordErrorMessage(errMsg)
  }

  const handleAuto = (value) => {
    setAuto(value)
    if (carMakeData !== null) {
      const findCar = carMakeData?.data.find(item => item?.title === value)
      setAutoId(findCar?.id)
    }
    setAutoDataError(false)
  }

  const handleAutoModel = (value) => {
    setAutoModal(value)
    if (carModalData !== null) {
      const findModal = carModalData?.data.find(item => item?.title === value)
      setAutoModalId(findModal?.id)
    }
    setAutoModalError(false)
  }

  const handleCheck = () => setSelection(!isSelected)

  const handleSignUp = () => {

    const RegObj = {
      email,
      password,
      phone_number: phone,
      full_name: name,
      car_make_id: autoId,
      car_model_id: autoModalId
    }

    if (name.length > 0) {
      setNameError(false)
      if (regEmail.test(email)) {
        setEmailError(false)
        if (regPhone.test(phone)) {
          setPhoneError(false)
          if (regPassword.test(password)) {
            setPasswordError(false)
            if (auto !== null) {
              setAutoDataError(false)
              if (autoModal !== null) {
                setAutoModalError(false)
                if (isSelected) {
                  setIsSelectedError(false)
                  dispatch(PostSignUp(`${API_URL}/auth/sign-up`, RegObj))
                  if (signUpData !== null) {
                    if (signUpData?.status === 200) {
                      navigation.navigate("ConfirmCode", {
                        email,
                        password,
                        phone_number: phone,
                        full_name: name,
                        car_make_id: autoId,
                        car_model_id: autoModalId
                      })
                    }
                  }
                } else {
                  setIsSelectedError(true)
                }
              } else {
                setAutoModalError(true)
              }
            } else {
              setAutoDataError(true)
            }
          } else {
            setPasswordError(true)
          }
        } else {
          setPhoneError(true)
        }
      } else {
        setEmailError(true)
      }
    } else {
      setNameError(true)
    }
  }

  const handleShowPassword = () => setShowPassword(!showPassword)

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
      >
        <View style={styles.container}>
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
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.mineBox}>
              <TitleCustom
                text={lang[countryCode].registration}
                fontSize={24}
                color={Fiord}
                marginBottom={25}
              />
              <InputCustom
                placeholder={`${lang[countryCode].name} ${lang[countryCode].surname}`}
                value={name}
                handle={value => handleName(value)}
                placeholderTextColor={Manatee}
                error={nameError}
                errorText={nameErrorMessage}
              />
              <InputCustom
                placeholder={lang[countryCode].email}
                value={email}
                handle={value => handleEmail(value)}
                placeholderTextColor={Manatee}
                keyboardType={"email-address"}
                error={emailError}
                errorText={emailErrorMessage}
              />
              <InputCustom
                placeholder={lang[countryCode].phone}
                value={phone}
                handle={value => handlePhone(value)}
                placeholderTextColor={Manatee}
                keyboardType={"phone-pad"}
                error={phoneError}
                errorText={phoneErrorMessage}
                // maxLength={12}
              />
              <InputCustom
                placeholder={lang[countryCode].password}
                value={password}
                handle={value => handlePassword(value)}
                placeholderTextColor={Manatee}
                icon={password.length > 0 ? showPassword ? IconEyeClose : IconEye : null}
                iconWidth={25}
                iconHeight={25}
                iconClick={password.length > 0 ? () => handleShowPassword() : null}
                secureTextEntry={showPassword}
                error={passwordError}
                errorText={passwordErrorMessage}
                disable={true}
              />
              <SelectCustom
                value={auto}
                data={autoData}
                placeholder={{
                  label: lang[countryCode].car,
                  value: null,
                  color: Manatee
                }}
                placeholderTextColor={Manatee}
                handle={value => handleAuto(value)}
                error={autoDataError}
                errorText={autoDataErrorMessage}
                icon={IconArrowDown}
                iconWidth={13}
                iconHeight={13}
              />
              <SelectCustom
                value={autoModal}
                data={autoModalData}
                placeholder={{
                  label: lang[countryCode].make,
                  value: null,
                  color: Manatee
                }}
                placeholderTextColor={Manatee}
                handle={value => handleAutoModel(value)}
                error={autoModalError}
                errorText={autoModalErrorMessage}
                icon={IconArrowDown}
                iconWidth={13}
                iconHeight={13}
              />
              <View
                style={[styles.checkboxContainer, { borderBottomWidth: !isSelectedError ? 0 : 1, borderColor: "red" }]}>
                <Checkbox
                  value={isSelected}
                  onValueChange={handleCheck}
                  style={styles.checkbox}
                />
                <Text style={styles.label}>{lang[countryCode].iAgreeWithTheRules}</Text>
              </View>
              {
                signUpLoader
                  ? (
                    <ActivityIndicator size="large" color={MySin} animating={true} style={{ marginVertical: 20 }} />
                  )
                  : null
              }
              {
                signUpError
                  ? (
                    <TextCustom text={signUpError} color={SunsetOrange} fontSize={14} fontWeight={"500"} />
                  )
                  : null
              }
              <ButtonCustom
                text={lang[countryCode].registration}
                backgroundColor={Fiord}
                color={MySin}
                width={"100%"}
                paddingTop={Platform.OS === "ios" ? 14 : 8}
                paddingBottom={Platform.OS === "ios" ? 14 : 8}
                click={handleSignUp}
                fontSize={18}
                fontWeight={"700"}
                icon={IconLogin}
                iconWidth={18}
                iconHeight={18}
                iconPositionLeft={false}
                borderRadius={16}
                borderColor={White}
                borderWidth={1}
                marginTop={5}
                disabled={signUpLoader}
              />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </DismissKeyboard>
  )
}
