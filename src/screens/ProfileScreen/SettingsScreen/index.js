import React, { useContext } from "react"
import { ScrollView, View } from "react-native"
import Constants from "expo-constants"
import * as WebBrowser from "expo-web-browser"
import { styles } from "./style"
import { TitleCustom } from "../../../components/UI/TitleCustom"
import { lang } from "../../../shared/Lang"
import { Fiord, Mercurysolid, MineShaft, White } from "../../../shared/Colors"
import { ButtonCustom } from "../../../components/UI/ButtonCustom"
import Context from "../../../../Context"
import IconNotification from "../../../assets/icon/notification.png"
import IconLanguage from "../../../assets/icon/language.png"
import IconFaq from "../../../assets/icon/faq.png"
import IconEmail from "../../../assets/icon/email2.png"
import IconAbout from "../../../assets/icon/about.png"
import IconLike from "../../../assets/icon/partner.png"
import IconFb from "../../../assets/icon/facebook.png"
import IconIns from "../../../assets/icon/instagram.png"
import IconViber from "../../../assets/icon/icon-viber.png"
import IconTelegram from "../../../assets/icon/icon-telegram.png"

export const SettingsScreen = ({ navigation }) => {

  const { countryCode } = useContext(Context)

  const handlePressButtonAsync = async (uri) => {
    await WebBrowser.openBrowserAsync(uri)
  }

  return (
    <View style={styles.container}>
      <TitleCustom
        text={lang[countryCode].otherSections}
        fontSize={22}
        color={Fiord}
        marginBottom={60}
        marginTop={Constants.statusBarHeight + 30}
      />
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <TitleCustom
          text={lang[countryCode].settings}
          fontSize={16}
          textAlign={"left"}
          color={Fiord}
          marginBottom={10}
        />
        <ButtonCustom
          text={`${lang[countryCode].notifications}`}
          width={"100%"}
          height={50}
          backgroundColor={White}
          borderColor={Mercurysolid}
          color={MineShaft}
          borderWidth={1}
          borderRadius={18}
          click={() => navigation.navigate("Notification")}
          fontSize={18}
          fontWeight={"400"}
          icon={IconNotification}
          iconWidth={20}
          iconHeight={20}
          marginBottom={20}
          iconPositionLeft={false}
          justifyContent={"flex-start"}
          paddingLeft={20}
        />
        <ButtonCustom
          text={`${lang[countryCode].lang}`}
          width={"100%"}
          height={50}
          backgroundColor={White}
          borderColor={Mercurysolid}
          color={MineShaft}
          borderWidth={1}
          borderRadius={18}
          click={() => navigation.navigate("Lang")}
          fontSize={18}
          fontWeight={"400"}
          icon={IconLanguage}
          iconWidth={20}
          iconHeight={20}
          marginBottom={20}
          iconPositionLeft={false}
          justifyContent={"flex-start"}
          paddingLeft={20}
        />
        <TitleCustom text={lang[countryCode].help} fontSize={16} textAlign={"left"} color={Fiord}
                     marginBottom={10} />
        <ButtonCustom
          text={`${lang[countryCode].faq}`}
          width={"100%"}
          height={50}
          backgroundColor={White}
          borderColor={Mercurysolid}
          color={MineShaft}
          borderWidth={1}
          borderRadius={18}
          click={() => navigation.navigate("FAQ")}
          fontSize={18}
          fontWeight={"400"}
          icon={IconFaq}
          iconWidth={20}
          iconHeight={20}
          marginBottom={20}
          iconPositionLeft={false}
          justifyContent={"flex-start"}
          paddingLeft={20}
        />
        <ButtonCustom
          text={`${lang[countryCode].Ask}`}
          width={"100%"}
          height={50}
          backgroundColor={White}
          borderColor={Mercurysolid}
          color={MineShaft}
          borderWidth={1}
          borderRadius={18}
          click={() => navigation.navigate("AskQuestion")}
          fontSize={18}
          fontWeight={"400"}
          icon={IconEmail}
          iconWidth={20}
          iconHeight={20}
          marginBottom={20}
          iconPositionLeft={false}
          justifyContent={"flex-start"}
          paddingLeft={20}
        />
        <ButtonCustom
          text={`${lang[countryCode].appInfo}`}
          width={"100%"}
          height={50}
          backgroundColor={White}
          borderColor={Mercurysolid}
          color={MineShaft}
          borderWidth={1}
          borderRadius={18}
          click={() => navigation.navigate("AppInfo")}
          fontSize={18}
          fontWeight={"400"}
          icon={IconAbout}
          iconWidth={20}
          iconHeight={20}
          marginBottom={20}
          iconPositionLeft={false}
          justifyContent={"flex-start"}
          paddingLeft={20}
        />
        <ButtonCustom
          text={`${lang[countryCode].partner}`}
          width={"100%"}
          height={50}
          backgroundColor={White}
          borderColor={Mercurysolid}
          color={MineShaft}
          borderWidth={1}
          borderRadius={18}
          click={() => navigation.navigate("Partner")}
          fontSize={18}
          fontWeight={"400"}
          icon={IconLike}
          iconWidth={20}
          iconHeight={20}
          marginBottom={20}
          iconPositionLeft={false}
          justifyContent={"flex-start"}
          paddingLeft={20}
        />
        <TitleCustom
          text={lang[countryCode].weOnSocial}
          fontSize={16}
          textAlign={"left"}
          color={Fiord}
          marginBottom={20}
        />
        <View style={{ width: "100%", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
          <ButtonCustom
            width={"45%"}
            height={120}
            backgroundColor={White}
            borderColor={Mercurysolid}
            color={MineShaft}
            borderWidth={1}
            borderRadius={18}
            click={() => handlePressButtonAsync("https://www.facebook.com/solaraArmenia/")}
            fontSize={18}
            fontWeight={"400"}
            icon={IconFb}
            iconWidth={50}
            iconHeight={50}
            marginBottom={20}
            justifyContent={"center"}
            iconMarginRight={0}
          />
          <ButtonCustom
            width={"45%"}
            height={120}
            backgroundColor={White}
            borderColor={Mercurysolid}
            color={MineShaft}
            borderWidth={1}
            borderRadius={18}
            click={() => handlePressButtonAsync("https://www.instagram.com/solara.am/")}
            fontSize={18}
            fontWeight={"400"}
            icon={IconIns}
            iconWidth={50}
            iconHeight={50}
            marginBottom={20}
            justifyContent={"center"}
            iconMarginRight={0}
          />
          <ButtonCustom
            width={"45%"}
            height={120}
            backgroundColor={White}
            borderColor={Mercurysolid}
            color={MineShaft}
            borderWidth={1}
            borderRadius={18}
            click={() => alert("Need url from Viber")}
            fontSize={18}
            fontWeight={"400"}
            icon={IconViber}
            iconWidth={50}
            iconHeight={50}
            marginBottom={20}
            justifyContent={"center"}
            iconMarginRight={0}
          />
          <ButtonCustom
            width={"45%"}
            height={120}
            backgroundColor={White}
            borderColor={Mercurysolid}
            color={MineShaft}
            borderWidth={1}
            borderRadius={18}
            click={() => alert("Need url from Telegram")}
            fontSize={18}
            fontWeight={"400"}
            icon={IconTelegram}
            iconWidth={50}
            iconHeight={50}
            marginBottom={20}
            justifyContent={"center"}
            iconMarginRight={0}
          />
        </View>
      </ScrollView>
    </View>
  )
}