import React, { useContext, useEffect, useState } from "react"
import { ScrollView, View } from "react-native"
import axios from "axios"
import { styles } from "./style"
import { MySin, White } from "../../../shared/Colors"
import { HeaderCustom } from "../../../components/UI/HeaderCustom"
import { lang } from "../../../shared/Lang"
import Context from "../../../../Context"
import { AccordionCustom } from "../../../components/UI/AccordionCustom"
import { API_URL, Tokakey } from "../../../shared/Const"

export const FAQScreen = ({ navigation }) => {

  const { countryCode } = useContext(Context)

  const [data, setData] = useState([])

  useEffect(() => {
    (async () => {
      await axios.get(
        `${API_URL}/faq/?page=1&per-page=20&title=&language=${countryCode}`,
        { headers: { tokakey: Tokakey } }
      )
        .then(res => {
          setData(res.data.data)
        })
    })()
  }, [])

  const handleActive = (id) => {
    setData(data.map(item => {
      if (item.id === id) {
        item.active = !item.active
      }
      return item
    }))
  }

  return (
    <>
      <HeaderCustom
        handleBack={() => navigation.goBack()}
        backgroundColor={MySin}
        text={lang[countryCode].faq}
      />
      <ScrollView
        style={{ flex: 1, backgroundColor: White }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          {
            data.map(item => {
              return (
                <AccordionCustom
                  text={item?.answer}
                  title={`${item?.question}  N${item?.id}`}
                  active={item?.active}
                  key={item?.id}
                  handle={() => handleActive(item?.id)}
                />
              )
            })
          }
        </View>
      </ScrollView>
    </>
  )
}