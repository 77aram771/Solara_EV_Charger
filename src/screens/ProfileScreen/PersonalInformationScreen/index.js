import React, {useContext, useState} from 'react'
import {View, Platform} from "react-native"
import {styles} from "./style"
import {Fiord, Manatee, MySin, White} from "../../../shared/Colors"
import {ButtonCustom} from "../../../components/UI/ButtonCustom"
import {lang} from "../../../shared/Lang"
import Context from "../../../../Context"
import IconCheck from '../../../assets/icon/check2.png'
import IconPassword from '../../../assets/icon/password3.png'
import {HeaderCustom} from "../../../components/UI/HeaderCustom"
import {InputCustom} from "../../../components/UI/InputCustom"
import {DismissKeyboard} from "../../../components/DismissKeyboard"

export const PersonalInformationScreen = ({navigation}) => {

    const {countryCode} = useContext(Context)

    const [name, setName] = useState('')
    const [nameError, setNameError] = useState(false)
    const [nameErrorMessage, setNameErrorMessage] = useState(lang[countryCode].wrongName)
    const [phone, setPhone] = useState('')
    const [phoneError, setPhoneError] = useState(false)
    const [phoneErrorMessage, setPhoneErrorMessage] = useState(lang[countryCode].wrongPhone)
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [emailErrorMessage, setEmailErrorMessage] = useState(lang[countryCode].wrongЕmail)

    return (
        <View style={styles.container}>
            <HeaderCustom
                text={lang[countryCode].personalInformation}
                backgroundColor={MySin}
                handleBack={() => navigation.goBack()}
            />
            <DismissKeyboard>
                <View style={styles.mineBox}>
                    <InputCustom
                        placeholder={`${lang[countryCode].name} ${lang[countryCode].surname}`}
                        value={name}
                        handle={value => setName(value)}
                        placeholderTextColor={Manatee}
                        error={nameError}
                        errorText={nameErrorMessage}
                    />
                    <InputCustom
                        placeholder={lang[countryCode].phone}
                        value={phone}
                        handle={value => setPhone(value)}
                        placeholderTextColor={Manatee}
                        error={phoneError}
                        errorText={phoneErrorMessage}
                        keyboardType={'phone-pad'}
                    />
                    <InputCustom
                        placeholder={lang[countryCode].email}
                        value={email}
                        handle={value => setEmail(value)}
                        placeholderTextColor={Manatee}
                        error={emailError}
                        errorText={emailErrorMessage}
                        keyboardType={'email-address'}
                    />
                    <ButtonCustom
                        text={lang[countryCode].save}
                        backgroundColor={Fiord}
                        color={MySin}
                        width={'100%'}
                        marginTop={15}
                        marginBottom={20}
                        paddingTop={Platform.OS === 'ios' ? 14 : 8}
                        paddingBottom={Platform.OS === 'ios' ? 14 : 8}
                        click={() => alert('asd')}
                        fontSize={18}
                        fontWeight={'700'}
                        icon={IconCheck}
                        iconWidth={24}
                        iconHeight={24}
                        iconPositionLeft={false}
                        borderRadius={12}
                    />
                </View>
            </DismissKeyboard>
            <ButtonCustom
                text={lang[countryCode].changePassword}
                backgroundColor={White}
                color={Fiord}
                width={'100%'}
                marginTop={5}
                marginBottom={20}
                paddingTop={Platform.OS === 'ios' ? 14 : 8}
                paddingBottom={Platform.OS === 'ios' ? 14 : 8}
                click={() => navigation.navigate('ChangePassword')}
                fontSize={18}
                fontWeight={'700'}
                icon={IconPassword}
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
