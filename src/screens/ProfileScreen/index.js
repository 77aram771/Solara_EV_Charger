import React, { useContext, useEffect, useState } from "react"
import { View, Image, ImageBackground, Platform, Modal, ActivityIndicator } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { styles } from "./style"
import { Fiord, Mercurysolid, MineShaft, MySin, White } from "../../shared/Colors"
import { ButtonCustom } from "../../components/UI/ButtonCustom"
import { AddBalanceModal } from "../../container/AddBalanceModal"
import { lang } from "../../shared/Lang"
import { API_URL, windowHeight, windowWidth } from "../../shared/Const"
import { TextCustom } from "../../components/UI/TextCustom"
import { AuthSignIn } from "../../store/actionsCreators/AuthApiActionCreator"
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

export const ProfileScreen = ({ navigation }) => {

  const { countryCode } = useContext(Context)

  const dispatch = useDispatch()

  const userData = useSelector(state => state?.AuthReducer.data)
  const userLoader = useSelector(state => state?.AuthReducer.loading)

  const [notificationActive, setNotificationActive] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [login, setLogin] = useState(false)
  const [user, setUser] = useState(false)

  useEffect(() => {
    return navigation.addListener("focus", async () => {
      await getUserProfile()
    })
  }, [navigation, userData])

  const getUserProfile = async () => {
    const Token = await AsyncStorage.getItem("token")
    if (Token !== null) {
      setLogin(true)
      await axios.get(`${API_URL}/users/get-profile?access-token=${Token}`, {
        headers: {
          tokakey: "f9cbdcf0b9bc49ec15e2098127a0052997b5fda5"
        }
      })
        .then(res => {
          setUser(res.data)
          console.log("getUserProfile", res.data)
        })
        .catch(e => console.log("e", e))
    } else {
      setLogin(false)
    }
  }

  const handleModal = () => setModalVisible(!modalVisible)

  const handleLogIn = async (email, password) => {
    dispatch(AuthSignIn(`${API_URL}/auth/sign-in`, {
      email,
      password
    }))
  }

  const handleLogOut = async () => {
    await AsyncStorage.removeItem("token")
    setLogin(false)
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModal}
      >
        <AddBalanceModal getUserProfile={getUserProfile} handleModal={handleModal} />
      </Modal>
      {
        userLoader
          ? (
            <ActivityIndicator size="large" color={MySin} animating={true} style={{ marginVertical: 20 }} />
          )
          : (
            <>
              {
                login
                  ? (
                    <>
                      <ImageBackground source={ImgUserBackground} style={styles.headerBoxUser} resizeMode={"cover"}>
                        <Image
                          source={IconSolaraUser}
                          resizeMode={"contain"}
                          style={{
                            width: windowWidth / 3,
                            height: windowHeight / 6,
                            marginBottom: 10
                          }}
                        />
                        <TextCustom
                          text={user?.full_name}
                          color={White}
                          fontSize={18}
                          marginBottom={10}
                        />
                        <TextCustom
                          text={`${lang[countryCode].balance}: ${user?.amount} ${lang[countryCode].dram}`}
                          color={White}
                          fontSize={16}
                          marginBottom={10}
                        />
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
                            user
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
                          text={`${lang[countryCode].correspondence}`}
                          width={"100%"}
                          backgroundColor={White}
                          borderColor={Mercurysolid}
                          color={MineShaft}
                          borderWidth={1}
                          borderRadius={18}
                          click={() => navigation.navigate("AskQuestion", { userData })}
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
                          click={() => setNotificationActive(!notificationActive)}
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
                    </>
                  )
                  : (
                    <>
                      <View style={styles.headerBox}>
                        <Image source={IconSolara}
                               style={{ width: 100, height: 100, position: "absolute", bottom: -45 }} />
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
                          click={() => navigation.navigate("SignIn", {
                            login,
                            handleLogIn: (email, password) => handleLogIn(email, password)
                          })}
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
                      <View style={styles.footerBox}>

                      </View>
                    </>
                  )
              }
            </>
          )
      }
    </View>
  )
}
