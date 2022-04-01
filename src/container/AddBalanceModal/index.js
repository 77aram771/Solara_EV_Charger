import React, {useContext, useState} from 'react'
import {KeyboardAvoidingView, Platform, View} from "react-native"
import {Fiord, Manatee, MySin, White} from "../../shared/Colors"
import {styles} from "./style"
import {ButtonCustom} from "../../components/UI/ButtonCustom"
import {lang} from "../../shared/Lang"
import Context from "../../../Context"
import {HeaderCustom} from "../../components/UI/HeaderCustom"
import {PaginationCarousel} from "../../components/UI/PaginationCarousel"
import IconPlus from "../../assets/icon/plus.png"
import IconCard from "../../assets/icon/icon-card.png"
import {paddingHorizontal} from "../../shared/GlobalStyle"
import {InputCustom} from "../../components/UI/InputCustom"
import {windowHeight} from "../../shared/Const"
import {TextCustom} from "../../components/UI/TextCustom"
import {DismissKeyboard} from "../../components/DismissKeyboard"

export const AddBalanceModal = ({navigation, handleModal}) => {

    const {countryCode} = useContext(Context)

    const [price, setPrice] = useState('')

    return (
        <View style={styles.container}>
            <HeaderCustom
                handleBack={handleModal}
                backgroundColor={MySin}
                text={lang[countryCode].titleBalance}
                borderBottomStartRadius={0}
                borderBottomEndRadius={0}
                androidModalHeader={Platform.OS !== 'ios'}
            />
            <View style={styles.sliderBox}>
                <PaginationCarousel/>
            </View>
            <DismissKeyboard>
                <KeyboardAvoidingView
                    contentContainerStyle={{flex: 1}}
                    style={{flex: 1}}
                >
                    <View style={{paddingHorizontal}}>
                        <ButtonCustom
                            text={lang[countryCode].addNewCard}
                            backgroundColor={White}
                            color={Fiord}
                            width={'100%'}
                            marginTop={5}
                            marginBottom={windowHeight / 20}
                            paddingTop={Platform.OS === 'ios' ? 14 : 8}
                            paddingBottom={Platform.OS === 'ios' ? 14 : 8}
                            click={() => alert('asd')}
                            fontSize={18}
                            fontWeight={'700'}
                            icon={IconPlus}
                            iconWidth={18}
                            iconHeight={18}
                            iconPositionLeft={false}
                            borderRadius={12}
                            borderColor={Fiord}
                            borderWidth={1}
                        />
                        <InputCustom
                            placeholder={lang[countryCode].money}
                            value={price}
                            handle={value => setPrice(value)}
                            placeholderTextColor={Manatee}
                            keyboardType={'numeric'}
                        />
                    </View>
                </KeyboardAvoidingView>
            </DismissKeyboard>
            <View style={styles.buttonContainer}>
                <TextCustom
                    text={lang[countryCode].yourPaymentInformationIsSecureWithUs}
                    color={Manatee}
                    fontSize={12}
                    fontWeight={'400'}
                    marginBottom={10}
                />
                <ButtonCustom
                    text={lang[countryCode].add.toUpperCase()}
                    backgroundColor={Fiord}
                    color={MySin}
                    width={'100%'}
                    click={() => {
                        navigation.navigate('Home')
                        handleModal()
                    }}
                    fontSize={18}
                    fontWeight={'700'}
                    icon={IconCard}
                    iconWidth={18}
                    iconHeight={18}
                    paddingTop={Platform.OS === 'ios' ? 14 : 8}
                    paddingBottom={Platform.OS === 'ios' ? 14 : 8}
                    marginBottom={20}
                    iconPositionLeft={false}
                    borderRadius={10}
                    borderColor={White}
                    borderWidth={1}
                />
            </View>
        </View>
    )
}
