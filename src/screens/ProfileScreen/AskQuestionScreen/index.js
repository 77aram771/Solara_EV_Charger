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

export const AskQuestionScreen = ({ navigation, route }) => {

  const { countryCode } = useContext(Context)

  const [name, setName] = useState(route?.params?.userData?.full_name)
  const [phone, setPhone] = useState(route?.params?.userData?.phone_number)
  const [email, setEmail] = useState(route?.params?.userData?.email)
  const [mail, setMail] = useState("")
  const [loader, setLoader] = useState(false)
  const [message, setMessage] = useState("")

  const handleSend = async () => {
    setLoader(true)
    setMessage("")
    await axios.post(
      `${API_URL}/data/ask-question`,
      {
        full_name: name,
        phone,
        email,
        message: mail
      },
      {
        headers: {
          tokakey: "f9cbdcf0b9bc49ec15e2098127a0052997b5fda5"
        }
      })
      .then(res => {
        setLoader(false)
        if (res.status) {
          setMessage("Thanks for Question")
        }
      })
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
              handle={value => setName(value)}
              placeholderTextColor={Manatee}
            />
            <InputCustom
              placeholder={lang[countryCode].phone}
              value={phone}
              handle={value => setPhone(value)}
              placeholderTextColor={Manatee}
              keyboardType={"phone-pad"}
            />
            <InputCustom
              placeholder={lang[countryCode].email}
              value={email}
              handle={value => setEmail(value)}
              placeholderTextColor={Manatee}
              keyboardType={"email-address"}
            />
            <InputCustom
              placeholder={lang[countryCode].mail}
              value={mail}
              handle={value => setMail(value)}
              placeholderTextColor={Manatee}
              multiline={true}
              numberOfLines={10}
              textAlignVertical={"top"}

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
            />
          </View>
        </ScrollView>
      </DismissKeyboard>
    </>
  )
}