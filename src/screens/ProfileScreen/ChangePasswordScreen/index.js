import React, {useContext, useState} from 'react'
import {View, Platform} from "react-native"
import {styles} from "./style"
import {Fiord, Manatee, MySin} from "../../../shared/Colors"
import {ButtonCustom} from "../../../components/UI/ButtonCustom"
import {lang} from "../../../shared/Lang"
import Context from "../../../../Context"
import IconPassword from '../../../assets/icon/password2.png'
import {HeaderCustom} from "../../../components/UI/HeaderCustom"
import {InputCustom} from "../../../components/UI/InputCustom"
import {DismissKeyboard} from "../../../components/DismissKeyboard"

export const ChangePasswordScreen = ({navigation}) => {

    const {countryCode} = useContext(Context)

    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [passwordErrorMessage, setPasswordErrorMessage] = useState(lang[countryCode].wrongPassword)
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordError, setNewPasswordError] = useState(false)
    const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState(lang[countryCode].wrongPassword)
    const [RPassword, setRPassword] = useState('')
    const [RPasswordError, setRPasswordError] = useState(false)
    const [RPasswordErrorMessage, setRPasswordErrorMessage] = useState(lang[countryCode].wrongPassword)

    return (
        <View style={styles.container}>
            <HeaderCustom
                text={lang[countryCode].changePassword}
                backgroundColor={MySin}
                handleBack={() => navigation.goBack('')}
            />
            <DismissKeyboard>
                <View style={styles.mineBox}>
                    <InputCustom
                        placeholder={lang[countryCode].password}
                        value={password}
                        handle={value => setPassword(value)}
                        placeholderTextColor={Manatee}
                        error={passwordError}
                        errorText={passwordErrorMessage}
                    />
                    <InputCustom
                        placeholder={lang[countryCode].newPassword}
                        value={newPassword}
                        handle={value => setNewPassword(value)}
                        placeholderTextColor={Manatee}
                        error={newPasswordError}
                        errorText={newPasswordErrorMessage}
                    />
                    <InputCustom
                        placeholder={lang[countryCode].rpassword}
                        value={RPassword}
                        handle={value => setRPassword(value)}
                        placeholderTextColor={Manatee}
                        error={RPasswordError}
                        errorText={RPasswordErrorMessage}
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
                        icon={IconPassword}
                        iconWidth={24}
                        iconHeight={24}
                        iconPositionLeft={false}
                        borderRadius={12}
                    />
                </View>
            </DismissKeyboard>
        </View>
    )
}
