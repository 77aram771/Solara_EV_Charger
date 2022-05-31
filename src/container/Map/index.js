import React from "react"
import { Image, Platform } from "react-native"
import MapView from "react-native-map-clustering"
import { Geojson, Marker, PROVIDER_GOOGLE } from "react-native-maps"
import MapViewDirections from "react-native-maps-directions"
import { RenderCluster } from "../../components/UI/RenderCluster"
import { Google_Key, windowHeight, windowWidth } from "../../shared/Const"
import myPlace from "../../assets/georgia.json"
import { styles } from "../../screens/HomeScreen/style"
import { MapStyle } from "../../shared/MapStyle"
import { Dandelion, MySin, White } from "../../shared/Colors"

export const Map = ({
  start,
  cordinate,
  data,
  itemId,
  qrItem,
  _mapView,
  getCurrentPosition,
  location,
  handleItemId,
  handleReady,
  handleReset
}) => {
  return (
    <MapView
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
      onPress={(e) => {
        e.stopPropagation()
        if (!start) {
          handleReset()
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
            itemId !== null
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
                        handleReady(result)
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
          )
          : null
      }
      {
        start
          ? (
            qrItem !== null
              ? (
                <>
                  <Marker
                    onPress={(e) => handleItemId(e, 0)}
                    coordinate={{
                      latitude: data[qrItem].lat,
                      longitude: data[qrItem].lng
                    }}
                  >
                    <Image
                      source={{ uri: data[qrItem].pin }}
                      style={{ width: 35, height: 55 }}
                      resizeMode={"contain"}
                    />
                  </Marker>
                  <MapViewDirections
                    origin={cordinate}
                    waypoints={
                      [
                        {
                          latitude: data[qrItem].lat,
                          longitude: data[qrItem].lng
                        },
                        cordinate
                      ]
                    }
                    destination={
                      {
                        latitude: data[qrItem].lat,
                        longitude: data[qrItem].lng
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
                        handleReady(result)
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
          )
          : null
      }
    </MapView>
  )
}