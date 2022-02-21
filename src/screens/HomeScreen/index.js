import React, {createRef, useContext, useState} from 'react'
import {Image, TouchableOpacity, View} from "react-native"
import {Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import MapView from "react-native-map-clustering"
import {styles} from "./style"
import {windowHeight, windowWidth} from "../../shared/Const"
import {MapStyle} from "../../shared/MapStyle"
import Context from "../../../Context"
import IconPin1 from '../../assets/icon/pin1.png'
import IconPin2 from '../../assets/icon/pin2.png'
import IconPin3 from '../../assets/icon/pin3.png'
import IconPin4 from '../../assets/icon/pin4.png'
import IconPin5 from '../../assets/icon/pin5.png'
import IconPin6 from '../../assets/icon/pin6.png'
import IconPin7 from '../../assets/icon/pin7.png'
import IconPin8 from '../../assets/icon/pin8.png'
import IconPin9 from '../../assets/icon/pin9.png'
import IconPin10 from '../../assets/icon/pin10.png'
import IconPin11 from '../../assets/icon/pin11.png'
import IconPin12 from '../../assets/icon/pin12.png'
import IconPin13 from '../../assets/icon/pin13.png'
import IconPin14 from '../../assets/icon/pin14.png'
import IconPin15 from '../../assets/icon/pin15.png'
import IconPin16 from '../../assets/icon/pin16.png'
import IconPin17 from '../../assets/icon/pin17.png'
import IconPin18 from '../../assets/icon/pin18.png'
import IconDirection from '../../assets/icon/direction1.png'
import IconFilter from '../../assets/icon/filtr1.png'
import IconQr from '../../assets/icon/icon-qr.png'
import {Fiord, White} from "../../shared/Colors"
import {TextCustom} from "../../components/UI/TextCustom"
import {lang} from "../../shared/Lang"
import {CordinateClusterData} from "../../shared/MockData";
// import {RenderMarker} from "../../components/UI/RenderMarker"

const ASPECT_RATIO = windowWidth / windowHeight
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export const HomeScreen = ({navigation}) => {

    const {location} = useContext(Context)
    console.log('location', location)
    const _mapView = createRef()

    const [mapRef, updateMapRef] = useState(null)

    const [cordinate, setCordinate] = useState({
        latitude: location?.coords?.latitude,
        longitude: location?.coords?.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    })

    const onRegionChange = (region) => {
        // console.log('region', region)
        // setCordinate(region)
    }

    const getBoundaries = () => {
        if (mapRef === null) {
            return
        }
        mapRef
            .getMapBoundaries()
            .then((res) => {
                // console.log('res', res)
                // console.log(res)
            })
            .catch((err) => console.log(err))
    }

    const getCurrentPosition = () => {
        _mapView.current.animateToRegion(cordinate, 1000)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => alert('asd')} style={styles.filterBox}>
                <Image source={IconFilter} style={{width: 22, height: 22, marginRight: 10}}/>
                <TextCustom text={lang['arm'].filter} color={Fiord} fontSize={20} fontWeight={'700'}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('asd')} style={styles.qrBox}>
                <Image source={IconQr} style={{width: 40, height: 40}}/>
            </TouchableOpacity>
            <MapView
                initialRegion={cordinate}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                onRegionChange={onRegionChange}
                // ref={(ref) => {
                //     console.log('ref', ref)
                //     // updateMapRef(ref)
                // }}
                ref={_mapView}
                showsScale={true}
                showsPointsOfInterest={true}
                onMapReady={() => getBoundaries()}
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
                // onUserLocationChange={() => {
                //
                // }}
                clusterColor={White}
                clusterTextColor={Fiord}
                spiderLineColor={'#000'}
                tintColor={'red'}
                accessibilityIgnoresInvertColors={false}
                // renderCluster={() => {
                //     return (
                //         <Image source={IconPin4} style={{width: 50, height: 70}} resizeMode={'contain'}/>
                //     )
                // }}
                onClusterPress={(cluster, markers) => {
                    console.log('cluster', cluster)
                    console.log('markers', markers)
                }}
            >
                {
                    CordinateClusterData.map(item => {
                        return (
                            <Marker
                                onPress={() => alert('tet')}
                                coordinate={{latitude: item.latitude, longitude: item.latitude}}
                                key={item.id}
                            >
                                <Image source={`${IconPin}1`} style={{width: 50, height: 70}} resizeMode={'contain'}/>
                            </Marker>
                        )
                    })
                }
            </MapView>
            <TouchableOpacity
                style={styles.myLocationButton}
                onPress={() => {
                    getCurrentPosition()
                }}
            >
                <Image source={IconDirection} style={{width: 25, height: 25}}/>
            </TouchableOpacity>
        </View>
    )
}
