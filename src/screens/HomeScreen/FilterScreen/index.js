import React, {useState} from "react"
import {ScrollView, View} from "react-native"
import {Fiord, MySin} from "../../../shared/Colors"
import {HeaderCustom} from "../../../components/UI/HeaderCustom"
import {lang} from "../../../shared/Lang"
import {ButtonCustom} from "../../../components/UI/ButtonCustom"
import IconFilter from '../../../assets/icon/filtr2.png'
import {styles} from "./style"
import {paddingHorizontal} from "../../../shared/GlobalStyle"
import {TitleCustom} from "../../../components/UI/TitleCustom"
import {FilterItem} from "../../../components/UI/FilterItem"
import {FilterCheckItems, FilterPortsData} from "../../../shared/MockData"
import {RangeLineCustom} from "../../../components/UI/RangeLineCustom"
import {CheckItem} from "../../../components/UI/CheckItem"

export const FilterScreen = ({navigation}) => {

    const [allSwitch, setAllSwitch] = useState(false)
    const [filterData, setFilterData] = useState(FilterPortsData)
    const [checkData, setCheckData] = useState(FilterCheckItems)

    const handleSwitch = (id) => {
        setFilterData(filterData.map(item => {
            if (item.id === id) {
                item.active = !item.active
            }
            return item
        }))
        setAllSwitch(false)
    }

    const handleAllSwitch = () => {
        setAllSwitch(!allSwitch)
        if (setAllSwitch) {
            setFilterData(filterData.map(item => {
                item.active = true
                return item
            }))
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

    return (
        <View style={styles.container}>
            <HeaderCustom
                handleBack={() => navigation.closeDrawer()}
                backgroundColor={MySin}
                text={lang['arm'].filter}
            />
            <ScrollView style={{paddingHorizontal, marginTop: 10, marginBottom: 60}}>
                <TitleCustom text={lang['arm'].portTypeTitle} fontSize={18} color={Fiord} marginBottom={15}/>
                <View style={styles.portsBox}>
                    <FilterItem text={'All'} active={allSwitch} handleSwitch={handleAllSwitch} borderShow={true}/>
                    {
                        filterData.map((item, index) => {
                            return (
                                <FilterItem
                                    text={item.name}
                                    active={item.active}
                                    key={item.id}
                                    handleSwitch={() => handleSwitch(item.id)}
                                    icon={item.icon}
                                    borderShow={filterData.length !== index + 1}
                                />
                            )
                        })
                    }
                </View>
                <TitleCustom text={lang['arm'].powerTitle} fontSize={18} color={Fiord} marginBottom={15}/>
                <View style={styles.rangeBox}>
                    <RangeLineCustom/>
                </View>
                <TitleCustom text={lang['arm'].availability} fontSize={18} color={Fiord} marginBottom={15}/>
                {
                    FilterCheckItems.map(item => {
                        return (
                            <CheckItem text={item.text} bool={item.active} handle={() => handleCheckItem(item.id)}/>
                        )
                    })
                }
            </ScrollView>
            <View style={styles.buttonContainer}>
                <ButtonCustom
                    text={lang['arm'].filter.toUpperCase()}
                    backgroundColor={Fiord}
                    color={MySin}
                    width={'100%'}
                    height={50}
                    click={() => navigation.closeDrawer()}
                    fontSize={22}
                    fontWeight={'700'}
                    icon={IconFilter}
                    iconWidth={22}
                    iconHeight={22}
                    iconPositionLeft={false}
                    borderRadius={10}
                />
            </View>
        </View>
    )
}
