import React, { useContext, useEffect, useState } from "react"
import { Image, Platform, ScrollView, TouchableOpacity, View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { SwiperFlatList } from "react-native-swiper-flatlist"
import Context from "../../../../Context"
import { HeaderCustom } from "../../../components/UI/HeaderCustom"
import { Dandelion, Fiord, MineShaft, MySin, White } from "../../../shared/Colors"
import { styles } from "./style"
import { InfoBoxCustom } from "../../../components/UI/InfoBoxCustom"
import ImgLight from "../../../assets/icon/priceunit.png"
import { API_URL, windowHeight, windowWidth } from "../../../shared/Const"
import { TextCustom } from "../../../components/UI/TextCustom"
import { ButtonCustom } from "../../../components/UI/ButtonCustom"
import { lang } from "../../../shared/Lang"
import IconArrow from "../../../assets/icon/arrow3.png"
import IconDirection2 from "../../../assets/icon/direction2.png"

export const BookScreen = ({ navigation, route }) => {

  const { handleHideTabBar, location, countryCode, sumKW } = useContext(Context)

  const [data, setData] = useState(null)
  const [imageData, setImageData] = useState(null)

  useEffect(() => {
    return navigation.addListener("focus", () => {
      handleHideTabBar(false)
    })
  }, [navigation])

  useEffect(() => {
    (async () => {
      const Token = await AsyncStorage.getItem("token")
      await axios.post(
        `${API_URL}/charge-box/details?access-token=${Token}`,
        { id: route?.params?.data[route?.params.itemId].id },
        {
          headers: {
            tokakey: "f9cbdcf0b9bc49ec15e2098127a0052997b5fda5"
          }
        })
        .then(res => {
          // console.log("res?.data", res?.data?.images)
          setImageData(res?.data?.images)
          setData(res?.data)
        })
        .catch(e => console.log("e", e))
    })()
  }, [])

  return (
    <View style={styles.container}>
      <HeaderCustom
        handleBack={() => navigation.goBack()}
        backgroundColor={MySin}
        text={route.params?.data[route.params.itemId]?.title}
      />
      <ScrollView
        style={{ marginBottom: 60, top: -10, flex: 1 }}
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
              bottom: 85
            }}
            paginationStyleItem={{
              width: 14,
              height: 14
            }}
          >
            {
              imageData && imageData.map((item, index) => {
                return (
                  <Image source={{ uri: item }} style={{ width: windowWidth, height: windowHeight / 3 }} key={index}
                         resizeMode={"cover"} />
                )
              })
            }
          </SwiperFlatList>
        </View>
        <View style={styles.bookInfoBox}>
          <InfoBoxCustom itemId={route.params.itemId} isBook={route.params.isBook} data={route.params?.data} />
          <View style={styles.typeBox}>
            <View style={[styles.typeItem, { paddingLeft: 20, borderTopWidth: 0 }]}>
              <View style={{ flexDirection: "row" }}>
                <TextCustom
                  text={`${lang[countryCode].type}`}
                  marginRight={5}
                  fontWeight={"400"}
                  color={MineShaft}
                  fontSize={16}
                />
              </View>
              <View>
                <TextCustom
                  text={`${lang[countryCode].Tariff}`}
                  marginRight={5}
                  fontWeight={"400"}
                  color={MineShaft}
                  fontSize={16}
                />
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextCustom
                  text={`${lang[countryCode].price}`}
                  fontWeight={"400"}
                  color={MineShaft}
                  fontSize={16}
                />
                <Image source={ImgLight} style={{ width: 13, height: 13, marginRight: 10 }} />
              </View>
            </View>
            {
              route.params?.data[route.params?.itemId]?.connectors.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("BookType", {
                      itemId: route.params?.itemId,
                      portsId: index
                    })}
                    key={item.id}
                    style={styles.typeItem}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <TextCustom
                        text={`${++index}.`}
                        marginRight={5}
                        fontWeight={"400"}
                        color={MineShaft}
                        fontSize={14}
                      />
                      <Image source={{ uri: item?.type?.image }} style={{ width: 20, height: 20, marginRight: 10 }} />
                      <TextCustom
                        text={`${item?.type?.title}`}
                        marginRight={5}
                        fontWeight={"400"}
                        color={MineShaft}
                        fontSize={14}
                      />
                    </View>
                    <View>
                      <TextCustom
                        text={`${item?.power} ${lang[countryCode].kw}`}
                        marginRight={5}
                        fontWeight={"400"}
                        color={MineShaft}
                        fontSize={14}
                      />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <TextCustom
                        text={sumKW}
                        fontWeight={"400"}
                        color={MineShaft}
                        fontSize={14}
                      />
                      <Image source={ImgLight} style={{ width: 13, height: 13, marginRight: 10 }} />
                      <Image source={IconArrow} style={{ width: 10, height: 10 }} />
                    </View>
                  </TouchableOpacity>
                )
              })
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
                  route.params.handleStart()
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
