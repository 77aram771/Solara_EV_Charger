import React from "react"
import { Marker } from "react-native-maps"
import { View } from "react-native"
import { Fiord, White } from "../../../shared/Colors"
import { windowWidth } from "../../../shared/Const"
import { TextCustom } from "../TextCustom"

export const RenderCluster = (cluster,props) => {
  // console.log("cluster", cluster.markers);
  // console.log("props", props);
  const { id, geometry, onPress, properties } = cluster
  const points = properties.point_count

  return (
    <Marker
      key={id}
      coordinate={{ longitude: geometry.coordinates[0], latitude: geometry.coordinates[1] }}
      onPress={onPress}
    >
      <View
        style={{
          borderWidth: 5,
          borderColor: Fiord,
          width: windowWidth / 8,
          height: windowWidth / 8,
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: White
        }}
      >
        <TextCustom text={points} fontSize={16} />
      </View>
    </Marker>
  )
}