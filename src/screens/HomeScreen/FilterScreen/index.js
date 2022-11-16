import React, { useContext, useEffect, useState } from "react"
import { ActivityIndicator, ScrollView, View } from "react-native"
import axios from "axios"
import { useDispatch } from "react-redux"
import Context from "../../../../Context"
import { Fiord, MySin } from "../../../shared/Colors"
import { HeaderCustom } from "../../../components/UI/HeaderCustom"
import { lang } from "../../../shared/Lang"
import { ButtonCustom } from "../../../components/UI/ButtonCustom"
import { styles } from "./style"
import { paddingHorizontal } from "../../../shared/GlobalStyle"
import { TitleCustom } from "../../../components/UI/TitleCustom"
import { FilterItem } from "../../../components/UI/FilterItem"
import { RangeLineCustom } from "../../../components/UI/RangeLineCustom"
import { CheckItem } from "../../../components/UI/CheckItem"
import { API_URL, Tokakey } from "../../../shared/Const"
import { GetChargeBoxesData } from "../../../store/actionsCreators/ChargeBoxesDataApiActionCreator"
import IconFilter from "../../../assets/icon/filtr2.png"

export const FilterScreen = ({ navigation }) => {

  const dispatch = useDispatch()

  const { countryCode } = useContext(Context)

  const [allSwitch, setAllSwitch] = useState(false)
  const [filterData, setFilterData] = useState(null)
  const [filterItems, setFilterItems] = useState([])
  const [checkData, setCheckData] = useState([
    {
      id: 1,
      active: false
    }
  ])
  const [min, setMin] = useState("")
  const [max, setMax] = useState("")
  const [checkMin, setCheckMin] = useState("")
  const [checkMax, setCheckMax] = useState("")
  const [loader, setLoader] = useState(false)
  const [customUrl, setCustomUrl] = useState([])

  useEffect(() => {
    (async () => {
      setLoader(true)
      await axios.get(`${API_URL}/connector-types/?page=1&per-page=20000000&title=&language=${countryCode === "ar" ? "hy" : countryCode}`,
        { headers: { tokakey: Tokakey } }
      )
        .then(res => {
          setLoader(false)
          setFilterData(res?.data?.data)
        })
      await axios.get(`${API_URL}/data/get-min-max-kw`,
        { headers: { tokakey: Tokakey } }
      )
        .then(res => {
          setMin(res?.data?.min)
          setMax(res?.data?.max)
          setCheckMin(res?.data?.min)
          setCheckMax(res?.data?.max)
        })
    })()
  }, [])

  useEffect(() => {
    const newUrl = []
    filterItems.map((item, index) => {
      newUrl.push(`connector_types[${index}]=${item.id}`)
    })
    setCustomUrl(newUrl)
  }, [filterItems])

  const handleSwitch = (id) => {
    setFilterData(filterData.map((item) => {
      if (item.id === id) {
        item.active = !item.active
        setFilterItems(filterItems.concat([item]))
        if (!item.active) {
          setFilterItems(filterItems.filter(i => i.id !== item.id))
        }
      }
      return item
    }))
    setAllSwitch(false)
  }

  const handleAllSwitch = () => {
    setAllSwitch(!allSwitch)
    if (!allSwitch) {
      setFilterData(filterData.map(item => {
        item.active = !allSwitch
        return item
      }))
      setFilterItems(filterItems.concat(filterData))
    } else {
      setFilterData(filterData.map(item => {
        item.active = !allSwitch
        return item
      }))
      setFilterItems([])
      setCustomUrl([])
    }
  }

  const handleCheckItem = (id) => {
    setCheckData(checkData.map(item => {
      if (item.id === id) {
        item.active = !item.active
      }
      return item
    }))
  }

  const handleMin = (num) => setCheckMin(num)

  const handleMax = (num) => setCheckMax(num)

  const handleSave = () => {
    if (checkData[0].active) {
      dispatch(GetChargeBoxesData(`${API_URL}/charge-box/index?page=1&per-page=100000&${customUrl.join("&")}&only_free=${1}&min=${checkMin}&max=${checkMax}&language=${countryCode === "ar" ? "hy" : countryCode}`))
    } else {
      dispatch(GetChargeBoxesData(`${API_URL}/charge-box/index?page=1&per-page=1000000&${customUrl.join("&")}&min=${checkMin}&max=${checkMax}&language=${countryCode === "ar" ? "hy" : countryCode}`))
    }
    navigation.closeDrawer()
  }

  return (
    <View style={styles.container}>
      <HeaderCustom
        handleBack={() => {
          navigation.closeDrawer()
          handleSave()
        }}
        backgroundColor={MySin}
        text={lang[countryCode].filter}
      />
      <ScrollView
        style={{ paddingHorizontal, marginTop: 10, marginBottom: 60 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {
          loader
            ? (
              <ActivityIndicator size="large" color={MySin} animating={true} style={{ marginVertical: 20 }} />
            )
            : (
              <>
                <TitleCustom text={lang[countryCode].portTypeTitle} fontSize={18} color={Fiord} marginBottom={15} />
                <View style={styles.portsBox}>
                  <FilterItem text={"All"} active={allSwitch} handleSwitch={handleAllSwitch} borderShow={true} />
                  {
                    filterData && filterData.map((item, index) => {
                      return (
                        <FilterItem
                          text={item.title}
                          active={item.active}
                          key={item.id}
                          handleSwitch={() => handleSwitch(item.id)}
                          icon={item.image}
                          iconUri={true}
                          borderShow={filterData.length !== index + 1}
                        />
                      )
                    })
                  }
                </View>
                <TitleCustom text={lang[countryCode].powerTitle} fontSize={18} color={Fiord} marginBottom={15} />
                <View style={styles.rangeBox}>
                  <RangeLineCustom
                    percent={false}
                    min={min}
                    max={max}
                    handleMin={handleMin}
                    handleMax={handleMax}
                    checkMin={checkMin}
                    checkMax={checkMax}
                  />
                </View>
                <TitleCustom text={lang[countryCode].availability} fontSize={18} color={Fiord} marginBottom={15} />
                {
                  checkData.map(item => {
                    return (
                      <CheckItem
                        key={item.id}
                        text={lang[countryCode].filterCheckText1}
                        bool={item.active}
                        handle={() => handleCheckItem(item.id)}
                      />
                    )
                  })
                }
              </>
            )
        }
      </ScrollView>
      <View style={styles.buttonContainer}>
        <ButtonCustom
          text={lang[countryCode].filter.toUpperCase()}
          backgroundColor={Fiord}
          color={MySin}
          width={"100%"}
          height={50}
          click={handleSave}
          fontSize={22}
          fontWeight={"700"}
          icon={IconFilter}
          iconWidth={22}
          iconHeight={22}
          iconPositionLeft={false}
          borderRadius={10}
          disabled={loader}
        />
      </View>
    </View>
  )
}
