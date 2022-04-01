import React, {useContext, useState} from 'react'
import {View, Image, KeyboardAvoidingView, Platform, ScrollView, Text} from "react-native"
import Checkbox from 'expo-checkbox'
import {styles} from "./style"
import IconSolara from '../../../assets/icon/icon-solara.png'
import IconLogin from '../../../assets/icon/login.png'
import IconArrowDown from '../../../assets/icon/dropdown.png'
import {Fiord, Manatee, MySin, White} from "../../../shared/Colors"
import {lang} from "../../../shared/Lang"
import Context from "../../../../Context"
import {TitleCustom} from "../../../components/UI/TitleCustom"
import {InputCustom} from "../../../components/UI/InputCustom"
import {DismissKeyboard} from "../../../components/DismissKeyboard"
import {ButtonCustom} from "../../../components/UI/ButtonCustom"
import {SelectCustom} from "../../../components/UI/SelectCustom"

export const SignUpScreen = ({navigation}) => {

    const {countryCode} = useContext(Context)

    const [name, setName] = useState('')
    const [nameError, setNameError] = useState(false)
    const [nameErrorMessage, setNameErrorMessage] = useState(lang[countryCode].wrongName)
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [emailErrorMessage, setEmailErrorMessage] = useState(lang[countryCode].wrongЕmail)
    const [phone, setPhone] = useState('')
    const [phoneError, setPhoneError] = useState(false)
    const [phoneErrorMessage, setPhoneErrorMessage] = useState(lang[countryCode].wrongPhone)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('please enter password')
    const [auto, setAuto] = useState('')
    const [autoData] = useState([
        {
            label: 'Honda',
            value: 'Honda',
        },
        {
            label: 'BMW',
            value: 'BMW',
        },
        {
            label: 'Mazda',
            value: 'Mazda',
        },
    ])
    const [autoDataError, setAutoDataError] = useState(false)
    const [autoDataErrorMessage, setAutoDataErrorMessage] = useState('choose auto pleas')
    const [autoModal, setAutoModal] = useState('')
    const [autoModalData] = useState([
        {
            label: 'Honda',
            value: 'Honda',
        },
        {
            label: 'BMW',
            value: 'BMW',
        },
        {
            label: 'Mazda',
            value: 'Mazda',
        },
    ])
    const [autoModalError, setAutoModalError] = useState(false)
    const [autoModalErrorMessage, setAutoModalErrorMessage] = useState('choose auto modal pleas')
    const [isSelected, setSelection] = useState(false)

    const handleName = (value) => {
        setName(value)
    }

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

    const handlePhone = (value) => {
        setPhone(value)
    }

    const handlePassword = (value) => {
        console.log(value)
        setPassword(value)
        const regPassword = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/
        if (value.length > 0) {
            if (regPassword.test(value)) {
                setPasswordError(false)
            } else {
                setPasswordError(true)
            }
        } else {
            setPasswordError(false)
        }
    }

    const handleAuto = (value) => {
        setAuto(value)
    }

    const handleAutoModel = (value) => {
        setAutoModal(value)
    }

    return (
        <DismissKeyboard>
            <KeyboardAvoidingView
                // behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
                // keyboardVerticalOffset={Platform.OS === 'android' ? windowHeight / 3 : 25}
                style={{flex: 1}}
                contentContainerStyle={{flex: 1}}
            >
                <View style={styles.container}>
                    <View style={styles.headerBox}>
                        <Image
                            source={IconSolara}
                            style={{width: 100, height: 100, position: "absolute", bottom: -45}}
                        />
                    </View>
                    <ScrollView style={{flex: 1}}>
                        <View style={styles.mineBox}>
                            <TitleCustom
                                text={lang[countryCode].registration}
                                fontSize={24}
                                color={Fiord}
                                marginBottom={25}
                            />
                            <InputCustom
                                placeholder={`${lang[countryCode].name} ${lang[countryCode].surname}`}
                                value={name}
                                handle={value => handleName(value)}
                                placeholderTextColor={Manatee}
                                error={nameError}
                                errorText={nameErrorMessage}
                            />
                            <InputCustom
                                placeholder={lang[countryCode].email}
                                value={email}
                                handle={value => handleEmail(value)}
                                placeholderTextColor={Manatee}
                                keyboardType={'email-address'}
                                error={emailError}
                                errorText={emailErrorMessage}
                            />
                            <InputCustom
                                placeholder={lang[countryCode].phone}
                                value={phone}
                                handle={value => handlePhone(value)}
                                placeholderTextColor={Manatee}
                                keyboardType={'phone-pad'}
                                error={phoneError}
                                errorText={phoneErrorMessage}
                            />
                            <InputCustom
                                placeholder={lang[countryCode].password}
                                value={password}
                                handle={value => handlePassword(value)}
                                placeholderTextColor={Manatee}
                                secureTextEntry={true}
                                error={passwordError}
                                errorText={passwordErrorMessage}
                            />
                            <SelectCustom
                                value={auto}
                                data={autoData}
                                placeholder={{
                                    label: 'Auto',
                                    value: null,
                                    color: Manatee,
                                }}
                                placeholderTextColor={Manatee}
                                handle={value => handleAuto(value)}
                                error={autoDataError}
                                errorText={autoDataErrorMessage}
                                icon={IconArrowDown}
                                iconWidth={13}
                                iconHeight={13}
                            />
                            <SelectCustom
                                value={autoModal}
                                data={autoModalData}
                                placeholder={{
                                    label: 'Model',
                                    value: null,
                                    color: Manatee,
                                }}
                                placeholderTextColor={Manatee}
                                handle={value => handleAutoModel(value)}
                                error={autoModalError}
                                errorText={autoModalErrorMessage}
                                icon={IconArrowDown}
                                iconWidth={13}
                                iconHeight={13}
                            />
                            <View style={styles.checkboxContainer}>
                                <Checkbox
                                    value={isSelected}
                                    onValueChange={setSelection}
                                    style={styles.checkbox}
                                />
                                <Text style={styles.label}>Do you like React Native?</Text>
                            </View>
                            <ButtonCustom
                                text={lang[countryCode].registration}
                                backgroundColor={Fiord}
                                color={MySin}
                                width={'100%'}
                                paddingTop={Platform.OS === 'ios' ? 14 : 8}
                                paddingBottom={Platform.OS === 'ios' ? 14 : 8}
                                click={() => alert('asd')}
                                fontSize={18}
                                fontWeight={'700'}
                                icon={IconLogin}
                                iconWidth={18}
                                iconHeight={18}
                                iconPositionLeft={false}
                                borderRadius={16}
                                borderColor={White}
                                borderWidth={1}
                                marginTop={5}
                            />
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </DismissKeyboard>
    )
}
