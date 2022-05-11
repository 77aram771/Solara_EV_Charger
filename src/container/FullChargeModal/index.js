import React, { useContext } from "react"
import { ActivityIndicator, Image, Platform, ScrollView, View } from "react-native"
import CircularProgress from "react-native-circular-progress-indicator"
import { Fiord, MySin, White } from "../../shared/Colors"
import { styles } from "./style"
import { ButtonCustom } from "../../components/UI/ButtonCustom"
import { lang } from "../../shared/Lang"
import { TextCustom } from "../../components/UI/TextCustom"
import { windowWidth } from "../../shared/Const"
import IconDirection from "../../assets/icon/direction4.png"
import Context from "../../../Context"
import IconCancel from "../../assets/icon/cancel.png"
import ImgLight from "../../assets/icon/priceunit.png"

export const FullChargeModal = ({ navigation, handleModal, loader, status, progress, handleStop, sumKW }) => {

  const { countryCode } = useContext(Context)

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ marginBottom: 60 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.titleBox}>
          <TextCustom text={lang[countryCode].yourCarCharged} color={White} fontSize={20} fontWeight={"400"} />
        </View>
        <View style={styles.sliderBox}>
          <CircularProgress
            value={progress}
            radius={windowWidth / 3}
            duration={3000}
            textColor={White}
            maxValue={100}
            title={`${lang[countryCode].charge}`}
            titleStyle={{ fontSize: 16, color: White, fontWeight: "400" }}
            activeStrokeColor={White}
            inActiveStrokeColor={White}
            inActiveStrokeOpacity={0.2}
            valueSuffix={"%"}
            inActiveStrokeWidth={5}
            activeStrokeWidth={5}
            textStyle={{ fontWeight: "100", color: "yellow", fontSize: 40 }}
          />
        </View>
        <View style={styles.infoBox}>
          <View style={styles.infoItem}>
            <TextCustom
              text={`${lang[countryCode].amount}: ${sumKW * progress} `}
              color={White}
              fontSize={24}
              fontWeight={"400"}
            />
            <Image source={ImgLight} style={{ width: 13, height: 13 }} />
          </View>
          <View style={styles.infoItem}>
            <TextCustom
              text={`${lang[countryCode].charged}: ${progress} ${lang[countryCode].kw}`}
              color={White}
              fontSize={24}
              fontWeight={"400"}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        {
          loader
            ? <ActivityIndicator size="large" color={MySin} animating={true} style={{ marginBottom: 30 }} />
            : (
              status !== "Charging"
                ? (
                  <ButtonCustom
                    text={lang[countryCode].goToHomeScreen.toUpperCase()}
                    backgroundColor={MySin}
                    color={Fiord}
                    width={"100%"}
                    click={() => {
                      navigation.navigate("Home")
                      handleModal()
                    }}
                    fontSize={18}
                    fontWeight={"700"}
                    icon={IconDirection}
                    iconWidth={18}
                    iconHeight={18}
                    paddingTop={Platform.OS === "ios" ? 14 : 8}
                    paddingBottom={Platform.OS === "ios" ? 14 : 8}
                    marginBottom={20}
                    iconPositionLeft={false}
                    borderRadius={10}
                    borderColor={White}
                    borderWidth={1}
                  />
                )
                : (
                  <ButtonCustom
                    text={lang[countryCode].stop.toUpperCase()}
                    backgroundColor={White}
                    color={Fiord}
                    width={"100%"}
                    click={() => handleStop()}
                    fontSize={18}
                    fontWeight={"700"}
                    icon={IconCancel}
                    iconWidth={18}
                    iconHeight={18}
                    iconPositionLeft={false}
                    borderRadius={10}
                    borderColor={Fiord}
                    marginBottom={20}
                    paddingTop={Platform.OS === "ios" ? 14 : 8}
                    paddingBottom={Platform.OS === "ios" ? 14 : 8}
                    borderWidth={1}
                  />
                )
            )
        }
      </View>
    </View>
  )
}
