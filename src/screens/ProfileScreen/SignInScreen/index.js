import React, {useContext, useEffect, useState} from 'react'
import {View, Image, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity} from "react-native"
import {styles} from "./style"
import IconSolara from '../../../assets/icon/icon-solara.png'
import IconEmail from '../../../assets/icon/email1.png'
import IconPassword from '../../../assets/icon/password1.png'
import IconLogin from '../../../assets/icon/login.png'
import {Fiord, Manatee, MineShaft, MySin, White} from "../../../shared/Colors"
import {lang} from "../../../shared/Lang"
import Context from "../../../../Context"
import {TitleCustom} from "../../../components/UI/TitleCustom"
import {InputCustom} from "../../../components/UI/InputCustom"
import {DismissKeyboard} from "../../../components/DismissKeyboard"
import {ButtonCustom} from "../../../components/UI/ButtonCustom"
import {TextCustom} from "../../../components/UI/TextCustom"

export const SignInScreen = ({navigation}) => {

    const {countryCode, handleUser} = useContext(Context)

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [emailErrorMessage, setEmailErrorMessage] = useState(lang[countryCode].wrongЕmail)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('please enter password')

    const handleEmail = (value) => {
        setEmail(value)
        const regEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        if(value.length > 0) {
            if(regEmail.test(value)){
                setEmailError(false)
            }
            else {
                setEmailError(true)
            }
        }
        else {
            setEmailError(false)
        }
    }

    const handlePassword = (value) => {
        console.log(value)
        setPassword(value)
        const regPassword = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/
        if(value.length > 0) {
            if(regPassword.test(value)){
                setPasswordError(false)
            }
            else {
                setPasswordError(true)
            }
        }
        else {
            setPasswordError(false)
        }
    }

    const handleEnter = () => {
        handleUser(true)
        navigation.goBack()
    }

    return (
        <DismissKeyboard>
            <KeyboardAvoidingView
                // behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
                // keyboardVerticalOffset={Platform.OS === 'android' ? windowHeight / 3 : 25}
                style={{flex: 1}}
                contentContainerStyle={{flex: 1}}
            >
                <ScrollView style={{flex: 1}} contentContainerStyle={{flex: 1}}>
                    <View style={styles.container}>
                        <View>
                            <View style={styles.headerBox}>
                                <Image
                                    source={IconSolara}
                                    style={{width: 100, height: 100, position: "absolute", bottom: -45}}
                                />
                            </View>
                            <View style={styles.mineBox}>
                                <TitleCustom
                                    text={lang[countryCode].enter}
                                    fontSize={24}
                                    color={Fiord}
                                    marginBottom={25}
                                />
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
                                <InputCustom
                                    placeholder={lang[countryCode].password}
                                    value={password}
                                    handle={value => handlePassword(value)}
                                    placeholderTextColor={Manatee}
                                    icon={IconPassword}
                                    iconWidth={25}
                                    iconHeight={25}
                                    secureTextEntry={true}
                                    error={passwordError}
                                    errorText={passwordErrorMessage}
                                />
                                <ButtonCustom
                                    text={lang[countryCode].enter}
                                    backgroundColor={Fiord}
                                    color={MySin}
                                    width={'100%'}
                                    marginTop={5}
                                    paddingTop={Platform.OS === 'ios' ? 14 : 8}
                                    paddingBottom={Platform.OS === 'ios' ? 14 : 8}
                                    click={handleEnter}
                                    fontSize={18}
                                    fontWeight={'700'}
                                    icon={IconLogin}
                                    iconWidth={18}
                                    iconHeight={18}
                                    iconPositionLeft={false}
                                    borderRadius={16}
                                    borderColor={White}
                                    borderWidth={1}
                                />
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('ForgotPassword')}
                                    style={{marginTop: 20}}
                                >
                                    <TextCustom
                                        text={lang[countryCode].rememberPassword}
                                        color={MineShaft}
                                        fontSize={14}
                                        textAlign={'center'}
                                        fontWeight={'500'}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.footerBox} onPress={() => navigation.navigate('SignUp')}>
                            <TextCustom
                                text={lang[countryCode].youAreNotRegistered}
                                color={MineShaft}
                                fontSize={14}
                                textAlign={'center'}
                                fontWeight={'500'}
                            />
                            <TitleCustom
                                text={lang[countryCode].registration}
                                fontSize={24}
                                color={Fiord}
                            />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </DismissKeyboard>
    )
}
