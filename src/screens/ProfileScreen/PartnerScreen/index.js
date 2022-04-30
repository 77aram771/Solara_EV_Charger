import React, { useContext, useEffect, useState } from "react"
import { ScrollView, View } from "react-native"
import axios from "axios"
import { styles } from "./style"
import { Mercurysolid, MineShaft, MySin, White } from "../../../shared/Colors"
import { HeaderCustom } from "../../../components/UI/HeaderCustom"
import { lang } from "../../../shared/Lang"
import Context from "../../../../Context"
import { ButtonCustom } from "../../../components/UI/ButtonCustom"
import { API_URL } from "../../../shared/Const"

export const PartnerScreen = ({ navigation }) => {

  const { countryCode } = useContext(Context)

  const [data, setData] = useState([])

  useEffect(() => {
    (async () => {
      await axios.get(`${API_URL}/partners/?page=1&per-page=20&title=&language=ru`, {
        headers: {
          tokakey: "f9cbdcf0b9bc49ec15e2098127a0052997b5fda5"
        }
      })
        .then(res => {
          setData(res.data.data)
        })
    })()
  }, [])

  return (
    <>
      <HeaderCustom
        handleBack={() => navigation.goBack()}
        backgroundColor={MySin}
        text={lang[countryCode].partner}
      />
      <ScrollView
        style={{ flex: 1, backgroundColor: White }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          {
            data.map(item => (
              <ButtonCustom
                key={item.id}
                width={"45%"}
                height={100}
                backgroundColor={White}
                borderColor={Mercurysolid}
                color={MineShaft}
                borderWidth={1}
                borderRadius={18}
                click={() => alert("asd")}
                fontSize={18}
                fontWeight={"400"}
                icon={item?.image}
                iconWidth={50}
                iconHeight={50}
                iconUri={true}
                marginBottom={20}
                justifyContent={"center"}
                paddingLeft={20}
              />
            ))
          }
        </View>
      </ScrollView>
    </>
  )
}