import React from "react"
import { Image, TouchableOpacity, View } from "react-native"
import { windowWidth } from "../../../shared/Const"
import { Mercurysolid, MineShaft, White } from "../../../shared/Colors"
import { TextCustom } from "../TextCustom"
import IconAmericanExpress from "../../../assets/icon/card/american-express.png"
import IconVisa from "../../../assets/icon/card/visa.png"
import IconMastercard from "../../../assets/icon/card/mastercard.png"
import IconDiscover from "../../../assets/icon/card/discover.png"
import IconDelete from "../../../assets/icon/delete.png"

export const RenderCard = ({ expire, name, title, handleDelete }) => {

  const num = String(title)[0]

  return (
    <View
      style={{
        width: windowWidth / 1.1,
        padding: 20,
        backgroundColor: White,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        borderWidth: 1,
        borderColor: Mercurysolid,
        marginBottom: 50
      }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
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
        <TouchableOpacity onPress={handleDelete}>
          <Image source={IconDelete} resizeMode={"cover"} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "100%",
          marginTop: 30,
          justifyContent: "center",
          alignItems: "flex-start"
        }}
      >
        <TextCustom text={"Card number"} color={MineShaft} fontSize={16} fontWeight={"700"} marginBottom={10} />
        <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <TextCustom text={`****`} color={MineShaft} fontSize={26} fontWeight={"700"} />
          <TextCustom text={`****`} color={MineShaft} fontSize={26} fontWeight={"700"} />
          <TextCustom text={`****`} color={MineShaft} fontSize={26} fontWeight={"700"} />
          <TextCustom text={`${title.slice(-4)}`} color={MineShaft} fontSize={26} fontWeight={"700"} />
        </View>
      </View>
      <View
        style={{
          width: "100%",
          marginTop: 30,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row"
        }}
      >
        <View style={{ width: "65%" }}>
          <TextCustom text={"Card Holder"} color={MineShaft} fontSize={16} fontWeight={"700"} marginBottom={8} />
          <TextCustom text={`${name}`} color={MineShaft} fontSize={18} fontWeight={"700"} />
        </View>
        <View style={{ width: "35%", alignItems: "flex-end" }}>
          <TextCustom text={"Valid thru"} color={MineShaft} fontSize={16} fontWeight={"700"} marginBottom={8} />
          <TextCustom
            text={`${String(expire).slice(-2)}/${String(expire).slice(2, -2)}`}
            color={MineShaft}
            fontSize={18} fontWeight={"700"}
          />
        </View>
      </View>
    </View>
  )
}
