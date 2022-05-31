import React, { useContext, useEffect, useState, useRef } from "react"
import { FlatList, Image, RefreshControl, TouchableHighlight, TouchableOpacity, View } from "react-native"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import moment from "moment"
import { styles } from "./style"
import { HeaderCustom } from "../../../components/UI/HeaderCustom"
import { Fiord, Manatee, MineShaft, MySin, White } from "../../../shared/Colors"
import { lang } from "../../../shared/Lang"
import Context from "../../../../Context"
import { TextCustom } from "../../../components/UI/TextCustom"
import { API_URL, windowWidth } from "../../../shared/Const"
import IconAmericanExpress from "../../../assets/icon/card/american-express.png"
import IconVisa from "../../../assets/icon/card/visa.png"
import IconMastercard from "../../../assets/icon/card/mastercard.png"
import IconDiscover from "../../../assets/icon/card/discover.png"
import ImgLight from "../../../assets/icon/priceunit.png"

export const HistoryScreen = ({ navigation }) => {

  const flatListRef = useRef()

  const { countryCode } = useContext(Context)

  const [loader, setLoader] = useState(false)
  const [check, setCheck] = useState(false)
  const [data, setData] = useState([])
  const [charging, setCharging] = useState([])
  const [totalPrice, setTotalPrice] = useState("")
  const [totalCharge, setTotalCharge] = useState("")

  useEffect(() => {
    return navigation.addListener("focus", async () => {
      await handleGetPaymentsData()
      await handleGetChargingData()
    })
  }, [navigation])

  const handleGetPaymentsData = async () => {
    setLoader(true)
    const Token = await AsyncStorage.getItem("token")
    if (Token !== null) {
      await axios.get(`${API_URL}/users/payments-history/?page=1&per-page=20&access-token=${Token}`,
        {
          headers: {
            tokakey: "f9cbdcf0b9bc49ec15e2098127a0052997b5fda5"
          }
        })
        .then(res => {
          setLoader(false)
          setData(res?.data?.data)
          setTotalPrice(res?.data?.total)
        })
        .catch(e => {
          setLoader(false)
          console.log("e", e.response)
        })
    }
  }

  const handleGetChargingData = async () => {
    const Token = await AsyncStorage.getItem("token")
    if (Token !== null) {
      await axios.get(`${API_URL}/users/charging-history/?page=1&per-page=20&access-token=${Token}`,
        {
          headers: {
            tokakey: "f9cbdcf0b9bc49ec15e2098127a0052997b5fda5"
          }
        })
        .then(res => {
          setCharging(res?.data?.data)
          setTotalCharge(res?.data?.total)
        })
        .catch(e => {
          setLoader(false)
          console.log("e", e)
        })
    }
  }

  const handleItemPress = (index) => flatListRef.current.scrollToIndex({ animated: true, index })

  const handleTab = () => {
    handleItemPress(0)
    setCheck(!check)
  }

  return (
    <>
      <HeaderCustom
        handleBack={() => navigation.goBack()}
        backgroundColor={MySin}
        text={lang[countryCode].history}
      />
      <View style={styles.container}>
        <View style={styles.tabBox}>
          <TouchableOpacity
            onPress={handleTab}
            style={[styles.leftTab, { backgroundColor: check ? White : Fiord }]}
          >
            <TextCustom
              text={lang[countryCode].inputs}
              color={!check ? MySin : Fiord}
              fontSize={18}
              fontWeight={"700"}
            />
          </TouchableOpacity>
          <TouchableHighlight
            onPress={handleTab}
            style={[
              styles.rightTab,
              {
                backgroundColor: !check ? White : Fiord
              }
            ]}
          >
            <TextCustom
              text={lang[countryCode].outputs}
              color={check ? MySin : Fiord}
              fontSize={19}
              fontWeight={"700"}
            />
          </TouchableHighlight>
        </View>
        {
          !check
            ? (
              <View style={styles.titleBox}>
                <TextCustom
                  text={lang[countryCode].totalPrice}
                  color={Fiord}
                  fontSize={18}
                  fontWeight={"700"}
                />
                <View style={styles.priceBox}>
                  <TextCustom
                    text={`${totalPrice === null ? 0 : totalPrice}`}
                    fontSize={14}
                    color={MySin}
                    fontWeight={"700"}
                  />
                  <Image source={ImgLight} style={{ width: 13, height: 13 }} />
                </View>
              </View>
            )
            : (
              <View style={styles.titleBox}>
                <TextCustom
                  text={lang[countryCode].totalCharge}
                  color={Fiord}
                  fontSize={18}
                  fontWeight={"700"}
                />
                <View style={styles.priceBox}>
                  <TextCustom
                    text={`${totalCharge === null ? 0 : totalCharge}`}
                    fontSize={14}
                    color={MySin}
                    fontWeight={"700"}
                  />
                  <Image source={ImgLight} style={{ width: 13, height: 13 }} />
                </View>
              </View>
            )
        }
        {
          !check
            ? (
              <FlatList
                ref={flatListRef}
                keyExtractor={item => item.id}
                data={data}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.itemContainer}>
                      <View>
                        <View
                          style={{
                            width: windowWidth / 4,
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                            padding: 5,
                            borderRadius: 5,
                            backgroundColor: Fiord
                          }}
                        >
                          <TextCustom
                            text={`${item?.amount}`}
                            color={MySin}
                            fontSize={14}
                            fontWeight={"500"}
                          />
                          <Image source={ImgLight} style={{ width: 13, height: 13 }} />
                        </View>
                        <TextCustom
                          text={item.date}
                          color={Manatee}
                          fontSize={10}
                          fontWeight={"400"}
                        />
                      </View>
                      <View
                        style={{
                          alignItems: "flex-end",
                          flexDirection: "column",
                          justifyContent: "space-between"
                        }}
                      >
                        <View style={{ marginBottom: 10 }}>
                          {
                            Number(item?.card?.title[0]) === 3 &&
                            <Image source={IconAmericanExpress} resizeMode={"cover"} style={{ width: 70, height: 50 }} />
                          }
                          {
                            Number(item?.card?.title[0]) === 4 &&
                            <Image source={IconVisa} resizeMode={"cover"} style={{ width: 70, height: 50 }} />
                          }
                          {
                            Number(item?.card?.title[0]) === 5 &&
                            <Image source={IconMastercard} resizeMode={"cover"} style={{ width: 70, height: 50 }} />
                          }
                          {
                            Number(item?.card?.title[0]) === 6 &&
                            <Image source={IconDiscover} resizeMode={"cover"} style={{ width: 70, height: 50 }} />
                          }
                        </View>
                        <TextCustom
                          text={`Card number: ${item?.card?.title}`}
                          color={MineShaft}
                          fontSize={14}
                          fontWeight={"500"}
                        />
                      </View>
                    </View>
                  )
                }}
                style={{ width: "100%" }}
                refreshControl={
                  <RefreshControl
                    refreshing={loader}
                    onRefresh={handleGetPaymentsData}
                    tintColor={MySin}
                  />
                }
              />
            )
            : (
              <FlatList
                ref={flatListRef}
                keyExtractor={item => item.id}
                data={charging}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.itemContainer}>
                      <View style={{ width: "100%" }}>
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 10
                          }}
                        >
                          <View style={{ marginBottom: 5 }}>
                            <TextCustom
                              text={lang[countryCode].stationName}
                              color={MineShaft}
                              fontSize={12}
                              fontWeight={"400"}
                            />
                            <TextCustom
                              text={item?.charge_box_title}
                              color={MineShaft}
                              fontSize={16}
                              fontWeight={"700"}
                            />
                          </View>
                          <View
                            style={{
                              width: windowWidth / 4,
                              justifyContent: "center",
                              alignItems: "center",
                              padding: 5,
                              borderRadius: 5,
                              backgroundColor: Fiord
                            }}
                          >
                            <TextCustom
                              text={`${item?.charged}${lang[countryCode].kw}`}
                              color={MySin}
                              fontSize={14}
                              fontWeight={"500"}
                            />
                          </View>
                        </View>
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 10
                          }}
                        >
                          <View style={{ marginBottom: 5 }}>
                            <TextCustom
                              text={lang[countryCode].dateAndTime}
                              color={MineShaft}
                              fontSize={12}
                              fontWeight={"400"}
                            />
                            <TextCustom
                              text={`${moment(item?.strat_time).format("DD-MM-YYYY")}   ${moment(item?.strat_time).format("HH:mm")} - ${moment(item?.end_time).format("HH:mm")} `}
                              color={MineShaft}
                              fontSize={16}
                              fontWeight={"700"}
                            />
                          </View>
                        </View>
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 10
                          }}
                        >
                          <TextCustom
                            text={lang[countryCode].payment}
                            color={MineShaft}
                            fontSize={12}
                            fontWeight={"400"}
                            marginBottom={5}
                          />
                          <View
                            style={{
                              width: windowWidth / 4,
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "row",
                              padding: 5,
                              borderRadius: 5,
                              backgroundColor: Fiord
                            }}
                          >
                            <TextCustom
                              text={`${item?.amount}`}
                              color={MySin}
                              fontSize={14}
                              fontWeight={"500"}
                            />
                            <Image source={ImgLight} style={{ width: 13, height: 13 }} />
                          </View>
                        </View>
                      </View>
                    </View>
                  )
                }}
                style={{ width: "100%" }}
                refreshControl={
                  <RefreshControl
                    refreshing={loader}
                    onRefresh={handleGetChargingData}
                    tintColor={MySin}
                  />
                }
              />
            )
        }
      </View>
    </>
  )
}