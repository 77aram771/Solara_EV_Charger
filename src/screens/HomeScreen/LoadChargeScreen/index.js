import React, {useContext, useEffect, useState} from 'react'
import {Alert, ImageBackground, Modal, Pressable, ScrollView, Text, View} from "react-native"
import Context from "../../../../Context"
import {HeaderCustom} from "../../../components/UI/HeaderCustom"
import {Fiord, MySin, White} from "../../../shared/Colors"
import {styles} from "./style"
import {ButtonCustom} from "../../../components/UI/ButtonCustom"
import {lang} from "../../../shared/Lang"
import IconCancel from '../../../assets/icon/cancel.png'
import ImgLoadBackground from '../../../assets/images/img-load-background.jpeg'
import {TextCustom} from "../../../components/UI/TextCustom"
import {Slider} from 'react-native-range-slider-expo'
import {FullChargeModal} from "../../../container/FullChargeModal"

export const LoadChargeScreen = ({navigation}) => {

    const {handleHideTabBar} = useContext(Context)

    const [value, setValue] = useState(0)
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        return navigation.addListener('focus', () => {
            handleHideTabBar(false)
        })
    }, [navigation])

    useEffect(() => {
        if(value === 100) {
            handleModal()
        }
    }, [value])

    const handleModal = () => setModalVisible(!modalVisible)

    return (
        <ImageBackground source={ImgLoadBackground} resizeMode={'cover'} style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleModal}
            >
                <FullChargeModal handleModal={handleModal} navigation={navigation}/>
            </Modal>
            <HeaderCustom
                handleBack={() => navigation.goBack()}
                backgroundColor={MySin}
                text={''}
            />
            <ScrollView style={{marginBottom: 60}}>
                <View style={styles.titleBox}>
                    <TextCustom text={lang['arm'].yourCarCharging} color={White} fontSize={20} fontWeight={'400'}/>
                </View>
                <View style={styles.sliderBox}>
                    <Slider
                        styleSize={14}
                        min={0}
                        max={100}
                        valueOnChange={value => setValue(value)}
                        initialValue={60}
                        knobColor={White}
                        valueLabelsBackgroundColor={White}
                        inRangeBarColor={White}
                        outOfRangeBarColor={White}
                        showValueLabels={false}
                        showRangeLabels={false}
                    />
                </View>
                <View style={styles.infoBox}>
                    <View style={styles.infoItem}>
                        <TextCustom text={`${lang["arm"].electricity}:`} color={White} fontSize={14} fontWeight={'400'}/>
                        <TextCustom text={'25A'} color={White} fontSize={16} fontWeight={'700'}/>
                    </View>
                    <View style={styles.infoItem}>
                        <TextCustom text={`${lang["arm"].voltage}:`} color={White} fontSize={14} fontWeight={'400'}/>
                        <TextCustom text={`45${lang["arm"].kw}`} color={White} fontSize={16} fontWeight={'700'}/>
                    </View>
                    <View style={styles.infoItem}>
                        <TextCustom text={`${lang["arm"].chargingWatt}:`} color={White} fontSize={14} fontWeight={'400'}/>
                        <TextCustom text={`22${lang["arm"].kw}`} color={White} fontSize={16} fontWeight={'700'}/>
                    </View>
                    <View style={styles.infoItem}>
                        <TextCustom text={`${lang["arm"].price}:`} color={White} fontSize={14} fontWeight={'400'}/>
                        <TextCustom text={`19,000${lang["arm"].dram}`} color={White} fontSize={16} fontWeight={'700'}/>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <ButtonCustom
                    text={lang['arm'].cancel.toUpperCase()}
                    backgroundColor={White}
                    color={Fiord}
                    width={'100%'}
                    height={35}
                    click={() => {
                        navigation.navigate('Home')
                    }}
                    fontSize={18}
                    fontWeight={'700'}
                    icon={IconCancel}
                    iconWidth={18}
                    iconHeight={18}
                    iconPositionLeft={false}
                    borderRadius={10}
                    borderColor={Fiord}
                    borderWidth={1}
                />
            </View>
        </ImageBackground>
    )
}
