import React from 'react'
import {View, Image} from "react-native"
import {styles} from "./style"
import {TextCustom} from "../../components/UI/TextCustom"
import IconSolara from '../../assets/icon/icon-solara.png'
import {Fiord, White} from "../../shared/Colors";
import {lang} from "../../shared/Lang";

export const ProfileScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerBox}>
                <Image source={IconSolara} style={{width: 100, height: 100, position: "absolute", bottom: - 45}}/>
            </View>
            <View style={styles.mineBox}>
                <View style={styles.titleBox}>
                    <TextCustom text={lang['arm'].yourCarCharging} color={Fiord} fontSize={20} fontWeight={'700'}/>
                </View>
            </View>
            <View style={styles.footerBox}>

            </View>
        </View>
    )
}
