import React, {useContext, useEffect, useState} from "react"
import {
    Alert,
    Image,
    Modal,
    Platform,
    TouchableOpacity,
    View
} from "react-native"
import {Popup} from "react-native-map-link"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import {styles} from "./style"
import {API_URL, Tokakey, windowHeight, windowWidth} from "../../shared/Const"
import Context from "../../../Context"
import {Fiord, MineShaft, MySin, White} from "../../shared/Colors"
import {TextCustom} from "../../components/UI/TextCustom"
import {lang} from "../../shared/Lang"
import {LATITUDE_DELTA, LONGITUDE_DELTA} from "../../shared/MockData"
import {ButtonCustom} from "../../components/UI/ButtonCustom"
import {InfoBoxCustom} from "../../components/UI/InfoBoxCustom"
import {useDispatch, useSelector} from "react-redux"
import {GetCarMake} from "../../store/actionsCreators/CarMakeApiActionCreator"
import {GetChargeBoxesData} from "../../store/actionsCreators/ChargeBoxesDataApiActionCreator"
import {Map} from "../../container/Map"
import {WelcomeScreen} from "../WelcomeScreen"
import {ChargerList} from "../../container/ChargerList"
import IconDirection from "../../assets/icon/direction1.png"
import IconDirection2 from "../../assets/icon/direction2.png"
import IconDirection3 from "../../assets/icon/direction3.png"
import IconFilter from "../../assets/icon/filtr1.png"
import IconList from "../../assets/icon/icon-list.png"
import IconQr from "../../assets/icon/icon-qr.png"
import IconBook from "../../assets/icon/reserve.png"
import IconLocation from "../../assets/icon/location.png"
import IconMenuMap from "../../assets/icon/menu-map1.png"
import IconClock from "../../assets/icon/clock.png"
import IconClose from "../../assets/icon/cancel.png"

export const HomeScreen = ({navigation}) => {

    const dispatch = useDispatch()

    const {
        location,
        handleLocationUser,
        userAddress,
        handleHideTabBar,
        countryCode,
        creatUrl
    } = useContext(Context)

    const [mapRef, setMapRef] = useState(null)
    const [data, setData] = useState(null)
    const [itemId, setItemId] = useState(null)
    const [itemIndex, setItemIndex] = useState(null)
    const [qrItem, setQrItem] = useState(null)
    const [km, setKm] = useState(Number)
    const [min, setMin] = useState("")
    const [start, setStart] = useState(false)
    const [checkAddress, setCheckAddress] = useState("")
    const [check, setCheck] = useState("finish")
    const [modalRedirect, setModalRedirect] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [cordinate, setCordinate] = useState(null)
    const [options, setOptions] = useState({
        latitude: location !== null ? location?.coords?.latitude : 40.177200,
        longitude: location !== null ? location?.coords?.longitude : 44.503490,
        googleForceLatLon: false,
        alwaysIncludeGoogle: true,
        appsWhiteList: ["google-maps", "apple-maps", "waze", "yandex", "yandex-maps"],
        naverCallerName: "com.example.myapp",
        directionsMode: "car"
    })

    const chargeBoxesData = useSelector(state => state?.ChargeBoxesDataReducer.data)
    const chargeBoxesLoader = useSelector(state => state?.ChargeBoxesDataReducer.loading)
    // const chargeBoxesError = useSelector(state => state?.ChargeBoxesDataReducer.error)

    useEffect(() => {
        return navigation.addListener("focus", async () => {
            handleHideTabBar(true)
            handleLocationUser()
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
        } else {
            setCordinate({
                latitude: 40.177200,
                longitude: 45,
                latitudeDelta: 6,
                longitudeDelta: 3
            })
        }
    }, [location])

    useEffect(() => {
        dispatch(GetCarMake(`${API_URL}/car-make/?page=1&per-page=500&title`))
        if (creatUrl.length > 0) {
            handleChargeBoxesData(creatUrl)
        } else {
            handleChargeBoxesData(`${API_URL}/charge-box/index?page=1&per-page=60000&min=7&max=60&language=${countryCode === "ar" ? "hy" : countryCode}`)
        }
    }, [countryCode, creatUrl])

    useEffect(() => {
        const interval = setInterval(() => {
            if (creatUrl.length > 0) {
                handleChargeBoxesData(creatUrl)
            } else {
                handleChargeBoxesData(`${API_URL}/charge-box/index?page=1&per-page=60000&min=7&max=60&language=${countryCode === "ar" ? "hy" : countryCode}`)
            }
        }, 10000)
        return () => clearInterval(interval)
    }, [creatUrl])

    useEffect(() => {
        if (chargeBoxesData) {
            setData(chargeBoxesData && chargeBoxesData?.data.map(item => {
                item.active = false
                return item
            }))
        }
    }, [chargeBoxesData])

    useEffect(() => {
        if (chargeBoxesData) {
            if (itemIndex) {
                setCheckAddress(chargeBoxesData?.data[itemIndex].address)
            } else if (qrItem) {
                setCheckAddress(chargeBoxesData?.data[qrItem].address)
            }
        }
    }, [chargeBoxesData, itemIndex, qrItem, data]);

    const handleRef = (ref) => setMapRef(ref)

    const handleCheckChargeProgress = async () => {
        const Token = await AsyncStorage.getItem("token")
        if (Token !== null) {
            await axios.get(
                `${API_URL}/charge-box/get-last?access-token=${Token}`,
                {headers: {tokakey: Tokakey}}
            )
                .then(async res => {
                    if (res?.data?.status === "Charging") {
                        navigation.navigate("LoadCharge", {bool: true})
                        await AsyncStorage.setItem("transaction_id", res?.data?.transaction_id.toString())

                    } else if (res?.data?.status === "Stopped") {
                        await AsyncStorage.removeItem("transaction_id")
                    }
                })
                .catch(e => {
                    Alert.alert(
                        `${e?.response?.data?.name} ${e?.response?.data?.status}`,
                        `${e?.response?.data?.message}`,
                        [
                            {text: "OK", onPress: () => console.log("OK Pressed")}
                        ]
                    )
                })
        }
    }

    const handleChargeBoxesData = (url) => {
        dispatch(GetChargeBoxesData(url))
    }

    const getCurrentPosition = () => {
        if (location === null) {
            handleLocationUser()
        } else {
            mapRef.animateToRegion(cordinate, 1000)
        }
    }

    const handleItemId = async (e, id, index) => {
        e.stopPropagation()
        setItemId(id)
        setItemIndex(index)
        setQrItem(null)
        setModalVisible(false)
    }

    const handleQRData = async (id) => {
        const qrItemIndex = data.findIndex(item => item.id === id)
        setQrItem(qrItemIndex)
        setItemId(null)
        setItemIndex(id)
    }

    const handleStart = () => {
        setStart(!start)
        setModalVisible(false)
    }

    const handleRedirect = async () => {
        // await showLocation(options)
        setModalRedirect(!modalRedirect)
        setModalVisible(false)
    }

    const handleReady = async (result) => {
        setKm(result.distance)
        setMin(result.duration)
        if (mapRef !== null) {
            mapRef.fitToCoordinates(result.coordinates, {
                edgePadding: {
                    right: windowWidth / 3,
                    bottom: windowHeight / 3,
                    left: windowWidth / 3,
                    top: windowHeight / 3
                }
            })
        }
    }

    const handleReset = () => {
        setItemId(null)
        setItemIndex(null)
        setQrItem(null)
    }

    const handleModal = () => setModalVisible(!modalVisible)

    const handleCheckCordinate = (latitude, longitude) => {
        setOptions(prev => {
            return (
                {
                    ...prev,
                    latitude: location?.coords?.latitude,
                    longitude: location?.coords?.longitude,
                    sourceLatitude: latitude,
                    sourceLongitude: longitude
                }
            )
        })
    }

    const handleCheck = async () => {
        await AsyncStorage.setItem("checkWelcomeScreen", "finish")
        setCheck("finish")
    }

    useEffect(() => {
        (async () => {
            const status = await AsyncStorage.getItem("checkWelcomeScreen")
            if (status !== null) {
                setCheck(status)
                if (status === "start") {
                    handleHideTabBar(false)
                } else {
                    handleHideTabBar(true)
                }
            } else {
                await AsyncStorage.setItem("checkWelcomeScreen", "start")
            }
        })()
    }, [check])

    if (check === "start") {
        return <WelcomeScreen handleCheck={handleCheck}/>
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleModal}
            >
                <ChargerList
                    handleModal={handleModal}
                    data={data}
                    loader={chargeBoxesLoader}
                    handleData={handleChargeBoxesData}
                    countryCode={countryCode}
                    handleStart={handleStart}
                    handleItemId={handleItemId}
                    navigation={navigation}
                />
            </Modal>
            {
                start
                    ? (
                        <View style={styles.boxTop}>
                            <View style={styles.addressesBox}>
                                <View style={styles.iconBox}>
                                    <Image source={IconLocation} style={{width: 22, height: 22}}/>
                                    <View style={styles.dot}/>
                                    <View style={styles.dot}/>
                                    <View style={styles.dot}/>
                                    <Image source={IconMenuMap} style={{width: 22, height: 22}}/>
                                </View>
                                <View style={styles.textBox}>
                                    <TextCustom text={userAddress} fontSize={14} color={MineShaft} fontWeight={"700"}/>
                                    <View style={styles.line}/>
                                    <TextCustom text={checkAddress} fontSize={14} color={MineShaft} fontWeight={"700"}/>
                                </View>
                            </View>
                            <View style={styles.somethingBox}>
                                <View style={styles.clockBox}>
                                    <Image source={IconClock} style={{width: 22, height: 22, marginRight: 10}}/>
                                    <TextCustom
                                        text={`${Math.floor(parseInt(min))} ${lang[countryCode].min}`}
                                        color={MineShaft}
                                        fontSize={14}
                                        fontWeight={"700"}
                                    />
                                </View>
                                <View style={styles.clockBox}>
                                    <Image source={IconDirection3} style={{width: 22, height: 22, marginRight: 10}}/>
                                    <TextCustom
                                        text={`${Math.floor(km)} ${lang[countryCode].km}`}
                                        color={MineShaft}
                                        fontSize={14}
                                        fontWeight={"700"}
                                    />
                                </View>
                            </View>
                        </View>
                    )
                    : (
                        <>
                            <View style={styles.box}>
                                <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.filterBox}>
                                    <Image source={IconFilter} style={{width: 22, height: 22, marginRight: 10}}/>
                                    <TextCustom text={lang[countryCode].filter} color={Fiord} fontSize={16}
                                                fontWeight={"700"}/>
                                </TouchableOpacity>
                                {
                                    chargeBoxesData
                                        ? (
                                            <TouchableOpacity onPress={handleModal} style={styles.chargeListBox}>
                                                <Image source={IconList} style={{width: 22, height: 22, marginRight: 10}}/>
                                                <TextCustom text={lang[countryCode].list} color={Fiord} fontSize={16}
                                                            fontWeight={"700"}/>
                                            </TouchableOpacity>
                                        )
                                        : null
                                }
                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("QRScanner", {handleQRData: id => handleQRData(id)})}
                                style={styles.qrBox}
                            >
                                <Image source={IconQr} style={{width: 40, height: 40}}/>
                            </TouchableOpacity>
                        </>
                    )
            }
            {
                cordinate && (
                    <Map
                        data={data}
                        handleRef={handleRef}
                        itemId={itemId}
                        itemIndex={itemIndex}
                        qrItem={qrItem}
                        start={start}
                        cordinate={cordinate}
                        location={location}
                        chargeBoxesLoader={chargeBoxesLoader}
                        getCurrentPosition={getCurrentPosition}
                        handleItemId={handleItemId}
                        handleReady={handleReady}
                        handleReset={handleReset}
                        handleCheckCordinate={handleCheckCordinate}
                    />
                )
            }
            <TouchableOpacity
                style={[styles.myLocationButtonOut, {
                    bottom: start
                        ? windowHeight / 12
                        : itemIndex !== null || qrItem !== null
                            ? Platform.OS === "android"
                                ? windowHeight / 3
                                : windowHeight / 3.8
                            : Platform.OS === "android"
                                ? windowHeight / 17
                                : windowHeight / 20
                }]}
                onPress={getCurrentPosition}
            >
                <Image source={IconDirection} style={{width: 25, height: 25}}/>
            </TouchableOpacity>
            {
                itemIndex !== null
                    ? (
                        <View style={styles.infoContainer}>
                            {!start && <InfoBoxCustom data={data[itemIndex]}/>}
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
                                                icon={IconClose}
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
                                                    id: itemId,
                                                    isBook: true,
                                                    data: data[itemIndex],
                                                    handleStart: handleStart
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
                                                            click={handleStart}
                                                        />
                                                    )
                                                    : null
                                            }
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
                            {!start && <InfoBoxCustom data={data[qrItem]}/>}
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
                                                    id: qrItem,
                                                    isBook: true,
                                                    data: data[qrItem],
                                                    handleStart: handleStart
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
                                                            click={handleStart}
                                                        />
                                                    )
                                                    : null
                                            }
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
