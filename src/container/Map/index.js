import React from "react"
import {Image} from "react-native"
import MapView from "react-native-map-clustering"
import {Geojson, Marker, PROVIDER_GOOGLE} from "react-native-maps"
import MapViewDirections from "react-native-maps-directions"
import {RenderCluster} from "../../components/UI/RenderCluster"
import {Google_Key, windowWidth} from "../../shared/Const"
import myPlace from "../../assets/georgia.json"
import {styles} from "../../screens/HomeScreen/style"
import {MapStyle} from "../../shared/MapStyle"
import {Dandelion, MySin, White} from "../../shared/Colors"

const RenderDirection = ({item, data, cordinate, handleCheckCordinate, handleReady, handleItemId}) => {
    return (
        <>
            <Marker
                onPress={(e) => handleItemId(e, item?.id, 0)}
                coordinate={{
                    latitude: data[item].lat,
                    longitude: data[item].lng
                }}
            >
                <Image
                    source={{uri: data[item].pin}}
                    style={{width: 50, height: 50}}
                    resizeMode={"contain"}
                />
            </Marker>
            <MapViewDirections
                origin={cordinate}
                waypoints={
                    [
                        {
                            latitude: data[item].lat,
                            longitude: data[item].lng
                        },
                        {
                            latitude: cordinate.latitude,
                            longitude: cordinate.longitude
                        }
                    ]
                }
                destination={
                    {
                        latitude: data[item].lat,
                        longitude: data[item].lng
                    }
                }
                language={"en"}
                apikey={Google_Key}
                strokeWidth={3}
                strokeColor={Dandelion}
                optimizeWaypoints={true}
                onStart={params => {
                    handleCheckCordinate(params.waypoints[0].latitude, params.waypoints[0].longitude)
                }}
                onReady={result => {
                    if (result !== null) {
                        handleReady(result)
                    }
                }}
                onError={errorMessage => {
                    console.log("GOT AN ERROR", errorMessage)
                }}
            />
        </>
    )
}

const RenderGeoJson = () => {
    return (
        <Geojson
            geojson={myPlace}
            strokeColor={Dandelion}
            fillColor={"transparent"}
            strokeWidth={5}
            tappable={false}
        />
    )
}

export const Map = ({
                        start,
                        cordinate,
                        data,
                        itemId,
                        qrItem,
                        getCurrentPosition,
                        location,
                        handleItemId,
                        handleReady,
                        handleReset,
                        handleCheckCordinate,
                        handleRef,
                    }) => {
    return (
        <MapView
            initialRegion={cordinate}
            needsOffscreenAlphaCompositing={false}
            showsIndoorLevelPicker={false}
            accessibilityElementsHidden={false}
            accessible={false}
            accessibilityViewIsModal={false}
            cacheEnabled={false}
            userLocationCalloutEnabled={false}
            followsUserLocation={false}
            liteMode={false}
            loadingEnabled={false}
            moveOnMarkerPress={false}
            preserveClusterPressBehavior={false}
            shouldRasterizeIOS={false}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            onPress={(e) => {
                e.stopPropagation()
                if (!start) {
                    handleReset()
                }
            }}
            mapRef={(ref) => handleRef(ref)}
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
            animationEnabled={false}
            clusteringEnabled={true}
            spiralEnabled={true}
            rotateEnabled={true}
            focusable={true}
            tracksViewChanges={true}
            renderToHardwareTextureAndroid={true}
            clusterColor={MySin}
            clusterTextColor={White}
            spiderLineColor={"#000"}
            accessibilityIgnoresInvertColors={false}
            renderCluster={RenderCluster}
            extent={windowWidth / 1.5}
        >
            <RenderGeoJson/>
            {
                !start
                    ? (
                        data && data.map((item, index) => {
                            return (
                                <Marker
                                    onPress={(e) => handleItemId(e, item?.id, index)}
                                    coordinate={{
                                        latitude: Number(item?.lat),
                                        longitude: Number(item?.lng)
                                    }}
                                    key={index}
                                    stopPropagation={true}
                                >
                                    <Image
                                        source={{uri: item?.pin}}
                                        style={{
                                            width: 50,
                                            height: 50
                                        }}
                                        resizeMode={"contain"}
                                    />
                                </Marker>
                            )
                        })
                    )
                    : null
            }
            {
                start &&
                itemId && (
                    <RenderDirection
                        data={data}
                        cordinate={cordinate}
                        item={itemId}
                        handleCheckCordinate={handleCheckCordinate}
                        handleReady={handleReady}
                        handleItemId={handleItemId}
                    />
                )
            }
            {
                start &&
                qrItem && (
                    <RenderDirection
                        data={data}
                        cordinate={cordinate}
                        item={qrItem}
                        handleCheckCordinate={handleCheckCordinate}
                        handleReady={handleReady}
                        handleItemId={handleItemId}
                    />
                )
            }
        </MapView>
    )
}
