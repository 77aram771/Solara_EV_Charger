import React, { useContext, useEffect, useState } from "react"
import { Image, Modal, Platform, ScrollView, TouchableOpacity, View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import Context from "../../../../Context"
import { SwiperFlatList } from "react-native-swiper-flatlist"
import { HeaderCustom } from "../../../components/UI/HeaderCustom"
import { Black, Dandelion, Fiord, MineShaft, MySin, White } from "../../../shared/Colors"
import { styles } from "./style"
import { InfoBoxCustom } from "../../../components/UI/InfoBoxCustom"
import { API_URL, windowHeight, windowWidth } from "../../../shared/Const"
import { TextCustom } from "../../../components/UI/TextCustom"
import { ButtonCustom } from "../../../components/UI/ButtonCustom"
import { lang } from "../../../shared/Lang"
import { SmallModal } from "../../../container/SmallModal"
import IconArrow from "../../../assets/icon/arrow3.png"
import IconDirection2 from "../../../assets/icon/direction2.png"
import ImgLight from "../../../assets/icon/priceunit.png"
import ImgClose from "../../../assets/icon/icon-close.png"
import ImgDefault from "../../../assets/images/img-book-slide1.jpeg"

export const BookScreen = ({ navigation, route }) => {

  const { handleHideTabBar, location, countryCode, sumKW } = useContext(Context)

  const [imageData, setImageData] = useState(null)
  const [imageModal, setImageModal] = useState(false)
  const [modalVisibleCheckUser, setModalVisibleCheckUser] = useState(false)

  useEffect(() => {
    return navigation.addListener("focus", async () => {
      await getDetails()
      handleHideTabBar(false)
    })
  }, [navigation])

  const getDetails = async () => {
    const Token = await AsyncStorage.getItem("token")
    await axios.post(
      `${API_URL}/charge-box/details?access-token=${Token}`,
      { id: route?.params?.data[route?.params.itemId].id },
      { headers: { tokakey: "f9cbdcf0b9bc49ec15e2098127a0052997b5fda5" } }
    )
      .then(res => setImageData(res?.data?.images))
      .catch(e => console.log("e", e.response))
  }

  const handleModal = () => setImageModal(!imageModal)

  const handlePort = async (item) => {
    const Token = await AsyncStorage.getItem("token")
    if (Token === null) {
      setModalVisibleCheckUser(true)
    } else {
      if (item?.status !== "Faulted") {
        navigation.navigate("BookType", {
          item,
          address: route?.params?.data[route?.params?.itemId].address
        })
      } else if (item?.status !== "Finishing") {
        navigation.navigate("BookType", {
          item,
          address: route?.params?.data[route?.params?.itemId].address
        })
      } else {
        alert("The port is Faulted or Finishing")
      }
    }
  }

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
        visible={imageModal}
        onRequestClose={handleModal}
      >
        <View
          style={{
            width: "100%",
            backgroundColor: Black,
            justifyContent: "center",
            alignItems: "center",
            flex: 1
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 5,
              top: windowHeight / 15,
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              zIndex: 100000
            }}
            onPress={handleModal}
            activeOpacity={0}
          >
            <Image source={ImgClose} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
          <SwiperFlatList
            showPagination={true}
            paginationDefaultColor={White}
            paginationActiveColor={Dandelion}
            paginationStyle={{
              position: "absolute",
              bottom: 85
            }}
            paginationStyleItem={{
              width: 14,
              height: 14
            }}
            contentContainerStyle={{
              alignSelf: "center"
            }}
          >
            {
              imageData
                ? (
                  imageData.length > 0
                    ? (
                      imageData && imageData.map((item, index) => {
                        return (
                          <Image
                            source={{ uri: item }}
                            style={{ width: windowWidth, height: windowHeight / 3 }}
                            key={index}
                            resizeMode={"cover"}
                          />
                        )
                      })
                    )
                    : (
                      <Image
                        source={ImgDefault}
                        style={{ width: windowWidth, height: windowHeight / 3 }}
                        resizeMode={"cover"}
                      />
                    )
                )
                : null
            }
          </SwiperFlatList>
        </View>
      </Modal>
      <Modal
        // animationType="slide"
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
      <HeaderCustom
        handleBack={() => navigation.goBack()}
        backgroundColor={MySin}
        text={route.params?.data[route.params.itemId]?.title}
      />
      <ScrollView
        style={{ marginBottom: 60, top: -10, flex: 1 }}
        contentContainerStyle={{
          width: windowWidth,
          height: windowHeight
        }}
      >
        <View style={styles.sliderBox}>
          <SwiperFlatList
            showPagination={true}
            paginationDefaultColor={White}
            paginationActiveColor={Dandelion}
            paginationStyle={{
              position: "absolute",
              bottom: 85
            }}
            paginationStyleItem={{
              width: 14,
              height: 14
            }}
          >
            <TouchableOpacity onPress={handleModal}>
              {
                imageData
                  ? (
                    imageData.length > 0
                      ? (
                        imageData && imageData.map((item, index) => {
                          return (
                            <Image
                              source={{ uri: item }}
                              style={{ width: windowWidth, height: windowHeight / 3 }}
                              key={index}
                              resizeMode={"cover"}
                            />
                          )
                        })
                      )
                      : (
                        <Image
                          source={ImgDefault}
                          style={{ width: windowWidth, height: windowHeight / 3 }}
                          resizeMode={"cover"}
                        />
                      )
                  )
                  : null
              }
            </TouchableOpacity>
          </SwiperFlatList>
        </View>
        <View style={styles.bookInfoBox}>
          <InfoBoxCustom itemId={route.params.itemId} isBook={route.params.isBook} data={route.params?.data} />
          <View style={styles.typeBox}>
            <View style={[styles.typeItem, { paddingLeft: 20, borderTopWidth: 0 }]}>
              <View style={{ flexDirection: "row" }}>
                <TextCustom
                  text={`${lang[countryCode].type}`}
                  marginRight={5}
                  fontWeight={"400"}
                  color={MineShaft}
                  fontSize={16}
                />
              </View>
              <View>
                <TextCustom
                  text={`${lang[countryCode].Tariff}`}
                  marginRight={5}
                  fontWeight={"400"}
                  color={MineShaft}
                  fontSize={16}
                />
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextCustom
                  text={`${lang[countryCode].price}`}
                  fontWeight={"400"}
                  color={MineShaft}
                  fontSize={16}
                />
                <Image source={ImgLight} style={{ width: 13, height: 13, marginRight: 10 }} />
              </View>
            </View>
            {
              route.params?.data[route.params?.itemId]?.connectors.map((item, index) => {
                console.log("item?.status", item?.status)
                return (
                  <TouchableOpacity
                    onPress={() => handlePort(item)}
                    key={item.id}
                    style={styles.typeItem}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <TextCustom
                        text={`${++index}.`}
                        marginRight={5}
                        fontWeight={"400"}
                        color={MineShaft}
                        fontSize={14}
                      />
                      <Image source={{ uri: item?.status_image }} style={{ width: 20, height: 20, marginRight: 10 }} />
                      {
                        item?.status === "Faulted"
                          ? (
                            <TextCustom
                              text={`${item?.type?.title}`}
                              marginRight={5}
                              fontWeight={"400"}
                              color={"#df364b"}
                              fontSize={14}
                            />
                          )
                          : null
                      }
                      {
                        item?.status === "Finishing"
                          ? (
                            <TextCustom
                              text={`${item?.type?.title}`}
                              marginRight={5}
                              fontWeight={"400"}
                              color={"#df364b"}
                              fontSize={14}
                            />
                          )
                          : null
                      }
                      {
                        item?.status === "Available"
                          ? (
                            <TextCustom
                              text={`${item?.type?.title}`}
                              marginRight={5}
                              fontWeight={"400"}
                              color={Fiord}
                              fontSize={14}
                            />
                          )
                          : null
                      }
                      {
                        item?.status === "Preparing"
                          ? (
                            <TextCustom
                              text={`${item?.type?.title}`}
                              marginRight={5}
                              fontWeight={"400"}
                              color={"#fcb82f"}
                              fontSize={14}
                            />
                          )
                          : null
                      }
                      {
                        item?.status === "Charging"
                          ? (
                            <TextCustom
                              color={"#5ac951"}
                              text={`${item?.type?.title}`}
                              marginRight={5}
                              fontWeight={"400"}
                              fontSize={14}
                            />
                          )
                          : null
                      }
                    </View>
                    <View>
                      {
                        item?.status === "Faulted"
                          ? (
                            <TextCustom
                              text={`${item?.power} ${lang[countryCode].kw}`}
                              marginRight={5}
                              fontWeight={"400"}
                              color={"#df364b"}
                              fontSize={14}
                            />
                          )
                          : null
                      }
                      {
                        item?.status === "Finishing"
                          ? (
                            <TextCustom
                              text={`${item?.power} ${lang[countryCode].kw}`}
                              marginRight={5}
                              fontWeight={"400"}
                              color={"#df364b"}
                              fontSize={14}
                            />
                          )
                          : null
                      }
                      {
                        item?.status === "Available"
                          ? (
                            <TextCustom
                              color={Fiord}
                              text={`${item?.power} ${lang[countryCode].kw}`}
                              marginRight={5}
                              fontWeight={"400"}
                              fontSize={14}
                            />
                          )
                          : null
                      }
                      {
                        item?.status === "Preparing"
                          ? (
                            <TextCustom
                              color={"#fcb82f"}
                              text={`${item?.power} ${lang[countryCode].kw}`}
                              marginRight={5}
                              fontWeight={"400"}
                              fontSize={14}
                            />
                          )
                          : null
                      }
                      {
                        item?.status === "Charging"
                          ? (
                            <TextCustom
                              color={"#5ac951"}
                              text={`${item?.power} ${lang[countryCode].kw}`}
                              marginRight={5}
                              fontWeight={"400"}
                              fontSize={14}
                            />
                          )
                          : null
                      }
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      {
                        item?.status === "Faulted"
                          ? (
                            <TextCustom
                              text={sumKW}
                              fontWeight={"400"}
                              color={"#df364b"}
                              fontSize={14}
                            />
                          )
                          : null
                      }
                      {
                        item?.status === "Finishing"
                          ? (
                            <TextCustom
                              text={sumKW}
                              fontWeight={"400"}
                              color={"#df364b"}
                              fontSize={14}
                            />
                          )
                          : null
                      }
                      {
                        item?.status === "Available"
                          ? (
                            <TextCustom
                              color={Fiord}
                              text={sumKW}
                              fontWeight={"400"}
                              fontSize={14}
                            />
                          )
                          : null
                      }
                      {
                        item?.status === "Preparing"
                          ? (
                            <TextCustom
                              color={"#fcb82f"}
                              text={sumKW}
                              fontWeight={"400"}
                              fontSize={14}
                            />
                          )
                          : null
                      }
                      {
                        item?.status === "Charging"
                          ? (
                            <TextCustom
                              color={"#5ac951"}
                              text={sumKW}
                              fontWeight={"400"}
                              fontSize={14}
                            />
                          )
                          : null
                      }
                      <Image source={ImgLight} style={{ width: 13, height: 13, marginRight: 10 }} />
                      <Image source={IconArrow} style={{ width: 10, height: 10 }} />
                    </View>
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        {
          location !== null
            ? (
              <ButtonCustom
                text={lang[countryCode].direction.toUpperCase()}
                backgroundColor={Fiord}
                color={MySin}
                width={"100%"}
                click={() => {
                  route.params.handleStart()
                  navigation.goBack()
                }}
                fontSize={18}
                fontWeight={"700"}
                icon={IconDirection2}
                iconWidth={18}
                iconHeight={18}
                iconPositionLeft={false}
                borderRadius={10}
                marginBottom={20}
                paddingTop={Platform.OS === "ios" ? 14 : 8}
                paddingBottom={Platform.OS === "ios" ? 14 : 8}
              />
            )
            : null
        }
      </View>
    </View>
  )
}
