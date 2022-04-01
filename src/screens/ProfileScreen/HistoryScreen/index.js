import React, {useContext, useState} from 'react'
import {FlatList, Image, TouchableHighlight, View} from "react-native"
import {styles} from './style'
import {HeaderCustom} from "../../../components/UI/HeaderCustom"
import {Fiord, Manatee, MineShaft, MySin, White} from "../../../shared/Colors"
import {lang} from "../../../shared/Lang"
import Context from "../../../../Context"
import {TextCustom} from "../../../components/UI/TextCustom"
import {windowWidth} from "../../../shared/Const"
import IconVisa from '../../../assets/icon/icon-visa.png'
import {dataInputs, dataOutputs} from "../../../shared/MockData"

export const HistoryScreen = ({navigation}) => {

    const {countryCode} = useContext(Context)

    const [check, setCheck] = useState(false)

    return (
        <>
            <HeaderCustom
                handleBack={() => navigation.goBack()}
                backgroundColor={MySin}
                text={lang[countryCode].history}
            />
            <View style={styles.container}>
                <View style={styles.tabBox}>
                    <TouchableHighlight
                        onPress={() => setCheck(false)}
                        style={[
                            styles.leftTab,
                            {
                                backgroundColor: check ? White : Fiord
                            }
                        ]}
                    >
                        <TextCustom
                            text={lang[countryCode].inputs}
                            color={!check ? MySin : Fiord}
                            fontSize={18}
                            fontWeight={'700'}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={() => setCheck(true)}
                        style={[
                            styles.rightTab,
                            {
                                backgroundColor: !check ? White : Fiord
                            }
                        ]}
                    >
                        <TextCustom
                            text={lang[countryCode].outputs}
                            color={check ? MySin : Fiord}
                            fontSize={19}
                            fontWeight={'700'}
                        />
                    </TouchableHighlight>
                </View>
                {
                    !check
                        ? (
                            <View style={styles.titleBox}>
                                <TextCustom
                                    text={lang[countryCode].totalPrice}
                                    color={Fiord}
                                    fontSize={18}
                                    fontWeight={'700'}
                                />
                                <View style={styles.priceBox}>
                                    <TextCustom
                                        text={`25.000 ${lang[countryCode].dram}`}
                                        fontSize={14}
                                        color={MySin}
                                        fontWeight={'700'}
                                    />
                                </View>
                            </View>
                        )
                        : (
                            <View style={styles.titleBox}>
                                <TextCustom
                                    text={lang[countryCode].totalCharge}
                                    color={Fiord}
                                    fontSize={18}
                                    fontWeight={'700'}
                                />
                                <View style={styles.priceBox}>
                                    <TextCustom
                                        text={`45.000${lang[countryCode].dram}`}
                                        fontSize={14}
                                        color={MySin}
                                        fontWeight={'700'}
                                    />
                                </View>
                            </View>
                        )
                }
                {
                    !check
                        ? (
                            <FlatList
                                keyExtractor={item => item.id}
                                data={dataInputs}
                                renderItem={({item}) => {
                                    return (
                                        <View style={styles.itemContainer}>
                                            <View>
                                                <View
                                                    style={{
                                                        width: windowWidth / 4,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        padding: 5,
                                                        borderRadius: 5,
                                                        backgroundColor: Fiord
                                                    }}
                                                >
                                                    <TextCustom
                                                        text={`${item?.kw}${lang[countryCode].dram}`}
                                                        color={MySin}
                                                        fontSize={14}
                                                        fontWeight={'500'}
                                                    />
                                                </View>
                                                <TextCustom
                                                    text={item.date}
                                                    color={Manatee}
                                                    fontSize={10}
                                                    fontWeight={'400'}
                                                />
                                            </View>
                                            <View
                                                style={{
                                                    alignItems: 'flex-end',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between'
                                                }}
                                            >
                                                <Image
                                                    source={IconVisa}
                                                    style={{width: 70, height: 20, marginBottom: 10}}
                                                    resizeMode={'stretch'}
                                                />
                                                <TextCustom
                                                    text={`Card number: ${item.cardNumber}`}
                                                    color={MineShaft}
                                                    fontSize={14}
                                                    fontWeight={'500'}
                                                />
                                            </View>
                                        </View>
                                    )
                                }}
                                style={{width: '100%'}}
                            />
                        )
                        : (
                            <FlatList
                                keyExtractor={item => item.id}
                                data={dataOutputs}
                                renderItem={({item}) => {
                                    return (
                                        <View style={styles.itemContainer}>
                                            <View style={{
                                                width: '100%'
                                            }}>
                                                <View
                                                    style={{
                                                        width: '100%',
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        marginBottom: 10
                                                    }}
                                                >
                                                    <View>
                                                        <TextCustom
                                                            text={'Station name'}
                                                            color={MineShaft}
                                                            fontSize={12}
                                                            fontWeight={'400'}
                                                        />
                                                        <TextCustom
                                                            text={item.title}
                                                            color={MineShaft}
                                                            fontSize={16}
                                                            fontWeight={'700'}
                                                        />
                                                    </View>
                                                    <View
                                                        style={{
                                                            width: windowWidth / 4,
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            padding: 5,
                                                            borderRadius: 5,
                                                            backgroundColor: Fiord
                                                        }}
                                                    >
                                                        <TextCustom
                                                            text={`${item?.price}${lang[countryCode].kw}`}
                                                            color={MySin}
                                                            fontSize={14}
                                                            fontWeight={'500'}
                                                        />
                                                    </View>
                                                </View>
                                                <View
                                                    style={{
                                                        width: '100%',
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between'
                                                    }}
                                                >
                                                    <View>
                                                        <TextCustom
                                                            text={'Data and Time'}
                                                            color={MineShaft}
                                                            fontSize={12}
                                                            fontWeight={'400'}
                                                        />
                                                        <TextCustom
                                                            text={`${item.date}  ${item.time}`}
                                                            color={MineShaft}
                                                            fontSize={16}
                                                            fontWeight={'700'}
                                                        />
                                                    </View>
                                                </View>
                                                <View
                                                    style={{
                                                        width: '100%',
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        marginBottom: 10
                                                    }}
                                                >
                                                    <View>
                                                        <TextCustom
                                                            text={'Payment'}
                                                            color={MineShaft}
                                                            fontSize={12}
                                                            fontWeight={'400'}
                                                        />
                                                    </View>
                                                    <View
                                                        style={{
                                                            width: windowWidth / 4,
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            padding: 5,
                                                            borderRadius: 5,
                                                            backgroundColor: Fiord
                                                        }}
                                                    >
                                                        <TextCustom
                                                            text={`${item?.price}${lang[countryCode].dram}`}
                                                            color={MySin}
                                                            fontSize={14}
                                                            fontWeight={'500'}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                }}
                                style={{width: '100%'}}
                            />
                        )
                }
            </View>
        </>
    )
}