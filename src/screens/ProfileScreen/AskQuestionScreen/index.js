import React, {useContext, useState} from 'react'
import {ScrollView, View} from "react-native"
import {styles} from "./style"
import {Fiord, Manatee, MySin, White} from "../../../shared/Colors"
import {HeaderCustom} from "../../../components/UI/HeaderCustom"
import {lang} from "../../../shared/Lang"
import Context from "../../../../Context"
import {ButtonCustom} from "../../../components/UI/ButtonCustom"
import {InputCustom} from "../../../components/UI/InputCustom"
import IconDirection1 from "../../../assets/icon/direction1.png"
import {DismissKeyboard} from "../../../components/DismissKeyboard"

export const AskQuestionScreen = ({navigation}) => {

    const {countryCode} = useContext(Context)

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [mail, setMail] = useState('')

    return (
        <>
            <HeaderCustom
                handleBack={() => navigation.goBack()}
                backgroundColor={MySin}
                text={lang[countryCode].Ask}
            />
            <DismissKeyboard>
                <ScrollView
                    style={{flex: 1, backgroundColor: White}}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={styles.container}>
                        <InputCustom
                            placeholder={`${lang[countryCode].name} ${lang[countryCode].surname}`}
                            value={name}
                            handle={value => setName(value)}
                            placeholderTextColor={Manatee}
                        />
                        <InputCustom
                            placeholder={lang[countryCode].phone}
                            value={phone}
                            handle={value => setPhone(value)}
                            placeholderTextColor={Manatee}
                            keyboardType={'phone-pad'}
                        />
                        <InputCustom
                            placeholder={lang[countryCode].email}
                            value={email}
                            handle={value => setEmail(value)}
                            placeholderTextColor={Manatee}
                            keyboardType={'email-address'}
                        />
                        <InputCustom
                            placeholder={lang[countryCode].mail}
                            value={mail}
                            handle={value => setMail(value)}
                            placeholderTextColor={Manatee}
                            multiline={true}
                            numberOfLines={10}
                            textAlignVertical={'top'}
                        />
                        <ButtonCustom
                            width={'100%'}
                            height={35}
                            backgroundColor={Fiord}
                            text={lang[countryCode].send}
                            fontSize={18}
                            color={MySin}
                            borderRadius={5}
                            borderColor={Fiord}
                            borderWidth={2}
                            icon={IconDirection1}
                            iconWidth={15}
                            iconHeight={15}
                            iconPositionLeft={false}
                            click={() => alert('asd')}
                        />
                    </View>
                </ScrollView>
            </DismissKeyboard>
        </>
    )
}