import React, {useContext} from 'react'
import {View, Platform} from "react-native"
import {styles} from "./style"
import {Fiord, MySin, White} from "../../shared/Colors"
import {ButtonCustom} from "../../components/UI/ButtonCustom"
import {lang} from "../../shared/Lang"
import Context from "../../../Context"
import IconPlus from '../../assets/icon/plus.png'
import {HeaderCustom} from "../../components/UI/HeaderCustom"

export const WalletScreen = ({navigation}) => {

    const {countryCode} = useContext(Context)

    return (
        <View style={styles.container}>
            <HeaderCustom
                text={lang[countryCode].cards}
                backgroundColor={MySin}
                handleBack={() => navigation.goBack()}
                backArrowHide={true}
            />
            <View>

            </View>
            <ButtonCustom
                text={lang[countryCode].addNewCard}
                backgroundColor={White}
                color={Fiord}
                width={'100%'}
                marginTop={5}
                marginBottom={20}
                paddingTop={Platform.OS === 'ios' ? 14 : 8}
                paddingBottom={Platform.OS === 'ios' ? 14 : 8}
                click={() => alert('asd')}
                fontSize={18}
                fontWeight={'700'}
                icon={IconPlus}
                iconWidth={24}
                iconHeight={24}
                iconPositionLeft={false}
                borderRadius={12}
                borderColor={Fiord}
                borderWidth={1}
            />
        </View>
    )
}
