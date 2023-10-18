import React, {useContext} from "react"
import {Image, TouchableOpacity, View} from "react-native"
import call from "react-native-phone-call"
import {styles} from "./style"
import {TextCustom} from "../TextCustom"
import {lang} from "../../../shared/Lang"
import {Fiord, SunsetOrange} from "../../../shared/Colors"
import Context from "../../../../Context"
import IconPhone from "../../../assets/icon/phone1.png"
import IconCheckActive from "../../../assets/icon/icon-check.png"
import IconMapMarker from "../../../assets/icon/mapmarket.png"
import IconFreeNot from "../../../assets/icon/free-not.png"
import Img360 from "../../../assets/icon/icon-360-degrees.png"

export const InfoBoxCustom = ({isBook, data, image3DData, handleModal360}) => {
    console.log("data ===>", data)
    const {countryCode} = useContext(Context)

    const args = {
        number: data?.phone,
        prompt: false
    }

    return (
        <View style={styles.infoBox}>
            <View style={styles.infoBoxTop}>
                <View style={styles.topTitleBox}>
                    {
                        data?.active
                            ? (
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <Image
                                        source={IconFreeNot}
                                        style={{width: 20, height: 20, marginRight: 7}}
                                    />
                                    <TextCustom
                                        text={lang[countryCode].busy}
                                        color={SunsetOrange}
                                        fontSize={14}
                                        fontWeight={"400"}
                                    />
                                </View>

                            )
                            : (
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <Image
                                        source={IconCheckActive}
                                        style={{width: 20, height: 20, marginRight: 7}}
                                    />
                                    <TextCustom
                                        text={lang[countryCode].freedom}
                                        color={Fiord}
                                        fontSize={14}
                                        fontWeight={"400"}
                                    />
                                </View>
                            )
                    }
                    {
                        image3DData &&
                        <TouchableOpacity onPress={handleModal360}>
                            <Image source={Img360} style={{width: 35, height: 35}}/>
                        </TouchableOpacity>
                    }
                </View>
            </View>
            <View>
                <TextCustom
                    text={data?.title}
                    color={Fiord}
                    fontWeight={"700"}
                    fontSize={16}
                    marginBottom={isBook ? 15 : 5}
                />
                <View style={{flexDirection: "row", marginBottom: 5}}>
                    {isBook && <Image source={IconMapMarker} style={{width: 20, height: 20, marginRight: 10}}/>}
                    <TextCustom
                        text={data?.address}
                        color={Fiord}
                        fontWeight={"400"}
                        fontSize={16}
                        marginBottom={10}
                        wrap={true}
                    />
                </View>
                {
                    isBook
                        ? (
                            <TouchableOpacity onPress={() => call(args).catch(console.error)}
                                              style={{flexDirection: "row"}}>
                                <Image source={IconPhone} style={{width: 20, height: 20, marginRight: 10}}/>
                                <TextCustom
                                    text={data?.phone}
                                    color={Fiord}
                                    fontWeight={"400"}
                                    fontSize={16}
                                    marginBottom={10}
                                />
                            </TouchableOpacity>
                        )
                        : (
                            <View style={styles.infoBottomBox}>
                                {
                                    data?.connectors.map(item => {
                                        return (
                                            <Image
                                                source={{uri: item?.status_image}}
                                                style={{width: 20, height: 20, marginRight: 10}}
                                                key={item.id}
                                            />
                                        )
                                    })
                                }
                            </View>
                        )
                }
            </View>
        </View>
    )
}
