import React, {useContext, useEffect, useState} from "react"
import {Image, Modal, Platform, ScrollView, TouchableOpacity, View} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import {WebView} from "react-native-webview"
import Constants from "expo-constants"
import Context from "../../../../Context"
import {SwiperFlatList} from "react-native-swiper-flatlist"
import {HeaderCustom} from "../../../components/UI/HeaderCustom"
import {Amaranth, Black, Dandelion, Fiord, Mantis, MineShaft, MySin, MySin2, White} from "../../../shared/Colors"
import {styles} from "./style"
import {InfoBoxCustom} from "../../../components/UI/InfoBoxCustom"
import {API_URL, Tokakey, windowHeight, windowWidth} from "../../../shared/Const"
import {TextCustom} from "../../../components/UI/TextCustom"
import {ButtonCustom} from "../../../components/UI/ButtonCustom"
import {lang} from "../../../shared/Lang"
import {SmallModal} from "../../../container/SmallModal"
import IconArrow from "../../../assets/icon/arrow3.png"
import IconDirection2 from "../../../assets/icon/direction2.png"
import ImgLight from "../../../assets/icon/priceunit.png"
import ImgClose from "../../../assets/icon/icon-close.png"
import ImgDefault from "../../../assets/images/img-book-slide1.jpeg"

export const BookScreen = ({navigation, route}) => {
    const {data, id, isBook} = route?.params
    const {handleHideTabBar, location, countryCode, sumKW} = useContext(Context)
    console.log("route?.params", route?.params)

    const [imageData, setImageData] = useState(null)
    const [imageModal, setImageModal] = useState(false)
    const [image3DData, setImage3DData] = useState(null)
    const [image3DModal, setImage3DModal] = useState(false)
    const [modalVisibleCheckUser, setModalVisibleCheckUser] = useState(false)
    const [loader, setLoader] = useState(true)
    const [ports, setPorts] = useState(null)

    useEffect(() => {
        return navigation.addListener("focus", () => {
            setImageData(null)
            // setLoader(false)
            getDetails()
            handleHideTabBar(false)
        })
    }, [navigation])

    useEffect(() => {
        const interval = setInterval(() => {
            getPorts()
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    const getDetails = () => {
        setLoader(true)
        axios.post(`${API_URL}/charge-box/details`, {id}, {headers: {tokakey: Tokakey}})
            .then(res => {
                setLoader(false)
                if (res?.data["360_url"]) {
                    setImage3DData(res?.data["360_url"])
                }
                setImageData(res?.data?.images)
                setPorts(res?.data?.connectors)
            })
            .catch(e => {
                setLoader(false)
                console.log("e", e.response)
            })
    }

    const getPorts = () => {
        axios.post(`${API_URL}/charge-box/details`, {id}, {headers: {tokakey: Tokakey}})
            .then(res => {
                console.log("res", res)
                setPorts(res?.data?.connectors)
            })
            .catch(e => {
                console.log("e", e.response)
            })
    }

    const handleModal = () => setImageModal(!imageModal)

    const handleModal360 = () => setImage3DModal(!image3DModal)

    const handlePort = async (item) => {
        const Token = await AsyncStorage.getItem("token")
        if (Token === null) {
            setModalVisibleCheckUser(true)
        } else {
            if (item?.status === "Available" || item?.status === "Preparing") {
                navigation.navigate("BookType", {
                    item,
                    address: data && data.address
                })
            } else {
                alert(lang[countryCode].thePortIsBusyOrUnavailable)
            }
        }
    }

    const handleModalCheckUser = () => setModalVisibleCheckUser(!modalVisibleCheckUser)

    const handleUserCheck = () => {
        setModalVisibleCheckUser(!modalVisibleCheckUser)
        navigation.navigate("ProfileStack")
        setTimeout(() => {
            navigation.navigate("SignIn")
        }, 100)
    }

    const RenderSection = ({item, index, color}) => {
        return (
            <TouchableOpacity
                onPress={() => handlePort(item)}
                style={styles.typeItem}
            >
                <View style={{flexDirection: "row", width: "60%"}}>
                    <TextCustom
                        text={`${++index}.`}
                        marginRight={5}
                        fontWeight={"400"}
                        color={MineShaft}
                        fontSize={14}
                    />
                    <Image source={{uri: item?.status_image}} style={{width: 20, height: 20, marginRight: 10}}/>
                    <TextCustom
                        text={`${item?.type?.title}`}
                        marginRight={5}
                        fontWeight={"400"}
                        color={color}
                        fontSize={14}
                    />
                </View>
                <View style={{width: "20%"}}>
                    <TextCustom
                        text={`${item?.power} ${lang[countryCode].kw}`}
                        marginRight={5}
                        fontWeight={"400"}
                        color={color}
                        fontSize={14}
                    />
                </View>
                <View style={{flexDirection: "row", alignItems: "center", width: "20%"}}>
                    <TextCustom
                        text={sumKW}
                        fontWeight={"400"}
                        color={color}
                        fontSize={14}
                    />
                    <Image source={ImgLight} style={{width: 13, height: 13, marginRight: 10}}/>
                    <Image source={IconArrow} style={{width: 10, height: 10}}/>
                </View>
            </TouchableOpacity>
        )
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
                        <Image source={ImgClose} style={{width: 25, height: 25}}/>
                    </TouchableOpacity>
                    <SwiperFlatList
                        showPagination={true}
                        paginationDefaultColor={White}
                        paginationActiveColor={Dandelion}
                        paginationStyle={{
                            position: "absolute",
                            justifyContent: "center",
                            alignItems: "center",
                            bottom: 85
                        }}
                        paginationStyleItem={{
                            width: 14,
                            height: 14
                        }}
                        contentContainerStyle={{
                            alignSelf: "center",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        {
                            loader
                                ? null
                                : (
                                    imageData !== null
                                        ? (
                                            imageData && imageData.map((item, index) => {
                                                return (
                                                    <Image
                                                        source={{uri: item}}
                                                        style={{width: windowWidth, height: windowHeight / 3}}
                                                        key={index}
                                                        resizeMode={"cover"}
                                                    />
                                                )
                                            })
                                        )
                                        : (
                                            <Image
                                                source={ImgDefault}
                                                style={{width: windowWidth, height: windowHeight / 3}}
                                                resizeMode={"cover"}
                                            />
                                        ))
                        }
                    </SwiperFlatList>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={image3DModal}
                onRequestClose={handleModal360}
            >
                <WebView
                    source={image3DData ? {uri: `${image3DData}`} : {uri: `https://expo.dev`}}
                    style={{flex: 1, marginTop: Constants.statusBarHeight}}
                />
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
                    onPress={handleModal360}
                    activeOpacity={0}
                >
                    <Image source={ImgClose} style={{width: 25, height: 25}}/>
                </TouchableOpacity>
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
            <HeaderCustom
                handleBack={() => navigation.goBack()}
                backgroundColor={MySin}
                text={data && data?.title}
            />
            <ScrollView
                style={{marginBottom: 60, top: -10, flex: 1}}
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
                            justifyContent: "center",
                            alignItems: "center",
                            bottom: 85
                        }}
                        paginationStyleItem={{
                            width: 14,
                            height: 14
                        }}
                        contentContainerStyle={{
                            alignSelf: "center",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        {
                            loader
                                ? null
                                : (
                                    imageData !== null
                                        ? (
                                            imageData && imageData.map((item, index) => {
                                                return (
                                                    <TouchableOpacity onPress={handleModal} key={index}>
                                                        <Image
                                                            source={{uri: item}}
                                                            style={{width: windowWidth, height: windowHeight / 3}}
                                                            resizeMode={"cover"}
                                                        />
                                                    </TouchableOpacity>
                                                )
                                            })
                                        )
                                        : (
                                            <Image
                                                source={ImgDefault}
                                                style={{width: windowWidth, height: windowHeight / 3}}
                                                resizeMode={"cover"}
                                            />
                                        ))
                        }
                    </SwiperFlatList>
                </View>
                <View style={styles.bookInfoBox}>
                    <InfoBoxCustom
                        isBook={isBook}
                        data={data && data}
                        image3DData={image3DData}
                        handleModal360={handleModal360}
                    />
                    <View style={styles.typeBox}>
                        <View style={[styles.typeItem, {paddingLeft: 20, borderTopWidth: 0}]}>
                            <View style={{flexDirection: "row", width: "55%"}}>
                                <TextCustom
                                    text={`${lang[countryCode].type}`}
                                    marginRight={5}
                                    fontWeight={"400"}
                                    color={MineShaft}
                                    fontSize={16}
                                />
                            </View>
                            <View style={{width: "21%"}}>
                                <TextCustom
                                    text={`${lang[countryCode].Tariff}`}
                                    marginRight={5}
                                    fontWeight={"400"}
                                    color={MineShaft}
                                    fontSize={16}
                                />
                            </View>
                            <View style={{flexDirection: "row", alignItems: "center", width: "21%"}}>
                                <TextCustom
                                    text={`${lang[countryCode].price}`}
                                    fontWeight={"400"}
                                    color={MineShaft}
                                    fontSize={16}
                                />
                                <Image source={ImgLight} style={{width: 13, height: 13, marginRight: 10}}/>
                            </View>
                        </View>
                        {
                            ports
                                ? (
                                    ports.map((item, index) => {
                                        if (item?.status === "Available") {
                                            return <RenderSection item={item} key={index} index={index} color={Fiord}/>
                                        } else if (item?.status === "Charging") {
                                            return <RenderSection item={item} key={index} index={index} color={Mantis}/>
                                        } else if (item?.status === "Preparing") {
                                            return <RenderSection item={item} key={index} index={index} color={MySin2}/>
                                        } else if (item?.status === "Unavailable") {
                                            return <RenderSection item={item} key={index} index={index} color={Amaranth}/>
                                        } else {
                                            return <RenderSection item={item} key={index} index={index} color={Amaranth}/>
                                        }
                                    })
                                )
                                : null
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
                                    route?.params.handleStart()
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
