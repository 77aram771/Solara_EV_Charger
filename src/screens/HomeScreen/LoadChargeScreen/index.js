import React, { useContext, useEffect, useState } from "react"
import { ImageBackground, Modal, Platform, ScrollView, View } from "react-native"
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
import { API_URL, windowHeight, windowWidth } from "../../../shared/Const"
import IconCancel from "../../../assets/icon/cancel.png"
import ImgLoadBackground from "../../../assets/images/img-load-background.jpeg"

export const LoadChargeScreen = ({ navigation, route }) => {

  const { handleHideTabBar, countryCode } = useContext(Context)

  const [loader, setLoader] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  const handleProgress = async () => {
    const Token = await AsyncStorage.getItem("token")
    await axios.post(
      `${API_URL}/charge-box/start?access-token=${Token}`,
      {
        transaction_id: route.params.transaction_id
      },
      {
        headers: {
          tokakey: "f9cbdcf0b9bc49ec15e2098127a0052997b5fda5"
        }
      })
      .then(res => {
        setLoader(false)
        // navigation.goBack()
        console.log("res handleStop", res.data)
      })
      .catch(e => {
        console.log("e -----------", e.response.data.message)
      })
  }

  const handleStop = async () => {
    const Token = await AsyncStorage.getItem("token")
    await axios.post(
      `${API_URL}/charge-box/start?access-token=${Token}`,
      {
        transaction_id: route.params.transaction_id
      },
      {
        headers: {
          tokakey: "f9cbdcf0b9bc49ec15e2098127a0052997b5fda5"
        }
      })
      .then(res => {
        setLoader(false)
        // navigation.goBack()
        console.log("res handleStop", res.data)
      })
      .catch(e => {
        console.log("e -----------", e.response.data.message)
      })
  }

  useEffect(() => {
    return navigation.addListener("focus", () => {
      handleHideTabBar(false)
    })
  }, [navigation])

  const handleModal = () => setModalVisible(!modalVisible)

  useEffect(() => {
    setInterval(() => {
      handleModal()
    }, 10000)
  }, [])

  return (
    <ImageBackground source={ImgLoadBackground} resizeMode={"cover"} style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModal}
      >
        <FullChargeModal handleModal={handleModal} navigation={navigation} />
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
          <TextCustom text={lang[countryCode].yourCarCharging} color={White} fontSize={20} fontWeight={"400"} />
          <LottieView
            visible={true}
            // overlayColor="rgba(255,255,255,0.75)"
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
            <TextCustom text={`${lang[countryCode].electricity}:`} color={White} fontSize={14} fontWeight={"400"} />
            <TextCustom text={"25A"} color={White} fontSize={16} fontWeight={"700"} />
          </View>
          <View style={styles.infoItem}>
            <TextCustom text={`${lang[countryCode].voltage}:`} color={White} fontSize={14} fontWeight={"400"} />
            <TextCustom text={`45${lang[countryCode].kw}`} color={White} fontSize={16} fontWeight={"700"} />
          </View>
          <View style={styles.infoItem}>
            <TextCustom text={`${lang[countryCode].chargingWatt}:`} color={White} fontSize={14} fontWeight={"400"} />
            <TextCustom text={`22${lang[countryCode].kw}`} color={White} fontSize={16} fontWeight={"700"} />
          </View>
          <View style={styles.infoItem}>
            <TextCustom text={`${lang[countryCode].price}:`} color={White} fontSize={14} fontWeight={"400"} />
            <TextCustom text={`19,000${lang[countryCode].dram}`} color={White} fontSize={16} fontWeight={"700"} />
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
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
        />
      </View>
    </ImageBackground>
  )
}