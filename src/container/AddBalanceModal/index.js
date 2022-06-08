import React, { useContext, useEffect, useState } from "react"
import { ActivityIndicator, Image, KeyboardAvoidingView, Modal, Platform, TouchableOpacity, View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { WebView } from "react-native-webview"
import Constants from "expo-constants"
import { Fiord, Green, Manatee, MySin, SunsetOrange, White } from "../../shared/Colors"
import { styles } from "./style"
import { ButtonCustom } from "../../components/UI/ButtonCustom"
import { lang } from "../../shared/Lang"
import Context from "../../../Context"
import { HeaderCustom } from "../../components/UI/HeaderCustom"
import { PaginationCarousel } from "../../components/UI/PaginationCarousel"
import { paddingHorizontal } from "../../shared/GlobalStyle"
import { InputCustom } from "../../components/UI/InputCustom"
import { API_URL, windowWidth } from "../../shared/Const"
import { TextCustom } from "../../components/UI/TextCustom"
import { DismissKeyboard } from "../../components/DismissKeyboard"
import ImgLight from "../../assets/icon/priceunit.png"
import IconClose from "../../assets/icon/cancel.png"
import IconCard from "../../assets/icon/icon-card.png"

export const AddBalanceModal = ({ getUserProfile, handleModal }) => {

  const { countryCode } = useContext(Context)

  const [price, setPrice] = useState("")
  const [priceError, setPriceError] = useState(false)
  const [priceErrorMessage] = useState("Add Amount")
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState("")
  const [messageStatus, setMessageStatus] = useState("")
  const [loader, setLoader] = useState(false)
  const [cardsData, setCardsData] = useState(null)
  const [cardId, setCardId] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const [addCardUrl, setAddCardUrl] = useState("")

  useEffect(() => {
    (async () => {
      await getCardData()
    })()
  }, [])

  const getCardData = async () => {
    setLoader(true)
    const Token = await AsyncStorage.getItem("token")
    await axios.post(
      `${API_URL}/users/get-cards?access-token=${Token}`,
      {},
      { headers: { tokakey: "f9cbdcf0b9bc49ec15e2098127a0052997b5fda5" } }
    )
      .then(res => {
        setCardsData(
          [
            ...res?.data?.data,
            {
              "id": 3,
              "title": "Idram"
            },
            {
              "id": 4,
              "title": "Telcell"
            }
          ]
        )
        setCardId(res?.data?.data[0]?.id)
        setLoader(false)
      })
      .catch(e => console.log("e", e.response))
  }

  const handleId = (id) => setCardId(id)

  const handleAddBalance = async () => {
    const Token = await AsyncStorage.getItem("token")
    if (price > 0) {
      setPriceError(false)
      if (Token !== null) {
        if (cardId === 3) {
          setLoader(true)
          setShowMessage(false)
          await axios.post(
            `${API_URL}/users/fill-wallet-idram?access-token=${Token}`,
            { amount: price },
            { headers: { tokakey: "f9cbdcf0b9bc49ec15e2098127a0052997b5fda5" } }
          )
            .then(res => {
              if (res.status === 200) {
                setShowMessage(true)
                setAddCardUrl(res?.data?.url)
                setModalVisible(true)
              }
              setMessageStatus(res.status)
              setMessage("")
              setLoader(false)
              setPrice("")
              getUserProfile()
            })
            .catch(e => {
              setLoader(false)
              setShowMessage(true)
              setMessage(e?.response?.data?.message)
              setMessageStatus(e?.response?.data?.status)
              setPrice("")
            })
        } else if (cardId === 4) {
          setLoader(true)
          setShowMessage(false)
          await axios.post(
            `${API_URL}/users/fill-wallet-telcell?access-token=${Token}`,
            { amount: price },
            { headers: { tokakey: "f9cbdcf0b9bc49ec15e2098127a0052997b5fda5" } }
          )
            .then(res => {
              if (res.status === 200) {
                setShowMessage(true)
                setAddCardUrl(res?.data?.url)
                setModalVisible(true)
              }
              setMessageStatus(res.status)
              setMessage("")
              setLoader(false)
              setPrice("")
              getUserProfile()
            })
            .catch(e => {
              setLoader(false)
              setShowMessage(true)
              setMessage(e?.response?.data?.message)
              setMessageStatus(e?.response?.data?.status)
              setPrice("")
            })
        } else {
          setLoader(true)
          setShowMessage(false)
          await axios.post(
            `${API_URL}/users/fill-wallet?access-token=${Token}`,
            {
              user_card_id: cardId,
              amount: price
            },
            { headers: { tokakey: "f9cbdcf0b9bc49ec15e2098127a0052997b5fda5" } }
          )
            .then(res => {
              if (res.status === 200) {
                setShowMessage(true)
              }
              setMessageStatus(res.status)
              setMessage("")
              setLoader(false)
              setPrice("")
              getUserProfile()
              handleModal()
            })
            .catch(e => {
              setLoader(false)
              setShowMessage(true)
              setMessage(e?.response?.data?.message)
              setMessageStatus(e?.response?.data?.status)
              setPrice("")
            })
        }
      }
    } else {
      setPriceError(true)
    }
  }

  const handleModalWebView = () => setModalVisible(!modalVisible)

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalWebView}
      >
        <View style={{ width: windowWidth, backgroundColor: "#00a789", height: Constants.statusBarHeight, marginTop: 55 }} />
        <TouchableOpacity
          style={{ position: "absolute", top: Constants.statusBarHeight + 5, left: 0, zIndex: 1 }}
          onPress={() => handleModalWebView()}
        >
          <Image
            source={IconClose}
            style={{ width: 50, height: 50 }}
            resizeMode={"center"}
          />
        </TouchableOpacity>
        <WebView
          source={{ uri: `${addCardUrl}` }}
          onNavigationStateChange={state => {
            if (state?.url.split("/").pop() === "fail") {
              (async () => {
                handleModalWebView()
                await getCardData()
              })()
            } else if (state?.url.split("/").pop() === "success") {
              (async () => {
                handleModalWebView()
                await getCardData()
              })()
            }
          }}
        />
      </Modal>
      <HeaderCustom
        handleBack={handleModal}
        backgroundColor={MySin}
        text={lang[countryCode].titleBalance}
        borderBottomStartRadius={0}
        borderBottomEndRadius={0}
        androidModalHeader={Platform.OS !== "ios"}
      />
      <View style={styles.sliderBox}>
        {cardsData && <PaginationCarousel data={cardsData} handleId={handleId} />}
      </View>
      <DismissKeyboard>
        <KeyboardAvoidingView
          contentContainerStyle={{ flex: 1 }}
          style={{ flex: 1 }}
        >
          <View style={{ paddingHorizontal }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row"
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row"
                }}
              >
                <TextCustom
                  text={1}
                  fontWeight={"700"}
                  fontSize={16}
                  textAlign={"center"}
                  color={Fiord}
                />
                <Image source={ImgLight} style={{ width: 13, height: 13 }} />
              </View>
              <TextCustom
                text={`${lang[countryCode].costs} `}
                fontWeight={"500"}
                fontSize={16}
                textAlign={"center"}
                color={Fiord}
              />
              <TextCustom
                text={` 1 ${lang[countryCode].dram}`}
                fontWeight={"700"}
                fontSize={16}
                textAlign={"center"}
                color={Fiord}
              />
            </View>
            <InputCustom
              placeholder={lang[countryCode].money}
              value={price}
              handle={value => setPrice(value)}
              placeholderTextColor={Manatee}
              keyboardType={"numeric"}
              error={priceError}
              errorText={priceErrorMessage}
            />
            {
              showMessage
                ? (
                  <TextCustom
                    text={message}
                    fontWeight={"700"}
                    fontSize={14}
                    color={messageStatus === 200 ? Green : SunsetOrange}
                  />
                )
                : null
            }
            {
              loader
                ? <ActivityIndicator size="large" color={MySin} animating={true} style={{ marginVertical: 20 }} />
                : null
            }
          </View>
        </KeyboardAvoidingView>
      </DismissKeyboard>
      <View style={styles.buttonContainer}>
        <TextCustom
          text={lang[countryCode].yourPaymentInformationIsSecureWithUs}
          color={Manatee}
          fontSize={12}
          fontWeight={"400"}
          marginBottom={10}
        />
        <ButtonCustom
          text={lang[countryCode].add.toUpperCase()}
          backgroundColor={Fiord}
          color={MySin}
          width={"100%"}
          click={handleAddBalance}
          fontSize={18}
          fontWeight={"700"}
          icon={IconCard}
          iconWidth={18}
          iconHeight={18}
          paddingTop={Platform.OS === "ios" ? 14 : 8}
          paddingBottom={Platform.OS === "ios" ? 14 : 8}
          marginBottom={20}
          iconPositionLeft={false}
          borderRadius={10}
          borderColor={White}
          borderWidth={1}
          disabled={loader}
        />
      </View>
    </View>
  )
}
