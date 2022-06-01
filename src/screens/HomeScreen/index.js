import React, { createRef, useContext, useEffect, useLayoutEffect, useState } from "react"
import { Image, Platform, TouchableOpacity, View } from "react-native"
import { Popup } from "react-native-map-link"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { styles } from "./style"
import { API_URL, windowHeight, windowWidth } from "../../shared/Const"
import Context from "../../../Context"
import { Fiord, MineShaft, MySin, White } from "../../shared/Colors"
import { TextCustom } from "../../components/UI/TextCustom"
import { lang } from "../../shared/Lang"
import { LATITUDE_DELTA, LONGITUDE_DELTA } from "../../shared/MockData"
import { ButtonCustom } from "../../components/UI/ButtonCustom"
import { InfoBoxCustom } from "../../components/UI/InfoBoxCustom"
import { useDispatch, useSelector } from "react-redux"
import { GetCarMake } from "../../store/actionsCreators/CarMakeApiActionCreator"
import { GetChargeBoxesData } from "../../store/actionsCreators/ChargeBoxesDataApiActionCreator"
import { Map } from "../../container/Map"
import IconDirection from "../../assets/icon/direction1.png"
import IconDirection2 from "../../assets/icon/direction2.png"
import IconDirection3 from "../../assets/icon/direction3.png"
import IconFilter from "../../assets/icon/filtr1.png"
import IconQr from "../../assets/icon/icon-qr.png"
import IconBook from "../../assets/icon/reserve.png"
import IconLocation from "../../assets/icon/location.png"
import IconMenuMap from "../../assets/icon/menu-map1.png"
import IconClock from "../../assets/icon/clock.png"

export const HomeScreen = ({ navigation }) => {

  const dispatch = useDispatch()

  const { location, handleLocationUser, userAddress, handleHideTabBar, countryCode } = useContext(Context)

  const _mapView = createRef()

  const [data, setData] = useState(null)
  const [itemId, setItemId] = useState(null)
  const [qrItem, setQrItem] = useState(null)
  const [km, setKm] = useState(Number)
  const [min, setMin] = useState("")
  const [start, setStart] = useState(false)
  const [checkAddress, setCheckAddress] = useState("")
  const [modalRedirect, setModalRedirect] = useState(false)
  const [cordinate, setCordinate] = useState({
    latitude: location !== null ? location?.coords?.latitude : 40.177200,
    longitude: location !== null ? location?.coords?.longitude : 44.503490,
    latitudeDelta: 8,
    longitudeDelta: LONGITUDE_DELTA + 6
  })
  const [options, setOptions] = useState({
    latitude: null,
    longitude: null,
    googleForceLatLon: false,
    alwaysIncludeGoogle: true,
    appsWhiteList: ["google-maps", "apple-maps", "waze", "yandex", "yandex-maps"],
    naverCallerName: "com.example.myapp",
    directionsMode: "car"
  })

  const chargeBoxesData = useSelector(state => state?.ChargeBoxesDataReducer.data)
  // const chargeBoxesLoader = useSelector(state => state?.ChargeBoxesDataReducer.loading)
  // const chargeBoxesError = useSelector(state => state?.ChargeBoxesDataReducer.error)

  useEffect(() => {
    return navigation.addListener("focus", async () => {
      handleHideTabBar(true)
      const transactionId = await AsyncStorage.getItem("transaction_id")
      if (transactionId !== null) {
        await handleCheckChargeProgress()
      }
    })
  }, [navigation])

  useEffect(() => {
    if (location !== null) {
      setCordinate({
        latitude: location?.coords?.latitude,
        longitude: location?.coords?.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      })
    }
  }, [location])

  useEffect(() => {
    dispatch(GetCarMake(`${API_URL}/car-make/?page=1&per-page=37&title=&language=${countryCode}`))
    dispatch(GetChargeBoxesData(`${API_URL}/charge-box/index?page=1&per-page=100&min=7&max=60&language=${countryCode}`))
  }, [countryCode])

  useLayoutEffect(() => {
    if (chargeBoxesData !== null && chargeBoxesData !== undefined) {
      if (itemId !== null) {
        setOptions(prev => {
          return (
            {
              ...prev,
              latitude: chargeBoxesData[itemId]?.latitude,
              longitude: chargeBoxesData[itemId]?.longitude
            }
          )
        })
      } else if (qrItem !== null) {
        setOptions(prev => {
          return (
            {
              ...prev,
              latitude: chargeBoxesData[qrItem]?.latitude,
              longitude: chargeBoxesData[qrItem]?.longitude
            }
          )
        })
      }
      setData(chargeBoxesData && chargeBoxesData?.data.map(item => {
        item.active = false
        return item
      }))
    }
  }, [chargeBoxesData, itemId, qrItem])

  useEffect(() => {
    if (chargeBoxesData !== null && chargeBoxesData !== undefined) {
      if (itemId !== null) {
        setCheckAddress(chargeBoxesData?.data[itemId].address)
      } else if (qrItem !== null) {
        setCheckAddress(chargeBoxesData?.data[qrItem].address)
      }
    }
  }, [chargeBoxesData, itemId, qrItem, data])

  const handleCheckChargeProgress = async () => {
    const Token = await AsyncStorage.getItem("token")
    const transactionId = await AsyncStorage.getItem("transaction_id")
    await axios.post(
      `${API_URL}/charge-box/get-progress?access-token=${Token}`,
      { transaction_id: Number(transactionId) },
      { headers: { tokakey: "f9cbdcf0b9bc49ec15e2098127a0052997b5fda5" } }
    )
      .then(async res => {
        if (res.data.status === "Charging" || res.data.kw > 0) {
          navigation.navigate("LoadCharge", { bool: true })
        }
        if (res.data.status === "Stopped") {
          await AsyncStorage.removeItem("transaction_id")
        }
      })
      .catch(e => {
        console.log("e -----------123", e.response.data.message)
      })
  }

  const getCurrentPosition = () => _mapView.current.animateToRegion(cordinate, 500)

  const handleItemId = async (e, id) => {
    e.stopPropagation()
    setItemId(id)
    setQrItem(null)
  }

  const handleQRData = async (id) => {
    const qrItemIndex = data.findIndex(item => item.id === id)
    setQrItem(qrItemIndex)
    setItemId(null)
    const qrItem = data.find(item => item.id === id)
    const newData = {
      latitude: qrItem?.lat,
      longitude: qrItem?.lng,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }
    setTimeout(() => {
      if (_mapView.current !== null) {
        getCurrentPosition(newData)
      }
    }, 2000)
  }

  const handleStart = async () => {
    if (location !== null) {
      setStart(!start)
    } else {
      await handleLocationUser()
    }
  }

  const handleRedirect = async () => {
    // await showLocation(options)
    setModalRedirect(!modalRedirect)
  }

  const handleReady = (result) => {
    setKm(result.distance)
    setMin(result.duration)
  }

  const handleReset = () => {
    setItemId(null)
    setQrItem(null)
  }

  return (
    <View style={styles.container}>
      <Popup
        isVisible={modalRedirect}
        onCancelPressed={() => handleRedirect()}
        onAppPressed={() => handleRedirect()}
        onBackButtonPressed={() => handleRedirect()}
        options={options}
        appsWhiteList={["google-maps", "apple-maps", "waze", "yandex", "yandex-maps"]}
      />
      {
        start
          ? (
            <>
              <View style={styles.addressesBox}>
                <View style={styles.iconBox}>
                  <Image source={IconLocation} style={{ width: 22, height: 22 }} />
                  <View style={styles.dot} />
                  <View style={styles.dot} />
                  <View style={styles.dot} />
                  <Image source={IconMenuMap} style={{ width: 22, height: 22 }} />
                </View>
                <View style={styles.textBox}>
                  <TextCustom text={userAddress} fontSize={14} color={MineShaft} fontWeight={"700"} />
                  <View style={styles.line} />
                  <TextCustom text={checkAddress} fontSize={14} color={MineShaft} fontWeight={"700"} />
                </View>
              </View>
              <View style={styles.somethingBox}>
                <View style={styles.clockBox}>
                  <Image source={IconClock} style={{ width: 22, height: 22, marginRight: 10 }} />
                  <TextCustom
                    text={`${Math.floor(parseInt(min))} ${lang[countryCode].min}`}
                    color={MineShaft}
                    fontSize={14}
                    fontWeight={"700"}
                  />
                </View>
                <View style={styles.clockBox}>
                  <Image source={IconDirection3} style={{ width: 22, height: 22, marginRight: 10 }} />
                  <TextCustom
                    text={`${Math.floor(km)} ${lang[countryCode].km}`}
                    color={MineShaft}
                    fontSize={14}
                    fontWeight={"700"}
                  />
                </View>
              </View>
            </>
          )
          : (
            <>
              <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.filterBox}>
                <Image source={IconFilter} style={{ width: 22, height: 22, marginRight: 10 }} />
                <TextCustom text={lang[countryCode].filter} color={Fiord} fontSize={20} fontWeight={"700"} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("QRScanner", {
                  handleQRData: (id) => handleQRData(id)
                })}
                style={styles.qrBox}
              >
                <Image source={IconQr} style={{ width: 40, height: 40 }} />
              </TouchableOpacity>
            </>
          )
      }
      <Map
        data={data}
        _mapView={_mapView}
        itemId={itemId}
        qrItem={qrItem}
        start={start}
        cordinate={cordinate}
        location={location}
        getCurrentPosition={getCurrentPosition}
        handleItemId={handleItemId}
        handleReady={handleReady}
        handleReset={handleReset}
      />
      {
        location &&
        <TouchableOpacity
          style={[styles.myLocationButtonOut, {
            bottom: start
              ? windowHeight / 12
              : itemId !== null || qrItem !== null
                ? Platform.OS === "android"
                  ? windowHeight / 3.2 : windowHeight / 3.8 : Platform.OS === "android"
                  ? windowHeight / 17
                  : windowHeight / 20
          }]}
          onPress={() => getCurrentPosition(cordinate)}
        >
          <Image source={IconDirection} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
      }
      {
        itemId !== null
          ? (
            <View style={styles.infoContainer}>

              {
                start
                  ? null
                  : (
                    <InfoBoxCustom itemId={itemId} data={data} />
                  )
              }
              {
                start
                  ? (
                    <View style={styles.buttonsBox}>
                      <ButtonCustom
                        width={windowWidth / 2.5}
                        height={35}
                        backgroundColor={White}
                        text={lang[countryCode].cancel}
                        fontSize={18}
                        color={Fiord}
                        borderRadius={5}
                        borderColor={Fiord}
                        borderWidth={2}
                        icon={IconBook}
                        iconWidth={15}
                        iconHeight={15}
                        iconPositionLeft={false}
                        click={handleStart}
                      />
                      <ButtonCustom
                        width={windowWidth / 2.5}
                        height={35}
                        backgroundColor={Fiord}
                        text={lang[countryCode].start}
                        fontSize={18}
                        color={MySin}
                        borderRadius={5}
                        borderColor={Fiord}
                        borderWidth={2}
                        icon={IconDirection2}
                        iconWidth={15}
                        iconHeight={15}
                        iconPositionLeft={false}
                        click={handleRedirect}
                      />
                    </View>
                  )
                  : (
                    <View style={styles.buttonsBox}>
                      <ButtonCustom
                        width={windowWidth / 2.5}
                        height={35}
                        backgroundColor={White}
                        text={lang[countryCode].view}
                        fontSize={18}
                        color={Fiord}
                        borderRadius={5}
                        borderColor={Fiord}
                        borderWidth={2}
                        icon={IconBook}
                        iconWidth={15}
                        iconHeight={15}
                        iconPositionLeft={false}
                        click={() => navigation.navigate("Book", {
                          itemId,
                          isBook: true,
                          data,
                          handleStart: () => handleStart()
                        })}
                      />
                      <ButtonCustom
                        width={windowWidth / 2.5}
                        height={35}
                        backgroundColor={Fiord}
                        text={lang[countryCode].direction}
                        fontSize={18}
                        color={MySin}
                        borderRadius={5}
                        borderColor={Fiord}
                        borderWidth={2}
                        icon={IconDirection2}
                        iconWidth={15}
                        iconHeight={15}
                        iconPositionLeft={false}
                        click={handleStart}
                      />
                    </View>
                  )
              }
            </View>
          )
          : null
      }
      {
        qrItem !== null
          ? (
            <View style={styles.infoContainer}>
              {
                start
                  ? null
                  : (
                    <InfoBoxCustom itemId={qrItem} data={data} />
                  )
              }
              {
                start
                  ? (
                    <View style={styles.buttonsBox}>
                      <ButtonCustom
                        width={windowWidth / 2.5}
                        height={35}
                        backgroundColor={White}
                        text={lang[countryCode].cancel}
                        fontSize={18}
                        color={Fiord}
                        borderRadius={5}
                        borderColor={Fiord}
                        borderWidth={2}
                        icon={IconBook}
                        iconWidth={15}
                        iconHeight={15}
                        iconPositionLeft={false}
                        click={handleStart}
                      />
                      <ButtonCustom
                        width={windowWidth / 2.5}
                        height={35}
                        backgroundColor={Fiord}
                        text={lang[countryCode].start}
                        fontSize={18}
                        color={MySin}
                        borderRadius={5}
                        borderColor={Fiord}
                        borderWidth={2}
                        icon={IconDirection2}
                        iconWidth={15}
                        iconHeight={15}
                        iconPositionLeft={false}
                        click={handleRedirect}
                      />
                    </View>
                  )
                  : (
                    <View style={styles.buttonsBox}>
                      <ButtonCustom
                        width={windowWidth / 2.5}
                        height={35}
                        backgroundColor={White}
                        text={lang[countryCode].view}
                        fontSize={18}
                        color={Fiord}
                        borderRadius={5}
                        borderColor={Fiord}
                        borderWidth={2}
                        icon={IconBook}
                        iconWidth={15}
                        iconHeight={15}
                        iconPositionLeft={false}
                        click={() => navigation.navigate("Book", {
                          itemId: qrItem,
                          isBook: true,
                          data,
                          handleStart: () => handleStart()
                        })}
                      />
                      <ButtonCustom
                        width={windowWidth / 2.5}
                        height={35}
                        backgroundColor={Fiord}
                        text={lang[countryCode].direction}
                        fontSize={18}
                        color={MySin}
                        borderRadius={5}
                        borderColor={Fiord}
                        borderWidth={2}
                        icon={IconDirection2}
                        iconWidth={15}
                        iconHeight={15}
                        iconPositionLeft={false}
                        click={handleStart}
                      />
                    </View>
                  )
              }
            </View>
          )
          : null
      }
    </View>
  )
}
