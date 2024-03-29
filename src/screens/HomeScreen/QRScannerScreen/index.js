import React, { useContext, useEffect, useState } from "react"
import { Alert, Image, Platform, StyleSheet, TouchableOpacity, View } from "react-native"
import axios from "axios"
import { BarCodeScanner } from "expo-barcode-scanner"
import BarcodeMask from "react-native-barcode-mask"
import Context from "../../../../Context"
import { API_URL, Tokakey, windowHeight, windowWidth } from "../../../shared/Const"
import { finderHeight, finderWidth, viewMinX, viewMinY } from "../../../shared/MockData"
import { TextCustom } from "../../../components/UI/TextCustom"
import { ButtonCustom } from "../../../components/UI/ButtonCustom"
import { Black, Dandelion, Fiord } from "../../../shared/Colors"
import { lang } from "../../../shared/Lang"
import IconCloseWhite from "../../../assets/icon/icon-close.png"
import IconCloseYellow from "../../../assets/icon/icon-close-yellow.png"

export const QRScannerScreen = ({ navigation, route }) => {

  const { handleHideTabBar, countryCode } = useContext(Context)

  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(BarCodeScanner.Constants.Type.back)
  const [scanned, setScanned] = useState(false)

  useEffect(() => {
    return navigation.addListener("focus", async () => {
      handleHideTabBar(false)
      await permissionFunction()
    })
  }, [navigation])

  const permissionFunction = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync()
    setHasPermission(status === "granted")
    if (status !== "granted") {
      alert(lang[countryCode].permissionToAccessCameraWasDenied)
    }
  }

  const handleBarCodeScanned = async (scanningResult) => {
    if (!scanned) {
      const { type, data, bounds: { origin } = {} } = scanningResult
      setType(type)
      const { x, y } = origin
      if (x >= viewMinX && y >= viewMinY && x <= (viewMinX + finderWidth / 2) && y <= (viewMinY + finderHeight / 2)) {
        setScanned(true)
        await handleGetDataQr(data)
      }
    }
  }

  const handleGetDataQr = async (title) => {
    await axios.post(
      `${API_URL}/charge-box/details-by-title`,
      { title: title },
      { headers: { tokakey: Tokakey } }
    )
      .then(res => {
        if (res?.status === 200) {
          navigation.goBack()
          route.params.handleQRData(res?.data?.id)
        }
      })
      .catch(e => {
        console.log("e -----", e.response.data.message)
        Alert.alert(
          `${e?.response?.data?.name} ${e?.response?.data?.status}`,
          `${e?.response?.data?.message}`,
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        )
      })
  }

  if (hasPermission === false || hasPermission === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: Platform.OS === "ios" ? windowHeight / 13.5 : windowHeight / 15,
            right: 15,
            zIndex: 1
          }}
          onPress={() => navigation.goBack()}
          activeOpacity={0}
        >
          <Image
            source={IconCloseYellow}
            style={{ width: 25, height: 25 }}
            resizeMode={"cover"}
          />
        </TouchableOpacity>
        <TextCustom fontSize={16} text={"You no have Access"} marginBottom={20} />
        <ButtonCustom
          width={windowWidth / 1.4}
          height={40}
          text={"Get Access"}
          borderWidth={2}
          borderColor={Fiord}
          borderRadius={10}
          fontSize={13}
          fontWeight={"700"}
          backgroundColor={Dandelion}
          click={permissionFunction}
        />
      </View>
    )
  }
  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        type={type}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        style={[styles.container]}
      >
        <BarcodeMask edgeColor="#62B1F6" showAnimatedLine />
        <View style={{ flex: 1, width: "100%" }}>
          <TouchableOpacity
            style={{
              position: "absolute",
              top: Platform.OS === "ios" ? windowHeight / 13.5 : windowHeight / 15,
              right: 15,
              zIndex: 1
            }}
            onPress={() => navigation.goBack()}
            activeOpacity={0}
          >
            <Image
              source={IconCloseWhite}
              style={{ width: 25, height: 25 }}
              resizeMode={"cover"}
            />
          </TouchableOpacity>
        </View>
      </BarCodeScanner>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    backgroundColor: Black
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  }
})
