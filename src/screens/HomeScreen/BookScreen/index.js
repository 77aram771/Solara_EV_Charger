import React, {useContext, useEffect} from 'react'
import {Image, Platform, ScrollView, TouchableOpacity, View} from "react-native"
import {SwiperFlatList} from 'react-native-swiper-flatlist'
import Context from "../../../../Context"
import {HeaderCustom} from "../../../components/UI/HeaderCustom"
import {Dandelion, Fiord, MineShaft, MySin, White} from "../../../shared/Colors"
import {styles} from "./style"
import {InfoBoxCustom} from "../../../components/UI/InfoBoxCustom"
import ImgBookSlide1 from '../../../assets/images/img-book-slide1.jpeg'
import ImgLight from '../../../assets/icon/priceunit.png'
import {windowHeight, windowWidth} from "../../../shared/Const"
import {CordinateClusterData} from "../../../shared/MockData"
import {TextCustom} from "../../../components/UI/TextCustom"
import {ButtonCustom} from "../../../components/UI/ButtonCustom"
import {lang} from "../../../shared/Lang"
import IconArrow from "../../../assets/icon/arrow3.png"
import IconDirection2 from '../../../assets/icon/direction2.png'

export const BookScreen = ({navigation, route}) => {

    const {handleHideTabBar, location, countryCode} = useContext(Context)

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
                text={CordinateClusterData[route.params.itemId].title}
            />
            <ScrollView
                style={{marginBottom: 60, top: -10}}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
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
                            height: 14,
                        }}
                    >
                        <Image source={ImgBookSlide1} style={{width: windowWidth, height: windowHeight / 3}}/>
                        <Image source={ImgBookSlide1} style={{width: windowWidth, height: windowHeight / 3}}/>
                        <Image source={ImgBookSlide1} style={{width: windowWidth, height: windowHeight / 3}}/>
                    </SwiperFlatList>
                </View>
                <View style={styles.bookInfoBox}>
                    <InfoBoxCustom itemId={route.params.itemId} isBook={route.params.isBook}/>
                </View>
                <View style={styles.typeBox}>
                    <View style={[styles.typeItem, {paddingLeft: 20, borderTopWidth: 0}]}>
                        <View style={{flexDirection: 'row'}}>
                            <TextCustom
                                text={`${lang[countryCode].type}`}
                                marginRight={5}
                                fontWeight={'400'}
                                color={MineShaft}
                                fontSize={16}
                            />
                        </View>
                        <View>
                            <TextCustom
                                text={`${lang[countryCode].Tariff}`}
                                marginRight={5}
                                fontWeight={'400'}
                                color={MineShaft}
                                fontSize={16}
                            />
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <TextCustom
                                text={`${lang[countryCode].price}`}
                                fontWeight={'400'}
                                color={MineShaft}
                                fontSize={16}
                            />
                            <Image source={ImgLight} style={{width: 13, height: 13, marginRight: 10}}/>
                        </View>
                    </View>
                    {
                        CordinateClusterData[route.params.itemId].ports.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('BookType', {
                                        itemId: route.params.itemId,
                                        portsId: index
                                    })}
                                    key={item.id}
                                    style={styles.typeItem}
                                >
                                    <View style={{flexDirection: 'row'}}>
                                        <TextCustom
                                            text={`${item.id}.`}
                                            marginRight={5}
                                            fontWeight={'400'}
                                            color={MineShaft}
                                            fontSize={16}
                                        />
                                        <Image source={item.icon} style={{width: 20, height: 20, marginRight: 10}}/>
                                        <TextCustom
                                            text={`${item.text}`}
                                            marginRight={5}
                                            fontWeight={'400'}
                                            color={MineShaft}
                                            fontSize={16}
                                        />
                                    </View>
                                    <View>
                                        <TextCustom
                                            text={`${item.rate} ${lang[countryCode].kw}`}
                                            marginRight={5}
                                            fontWeight={'400'}
                                            color={MineShaft}
                                            fontSize={16}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <TextCustom
                                            text={`${item.price}`}
                                            fontWeight={'400'}
                                            color={MineShaft}
                                            fontSize={16}
                                        />
                                        <Image source={ImgLight} style={{width: 13, height: 13, marginRight: 10}}/>
                                        <Image source={IconArrow} style={{width: 10, height: 10}}/>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
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
                                width={'100%'}
                                click={() => {
                                    route.params.handleStart()
                                    navigation.goBack()
                                }}
                                fontSize={18}
                                fontWeight={'700'}
                                icon={IconDirection2}
                                iconWidth={18}
                                iconHeight={18}
                                iconPositionLeft={false}
                                borderRadius={10}
                                marginBottom={20}
                                paddingTop={Platform.OS === 'ios' ? 14 : 8}
                                paddingBottom={Platform.OS === 'ios' ? 14 : 8}
                            />
                        )
                        : null
                }
            </View>
        </View>
    )
}
