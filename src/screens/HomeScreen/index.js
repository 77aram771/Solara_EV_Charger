import React, {createRef, useContext, useEffect, useState} from 'react'
import {Image, Platform, TouchableOpacity, View} from "react-native"
import {Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import MapView from "react-native-map-clustering"
import MapViewDirections from "react-native-maps-directions"
import Geocoder from 'react-native-geocoding'
import {Popup, showLocation} from 'react-native-map-link'
import {styles} from "./style"
import {Google_Key, windowHeight, windowWidth} from "../../shared/Const"
import {MapStyle} from "../../shared/MapStyle"
import Context from "../../../Context"
import IconDirection from '../../assets/icon/direction1.png'
import IconDirection2 from '../../assets/icon/direction2.png'
import IconDirection3 from '../../assets/icon/direction3.png'
import IconFilter from '../../assets/icon/filtr1.png'
import IconQr from '../../assets/icon/icon-qr.png'
import IconBook from '../../assets/icon/reserve.png'
import IconLocation from '../../assets/icon/location.png'
import IconMenuMap from '../../assets/icon/menu-map1.png'
import IconClock from '../../assets/icon/clock.png'
import {Dandelion, Fiord, MineShaft, MySin, White} from "../../shared/Colors"
import {TextCustom} from "../../components/UI/TextCustom"
import {lang} from "../../shared/Lang"
import {CordinateClusterData, LATITUDE_DELTA, LONGITUDE_DELTA} from "../../shared/MockData"
import {ButtonCustom} from "../../components/UI/ButtonCustom"
import {InfoBoxCustom} from "../../components/UI/InfoBoxCustom"

export const HomeScreen = ({navigation}) => {

    const {location, userAddress, handleHideTabBar} = useContext(Context)

    const _mapView = createRef()

    const [itemId, setItemId] = useState(null)
    const [km, setKm] = useState(Number)
    const [min, setMin] = useState('')
    const [start, setStart] = useState(false)
    const [checkAddress, setCheckAddress] = useState('')
    const [modalRedirect, setModalRedirect] = useState(false)

    const options = {
        latitude: CordinateClusterData[0].latitude,
        longitude: CordinateClusterData[0].longitude,
        googleForceLatLon: false,
        alwaysIncludeGoogle: true,
        appsWhiteList: ['google-maps', 'apple-maps', 'waze', 'yandex', 'yandex-maps'],
        naverCallerName: 'com.example.myapp',
        directionsMode: 'car'
    }

    const [cordinate] = useState({
        latitude: location?.coords?.latitude,
        longitude: location?.coords?.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    })

    useEffect(() => {
        return navigation.addListener('focus', () => {
            handleHideTabBar(true)
        })
    }, [navigation])

    useEffect(() => {
        Geocoder.from(CordinateClusterData[0].latitude, CordinateClusterData[0].longitude)
            .then((json) => {
                let addressComponent = `${json.results[0].address_components[1].long_name} ${json.results[0].address_components[0].long_name}`
                // console.log(addressComponent)
                setCheckAddress(addressComponent)
            })
            .catch((error) => console.warn(error))
    }, [itemId])

    // const onRegionChange = (region) => {
    //     // console.log('region', region)
    //     // setCordinate(region)
    // }

    const getCurrentPosition = () => _mapView.current.animateToRegion(cordinate, 1000)

    const handleItemId = (e, id) => {
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
                appsWhiteList={['google-maps', 'apple-maps', 'waze', 'yandex', 'yandex-maps']}
            />
            {
                start
                    ? (
                        <>
                            <View style={styles.addressesBox}>
                                <View style={styles.iconBox}>
                                    <Image source={IconLocation} style={{width: 22, height: 22}}/>
                                    <View style={styles.dot}/>
                                    <View style={styles.dot}/>
                                    <View style={styles.dot}/>
                                    <Image source={IconMenuMap} style={{width: 22, height: 22}}/>
                                </View>
                                <View style={styles.textBox}>
                                    <TextCustom text={userAddress} fontSize={18} color={MineShaft} fontWeight={'700'}/>
                                    <View style={styles.line}/>
                                    <TextCustom text={checkAddress} fontSize={18} color={MineShaft} fontWeight={'700'}/>
                                </View>
                            </View>
                            <View style={styles.somethingBox}>
                                <View style={styles.clockBox}>
                                    <Image source={IconClock} style={{width: 22, height: 22, marginRight: 10}}/>
                                    <TextCustom
                                        text={`${Math.floor(parseInt(min))} ${lang['arm'].min}`}
                                        color={MineShaft}
                                        fontSize={18}
                                        fontWeight={'700'}
                                    />
                                </View>
                                <View style={styles.clockBox}>
                                    <Image source={IconDirection3} style={{width: 22, height: 22, marginRight: 10}}/>
                                    <TextCustom
                                        text={`${Math.floor(km)} ${lang['arm'].km}`}
                                        color={MineShaft}
                                        fontSize={18}
                                        fontWeight={'700'}
                                    />
                                </View>
                            </View>
                        </>
                    )
                    : (
                        <>
                            <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.filterBox}>
                                <Image source={IconFilter} style={{width: 22, height: 22, marginRight: 10}}/>
                                <TextCustom text={lang['arm'].filter} color={Fiord} fontSize={20} fontWeight={'700'}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('QRScanner')} style={styles.qrBox}>
                                <Image source={IconQr} style={{width: 40, height: 40}}/>
                            </TouchableOpacity>
                        </>
                    )
            }
            <MapView
                initialRegion={cordinate}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                // onRegionChange={onRegionChange}
                // ref={(ref) => {
                //     console.log('ref', ref)
                //     // updateMapRef(ref)
                // }}
                onPress={(e) => {
                    e.stopPropagation()
                    if (!start) {
                        setItemId(null)
                    }
                }}
                ref={_mapView}
                showsScale={true}
                showsPointsOfInterest={true}
                // onMapReady={() => getBoundaries()}
                followUserLocation={true}
                zoomEnabled={true}
                pitchEnabled={true}
                showsCompass={true}
                showsBuildings={true}
                showsTraffic={false}
                showsIndoors={true}
                showsUserLocation={true}
                showsMyLocationButton={false}
                customMapStyle={MapStyle}
                minZoomLevel={1}
                maxZoomLevel={17}
                animationEnabled={true}
                clusteringEnabled={true}
                spiralEnabled={true}
                rotateEnabled={false}
                focusable={false}
                tracksViewChanges={false}
                renderToHardwareTextureAndroid={false}
                // onUserLocationChange={() => {
                //
                // }}
                clusterColor={MySin}
                clusterTextColor={White}
                spiderLineColor={'#000'}
                tintColor={'red'}
                accessibilityIgnoresInvertColors={false}
                // renderCluster={() => {
                //     return (
                //         <Image source={IconPin4} style={{width: 50, height: 70}} resizeMode={'contain'}/>
                //     )
                // }}
                // onClusterPress={(cluster, markers) => {
                //     console.log('cluster', cluster)
                //     console.log('markers', markers)
                // }}
            >
                {
                    !start
                        ? (
                            CordinateClusterData.map((item, index) => {
                                return (
                                    <Marker
                                        onPress={(e) => handleItemId(e, index)}
                                        coordinate={{
                                            latitude: item.latitude,
                                            longitude: item.longitude
                                        }}
                                        key={item.id}
                                    >
                                        <Image
                                            source={item.icon}
                                            style={{width: 35, height: 55}}
                                            resizeMode={'contain'}
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
                                        latitude: CordinateClusterData[itemId].latitude,
                                        longitude: CordinateClusterData[itemId].longitude
                                    }}
                                >
                                    <Image source={CordinateClusterData[itemId].icon} style={{width: 35, height: 55}}
                                           resizeMode={'contain'}/>
                                </Marker>
                                <MapViewDirections
                                    origin={cordinate}
                                    waypoints={
                                        [
                                            {
                                                latitude: CordinateClusterData[itemId].latitude,
                                                longitude: CordinateClusterData[itemId].longitude
                                            },
                                            cordinate,
                                        ]
                                    }
                                    destination={
                                        {
                                            latitude: CordinateClusterData[itemId].latitude,
                                            longitude: CordinateClusterData[itemId].longitude
                                        }
                                    }
                                    language={'ar'}
                                    apikey={Google_Key}
                                    strokeWidth={3}
                                    strokeColor={Dandelion}
                                    optimizeWaypoints={true}
                                    onStart={params => {
                                        console.log('params', params)
                                    }}
                                    onReady={result => {
                                        if(result !== null) {
                                            setKm(result.distance)
                                            setMin(result.duration)
                                            // _mapView.current.fitToCoordinates(result.coordinates, {
                                            //     edgePadding: {
                                            //         right: windowWidth / 20,
                                            //         bottom: windowHeight / 20,
                                            //         left: windowWidth / 20,
                                            //         top: windowHeight / 20
                                            //     }
                                            // })
                                        }
                                    }}
                                    onError={errorMessage => {
                                        console.log('GOT AN ERROR', errorMessage)
                                    }}
                                />
                            </>
                        )
                        : null
                }
            </MapView>
            <TouchableOpacity
                style={[styles.myLocationButton, {
                    bottom: start
                        ? windowHeight / 12
                        : itemId !== null
                            ? Platform.OS === 'android'
                                ? windowHeight / 3.2 : windowHeight / 3.8 : Platform.OS === 'android'
                                ? windowHeight / 17
                                : windowHeight / 20
                }]}
                onPress={() => getCurrentPosition()}
            >
                <Image source={IconDirection} style={{width: 25, height: 25}}/>
            </TouchableOpacity>
            {
                itemId !== null
                    ? (
                        <View style={styles.infoContainer}>
                            {
                                start
                                    ? null
                                    : (
                                        <InfoBoxCustom itemId={itemId}/>
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
                                                text={lang['arm'].cancel}
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
                                                text={lang['arm'].start}
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
                                                text={lang['arm'].book}
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
                                                click={() => navigation.navigate('Book', {
                                                    itemId,
                                                    isBook: true,
                                                    handleStart: () => handleStart()
                                                })}
                                            />
                                            <ButtonCustom
                                                width={windowWidth / 2.5}
                                                height={35}
                                                backgroundColor={Fiord}
                                                text={lang['arm'].direction}
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
                                                click={() => handleStart()}
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
