import React, {useContext} from 'react'
import {Image, ScrollView, View} from "react-native"
import {styles} from "./style"
import {Fiord, MineShaft, MySin, White} from "../../../shared/Colors"
import {HeaderCustom} from "../../../components/UI/HeaderCustom"
import {lang} from "../../../shared/Lang"
import Context from "../../../../Context"
import {TitleCustom} from "../../../components/UI/TitleCustom"
import ImgSolata from '../../../assets/images/img-Vector_Smart_Object.png'
import {windowHeight, windowWidth} from "../../../shared/Const"
import {TextCustom} from "../../../components/UI/TextCustom"

export const AppInfoScreen = ({navigation}) => {

    const {countryCode} = useContext(Context)

    return (
        <>
            <HeaderCustom
                handleBack={() => navigation.goBack()}
                backgroundColor={MySin}
                text={lang[countryCode].appInfo}
            />
            <ScrollView
                style={{flex: 1, backgroundColor: White}}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.container}>
                    <Image
                        source={ImgSolata}
                        style={{width: windowWidth, height: windowHeight / 4}}
                        resizeMode={"center"}
                    />
                    <TitleCustom
                        text={lang[countryCode].appInfo}
                        fontSize={22}
                        color={Fiord}
                        marginBottom={20}
                        marginTop={20}
                    />
                    <TextCustom
                        text={`${lang[countryCode].appInfoText1}`}
                        fontWeight={'400'}
                        color={MineShaft}
                        fontSize={16}
                        textAlign={'left'}
                        marginBottom={20}
                    />
                </View>
            </ScrollView>
        </>

    )
}
