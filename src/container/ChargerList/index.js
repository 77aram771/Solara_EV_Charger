import React, { useEffect, useState } from "react"
import { ActivityIndicator, Alert, FlatList, Image, TouchableOpacity, View } from "react-native"
import Constants from "expo-constants"
import axios from "axios"
import { API_URL, Tokakey, windowHeight, windowWidth } from "../../shared/Const"
import { BrightGray, Fiord, Manatee, MySin, White } from "../../shared/Colors"
import { InputCustom } from "../../components/UI/InputCustom"
import { TitleCustom } from "../../components/UI/TitleCustom"
import { lang } from "../../shared/Lang"
import IconClose from "../../assets/icon/cancel.png"
import IconSearch from "../../assets/icon/icon-search.png"
import IconCloseYellow from "../../assets/icon/icon-close-yellow.png"
import IconDirection2 from "../../assets/icon/direction2.png"
import IconBook from "../../assets/icon/reserve.png"

export const ChargerList = ({
  countryCode,
  handleModal,
  handleItemId,
  handleStart,
  navigation
}) => {
  const [loader, setLoader] = useState(null)
  const [listData, setListData] = useState(null)
  const [chargerListData, setChargerListData] = useState(null)
  const [value, setValue] = useState("")

  useEffect(() => {
    setLoader(true)
    axios
      .get(`${API_URL}/charge-box/index?page=1&per-page=60000&min=7&max=60&language=${countryCode === "ar" ? "hy" : countryCode}`, { headers: { tokakey: Tokakey } })
      .then(response => {
        setLoader(false)
        setListData(response.data?.data)
      })
      .catch(e => {
        setLoader(false)
        Alert.alert(
          `${e?.response?.data?.name} ${e?.response?.data?.status}`,
          `${e?.response?.data?.message}`,
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        )
      })
  }, [])

  const handleFilter = (value) => {
    if (value) {
      const newDataTitle = listData && listData.filter(function(item) {
        const itemData = item?.title
          ? item?.title.toUpperCase()
          : "".toUpperCase()
        const textData = value.toUpperCase()
        return itemData.indexOf(textData) > -1
      })
      const newDataAddress = listData && listData.filter(function(item) {
        const itemData = item?.address
          ? item?.address.toUpperCase()
          : "".toUpperCase()
        const textData = value.toUpperCase()
        return itemData.indexOf(textData) > -1
      })
      setChargerListData([...newDataTitle, ...newDataAddress])
      setValue(value)
    } else {
      setChargerListData(listData && listData)
      setValue(value)
    }
  }

  const handleResetInput = () => {
    setValue("")
    setChargerListData(listData && listData)
  }

  const RenderChargerItem = ({ title, address, pin, connectors, index }) => {
    return (
      <View
        style={{
          width: "100%",
          marginBottom: 15,
          paddingBottom: 10,
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: BrightGray,
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <View style={{ width: "50%", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start" }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image source={{ uri: pin }} style={{ width: 50, height: 50, marginRight: 10 }} />
          </View>
          <View>
            <TitleCustom textAlign={"left"} text={title} fontSize={14} color={Fiord} marginBottom={5} />
            <TitleCustom textAlign={"left"} text={address} fontSize={14} color={Fiord} marginBottom={5} />
            <View
              style={{
                width: "100%",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "row",
                marginBottom: 5
              }}
            >
              {
                connectors.map(item => {
                  return (
                    <Image
                      source={{ uri: item?.status_image }}
                      style={{ width: 20, height: 20, marginRight: 10 }}
                      key={item?.id}
                    />
                  )
                })
              }
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "30%",
            height: "100%"
          }}
        >
          <TouchableOpacity
            onPress={(e) => {
              handleModal()
              handleItemId(e, index)
              setTimeout(() => {
                navigation.navigate("Book", {
                  itemId: index,
                  isBook: true,
                  data: chargerListData,
                  handleStart: () => handleStart()
                })
              }, 100)
            }}
            style={{
              width: "40%",
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 2,
              borderColor: Fiord,
              marginRight: 10
            }}
          >
            <Image source={IconBook} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={(e) => {
              handleItemId(e, index)
              setTimeout(() => {
                handleStart()
              }, 100)
            }}
            style={{
              backgroundColor: Fiord,
              width: "40%",
              height: 40,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image source={IconDirection2} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View
      style={{
        width: windowWidth,
        height: windowHeight,
        backgroundColor: White,
        paddingTop: Constants.statusBarHeight,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
      }}
    >
      <View
        style={{
          width: "90%",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          paddingTop: 20,
          marginBottom: 30
        }}
      >
        <TouchableOpacity onPress={handleModal}>
          <Image source={IconCloseYellow} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      </View>
      <View style={{ width: "90%", justifyContent: "center", alignItems: "center" }}>
        <InputCustom
          placeholder={lang[countryCode].search}
          value={value}
          handle={value => handleFilter(value)}
          placeholderTextColor={Manatee}
          icon={value.length >= 1 ? IconClose : IconSearch}
          iconClick={value.length >= 1 ? handleResetInput : null}
          iconWidth={25}
          iconHeight={25}
        />
      </View>
      {
        loader
          ? <ActivityIndicator size="large" color={MySin} animating={true} style={{ marginTop: 30 }} />
          : (
            <FlatList
              keyExtractor={(item, index) => index}
              data={chargerListData ? chargerListData : listData}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <RenderChargerItem
                  address={item?.address}
                  connectors={item?.connectors}
                  title={item?.title}
                  pin={item?.pin}
                  index={index}
                />
              )}
              style={{ width: "90%" }}
              contentContainerStyle={{
                marginTop: 30,
                paddingBottom: 60,
                justifyContent: "flex-start",
                alignItems: "flex-start"
              }}
            />
          )
      }
    </View>
  )
}
