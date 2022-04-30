import React, { useRef } from "react"
import { View, Image } from "react-native"
import Carousel from "react-native-snap-carousel"
import { windowWidth } from "../../../shared/Const"
import IconAmericanExpress from "../../../assets/icon/card/american-express.png"
import IconVisa from "../../../assets/icon/card/visa.png"
import IconMastercard from "../../../assets/icon/card/mastercard.png"
import IconDiscover from "../../../assets/icon/card/discover.png"
import { TextCustom } from "../TextCustom"
import { MineShaft } from "../../../shared/Colors"

const renderItem = ({ item }) => {

  const num = String(item.title)[0]

  return (
    <View
      style={{
        padding: 20,
        borderRadius: 20,
        alignItems: "flex-start",
        backgroundColor: "white"
      }}
    >
      {
        Number(num) === 3 &&
        <Image source={IconAmericanExpress} resizeMode={"cover"} style={{ width: 70, height: 50 }} />
      }
      {
        Number(num) === 4 && <Image source={IconVisa} resizeMode={"cover"} style={{ width: 70, height: 50 }} />
      }
      {
        Number(num) === 5 && <Image source={IconMastercard} resizeMode={"cover"} style={{ width: 70, height: 50 }} />
      }
      {
        Number(num) === 6 && <Image source={IconDiscover} resizeMode={"cover"} style={{ width: 70, height: 50 }} />
      }
      <View
        style={{
          width: "100%",
          marginTop: 20,
          justifyContent: "center",
          alignItems: "flex-start"
        }}
      >
        <TextCustom text={"Card number"} color={MineShaft} fontSize={16} fontWeight={"700"} marginBottom={10} />
        <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <TextCustom text={`****`} color={MineShaft} fontSize={26} fontWeight={"700"} />
          <TextCustom text={`${item.title.slice(-4)}`} color={MineShaft} fontSize={26} fontWeight={"700"} />
        </View>
      </View>
    </View>
  )
}

export const PaginationCarousel = ({ data, handleId }) => {
  const isCarousel = useRef(null)

  return (
    <Carousel
      ref={isCarousel}
      data={data}
      renderItem={renderItem}
      sliderWidth={windowWidth}
      itemWidth={Math.round(windowWidth * 0.5)}
      onSnapToItem={index => handleId(data[index].id)}
    />
  )
}