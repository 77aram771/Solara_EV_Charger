import React, { useContext, useEffect, useState } from "react"
import { ActivityIndicator, Image, Platform, ScrollView, View } from "react-native"
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
import { API_URL, windowWidth } from "../../../shared/Const"
import IconCharge from "../../../assets/icon/charge.png"
import ImgLight from "../../../assets/icon/priceunit.png"

export const BookTypeScreen = ({ navigation, route }) => {

  const { handleHideTabBar, countryCode, sumKW } = useContext(Context)

  const [loader, setLoader] = useState(false)
  const [user, setUser] = useState(false)
  const [price, setPrice] = useState(0)
  const [checkMin, setCheckMin] = useState(0)
  const [checkMax, setCheckMax] = useState(100)
  const [limit, setLimit] = useState(0)
  const [km, setKm] = useState(0)
  const [time, setTime] = useState(0)
  const [showErrorText, setShowErrorText] = useState(false)
  const [errorText, setErrorText] = useState("")

  useEffect(() => {
    return navigation.addListener("focus", async () => {
      handleHideTabBar(false)
    })
  }, [navigation])

  useEffect(() => {
    (async () => {
      await getUserProfile()
    })()
  }, [])

  const getUserProfile = async () => {
    const Token = await AsyncStorage.getItem("token")
    console.log("Token", Token)
    if (Token !== null) {
      await axios.get(`${API_URL}/users/get-profile?access-token=${Token}`, {
        headers: {
          tokakey: "f9cbdcf0b9bc49ec15e2098127a0052997b5fda5"
        }
      })
        .then(res => {
          setUser(res.data)
          setLimit(res.data.car_capacity)
          setKm(res.data.car_power_reserve)
        })
        .catch(e => {
          console.log("e --------", e.response)
        })
    }
  }

  const handleMin = (num) => {
    setCheckMin(num)
    setLimit(Math.ceil(user?.car_capacity / 100 * (checkMax - num)), 1)
    setKm(Math.ceil(user?.car_power_reserve / 100 * (checkMax - num)), 1)
    setPrice(Math.floor(limit * sumKW))
    setTime(user?.car_max_kw > route?.params?.item?.power ? limit / user?.car_max_kw : limit / route?.params?.item?.power)
  }

  const handleMax = (num) => {
    setCheckMax(num)
    setLimit(Math.ceil(user?.car_capacity / 100 * (num - checkMin)), 1)
    setKm(Math.ceil(user?.car_power_reserve / 100 * (num - checkMin)), 1)
    setPrice(Math.floor(limit * sumKW))
    setTime(user?.car_max_kw > route?.params?.item?.power ? limit / user?.car_max_kw : limit / route?.params?.item?.power)
  }



  const handleChanger = async () => {
    setShowErrorText(false)
    setLoader(true)
    const Token = await AsyncStorage.getItem("token")
    await axios.post(
      `${API_URL}/charge-box/start?access-token=${Token}`,
      {
        connector_id: route?.params?.item?.id,
        from_percent: checkMin,
        to_percent: checkMax
      },
      {
        headers: {
          tokakey: "f9cbdcf0b9bc49ec15e2098127a0052997b5fda5"
        }
      })
      .then(res => {
        setLoader(false)
        console.log("res handleChanger", res.data)
        navigation.navigate("LoadCharge", {
          transaction_id: res.transaction_id
        })
      })
      .catch(e => {
        console.log("e -----------", e.response.data.message)
        setLoader(false)
        setErrorText(e.response.data.message)
        setShowErrorText(true)
      })
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
              text={`${user?.car_make_name}${user?.car_model_name}`}
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
              text={`${time} ${lang[countryCode].H} 45${lang[countryCode].M}`}
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
        />
      </View>
    </View>
  )
}
