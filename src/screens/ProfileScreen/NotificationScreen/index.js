import React, { useContext, useState } from "react"
import { ScrollView, View } from "react-native"
import { styles } from "./style"
import { MySin, White } from "../../../shared/Colors"
import { HeaderCustom } from "../../../components/UI/HeaderCustom"
import { lang } from "../../../shared/Lang"
import Context from "../../../../Context"
import { AccordionCustom } from "../../../components/UI/AccordionCustom"
import { TitleCustom } from "../../../components/UI/TitleCustom"

export const NotificationScreen = ({ navigation }) => {

  const { countryCode } = useContext(Context)

  // const [data, setData] = useState([
  //     {
  //         id: 1,
  //         title: lang[countryCode].notification,
  //         text: 'Հայտնի է, որ ընթերցողը, կարդալով հասկանալի տեքստ, չի կարողանա կենտրոնանալ տեքստի ձևավորման վրա: Lorem Ipsum օգտագործելը բացատրվում է նրանով, որ այն բաշխում է բառերը թե շատ իրականի նման, ի տարբերություն «Բովանդակություն, բովանդակություն»:',
  //         active: false
  //     },
  //     {
  //         id: 2,
  //         title: lang[countryCode].notification,
  //         text: 'Հայտնի է, որ ընթերցողը, կարդալով հասկանալի տեքստ, չի կարողանա կենտրոնանալ տեքստի ձևավորման վրա: Lorem Ipsum օգտագործելը բացատրվում է նրանով, որ այն բաշխում է բառերը թե շատ իրականի նման, ի տարբերություն «Բովանդակություն, բովանդակություն»:',
  //         active: false
  //     },
  // ])

  const [data, setData] = useState(null)


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
        text={lang[countryCode].notifications}
      />
      <ScrollView
        style={{ flex: 1, backgroundColor: White }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          {
            data !== null
              ? (
                data.map(item => {
                  return (
                    <AccordionCustom
                      text={item.text}
                      title={`${item.title}  ${lang[countryCode].number}${item.id}`}
                      active={item.active}
                      key={item.id}
                      handle={() => handleActive(item.id)}
                    />
                  )
                })
              )
              : <TitleCustom text={lang[countryCode].doYouNoHaveNotification} />
          }
        </View>
      </ScrollView>
    </>
  )
}