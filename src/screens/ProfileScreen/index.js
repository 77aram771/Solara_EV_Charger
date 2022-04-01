import React, {useContext, useState} from 'react'
import {View, Image, ImageBackground, Platform, Modal} from "react-native"
import {styles} from "./style"
import {Fiord, Mercurysolid, MineShaft, White} from "../../shared/Colors"
import {ButtonCustom} from "../../components/UI/ButtonCustom"
import {AddBalanceModal} from "../../container/AddBalanceModal"
import {lang} from "../../shared/Lang"
import {windowHeight, windowWidth} from "../../shared/Const"
import {TextCustom} from "../../components/UI/TextCustom"
import Context from "../../../Context"
import IconUserLogin from '../../assets/icon/menu-user1.png'
import IconMenu from '../../assets/icon/menu-setting1.png'
import ImgUserBackground from '../../assets/images/img-user-background.png'
import IconSolaraUser from "../../assets/images/img-solara-user.png"
import IconSolara from '../../assets/icon/icon-solara.png'
import IconLogOut from '../../assets/icon/log-out.png'
import IconUser from '../../assets/icon/user.png'
import IconEmail from '../../assets/icon/email2.png'
import IconHistory from '../../assets/icon/icon-history.png'
import IconNotification from '../../assets/icon/notification.png'

export const ProfileScreen = ({navigation}) => {

    const {countryCode, login, handleUser} = useContext(Context)

    const [notificationActive, setNotificationActive] = useState(false)

    const [modalVisible, setModalVisible] = useState(false)

    const handleModal = () => setModalVisible(!modalVisible)

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleModal}
            >
                <AddBalanceModal handleModal={handleModal} navigation={navigation}/>
            </Modal>
            {
                login
                    ? (
                        <>
                            <ImageBackground source={ImgUserBackground} style={styles.headerBoxUser} resizeMode={'cover'}>
                                <Image
                                    source={IconSolaraUser}
                                    resizeMode={'contain'}
                                    style={{
                                        width: windowWidth / 3,
                                        height: windowHeight / 6,
                                        marginBottom: 10
                                    }}
                                />
                                <TextCustom
                                    text={`${lang[countryCode].name} ${lang[countryCode].surname}`}
                                    color={White}
                                    fontSize={18}
                                    marginBottom={10}
                                />
                                <TextCustom
                                    text={`${lang[countryCode].balance}: 0${lang[countryCode].dram}`}
                                    color={White}
                                    fontSize={16}
                                    marginBottom={10}
                                />
                                <ButtonCustom
                                    text={lang[countryCode].topUpBalance}
                                    paddingTop={10}
                                    paddingBottom={10}
                                    paddingRight={10}
                                    paddingLeft={10}
                                    borderRadius={10}
                                    fontSize={13}
                                    color={White}
                                    backgroundColor={Fiord}
                                    click={handleModal}
                                />
                            </ImageBackground>
                            <View style={styles.mineBox}>
                                <ButtonCustom
                                    text={lang[countryCode].personalInformation}
                                    width={'100%'}
                                    backgroundColor={White}
                                    borderColor={Mercurysolid}
                                    color={MineShaft}
                                    borderWidth={1}
                                    borderRadius={18}
                                    click={() => navigation.navigate('PersonalInformation')}
                                    fontSize={15}
                                    fontWeight={'400'}
                                    icon={IconUser}
                                    iconWidth={20}
                                    iconHeight={20}
                                    iconPositionLeft={false}
                                    justifyContent={'flex-start'}
                                    paddingLeft={20}
                                    paddingTop={Platform.OS === 'ios' ? 14 : 8}
                                    paddingBottom={Platform.OS === 'ios' ? 14 : 8}
                                    marginBottom={10}
                                />
                                <ButtonCustom
                                    text={`${lang[countryCode].correspondence}`}
                                    width={'100%'}
                                    backgroundColor={White}
                                    borderColor={Mercurysolid}
                                    color={MineShaft}
                                    borderWidth={1}
                                    borderRadius={18}
                                    click={() => navigation.navigate('AskQuestion')}
                                    fontSize={15}
                                    fontWeight={'400'}
                                    icon={IconEmail}
                                    iconWidth={20}
                                    iconHeight={20}
                                    iconPositionLeft={false}
                                    justifyContent={'flex-start'}
                                    paddingLeft={20}
                                    paddingTop={Platform.OS === 'ios' ? 14 : 8}
                                    paddingBottom={Platform.OS === 'ios' ? 14 : 8}
                                    marginBottom={10}
                                />
                                <ButtonCustom
                                    text={`${lang[countryCode].history}`}
                                    width={'100%'}
                                    backgroundColor={White}
                                    borderColor={Mercurysolid}
                                    color={MineShaft}
                                    borderWidth={1}
                                    borderRadius={18}
                                    click={() => navigation.navigate('History')}
                                    fontSize={15}
                                    fontWeight={'400'}
                                    icon={IconHistory}
                                    iconWidth={20}
                                    iconHeight={20}
                                    iconPositionLeft={false}
                                    justifyContent={'flex-start'}
                                    paddingLeft={20}
                                    paddingTop={Platform.OS === 'ios' ? 14 : 8}
                                    paddingBottom={Platform.OS === 'ios' ? 14 : 8}
                                    marginBottom={10}
                                />
                                <ButtonCustom
                                    text={`${lang[countryCode].getNotification}`}
                                    width={'100%'}
                                    backgroundColor={White}
                                    borderColor={Mercurysolid}
                                    color={MineShaft}
                                    borderWidth={1}
                                    borderRadius={18}
                                    click={() => setNotificationActive(!notificationActive)}
                                    fontSize={15}
                                    fontWeight={'400'}
                                    icon={IconNotification}
                                    iconWidth={20}
                                    iconHeight={20}
                                    iconPositionLeft={false}
                                    justifyContent={'space-between'}
                                    paddingLeft={20}
                                    paddingRight={20}
                                    paddingTop={Platform.OS === 'ios' ? 14 : 8}
                                    paddingBottom={Platform.OS === 'ios' ? 14 : 8}
                                    marginBottom={10}
                                    switchButton={true}
                                    switchActive={notificationActive}
                                />
                                <ButtonCustom
                                    text={`${lang[countryCode].settings}`}
                                    width={'100%'}
                                    backgroundColor={White}
                                    borderColor={Mercurysolid}
                                    color={MineShaft}
                                    borderWidth={1}
                                    borderRadius={18}
                                    click={() => navigation.navigate('Settings')}
                                    fontSize={15}
                                    fontWeight={'400'}
                                    icon={IconMenu}
                                    iconWidth={20}
                                    iconHeight={20}
                                    iconPositionLeft={false}
                                    justifyContent={'flex-start'}
                                    paddingLeft={20}
                                    paddingTop={Platform.OS === 'ios' ? 14 : 8}
                                    paddingBottom={Platform.OS === 'ios' ? 14 : 8}
                                />
                            </View>
                            <ButtonCustom
                                text={lang[countryCode].exit}
                                backgroundColor={White}
                                color={Fiord}
                                width={'100%'}
                                marginTop={5}
                                marginBottom={20}
                                paddingTop={Platform.OS === 'ios' ? 14 : 8}
                                paddingBottom={Platform.OS === 'ios' ? 14 : 8}
                                click={handleUser}
                                fontSize={18}
                                fontWeight={'700'}
                                icon={IconLogOut}
                                iconWidth={18}
                                iconHeight={18}
                                iconPositionLeft={false}
                                borderRadius={12}
                                borderColor={Fiord}
                                borderWidth={1}
                            />
                        </>
                    )
                    : (
                        <>
                            <View style={styles.headerBox}>
                                <Image source={IconSolara}
                                       style={{width: 100, height: 100, position: "absolute", bottom: -45}}/>
                            </View>
                            <View style={styles.mineBox}>
                                <ButtonCustom
                                    text={`${lang[countryCode].signIn} / ${lang[countryCode].signUp}`}
                                    width={'100%'}
                                    height={50}
                                    backgroundColor={White}
                                    borderColor={Mercurysolid}
                                    color={MineShaft}
                                    borderWidth={1}
                                    borderRadius={18}
                                    click={() => navigation.navigate('SignIn')}
                                    fontSize={18}
                                    fontWeight={'400'}
                                    icon={IconUserLogin}
                                    iconWidth={20}
                                    iconHeight={20}
                                    marginBottom={20}
                                    iconPositionLeft={false}
                                    justifyContent={'flex-start'}
                                    paddingLeft={20}
                                />
                                <ButtonCustom
                                    text={`${lang[countryCode].settings}`}
                                    width={'100%'}
                                    height={50}
                                    backgroundColor={White}
                                    borderColor={Mercurysolid}
                                    color={MineShaft}
                                    borderWidth={1}
                                    borderRadius={18}
                                    click={() => navigation.navigate('Settings')}
                                    fontSize={18}
                                    fontWeight={'400'}
                                    icon={IconMenu}
                                    iconWidth={20}
                                    iconHeight={20}
                                    iconPositionLeft={false}
                                    justifyContent={'flex-start'}
                                    paddingLeft={20}
                                />
                            </View>
                            <View style={styles.footerBox}>

                            </View>
                        </>
                    )
            }
        </View>
    )
}
