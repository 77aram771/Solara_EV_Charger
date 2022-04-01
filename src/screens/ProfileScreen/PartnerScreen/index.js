import React, {useContext} from 'react'
import {ScrollView, View} from "react-native"
import {styles} from "./style"
import {Mercurysolid, MineShaft, MySin, White} from "../../../shared/Colors"
import {HeaderCustom} from "../../../components/UI/HeaderCustom"
import {lang} from "../../../shared/Lang"
import Context from "../../../../Context"
import {ButtonCustom} from "../../../components/UI/ButtonCustom"
import IconIns from "../../../assets/icon/instagram.png"

export const PartnerScreen = ({navigation}) => {

    const {countryCode} = useContext(Context)

    return (
        <>
            <HeaderCustom
                handleBack={() => navigation.goBack()}
                backgroundColor={MySin}
                text={lang[countryCode].partner}
            />
            <ScrollView
                style={{flex: 1, backgroundColor: White}}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.container}>
                    <ButtonCustom
                        width={'45%'}
                        height={100}
                        backgroundColor={White}
                        borderColor={Mercurysolid}
                        color={MineShaft}
                        borderWidth={1}
                        borderRadius={18}
                        click={() => alert('asd')}
                        fontSize={18}
                        fontWeight={'400'}
                        icon={IconIns}
                        iconWidth={50}
                        iconHeight={50}
                        marginBottom={20}
                        // iconPositionLeft={false}
                        justifyContent={'center'}
                        paddingLeft={20}
                    />
                    <ButtonCustom
                        width={'45%'}
                        height={100}
                        backgroundColor={White}
                        borderColor={Mercurysolid}
                        color={MineShaft}
                        borderWidth={1}
                        borderRadius={18}
                        click={() => alert('asd')}
                        fontSize={18}
                        fontWeight={'400'}
                        icon={IconIns}
                        iconWidth={50}
                        iconHeight={50}
                        marginBottom={20}
                        // iconPositionLeft={false}
                        justifyContent={'center'}
                        paddingLeft={20}
                    />
                    <ButtonCustom
                        width={'45%'}
                        height={100}
                        backgroundColor={White}
                        borderColor={Mercurysolid}
                        color={MineShaft}
                        borderWidth={1}
                        borderRadius={18}
                        click={() => alert('asd')}
                        fontSize={18}
                        fontWeight={'400'}
                        icon={IconIns}
                        iconWidth={50}
                        iconHeight={50}
                        marginBottom={20}
                        // iconPositionLeft={false}
                        justifyContent={'center'}
                        paddingLeft={20}
                    />
                    <ButtonCustom
                        width={'45%'}
                        height={100}
                        backgroundColor={White}
                        borderColor={Mercurysolid}
                        color={MineShaft}
                        borderWidth={1}
                        borderRadius={18}
                        click={() => alert('asd')}
                        fontSize={18}
                        fontWeight={'400'}
                        icon={IconIns}
                        iconWidth={50}
                        iconHeight={50}
                        marginBottom={20}
                        // iconPositionLeft={false}
                        justifyContent={'center'}
                        paddingLeft={20}
                    />
                </View>
            </ScrollView>
        </>
    )
}