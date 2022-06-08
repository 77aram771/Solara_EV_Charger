import React, { useContext, useState } from "react"
import { ActivityIndicator, ScrollView, View } from "react-native"
import axios from "axios"
import { styles } from "./style"
import { Fiord, Green, Manatee, MySin, White } from "../../../shared/Colors"
import { HeaderCustom } from "../../../components/UI/HeaderCustom"
import { lang } from "../../../shared/Lang"
import Context from "../../../../Context"
import { ButtonCustom } from "../../../components/UI/ButtonCustom"
import { InputCustom } from "../../../components/UI/InputCustom"
import IconDirection1 from "../../../assets/icon/direction1.png"
import { DismissKeyboard } from "../../../components/DismissKeyboard"
import { API_URL } from "../../../shared/Const"
import { TextCustom } from "../../../components/UI/TextCustom"
import { regEmail, regName, regPhone } from "../../../shared/MockData"

export const AskQuestionScreen = ({ navigation, route }) => {

  const { countryCode } = useContext(Context)

  const [name, setName] = useState(route?.params?.userData?.full_name)
  const [nameError, setNameError] = useState(false)
  const [nameErrorMessage] = useState(lang[countryCode].error)
  const [phone, setPhone] = useState(route?.params?.userData?.phone_number)
  const [phoneError, setPhoneError] = useState(false)
  const [phoneErrorMessage] = useState(lang[countryCode].wrongPhone)
  const [email, setEmail] = useState(route?.params?.userData?.email)
  const [emailError, setEmailError] = useState(false)
  const [emailErrorMessage] = useState(lang[countryCode].wrongЕmail)
  const [mail, setMail] = useState("")
  const [mailError, setMailError] = useState(false)
  const [mailErrorMessage] = useState(lang[countryCode].wrongЕmail)
  const [loader, setLoader] = useState(false)
  const [message, setMessage] = useState("")

  const handleName = (value) => {
    setName(value)
    setNameError(false)
  }

  const handlePhone = (value) => {
    setPhone(value)
    setPhoneError(false)
  }

  const handleEmail = (value) => {
    setEmail(value)
    setEmailError(false)
  }

  const handleMail = (value) => {
    setMail(value)
    setMailError(false)
  }

  const handleSend = async () => {
    if (name.length > 0 && regName.test(name)) {
      setNameError(false)
      if (phone.length > 0 && regPhone.test(phone)) {
        setPhoneError(false)
        if (email.length > 0 && regEmail.test(email)) {
          setEmailError(false)
          if (mail.length > 0) {
            setMailError(false)
            setLoader(true)
            setMessage("")
            setMail("")
            await axios.post(
              `${API_URL}/data/ask-question`,
              {
                full_name: name,
                phone,
                email,
                message: mail
              },
              { headers: { tokakey: "f9cbdcf0b9bc49ec15e2098127a0052997b5fda5" } }
            )
              .then(res => {
                setLoader(false)
                if (res.status) {
                  setMessage("Thanks for Question")
                }
              })
              .catch(e => {
                console.log("e", e)
                setLoader(false)
              })
          } else {
            setMailError(true)
          }
        } else {
          setEmailError(true)
        }
      } else {
        setPhoneError(true)
      }
    } else {
      setNameError(true)
    }
  }

  return (
    <>
      <HeaderCustom
        handleBack={() => navigation.goBack()}
        backgroundColor={MySin}
        text={lang[countryCode].Ask}
      />
      <DismissKeyboard>
        <ScrollView
          style={{ flex: 1, backgroundColor: White }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.container}>
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
              value={phone}
              handle={value => handlePhone(value)}
              placeholderTextColor={Manatee}
              keyboardType={"phone-pad"}
              error={phoneError}
              errorText={phoneErrorMessage}
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
              placeholder={lang[countryCode].mail}
              value={mail}
              handle={value => handleMail(value)}
              placeholderTextColor={Manatee}
              multiline={true}
              numberOfLines={30}
              textAlignVertical={"top"}
              error={mailError}
              errorText={mailErrorMessage}
            />
            {
              loader
                ? (
                  <ActivityIndicator size="large" color={MySin} animating={true} style={{ marginVertical: 20 }} />
                )
                : null
            }
            {
              message.length > 0
                ? (
                  <TextCustom
                    text={message}
                    color={Green}
                    fontSize={14}
                    fontWeight={"500"}
                  />
                )
                : null
            }
            <ButtonCustom
              width={"100%"}
              height={35}
              backgroundColor={Fiord}
              text={lang[countryCode].send}
              fontSize={18}
              color={MySin}
              borderRadius={5}
              borderColor={Fiord}
              borderWidth={2}
              icon={IconDirection1}
              iconWidth={15}
              iconHeight={15}
              iconPositionLeft={false}
              click={handleSend}
              marginTop={40}
              disabled={loader}
            />
          </View>
        </ScrollView>
      </DismissKeyboard>
    </>
  )
}