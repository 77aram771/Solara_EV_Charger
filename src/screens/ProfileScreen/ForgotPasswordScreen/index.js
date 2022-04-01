import React, {useContext, useState} from 'react'
import {Platform, View} from "react-native"
import {styles} from "./style"
import IconEmail from '../../../assets/icon/email1.png'
import IconDirection from '../../../assets/icon/direction2.png'
import {Fiord, Manatee, MineShaft, MySin, White} from "../../../shared/Colors"
import {lang} from "../../../shared/Lang"
import Context from "../../../../Context"
import {TitleCustom} from "../../../components/UI/TitleCustom"
import {InputCustom} from "../../../components/UI/InputCustom"
import {DismissKeyboard} from "../../../components/DismissKeyboard"
import {ButtonCustom} from "../../../components/UI/ButtonCustom"
import {HeaderCustom} from "../../../components/UI/HeaderCustom"
import {TextCustom} from "../../../components/UI/TextCustom";

export const ForgotPasswordScreen = ({navigation, route}) => {

    const {countryCode} = useContext(Context)

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [emailErrorMessage, setEmailErrorMessage] = useState(lang[countryCode].wrongЕmail)

    const handleEmail = (value) => {
        setEmail(value)
        const regEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        if (value.length > 0) {
            if (regEmail.test(value)) {
                setEmailError(false)
            } else {
                setEmailError(true)
            }
        } else {
            setEmailError(false)
        }
    }

    return (
        <DismissKeyboard>
            <View style={styles.container}>
                <HeaderCustom
                    handleBack={() => navigation.goBack()}
                    backgroundColor={MySin}
                    text={lang[countryCode].changePasswordTitle}
                />
                <View style={styles.mineBox}>
                    <View style={{width: '100%'}}>
                        <TextCustom
                            text={lang[countryCode].writeYourEmailAddressAndFollowTheMarkedFootprints}
                            fontSize={14}
                            color={MineShaft}
                            fontWeight={'400'}
                            textAlign={'left'}
                            marginTop={50}
                            marginBottom={15}
                        />
                    </View>
                    <InputCustom
                        placeholder={lang[countryCode].email}
                        value={email}
                        handle={value => handleEmail(value)}
                        placeholderTextColor={Manatee}
                        icon={IconEmail}
                        keyboardType={'email-address'}
                        iconWidth={25}
                        iconHeight={25}
                        error={emailError}
                        errorText={emailErrorMessage}
                    />
                    <ButtonCustom
                        text={lang[countryCode].send}
                        backgroundColor={Fiord}
                        color={MySin}
                        width={'100%'}
                        paddingTop={Platform.OS === 'ios' ? 14 : 8}
                        paddingBottom={Platform.OS === 'ios' ? 14 : 8}
                        click={() => alert('asd')}
                        fontSize={18}
                        fontWeight={'700'}
                        icon={IconDirection}
                        iconWidth={18}
                        iconHeight={18}
                        iconPositionLeft={false}
                        borderRadius={16}
                        borderColor={White}
                        borderWidth={1}
                        marginTop={5}
                    />
                </View>
            </View>
        </DismissKeyboard>
    )
}
