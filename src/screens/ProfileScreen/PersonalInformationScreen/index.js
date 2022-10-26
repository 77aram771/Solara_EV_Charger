import React, { useContext, useEffect, useState } from "react"
import { View, Platform, ActivityIndicator, Alert, Modal } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { styles } from "./style"
import { Amaranth, Fiord, Manatee, MySin, Silver, White, WildSand } from "../../../shared/Colors"
import { ButtonCustom } from "../../../components/UI/ButtonCustom"
import { lang } from "../../../shared/Lang"
import Context from "../../../../Context"
import { HeaderCustom } from "../../../components/UI/HeaderCustom"
import { InputCustom } from "../../../components/UI/InputCustom"
import { DismissKeyboard } from "../../../components/DismissKeyboard"
import { SelectCustom } from "../../../components/UI/SelectCustom"
import { GetCarModal } from "../../../store/actionsCreators/CarModalApiActionCreator"
import { SmallModal } from "../../../container/SmallModal"
import { API_URL, Tokakey } from "../../../shared/Const"
import IconCheck from "../../../assets/icon/check2.png"
import IconPassword from "../../../assets/icon/password3.png"
import IconArrowDown from "../../../assets/icon/dropdown.png"

export const PersonalInformationScreen = ({ navigation, route }) => {

  const dispatch = useDispatch()

  const { countryCode } = useContext(Context)

  const carMakeData = useSelector(state => state?.CarMakeReducer.data)
  const carModalData = useSelector(state => state?.CarModalReducer.data)

  const [name, setName] = useState(route.params.user.full_name)
  const [nameError, setNameError] = useState(false)
  const [nameErrorMessage] = useState(lang[countryCode].wrongName)
  const [loader, setLoader] = useState(false)
  const [auto, setAuto] = useState(null)
  const [autoId, setAutoId] = useState("")
  const [autoMaxLength, setAutoMaxLength] = useState(null)
  const [autoData, setAutoData] = useState([])
  const [autoDataError, setAutoDataError] = useState(false)
  const [autoDataErrorMessage] = useState(lang[countryCode].chooseAuto)
  const [autoModal, setAutoModal] = useState(null)
  const [autoModalId, setAutoModalId] = useState("")
  const [autoModalData, setAutoModalData] = useState([])
  const [autoModalError, setAutoModalError] = useState(false)
  const [autoModalErrorMessage] = useState(lang[countryCode].chooseModal)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    const newArr = []
    setAutoMaxLength(carMakeData?._meta?.totalCount)
    carMakeData?.data.map(item => {
      const newItem = {
        label: item.title,
        value: item.title
      }
      newArr.push(newItem)
    })
    setAutoData(newArr)
  }, [carMakeData])

  useEffect(() => {
    if (auto) {
      dispatch(GetCarModal(`${API_URL}/car-model/?page=1&per-page=${autoMaxLength}&car_make_id=${autoId}&title=${auto}&language=${countryCode}`))
    }
  }, [auto])

  useEffect(() => {
    if (carModalData !== null) {
      const newArr = []
      carModalData.data.map(item => {
        const newItem = {
          label: item.title,
          value: item.title
        }
        newArr.push(newItem)
      })
      setAutoModalData(newArr)
    }
  }, [carModalData])

  useEffect(() => {
    if (route.params.user) {
      setAuto(route.params.user.car_make_name)
      setAutoModal(route.params.user.car_model_name)
      setAutoId(route.params.user.car_make_id)
      setAutoModalId(route.params.user.car_model_id)
    }
  }, [route.params.user])

  const handleName = (value) => {
    setName(value)
    setNameError(false)
  }

  const handleAuto = (value) => {
    setAuto(value)
    if (carMakeData !== null) {
      const findCar = carMakeData?.data.find(item => item?.title === value)
      setAutoId(findCar?.id)
    }
    setAutoDataError(false)
  }

  const handleAutoModel = (value) => {
    setAutoModal(value)
    if (carModalData !== null) {
      const findModal = carModalData?.data.find(item => item?.title === value)
      setAutoModalId(findModal?.id)
    }
    setAutoModalError(false)
  }

  const handleSave = async () => {
    const Token = await AsyncStorage.getItem("token")
    if (name.length > 0) {
      if (auto !== null) {
        setAutoDataError(false)
        if (autoModal !== null) {
          setAutoModalError(false)
          setNameError(false)
          if (Token !== null) {
            setLoader(true)
            await axios.post(`${API_URL}/users/update-profile?access-token=${Token}`,
              {
                full_name: name,
                car_make_id: autoId,
                car_model_id: autoModalId
              },
              { headers: { tokakey: Tokakey } }
            )
              .then(res => {
                setLoader(false)
                if (res.status === 200) {
                  navigation.goBack()
                }
              })
              .catch(e => {
                setLoader(false)
                Alert.alert(
                  `${e?.response?.data?.name} ${e?.response?.data?.status}`,
                  `${e?.response?.data?.message}`,
                  [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                  ]
                );
              })
          }
        } else {
          setAutoModalError(true)
        }
      } else {
        setAutoDataError(true)
      }
    } else {
      setNameError(true)
    }
  }

  const handleDeleteAccount = async () => {
    const Token = await AsyncStorage.getItem("token")
    if(Token) {
      await axios.delete(
        `${API_URL}/users/delete?access-token=${Token}`,
        { headers: { tokakey: Tokakey } }
      )
        .then(async res => {
          if(res?.status === 200) {
            await route.params.handleLogOut()
            await navigation.goBack()
          }
        })
        .catch(e => console.log("e", e?.response?.status))
    }
    handleOpen()
  }

  const handleOpen = () => setModalVisible(!modalVisible)

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleOpen}
      >
        <SmallModal
          handleFirstButton={handleOpen}
          titleFirstButton={lang[countryCode].cancel}
          handleSecondButton={handleDeleteAccount}
          titleSecondButton={lang[countryCode].delete}
          title={lang[countryCode].аreYouWantToDeleteYourAccount}
        />
      </Modal>
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
            handle={value => handleName(value)}
            placeholderTextColor={Manatee}
            error={nameError}
            errorText={nameErrorMessage}
          />
          <InputCustom
            placeholder={lang[countryCode].phone}
            value={route.params.user.phone_number}
            placeholderTextColor={Manatee}
            disable={false}
            backgroundColor={Silver}
          />
          <InputCustom
            placeholder={lang[countryCode].email}
            value={route.params.user.email}
            placeholderTextColor={Manatee}
            disable={false}
            backgroundColor={Silver}
          />
          <SelectCustom
            value={auto}
            data={autoData}
            placeholder={{
              label: lang[countryCode].car,
              value: null,
              color: Manatee
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
              label: lang[countryCode].make,
              value: null,
              color: Manatee
            }}
            placeholderTextColor={Manatee}
            handle={value => handleAutoModel(value)}
            error={autoModalError}
            errorText={autoModalErrorMessage}
            icon={IconArrowDown}
            iconWidth={13}
            iconHeight={13}
          />
          {
            loader
              ? (
                <ActivityIndicator size="large" color={MySin} animating={true} style={{ marginVertical: 20 }} />
              )
              : null
          }
          <ButtonCustom
            text={lang[countryCode].save}
            backgroundColor={Fiord}
            color={MySin}
            width={"100%"}
            marginTop={15}
            marginBottom={20}
            paddingTop={Platform.OS === "ios" ? 14 : 8}
            paddingBottom={Platform.OS === "ios" ? 14 : 8}
            click={handleSave}
            fontSize={18}
            fontWeight={"700"}
            icon={IconCheck}
            iconWidth={24}
            iconHeight={24}
            iconPositionLeft={false}
            borderRadius={12}
            disabled={loader}
          />
        </View>
      </DismissKeyboard>
      <ButtonCustom
        text={lang[countryCode].changePassword}
        backgroundColor={White}
        color={Fiord}
        width={"100%"}
        marginTop={5}
        marginBottom={20}
        paddingTop={Platform.OS === "ios" ? 14 : 8}
        paddingBottom={Platform.OS === "ios" ? 14 : 8}
        click={() => navigation.navigate("ChangePassword")}
        fontSize={18}
        fontWeight={"700"}
        icon={IconPassword}
        iconWidth={24}
        iconHeight={24}
        iconPositionLeft={false}
        borderRadius={12}
        borderColor={Fiord}
        borderWidth={1}
        disabled={loader}
      />
      <ButtonCustom
        text={lang[countryCode].deleteAccount}
        backgroundColor={Amaranth}
        color={WildSand}
        width={"100%"}
        marginTop={5}
        marginBottom={20}
        paddingTop={Platform.OS === "ios" ? 14 : 8}
        paddingBottom={Platform.OS === "ios" ? 14 : 8}
        click={handleOpen}
        fontSize={18}
        fontWeight={"700"}
        borderRadius={12}
        borderColor={Amaranth}
        borderWidth={1}
        disabled={loader}
      />
    </View>
  )
}
