import React, { useContext } from "react"
import { Image, View } from "react-native"
import { styles } from "./style"
import IconFreeNot from "../../../assets/icon/free-not.png"
import { TextCustom } from "../TextCustom"
import { lang } from "../../../shared/Lang"
import { Fiord, SunsetOrange } from "../../../shared/Colors"
import IconFree from "../../../assets/icon/free.png"
import IconPhone from "../../../assets/icon/phone1.png"
import IconMapMarker from "../../../assets/icon/mapmarket.png"
import Context from "../../../../Context"

export const InfoBoxCustom = ({ itemId, isBook, data }) => {

  const { countryCode } = useContext(Context)

  return (
    <View style={styles.infoBox}>
      <View style={styles.infoBoxTop}>
        <View style={styles.topTitleBox}>
          {
            data[itemId]?.active
              ? (
                <>
                  <Image
                    source={IconFreeNot}
                    style={{ width: 20, height: 20, marginRight: 7 }}
                  />
                  <TextCustom
                    text={lang[countryCode].busy}
                    color={SunsetOrange}
                    fontSize={14}
                    fontWeight={"400"}
                  />
                </>

              )
              : (
                <>
                  <Image
                    source={IconFree}
                    style={{ width: 20, height: 20, marginRight: 7 }}
                  />
                  <TextCustom
                    text={lang[countryCode].freedom}
                    color={Fiord}
                    fontSize={14}
                    fontWeight={"400"}
                  />
                </>
              )
          }
        </View>
      </View>
      <View>
        <TextCustom
          text={data[itemId]?.title}
          color={Fiord}
          fontWeight={"700"}
          fontSize={16}
          marginBottom={isBook ? 15 : 5}
        />
        <View style={{ flexDirection: "row" }}>
          {
            isBook
              ? <Image source={IconMapMarker} style={{ width: 20, height: 20, marginRight: 10 }} />
              : null
          }
          <TextCustom
            text={data[itemId]?.address}
            color={Fiord}
            fontWeight={"400"}
            fontSize={16}
            marginBottom={10}
          />
        </View>
        {
          isBook
            ? (
              <View style={{ flexDirection: "row" }}>
                <Image source={IconPhone} style={{ width: 20, height: 20, marginRight: 10 }} />
                <TextCustom
                  text={data[itemId]?.phone}
                  color={Fiord}
                  fontWeight={"400"}
                  fontSize={16}
                  marginBottom={10}
                />
              </View>
            )
            : null
        }
      </View>
      {
        !isBook
          ? (
            <View style={styles.infoBottomBox}>
              {
                data[itemId]?.connectors.map(item => {
                  return (
                    <Image
                      source={{ uri: item?.status_image }}
                      style={{ width: 20, height: 20, marginRight: 10 }}
                      key={item.id}
                    />
                  )
                })
              }
            </View>
          )
          : null
      }
    </View>
  )
}
