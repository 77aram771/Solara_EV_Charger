import React, { useContext, useEffect, useLayoutEffect, useState } from "react"
import { View, Image, ImageBackground, Platform, Modal, ActivityIndicator, Alert, ScrollView } from "react-native"
import { useSelector } from "react-redux"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { styles } from "./style"
import { Fiord, Mercurysolid, MineShaft, MySin, White } from "../../shared/Colors"
import { ButtonCustom } from "../../components/UI/ButtonCustom"
import { AddBalanceModal } from "../../container/AddBalanceModal"
import { lang } from "../../shared/Lang"
import { API_URL, Tokakey, windowHeight, windowWidth } from "../../shared/Const"
import { TextCustom } from "../../components/UI/TextCustom"
import Context from "../../../Context"
import IconUserLogin from "../../assets/icon/menu-user1.png"
import IconMenu from "../../assets/icon/menu-setting1.png"
import ImgUserBackground from "../../assets/images/img-user-background.png"
import IconSolaraUser from "../../assets/images/img-solara-user.png"
import IconSolara from "../../assets/icon/icon-solara.png"
import IconLogOut from "../../assets/icon/log-out.png"
import IconUser from "../../assets/icon/user.png"
import IconEmail from "../../assets/icon/email2.png"
import IconHistory from "../../assets/icon/icon-history.png"
import IconNotification from "../../assets/icon/notification.png"
import ImgLight from "../../assets/icon/priceunit1.png"

export const ProfileScreen = ({ navigation }) => {

  const { countryCode, handleHideTabBar, expoPushToken, registerForPushNotificationsAsync } = useContext(Context)

  console.log("expoPushToken", expoPushToken)

  const userLoader = useSelector(state => state?.AuthReducer.loading)

  const [notificationActive, setNotificationActive] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [login, setLogin] = useState(false)
  const [user, setUser] = useState(false)

  useEffect(() => {
    return navigation.addListener("focus", async () => {
      handleHideTabBar(true)
      await getUserProfile()
    })
  }, [navigation])

  useLayoutEffect(() => {
    (async () => {
      const not = await AsyncStorage.getItem("notificationActive")
      console.log("notificationActive", not)
      if(not !== null) {
        if(expoPushToken !== undefined) {
          setNotificationActive(not !== "true")
        }
      }
      else {
        console.log("---------------------------")
        setNotificationActive(true)
      }
    })()
  }, [])

  const getUserProfile = async () => {
    const Token = await AsyncStorage.getItem("token")
    if (Token !== null) {
      setLogin(true)
      await axios.get(`${API_URL}/users/get-profile?access-token=${Token}&language=${countryCode === "ar" ? "hy" : countryCode}`,
        { headers: { tokakey: Tokakey } }
      )
        .then(res => setUser(res?.data))
        .catch(e => {
          Alert.alert(
            `${e?.response?.data?.name} ${e?.response?.data?.status}`,
            `${e?.response?.data?.message}`,
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          )
          if (e?.response?.data?.status === 401) {
            handleLogOut()
          }
        })
    } else {
      setLogin(false)
    }
  }

  const handleModal = () => setModalVisible(!modalVisible)

  const handleLogOut = async () => {
    const Token = await AsyncStorage.getItem("token")
    if (Token !== null) {
      console.log(`${API_URL}/users/register-device?access-token=${Token}`)
      axios.post(
        `${API_URL}/users/register-device?access-token=${Token}`,
        { device_id: "1", is_ios: Platform.OS === "ios" ? 1 : 0 },
        { headers: { tokakey: Tokakey } }
      )
        .then(res => {
          console.log("res =============>>>>>>>>>", res?.data)
        })
        .catch(e => console.log("e", e.data))
    }
    await AsyncStorage.removeItem("token")
    setLogin(false)
  }

  const handleNotificationSendBack = async (bool) => {
    const Token = await AsyncStorage.getItem("token")
    if(expoPushToken !== undefined) {
      axios.post(
        `${API_URL}/users/register-device?access-token=${Token}`,
        { device_id: !bool ? "000" : expoPushToken, is_ios: Platform.OS === "ios" ? 1 : 0 },
        { headers: { tokakey: Tokakey } }
      )
        .then(res => {
          console.log("res =============>>>>>>>>>", res?.data)
        })
        .catch(e => console.log("e handleNotificationSendBack", e.response))
    }
  }

  const handleNotification = async () => {
    if(expoPushToken === undefined) {
      registerForPushNotificationsAsync()
    }
    await handleNotificationSendBack(notificationActive)
    setNotificationActive(!notificationActive)
    await AsyncStorage.setItem("notificationActive", notificationActive.toString())
  }

  return (
    <View style={[styles.container, { justifyContent: "flex-start" }]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModal}
      >
        <AddBalanceModal getUserProfile={getUserProfile} handleModal={handleModal} />
      </Modal>
      <>
        {
          login
            ? (
              userLoader
                ? (
                  <View
                    style={{ justifyContent: "center", alignItems: "center", width: windowWidth, height: windowHeight }}>
                    <ActivityIndicator size="large" color={MySin} animating={true} style={{ marginVertical: 20 }} />
                  </View>
                )
                : (
                  <>
                    <ImageBackground source={ImgUserBackground} style={styles.headerBoxUser} resizeMode={"cover"}>
                      <Image
                        source={IconSolaraUser}
                        resizeMode={"contain"}
                        style={{
                          width: windowWidth / 3,
                          height: windowHeight / 8,
                          marginBottom: 10
                        }}
                      />
                      <TextCustom
                        text={user?.full_name}
                        color={White}
                        fontSize={18}
                        marginBottom={10}
                      />
                      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "baseline" }}>
                        <TextCustom
                          text={`${lang[countryCode].balance}: ${user?.amount}`}
                          color={White}
                          fontSize={16}
                          marginBottom={10}
                          marginRight={5}
                        />
                        <Image source={ImgLight} style={{ width: 13, height: 13 }} />
                      </View>
                      <ButtonCustom
                        text={lang[countryCode].topUpBalance}
                        paddingTop={10}
                        paddingBottom={10}
                        paddingRight={10}
                        paddingLeft={10}
                        borderRadius={10}
                        fontSize={13}
                        color={White}
                        backgroundColor={Fiord}
                        click={handleModal}
                      />
                    </ImageBackground>
                    <ScrollView style={{ flex: 1, width: "100%" }}>
                      <View style={styles.mineBox}>
                        <ButtonCustom
                          text={lang[countryCode].personalInformation}
                          width={"100%"}
                          backgroundColor={White}
                          borderColor={Mercurysolid}
                          color={MineShaft}
                          borderWidth={1}
                          borderRadius={18}
                          click={() => navigation.navigate("PersonalInformation", {
                            user,
                            handleLogOut: () => handleLogOut()
                          })}
                          fontSize={15}
                          fontWeight={"400"}
                          icon={IconUser}
                          iconWidth={20}
                          iconHeight={20}
                          iconPositionLeft={false}
                          justifyContent={"flex-start"}
                          paddingLeft={20}
                          paddingTop={Platform.OS === "ios" ? 14 : 8}
                          paddingBottom={Platform.OS === "ios" ? 14 : 8}
                          marginBottom={10}
                        />
                        <ButtonCustom
                          text={`${lang[countryCode].contactUs}`}
                          width={"100%"}
                          backgroundColor={White}
                          borderColor={Mercurysolid}
                          color={MineShaft}
                          borderWidth={1}
                          borderRadius={18}
                          click={() => navigation.navigate("AskQuestion")}
                          fontSize={15}
                          fontWeight={"400"}
                          icon={IconEmail}
                          iconWidth={20}
                          iconHeight={20}
                          iconPositionLeft={false}
                          justifyContent={"flex-start"}
                          paddingLeft={20}
                          paddingTop={Platform.OS === "ios" ? 14 : 8}
                          paddingBottom={Platform.OS === "ios" ? 14 : 8}
                          marginBottom={10}
                        />
                        <ButtonCustom
                          text={`${lang[countryCode].history}`}
                          width={"100%"}
                          backgroundColor={White}
                          borderColor={Mercurysolid}
                          color={MineShaft}
                          borderWidth={1}
                          borderRadius={18}
                          click={() => navigation.navigate("History")}
                          fontSize={15}
                          fontWeight={"400"}
                          icon={IconHistory}
                          iconWidth={20}
                          iconHeight={20}
                          iconPositionLeft={false}
                          justifyContent={"flex-start"}
                          paddingLeft={20}
                          paddingTop={Platform.OS === "ios" ? 14 : 8}
                          paddingBottom={Platform.OS === "ios" ? 14 : 8}
                          marginBottom={10}
                        />
                        <ButtonCustom
                          text={`${lang[countryCode].getNotification}`}
                          width={"100%"}
                          backgroundColor={White}
                          borderColor={Mercurysolid}
                          color={MineShaft}
                          borderWidth={1}
                          borderRadius={18}
                          click={handleNotification}
                          fontSize={15}
                          fontWeight={"400"}
                          icon={IconNotification}
                          iconWidth={20}
                          iconHeight={20}
                          iconPositionLeft={false}
                          justifyContent={"space-between"}
                          paddingLeft={20}
                          paddingRight={20}
                          paddingTop={Platform.OS === "ios" ? 14 : 8}
                          paddingBottom={Platform.OS === "ios" ? 14 : 8}
                          marginBottom={10}
                          switchButton={true}
                          switchActive={notificationActive}
                        />
                        <ButtonCustom
                          text={`${lang[countryCode].settings}`}
                          width={"100%"}
                          backgroundColor={White}
                          borderColor={Mercurysolid}
                          color={MineShaft}
                          borderWidth={1}
                          borderRadius={18}
                          click={() => navigation.navigate("Settings")}
                          fontSize={15}
                          fontWeight={"400"}
                          icon={IconMenu}
                          iconWidth={20}
                          iconHeight={20}
                          iconPositionLeft={false}
                          justifyContent={"flex-start"}
                          paddingLeft={20}
                          paddingTop={Platform.OS === "ios" ? 14 : 8}
                          paddingBottom={Platform.OS === "ios" ? 14 : 8}
                        />
                      </View>
                      <ButtonCustom
                        text={lang[countryCode].exit}
                        backgroundColor={White}
                        color={Fiord}
                        width={"100%"}
                        marginTop={5}
                        marginBottom={20}
                        paddingTop={Platform.OS === "ios" ? 14 : 8}
                        paddingBottom={Platform.OS === "ios" ? 14 : 8}
                        click={handleLogOut}
                        fontSize={18}
                        fontWeight={"700"}
                        icon={IconLogOut}
                        iconWidth={18}
                        iconHeight={18}
                        iconPositionLeft={false}
                        borderRadius={12}
                        borderColor={Fiord}
                        borderWidth={1}
                      />
                    </ScrollView>
                  </>
                )
            )
            : (
              <>
                <View style={styles.headerBox}>
                  <Image
                    source={IconSolara}
                    style={{
                      width: 150,
                      height: 150,
                      position: "absolute",
                      bottom: -65
                    }}
                    resizeMode={"cover"}
                  />
                </View>
                <View style={styles.mineBox}>
                  <ButtonCustom
                    text={`${lang[countryCode].signIn} / ${lang[countryCode].signUp}`}
                    width={"100%"}
                    height={50}
                    backgroundColor={White}
                    borderColor={Mercurysolid}
                    color={MineShaft}
                    borderWidth={1}
                    borderRadius={18}
                    click={() => navigation.navigate("SignIn")}
                    fontSize={18}
                    fontWeight={"400"}
                    icon={IconUserLogin}
                    iconWidth={20}
                    iconHeight={20}
                    marginBottom={20}
                    iconPositionLeft={false}
                    justifyContent={"flex-start"}
                    paddingLeft={20}
                  />
                  <ButtonCustom
                    text={`${lang[countryCode].settings}`}
                    width={"100%"}
                    height={50}
                    backgroundColor={White}
                    borderColor={Mercurysolid}
                    color={MineShaft}
                    borderWidth={1}
                    borderRadius={18}
                    click={() => navigation.navigate("Settings")}
                    fontSize={18}
                    fontWeight={"400"}
                    icon={IconMenu}
                    iconWidth={20}
                    iconHeight={20}
                    iconPositionLeft={false}
                    justifyContent={"flex-start"}
                    paddingLeft={20}
                  />
                </View>
                <View style={styles.footerBox} />
              </>
            )
        }
      </>
    </View>
  )
}
