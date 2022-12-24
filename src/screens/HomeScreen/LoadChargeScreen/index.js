import React, { useContext, useEffect, useState } from "react"
import { Image, ImageBackground, Modal, Platform, ScrollView, View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import LottieView from "lottie-react-native"
import Context from "../../../../Context"
import { HeaderCustom } from "../../../components/UI/HeaderCustom"
import { Fiord, MySin, White } from "../../../shared/Colors"
import { styles } from "./style"
import { ButtonCustom } from "../../../components/UI/ButtonCustom"
import { lang } from "../../../shared/Lang"
import { TextCustom } from "../../../components/UI/TextCustom"
import { FullChargeModal } from "../../../container/FullChargeModal"
import { API_URL, Tokakey, windowHeight, windowWidth } from "../../../shared/Const"
import IconCancel from "../../../assets/icon/cancel.png"
import ImgLoadBackground from "../../../assets/images/img-load-background.jpeg"
import ImgLight from "../../../assets/icon/priceunit1.png"

export const LoadChargeScreen = ({ navigation, route }) => {

  const { handleHideTabBar, countryCode, sumKW } = useContext(Context)

  const [loader, setLoader] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [status, setStatus] = useState("")
  const [progress, setProgress] = useState(0)
  const [kw, setKw] = useState(0)

  const handleProgress = async () => {
    const Token = await AsyncStorage.getItem("token")
    const transactionId = await AsyncStorage.getItem("transaction_id")
    if(Token !== null) {
      await axios.post(
        `${API_URL}/charge-box/get-progress?access-token=${Token}`,
        { transaction_id: Number(transactionId) },
        { headers: { tokakey: "f9cbdcf0b9bc49ec15e2098127a0052997b5fda5" } }
      )
        .then(res => {
          setLoader(false)
          setStatus(res?.data?.status)
          setProgress(res?.data?.progress)
          setKw(res?.data?.kw)
          if (res?.data?.status === "Charging") {
            setModalVisible(true)
          }
          else if (res?.data?.status !== "Charging") {
            setModalVisible(false)
            navigation.goBack()
          }
          console.log("res handleProgress", res?.data)
        })
        .catch(e => {
          setLoader(false)
          console.log('e', e?.data)
          // Alert.alert(
          //   `${e?.response?.data?.name} ${e?.response?.data?.status}`,
          //   `${e?.response?.data?.message}`,
          //   [
          //     { text: "OK", onPress: () => console.log("OK Pressed") }
          //   ]
          // )
        })
    }
  }

  const handleStop = async () => {
    const Token = await AsyncStorage.getItem("token")
    const transactionId = await AsyncStorage.getItem("transaction_id")
    console.log("transactionId", transactionId)
    if(Token !== null) {
      await axios.post(
        `${API_URL}/charge-box/stop?access-token=${Token}`,
        { transaction_id: Number(transactionId) },
        { headers: { tokakey: Tokakey } }
      )
        .then(res => {
          setTimeout(() => {
            setLoader(false)
            if (route?.params?.bool) {
              navigation.navigate("Home")
            } else {
              navigation.navigate("Book")
            }
          }, 2000)
          console.log("res handleStop", res?.data)
        })
        .catch(e => {
          setLoader(false)
          console.log("e -----------", e.response.data.message)
          // Alert.alert(
          //   `${e?.response?.data?.name} ${e?.response?.data?.status}`,
          //   `${e?.response?.data?.message}`,
          //   [
          //     { text: "OK", onPress: () => console.log("OK Pressed") }
          //   ]
          // )
        })
    }
  }

  useEffect(() => {
    return navigation.addListener("focus", () => {
      handleHideTabBar(false)
      if (route?.params?.bool) {
        setModalVisible(true)
      }
    })
  }, [navigation])

  const handleModal = () => setModalVisible(!modalVisible)

  useEffect(() => {
    setTimeout(() => {
      setShowButton(true)
    }, 40000)
  }, [])

  useEffect(() => {
    let intervalId = (ms) => setInterval(async () => {
      await handleProgress()
    }, ms)

    intervalId(5000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <ImageBackground source={ImgLoadBackground} resizeMode={"cover"} style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModal}
      >
        <FullChargeModal
          handleModal={handleModal}
          navigation={navigation}
          status={status}
          progress={progress}
          handleStop={handleStop}
          sumKW={sumKW}
          loader={loader}
          kw={kw}
        />
      </Modal>
      <HeaderCustom
        handleBack={() => navigation.goBack()}
        backgroundColor={MySin}
        text={""}
      />
      <ScrollView
        style={{ marginBottom: 60 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.titleBox}>
          <TextCustom text={lang[countryCode].yourCarConnecting} color={White} fontSize={20} fontWeight={"400"} />
          <LottieView
            visible={true}
            source={require("../../../assets/svg/loader.json")}
            style={{
              width: windowWidth / 3,
              height: windowHeight / 6
            }}
            autoPlay
            loop
            speed={1}
          />
        </View>
        <View style={styles.infoBox}>
          <View style={styles.infoItem}>
            <TextCustom text={`${lang[countryCode].chargingWatt}:`} color={White} fontSize={14} fontWeight={"400"} />
            <TextCustom
              text={`${route?.params?.chargingWatt}${lang[countryCode].kw}`}
              color={White}
              fontSize={16}
              fontWeight={"700"}
            />
          </View>
          <View style={styles.infoItem}>
            <TextCustom text={`${lang[countryCode].chargingLimit}:`} color={White} fontSize={14} fontWeight={"400"} />
            <TextCustom
              text={`${route?.params?.chargingLimit}${lang[countryCode].kw}`}
              color={White}
              fontSize={16}
              fontWeight={"700"}
            />
          </View>
          <View style={styles.infoItem}>
            <TextCustom text={`${lang[countryCode].price}:`} color={White} fontSize={14} fontWeight={"400"} />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextCustom text={`${route?.params?.price}`} color={White} fontSize={16} fontWeight={"700"} />
              <Image source={ImgLight} style={{ width: 13, height: 13 }} />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        {
          showButton
            ? (
              <ButtonCustom
                text={lang[countryCode].cancel.toUpperCase()}
                backgroundColor={White}
                color={Fiord}
                width={"100%"}
                click={() => handleStop()}
                fontSize={18}
                fontWeight={"700"}
                icon={IconCancel}
                iconWidth={18}
                iconHeight={18}
                iconPositionLeft={false}
                borderRadius={10}
                borderColor={Fiord}
                marginBottom={20}
                paddingTop={Platform.OS === "ios" ? 14 : 8}
                paddingBottom={Platform.OS === "ios" ? 14 : 8}
                borderWidth={1}
                disabled={loader}
              />
            )
            : null
        }
      </View>
    </ImageBackground>
  )
}
