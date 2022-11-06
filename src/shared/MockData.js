import IconEnglish from "../assets/icon/en.png"
import IconArmenia from "../assets/icon/hy.png"
import IconRussian from "../assets/icon/ru.png"
import { windowHeight, windowWidth } from "./Const"

export const ASPECT_RATIO = windowWidth / windowHeight
export const LATITUDE_DELTA = 0.09
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export const horizontalAnimation = {
  headerShown: false,
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0]
            })
          }
        ]
      }
    }
  }
}

export const langData = [
  {
    id: 1,
    title: "English",
    active: true,
    icon: IconEnglish,
    countryCode: "en"
  },
  {
    id: 2,
    title: "Հայերեն",
    active: false,
    icon: IconArmenia,
    countryCode: "ar"
  },
  {
    id: 3,
    title: "Русский",
    active: false,
    icon: IconRussian,
    countryCode: "ru"
  }
]

export const regEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i

export const regName = /^(([A-Za-z]+[,.]?[ ]?|[a-z]+['-]?)+)$/i

export const regPassword = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/

export const regPhone = /^([+374]{4})([1-9]{2})(\d{6})/

export const finderWidth = 280
export const finderHeight = 230
export const viewMinX = (windowWidth - finderWidth) / 2
export const viewMinY = (windowHeight - finderHeight) / 2
