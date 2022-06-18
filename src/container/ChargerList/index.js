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

export const ChargerList = ({
  data,
  loader,
  handleData,
  countryCode,
  handleModal,
  handleItemId
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
      <TouchableOpacity
        onPress={(e) => handleItemId(e, index)}
        style={{
          width: windowWidth,
          marginBottom: 15,
          paddingBottom: 10,
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: BrightGray
        }}
      >
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
      </TouchableOpacity>
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
        width: windowWidth / 1.1,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        paddingTop: 20,
        marginBottom: 30
      }}>
        <TouchableOpacity onPress={handleModal}>
          <Image source={IconCloseYellow} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      </View>
      <View style={{ width: windowWidth / 1.1, justifyContent: "center", alignItems: "center" }}>
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
        style={{ width: windowWidth / 1.1 }}
        contentContainerStyle={{
          width: "100%",
          marginTop: 30,
          paddingBottom: 60,
          justifyContent: "flex-start",
          alignItems: "flex-start"
        }}
      />
    </View>
  )
}