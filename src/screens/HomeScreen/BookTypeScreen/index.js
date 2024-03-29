import React, { useContext, useEffect, useState } from "react"
import { ActivityIndicator, Alert, Image, Platform, ScrollView, View } from "react-native"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Context from "../../../../Context"
import { HeaderCustom } from "../../../components/UI/HeaderCustom"
import { RangeLineCustom } from "../../../components/UI/RangeLineCustom"
import { TextCustom } from "../../../components/UI/TextCustom"
import { ButtonCustom } from "../../../components/UI/ButtonCustom"
import { Fiord, MineShaft, MySin, SunsetOrange, White } from "../../../shared/Colors"
import { styles } from "./style"
import { lang } from "../../../shared/Lang"
import { API_URL, Tokakey, windowWidth } from "../../../shared/Const"
import IconCharge from "../../../assets/icon/charge.png"
import ImgLight from "../../../assets/icon/priceunit.png"

export const BookTypeScreen = ({ navigation, route }) => {

  const { handleHideTabBar, countryCode, sumKW } = useContext(Context)

  const [loader, setLoader] = useState(false)
  const [loaderGetUser, setLoaderGetUser] = useState(false)
  const [user, setUser] = useState(false)
  const [price, setPrice] = useState(0)
  const [checkMin, setCheckMin] = useState(0)
  const [checkMax, setCheckMax] = useState(100)
  const [limit, setLimit] = useState(0)
  const [km, setKm] = useState(0)
  const [timeH, setTimeH] = useState(0)
  const [timeM, setTimeM] = useState(0)
  const [showErrorText, setShowErrorText] = useState(false)
  const [errorText, setErrorText] = useState("")

  useEffect(() => {
    return navigation.addListener("focus", async () => {
      handleHideTabBar(false)
      await getUserProfile()
    })
  }, [navigation])

  const getUserProfile = async () => {
    const Token = await AsyncStorage.getItem("token")
    setLoaderGetUser(true)
    if (Token !== null) {
      await axios.get(
        `${API_URL}/users/get-profile?access-token=${Token}&language=${countryCode === "ar" ? "hy" : countryCode}`,
        { headers: { tokakey: Tokakey } }
      )
        .then(res => {
          setUser(res?.data)
          setLimit(Math.ceil(res?.data?.car_capacity / 100 * (checkMax)), 1)
          setKm(res?.data?.car_power_reserve)
          setPrice(Math.floor(res?.data?.car_capacity * sumKW))
          setLoaderGetUser(false)
          const newTime = Number(res?.data?.car_capacity / res?.data?.car_max_kw).toFixed(1)
          const newTime2 = String(newTime).split(".")
          setTimeH(Number(newTime2[0]))
          setTimeM(Number(newTime2[1]))
        })
        .catch(e => {
          console.log("e --------", e.response)
          setLoaderGetUser(false)
          Alert.alert(
            `${e?.response?.data?.name} ${e?.response?.data?.status}`,
            `${e?.response?.data?.message}`,
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          )
        })
    }
  }

  const handleMin = (num) => {
    setCheckMin(num)
    setLimit(Math.ceil(user?.car_capacity / 100 * (checkMax - num)))
    setKm(Math.ceil(user?.car_power_reserve / 100 * (checkMax - num)))
    setPrice((Math.floor(Math.ceil(user?.car_capacity / 100 * (checkMax - num)), 1) * sumKW))
    if (user?.car_max_kw > route?.params?.item?.power) {
      const newTime = String(Number(Math.ceil(user?.car_capacity / 100 * (checkMax - num)) / user?.car_max_kw).toFixed(1)).split(".")
      setTimeH(Math.abs(newTime[0]))
      setTimeM(Math.abs(newTime[1]))
    } else {
      const newTime = String(Number(Math.ceil(user?.car_capacity / 100 * (checkMax - num)) / user?.car_max_kw).toFixed(1)).split(".")
      setTimeH(Math.abs(newTime[0]))
      setTimeM(Math.abs(newTime[1]))
    }
  }

  const handleMax = (num) => {
    setCheckMax(num)
    setLimit(Math.ceil(user?.car_capacity / 100 * (num - checkMin)))
    setKm(Math.ceil(user?.car_power_reserve / 100 * (num - checkMin)))
    setPrice((Math.floor(Math.ceil(user?.car_capacity / 100 * (num - checkMin)), 1) * sumKW))
    if (user?.car_max_kw > route?.params?.item?.power) {
      const newTime = String(Number(Math.ceil(user?.car_capacity / 100 * (checkMin - num)) / user?.car_max_kw).toFixed(1)).split(".")
      setTimeH(Math.abs(newTime[0]))
      setTimeM(Math.abs(newTime[1]))
    } else {
      const newTime = String(Number(Math.ceil(user?.car_capacity / 100 * (checkMin - num)) / user?.car_max_kw).toFixed(1)).split(".")
      console.log("newTime 2", newTime)
      console.log("Number(newTime[0])", Math.abs(newTime[0]))
      console.log("Number(newTime[1])", Number(newTime[1]))
      setTimeH(Math.abs(newTime[0]))
      setTimeM(Math.abs(newTime[1]))
    }
  }

  const handleChanger = async () => {
    setShowErrorText(false)
    setLoader(true)
    const Token = await AsyncStorage.getItem("token")
    if(Token !== null) {
      await axios.post(
        `${API_URL}/charge-box/start?access-token=${Token}&language=${countryCode === "ar" ? "hy" : countryCode}`,
        {
          connector_id: route?.params?.item?.id,
          from_percent: checkMin,
          to_percent: checkMax
        },
        { headers: { tokakey: Tokakey } }
      )
        .then(res => {
          setLoader(false)
          AsyncStorage.setItem("transaction_id", res?.data?.transaction_id.toString())
          navigation.navigate("LoadCharge", {
            chargingLimit: limit,
            chargingWatt: user?.car_max_kw > route?.params?.item?.power ? Math.floor(limit / user?.car_max_kw) : Math.floor(limit / route?.params?.item?.power),
            price
          })
        })
        .catch(e => {
          console.log("e ----------- 8989", e.response.data.message)
          setLoader(false)
          setErrorText(e.response.data.message)
          setShowErrorText(true)
        })
    }
  }

  return (
    <View style={styles.container}>
      <HeaderCustom
        handleBack={() => navigation.goBack()}
        backgroundColor={MySin}
        text={""}
        borderBottomEndRadius={0}
        borderBottomStartRadius={0}
      />
      <View style={styles.sliderBox}>
        <Image
          source={{ uri: route?.params?.item?.status_image }}
          style={{ width: 70, height: 70, marginBottom: 10 }}
          resizeMode={"cover"}
        />
        <View style={{ width: windowWidth / 1.2, marginBottom: 10 }}>
          <TextCustom
            text={route?.params?.address}
            color={White}
            fontSize={24}
            fontWeight={"700"}
            textAlign={"center"}
          />
        </View>
        <View style={styles.bookInfoBox}>
          <TextCustom
            text={`${route?.params?.item?.type?.title}`}
            fontSize={14}
            color={MineShaft}
            fontWeight={"400"}
          />
        </View>
      </View>
      <ScrollView
        style={{ marginBottom: 60 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          width: windowWidth
        }}
      >
        {
          loaderGetUser
            ? <ActivityIndicator size="large" color={MySin} animating={true} style={{ marginTop: 30 }} />
            : (
              <>
                <View style={styles.typeBox}>
                  <View style={[styles.typeItem, { borderTopWidth: 0 }]}>
                    <TextCustom text={lang[countryCode].Tariff} color={Fiord} fontSize={16} fontWeight={"700"} />
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <TextCustom
                        text={`${sumKW}`}
                        fontWeight={"400"}
                        color={MineShaft}
                        fontSize={14}
                      />
                      <Image source={ImgLight} style={{ width: 13, height: 13 }} />
                    </View>
                  </View>
                  <View style={styles.typeItem}>
                    <TextCustom text={lang[countryCode].maxPower} color={MineShaft} fontSize={14} fontWeight={"400"} />
                    <TextCustom
                      text={`${route?.params?.item?.power} ${lang[countryCode].kw}`}
                      color={MineShaft}
                      fontSize={14}
                      fontWeight={"400"}
                    />
                  </View>
                  <View style={styles.typeItem}>
                    <TextCustom text={lang[countryCode].yourCar} color={MineShaft} fontSize={14} fontWeight={"400"} />
                    <TextCustom
                      text={`${user?.car_make_name || "-"}${user?.car_model_name || "-"}`}
                      color={MineShaft}
                      fontSize={14}
                      fontWeight={"400"}
                    />
                  </View>
                  <View style={styles.typeItem}>
                    <TextCustom
                      text={lang[countryCode].approximatePrice}
                      color={MineShaft}
                      fontSize={14}
                      fontWeight={"400"}
                    />
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <TextCustom
                        text={`${price}`}
                        color={MineShaft}
                        fontSize={14}
                        fontWeight={"400"}
                      />
                      <Image source={ImgLight} style={{ width: 13, height: 13 }} />
                    </View>
                  </View>
                  <View style={styles.typeItem}>
                    <TextCustom text={lang[countryCode].fillingTime} color={MineShaft} fontSize={14} fontWeight={"400"} />
                    <TextCustom
                      text={`${timeH > 0 ? timeH : ""} ${timeH > 0 ? lang[countryCode].H : ""} ${timeM}${lang[countryCode].M}`}
                      color={MineShaft}
                      fontSize={14}
                      fontWeight={"400"}
                    />
                  </View>
                  <View style={styles.typeItem}>
                    <TextCustom
                      text={lang[countryCode].mileageIncrease}
                      color={MineShaft}
                      fontSize={14}
                      fontWeight={"400"}
                    />
                    <TextCustom
                      text={`${km} ${lang[countryCode].km}`}
                      color={MineShaft}
                      fontSize={14}
                      fontWeight={"400"}
                    />
                  </View>
                  <View style={styles.typeItem}>
                    <TextCustom
                      text={lang[countryCode].chargingLimit}
                      color={MineShaft}
                      fontSize={14}
                      fontWeight={"400"}
                    />
                    <TextCustom
                      text={`${limit}${lang[countryCode].kw}`}
                      color={MineShaft}
                      fontSize={14}
                      fontWeight={"400"}
                    />
                  </View>
                  {
                    loader
                      ? (
                        <ActivityIndicator size="large" color={MySin} animating={true} />
                      )
                      : null
                  }
                  {
                    showErrorText
                      ? (
                        <TextCustom
                          text={errorText}
                          color={SunsetOrange}
                          fontSize={14}
                          fontWeight={"500"}
                          textAlign={"center"}
                        />
                      )
                      : null
                  }
                </View>
                <View style={styles.titleBox}>
                  <TextCustom
                    text={lang[countryCode].selectChargingPercent}
                    color={MineShaft}
                    fontSize={14}
                    fontWeight={"400"}
                  />
                </View>
                <View style={styles.rangeBox}>
                  <RangeLineCustom
                    percent={true}
                    max={100}
                    min={0}
                    checkMax={checkMax}
                    checkMin={checkMin}
                    handleMin={handleMin}
                    handleMax={handleMax}
                  />
                </View>
              </>
            )
        }
      </ScrollView>
      <View style={styles.buttonContainer}>
        <ButtonCustom
          text={lang[countryCode].charge.toUpperCase()}
          backgroundColor={Fiord}
          color={MySin}
          width={"100%"}
          click={async () => await handleChanger()}
          fontSize={18}
          fontWeight={"700"}
          icon={IconCharge}
          iconWidth={18}
          iconHeight={18}
          iconPositionLeft={false}
          marginBottom={20}
          paddingTop={Platform.OS === "ios" ? 14 : 8}
          paddingBottom={Platform.OS === "ios" ? 14 : 8}
          borderRadius={10}
          disabled={loader}
        />
      </View>
    </View>
  )
}
