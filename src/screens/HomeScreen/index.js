import React, { createRef, useContext, useEffect, useLayoutEffect, useState } from "react"
import { Image, Platform, TouchableOpacity, View } from "react-native"
import { Geojson, Marker, PROVIDER_GOOGLE } from "react-native-maps"
import MapView from "react-native-map-clustering"
import { Popup } from "react-native-map-link"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { styles } from "./style"
import { API_URL, Google_Key, windowHeight, windowWidth } from "../../shared/Const"
import { MapStyle } from "../../shared/MapStyle"
import Context from "../../../Context"
import { Dandelion, Fiord, MineShaft, MySin, White } from "../../shared/Colors"
import { TextCustom } from "../../components/UI/TextCustom"
import { lang } from "../../shared/Lang"
import { LATITUDE_DELTA, LONGITUDE_DELTA } from "../../shared/MockData"
import { ButtonCustom } from "../../components/UI/ButtonCustom"
import { InfoBoxCustom } from "../../components/UI/InfoBoxCustom"
import { RenderCluster } from "../../components/UI/RenderCluster"
import { useDispatch, useSelector } from "react-redux"
import { GetCarMake } from "../../store/actionsCreators/CarMakeApiActionCreator"
import { GetChargeBoxesData } from "../../store/actionsCreators/ChargeBoxesDataApiActionCreator"
import myPlace from "../../assets/georgia.json"
import MapViewDirections from "react-native-maps-directions"
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

  const { location, userAddress, handleHideTabBar, countryCode } = useContext(Context)

  const _mapView = createRef()

  const [data, setData] = useState(null)
  const [itemId, setItemId] = useState(null)
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

  const chargeBoxesData = useSelector(state => state?.ChargeBoxesDataReducer.data)
  // const chargeBoxesLoader = useSelector(state => state?.ChargeBoxesDataReducer.loading)
  // const chargeBoxesError = useSelector(state => state?.ChargeBoxesDataReducer.error)

  const [options, setOptions] = useState({
    latitude: null,
    longitude: null,
    googleForceLatLon: false,
    alwaysIncludeGoogle: true,
    appsWhiteList: ["google-maps", "apple-maps", "waze", "yandex", "yandex-maps"],
    naverCallerName: "com.example.myapp",
    directionsMode: "car"
  })

  useEffect(() => {
    return navigation.addListener("focus", async () => {
      handleHideTabBar(true)
      dispatch(GetChargeBoxesData(`${API_URL}/charge-box/index?page=1&per-page=100&connector_types[0]=1&min=7&max=20&language=${countryCode}`))
      await handleCheckChargeProgress()
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
    dispatch(GetCarMake(`${API_URL}/car-make/?page=1&per-page=37&title=&language=en_us`))
  }, [])

  useEffect(() => {
    dispatch(GetChargeBoxesData(null))
    dispatch(GetChargeBoxesData(`${API_URL}/charge-box/index?page=1&per-page=100&connector_types[0]=1&min=7&max=20&language=${countryCode}`))
  }, [countryCode])

  useLayoutEffect(() => {
    if (chargeBoxesData !== null && chargeBoxesData !== undefined) {
      setOptions(prev => {
        return (
          {
            ...prev,
            latitude: chargeBoxesData[itemId]?.latitude,
            longitude: chargeBoxesData[itemId]?.longitude
          }
        )
      })
      setData(chargeBoxesData && chargeBoxesData?.data.map(item => {
        item.active = false
        return item
      }))
    }
  }, [chargeBoxesData])

  useEffect(() => {
    if (chargeBoxesData !== null && chargeBoxesData !== undefined) {
      if (itemId !== null && itemId !== undefined) {
        setCheckAddress(chargeBoxesData?.data[itemId].address)
      }
    }
  }, [chargeBoxesData, itemId, data])

  // const onRegionChange = (region) => {
  //     console.log('region', region)
  // }

  const handleCheckChargeProgress = async () => {
    const Token = await AsyncStorage.getItem("token")
    const transactionId = await AsyncStorage.getItem("transaction_id")
    await axios.post(
      `${API_URL}/charge-box/get-progress?access-token=${Token}`,
      {
        transaction_id: Number(transactionId)
      },
      {
        headers: {
          tokakey: "f9cbdcf0b9bc49ec15e2098127a0052997b5fda5"
        }
      })
      .then(res => {
        if (res.data.status === "Charging" || res.data.kw > 0) {
          navigation.navigate("LoadCharge", { bool: true })
        }
        console.log("res handleCheckChargeProgress", res.data)
      })
      .catch(e => {
        console.log("e -----------123", e.response.data.message)
      })
  }

  const getCurrentPosition = () => _mapView.current.animateToRegion(cordinate, 500)

  const handleItemId = async (e, id) => {
    e.stopPropagation()
    setItemId(id)
  }

  const handleStart = () => setStart(!start)

  const handleRedirect = async () => {
    // await showLocation(options)
    setModalRedirect(!modalRedirect)
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
              <TouchableOpacity onPress={() => navigation.navigate("QRScanner")} style={styles.qrBox}>
                <Image source={IconQr} style={{ width: 40, height: 40 }} />
              </TouchableOpacity>
            </>
          )
      }
      <MapView
        // layoutAnimationConf={LayoutAnimation.Presets.easeInEaseOut}
        initialRegion={cordinate}
        onMarkersChange={(props) => {
          console.log("props", props)
        }}
        needsOffscreenAlphaCompositing={false}
        showsIndoorLevelPicker={false}
        accessibilityElementsHidden={false}
        accessible={false}
        accessibilityViewIsModal={false}
        animationEnabled={false}
        cacheEnabled={false}
        userLocationCalloutEnabled={false}
        followsUserLocation={false}
        liteMode={false}
        loadingEnabled={false}
        moveOnMarkerPress={false}
        preserveClusterPressBehavior={false} shouldRasterizeIOS={false}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        // onRegionChange={onRegionChange}
        onPress={(e) => {
          e.stopPropagation()
          if (!start) {
            setItemId(null)
          }
        }}
        ref={_mapView}
        showsScale={true}
        showsPointsOfInterest={true}
        onMapReady={getCurrentPosition}
        followUserLocation={true}
        zoomEnabled={true}
        pitchEnabled={true}
        showsCompass={true}
        showsBuildings={true}
        showsTraffic={false}
        showsIndoors={true}
        showsUserLocation={location !== null}
        showsMyLocationButton={false}
        customMapStyle={MapStyle}
        minZoomLevel={1}
        maxZoomLevel={20}
        // animationEnabled={true}
        clusteringEnabled={true}
        spiralEnabled={true}
        rotateEnabled={true}
        focusable={true}
        tracksViewChanges={true}
        renderToHardwareTextureAndroid={true}
        clusterColor={MySin}
        clusterTextColor={White}
        spiderLineColor={"#000"}
        tintColor={"red"}
        accessibilityIgnoresInvertColors={false}
        renderCluster={RenderCluster}
        extent={windowWidth / 1.5}
      >
        <Geojson
          geojson={myPlace}
          strokeColor={Dandelion}
          fillColor={"rgba(0,0,0,0.0)"}
          strokeWidth={4}
        />
        {
          !start
            ? (
              data && data.map((item, index) => {
                return (
                  <Marker
                    onPress={(e) => handleItemId(e, index)}
                    coordinate={{
                      latitude: Number(item?.lat),
                      longitude: Number(item?.lng)
                    }}
                    key={index}
                    stopPropagation={false}
                  >
                    <Image
                      source={{ uri: item?.pin }}
                      style={{
                        width: Platform.OS === "ios" ? 50 : 40,
                        height: Platform.OS === "ios" ? 50 : 40
                      }}
                    />
                  </Marker>
                )
              })
            )
            : null
        }
        {
          start
            ? (
              <>
                <Marker
                  onPress={(e) => handleItemId(e, 0)}
                  coordinate={{
                    latitude: data[itemId].lat,
                    longitude: data[itemId].lng
                  }}
                >
                  <Image
                    source={{ uri: data[itemId].pin }}
                    style={{ width: 35, height: 55 }}
                    resizeMode={"contain"}
                  />
                </Marker>
                <MapViewDirections
                  origin={cordinate}
                  waypoints={
                    [
                      {
                        latitude: data[itemId].lat,
                        longitude: data[itemId].lng
                      },
                      cordinate
                    ]
                  }
                  destination={
                    {
                      latitude: data[itemId].lat,
                      longitude: data[itemId].lng
                    }
                  }
                  language={"ar"}
                  apikey={Google_Key}
                  strokeWidth={3}
                  strokeColor={Dandelion}
                  optimizeWaypoints={true}
                  onStart={params => {
                    console.log("params", params)
                  }}
                  onReady={result => {
                    if (result !== null) {
                      setKm(result.distance)
                      setMin(result.duration)
                      if (_mapView.current !== null) {
                        _mapView.current.fitToCoordinates(result.coordinates, {
                          edgePadding: {
                            right: windowWidth / 3,
                            bottom: windowHeight / 3,
                            left: windowWidth / 3,
                            top: windowHeight / 3
                          }
                        })
                      }
                    }
                  }}
                  onError={errorMessage => {
                    console.log("GOT AN ERROR", errorMessage)
                  }}
                />
              </>
            )
            : null
        }
      </MapView>
      {
        itemId !== null
          ? (
            <View style={styles.infoContainer}>
              {
                location !== null
                  ? (
                    <View style={{ alignSelf: "flex-end", marginBottom: 20, width: 50, height: 50 }}>
                      <TouchableOpacity style={styles.myLocationButton} onPress={getCurrentPosition}>
                        <Image source={IconDirection} style={{ width: 25, height: 25 }} />
                      </TouchableOpacity>
                    </View>
                  )
                  : null
              }
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
                        // fontFamily={}
                        // fontWeight={}
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
                        // fontFamily={}
                        // fontWeight={}
                        color={MySin}
                        borderRadius={5}
                        borderColor={Fiord}
                        borderWidth={2}
                        icon={IconDirection2}
                        iconWidth={15}
                        iconHeight={15}
                        iconPositionLeft={false}
                        click={() => handleRedirect()}
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
                        // fontFamily={}
                        // fontWeight={}
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
                      {
                        location !== null
                          ? (
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
                              click={() => handleStart()}
                            />
                          )
                          : null
                      }
                    </View>
                  )
              }
            </View>
          )
          : (
            location &&
            <TouchableOpacity
              style={[styles.myLocationButtonOut, {
                bottom: start
                  ? windowHeight / 12
                  : itemId
                    ? Platform.OS === "android"
                      ? windowHeight / 3.2 : windowHeight / 3.8 : Platform.OS === "android"
                      ? windowHeight / 17
                      : windowHeight / 20
              }]}
              onPress={getCurrentPosition}
            >
              <Image source={IconDirection} style={{ width: 25, height: 25 }} />
            </TouchableOpacity>
          )
      }
    </View>
  )
}
