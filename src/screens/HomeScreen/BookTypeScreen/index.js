import React, {useContext, useEffect} from 'react'
import {Image, ScrollView, View} from "react-native"
import Context from "../../../../Context"
import {HeaderCustom} from "../../../components/UI/HeaderCustom"
import {Fiord, MineShaft, MySin, White} from "../../../shared/Colors"
import {styles} from "./style"
import ImgLight from '../../../assets/icon/priceunit.png'
import {CordinateClusterData} from "../../../shared/MockData"
import {TextCustom} from "../../../components/UI/TextCustom"
import {ButtonCustom} from "../../../components/UI/ButtonCustom"
import {lang} from "../../../shared/Lang"
import IconCharge from '../../../assets/icon/charge.png'
import {RangeLineCustom} from "../../../components/UI/RangeLineCustom"

export const BookTypeScreen = ({navigation, route}) => {

    const {handleHideTabBar} = useContext(Context)

    useEffect(() => {
        return navigation.addListener('focus', () => {
            handleHideTabBar(false)
        })
    }, [navigation])

    return (
        <View style={styles.container}>
            <HeaderCustom
                handleBack={() => navigation.goBack()}
                backgroundColor={MySin}
                text={''}
            />
            <ScrollView style={{marginBottom: 60, top: -10}}>
                <View style={styles.sliderBox}>
                    <Image
                        source={CordinateClusterData[route.params.itemId].ports[route.params.portsId].icon}
                        style={{width: 70, height: 70}}
                        resizeMode={'cover'}
                    />
                    <TextCustom
                        text={CordinateClusterData[route.params.itemId].title}
                        color={White}
                        fontSize={35}
                        fontWeight={'700'}
                    />
                    <TextCustom
                        text={CordinateClusterData[route.params.itemId].ports[route.params.portsId].text}
                        color={White}
                        fontSize={12}
                        fontWeight={'700'}
                    />
                    <View style={styles.bookInfoBox}>
                        <TextCustom
                            text={`${lang['arm'].port} 98564`}
                            fontSize={14}
                            color={MineShaft}
                            fontWeight={'400'}
                        />
                    </View>
                </View>
                <View style={styles.typeBox}>
                    <View style={[styles.typeItem, {borderTopWidth: 0}]}>
                        <TextCustom text={lang['arm'].Tariff} color={Fiord} fontSize={16} fontWeight={'700'}/>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <TextCustom
                                text={`${CordinateClusterData[route.params.itemId].ports[route.params.portsId].price}$/`}
                                fontWeight={'400'}
                                color={MineShaft}
                                fontSize={14}
                            />
                            <Image source={ImgLight} style={{width: 13, height: 13}}/>
                        </View>
                    </View>
                    <View style={styles.typeItem}>
                        <TextCustom text={lang['arm'].maxPower} color={MineShaft} fontSize={14} fontWeight={'400'}/>
                        <TextCustom
                            text={`${CordinateClusterData[route.params.itemId].ports[route.params.portsId].rate} ${lang['arm'].kw}`}
                            color={MineShaft}
                            fontSize={14}
                            fontWeight={'400'}
                        />
                    </View>
                    <View style={styles.typeItem}>
                        <TextCustom text={lang['arm'].yourCar} color={MineShaft} fontSize={14} fontWeight={'400'}/>
                        <TextCustom
                            text={`Nissan Leaf`}
                            color={MineShaft}
                            fontSize={14}
                            fontWeight={'400'}
                        />
                    </View>
                    <View style={styles.typeItem}>
                        <TextCustom text={lang['arm'].approximatePrice} color={MineShaft} fontSize={14}
                                    fontWeight={'400'}/>
                        <TextCustom
                            text={`0$`}
                            color={MineShaft}
                            fontSize={14}
                            fontWeight={'400'}
                        />
                    </View>
                    <View style={styles.typeItem}>
                        <TextCustom text={lang['arm'].fillingTime} color={MineShaft} fontSize={14} fontWeight={'400'}/>
                        <TextCustom
                            text={`2${lang['arm'].H} 45${lang["arm"].M}`}
                            color={MineShaft}
                            fontSize={14}
                            fontWeight={'400'}
                        />
                    </View>
                    <View style={styles.typeItem}>
                        <TextCustom text={lang['arm'].mileageIncrease} color={MineShaft} fontSize={14}
                                    fontWeight={'400'}/>
                        <TextCustom
                            text={`0${lang["arm"].km}`}
                            color={MineShaft}
                            fontSize={14}
                            fontWeight={'400'}
                        />
                    </View>
                    <View style={styles.typeItem}>
                        <TextCustom text={lang['arm'].chargingLimit} color={MineShaft} fontSize={14}
                                    fontWeight={'400'}/>
                        <TextCustom
                            text={`1200${lang["arm"].kw}`}
                            color={MineShaft}
                            fontSize={14}
                            fontWeight={'400'}
                        />
                    </View>
                </View>
                <View style={styles.titleBox}>
                    <TextCustom
                        text={lang["arm"].selectChargingPercent}
                        color={MineShaft}
                        fontSize={14}
                        fontWeight={'400'}
                    />
                </View>
                <View style={styles.rangeBox}>
                    <RangeLineCustom percent={true}/>
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <ButtonCustom
                    text={lang['arm'].charge.toUpperCase()}
                    backgroundColor={Fiord}
                    color={MySin}
                    width={'100%'}
                    height={50}
                    click={() => {navigation.navigate('LoadCharge')}}
                    fontSize={18}
                    fontWeight={'700'}
                    icon={IconCharge}
                    iconWidth={18}
                    iconHeight={18}
                    iconPositionLeft={false}
                    borderRadius={10}
                />
            </View>
        </View>
    )
}
