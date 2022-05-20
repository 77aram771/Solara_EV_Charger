import React, { useContext, useEffect, useState } from "react"
import { View, Platform, Modal, TouchableOpacity, Image, RefreshControl, FlatList } from "react-native"
import axios from "axios"
import Constants from "expo-constants"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { WebView } from "react-native-webview"
import { styles } from "./style"
import { Fiord, MineShaft, MySin, White } from "../../shared/Colors"
import { ButtonCustom } from "../../components/UI/ButtonCustom"
import { lang } from "../../shared/Lang"
import Context from "../../../Context"
import { HeaderCustom } from "../../components/UI/HeaderCustom"
import { API_URL, windowWidth } from "../../shared/Const"
import { TextCustom } from "../../components/UI/TextCustom"
import { SmallModal } from "../../container/SmallModal"
import { RenderCard } from "../../components/UI/RenderCard"
import IconPlus from "../../assets/icon/plus.png"
import IconClose from "../../assets/icon/icon-close.png"

export const WalletScreen = ({ navigation }) => {

  const { countryCode } = useContext(Context)

  const [modalVisible, setModalVisible] = useState(false)
  const [modalVisibleCheckUser, setModalVisibleCheckUser] = useState(false)
  const [modalVisibleDeleteModal, setModalVisibleDeleteModal] = useState(false)
  const [addCardUrl, setAddCardUrl] = useState("")
  const [loader, setLoader] = useState(false)
  const [cardsData, setCardsData] = useState(null)
  const [cardId, setCardId] = useState("")

  useEffect(() => {
    return navigation.addListener("focus", async () => {
      const Token = await AsyncStorage.getItem("token")
      if (Token !== null) {
        setModalVisibleCheckUser(false)
      } else {
        setModalVisibleCheckUser(true)
      }
    })
  }, [navigation])

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
      {
        headers: {
          tokakey: "f9cbdcf0b9bc49ec15e2098127a0052997b5fda5"
        }
      })
      .then(res => {
        setCardsData(res?.data?.data)
        setLoader(false)
      })
      .catch(e => {
        setLoader(false)
        console.log("e", e)
      })
  }

  const handleAddCard = async () => {
    setLoader(true)
    const Token = await AsyncStorage.getItem("token")
    if (Token !== null) {
      await axios.get(`${API_URL}/users/add-card?access-token=${Token}`, {
        headers: {
          tokakey: "f9cbdcf0b9bc49ec15e2098127a0052997b5fda5"
        }
      })
        .then(res => {
          setLoader(false)
          setAddCardUrl(res?.data?.url)
          handleModal()
        })
        .catch(e => console.log("e", e.response))
    }
  }

  const handleId = (id) => {
    setCardId(id)
    handleModalDeleteModal()
  }

  const handleDelete = async (id) => {
    setLoader(true)
    const Token = await AsyncStorage.getItem("token")
    if (Token !== null) {
      await axios.post(
        `${API_URL}/users/delete-card?access-token=${Token}`,
        { id },
        {
          headers: {
            tokakey: "f9cbdcf0b9bc49ec15e2098127a0052997b5fda5"
          }
        })
        .then(res => {
          setLoader(false)
          if (res.status === 200) {
            getCardData()
          }
          handleModalDeleteModal()
        })
        .catch(e => console.log("e", e.response))
    }
  }

  const handleModal = () => setModalVisible(!modalVisible)

  const handleModalDeleteModal = () => setModalVisibleDeleteModal(!modalVisibleDeleteModal)

  const handleModalCheckUser = () => {
    setModalVisibleCheckUser(!modalVisibleCheckUser)
    navigation.navigate("Home")
  }

  const handleUserCheck = () => {
    setModalVisibleCheckUser(!modalVisibleCheckUser)
    navigation.navigate("ProfileStack")
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModal}
      >
        <View style={{ width: windowWidth, backgroundColor: "#00a789", height: Constants.statusBarHeight }} />
        <TouchableOpacity
          style={{ position: "absolute", top: Constants.statusBarHeight + 5, right: 0, zIndex: 1 }}
          onPress={() => handleModal()}
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
                handleModal()
                await getCardData()
              })()
            } else if (state?.url.split("/").pop() === "success") {
              (async () => {
                handleModal()
                await getCardData()
              })()
            }
          }}
        />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleCheckUser}
        onRequestClose={handleModalCheckUser}
      >
        <SmallModal
          handleFirstButton={handleModalCheckUser}
          titleFirstButton={lang[countryCode].cancel}
          handleSecondButton={handleUserCheck}
          titleSecondButton={lang[countryCode].logIn}
          title={lang[countryCode].pleaseLoginInProgram}
        />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleDeleteModal}
        onRequestClose={handleModalDeleteModal}
      >
        <SmallModal
          handleFirstButton={handleModalDeleteModal}
          titleFirstButton={lang[countryCode].cancel}
          handleSecondButton={() => handleDelete(cardId)}
          titleSecondButton={lang[countryCode].delete}
          title={lang[countryCode].areYouSureYouWantToDeleteTheCard}
        />
      </Modal>
      <HeaderCustom
        text={lang[countryCode].cards}
        backgroundColor={MySin}
        handleBack={() => navigation.goBack()}
        backArrowHide={false}
      />
      {
        cardsData && cardsData.length > 0
          ? (
            <FlatList
              keyExtractor={item => item.id}
              data={cardsData}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={loader}
                  onRefresh={getCardData}
                  tintColor={MySin}
                />
              }
              renderItem={({ item }) => {
                return (
                  <RenderCard
                    name={item.name}
                    title={item.title}
                    expire={item.expire}
                    key={item.id}
                    handleDelete={() => handleId(item.id)}
                  />
                )
              }}
              style={{ flex: 1 }}
              contentContainerStyle={{
                width: windowWidth,
                marginTop: 35,
                justifyContent: "flex-start",
                alignItems: "center"
              }}
            />
          )
          : <TextCustom text={lang[countryCode].noCardsAddedYet} color={MineShaft} fontSize={16} fontWeight={"700"} />
      }
      <ButtonCustom
        text={lang[countryCode].addNewCard}
        backgroundColor={White}
        color={Fiord}
        width={windowWidth / 1.1}
        marginTop={5}
        marginBottom={20}
        paddingTop={Platform.OS === "ios" ? 14 : 8}
        paddingBottom={Platform.OS === "ios" ? 14 : 8}
        click={handleAddCard}
        fontSize={18}
        fontWeight={"700"}
        icon={IconPlus}
        iconWidth={24}
        iconHeight={24}
        iconPositionLeft={false}
        borderRadius={12}
        borderColor={Fiord}
        borderWidth={2}
      />
    </View>
  )
}
