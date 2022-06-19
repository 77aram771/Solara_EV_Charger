import React, { useEffect, useState } from "react"
import { FlatList, Image, RefreshControl, TouchableOpacity, View } from "react-native"
import Constants from "expo-constants"
import { windowHeight, windowWidth } from "../../shared/Const"
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
  data,
  loader,
  handleData,
  countryCode,
  handleModal,
  handleItemId,
  handleStart,
  navigation,
}) => {

  const [chargerListData, setChargerListData] = useState(null)

  const [value, setValue] = useState("")

  useEffect(() => {
    if (data) {
      setChargerListData(data)
    }
  }, [data])

  const handleFilter = (value) => {
    if (value) {
      const newData = data.filter(function(item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase()
        const textData = value.toUpperCase()
        return itemData.indexOf(textData) > -1
      });
      setChargerListData(newData)
      setValue(value)
    } else {
      setChargerListData(data)
      setValue(value)
    }
  }

  const handleResetInput = () => {
    setValue("")
    setChargerListData(data)
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
                      key={item.id}
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
            justifyContent: "space-between",
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
              width: "47%",
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 2,
              borderColor: Fiord
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
              width: "47%",
              height: 50,
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
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <View style={{
        width: "90%",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        paddingTop: 20,
        marginBottom: 30
      }}>
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
      <FlatList
        keyExtractor={item => item.id}
        data={chargerListData}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loader}
            onRefresh={handleData}
            tintColor={MySin}
          />
        }
        renderItem={({ item, index }) => (
          <RenderChargerItem
            address={item.address}
            connectors={item.connectors}
            title={item.title}
            pin={item.pin}
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
    </View>
  )
}