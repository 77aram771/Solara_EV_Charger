// import IconPin1 from "../assets/icon/pin1.png"
// import IconPin2 from "../assets/icon/pin2.png"
// import IconPin3 from "../assets/icon/pin3.png"
// import IconPin4 from "../assets/icon/pin4.png"
// import IconPin5 from "../assets/icon/pin5.png"
// import IconPin6 from "../assets/icon/pin6.png"
// import IconPin7 from "../assets/icon/pin7.png"
// import IconPin8 from "../assets/icon/pin8.png"
// import IconPin9 from "../assets/icon/pin9.png"
// import IconPin10 from "../assets/icon/pin10.png"
// import IconPin11 from "../assets/icon/pin11.png"
// import IconPin12 from "../assets/icon/pin12.png"
// import IconPin13 from "../assets/icon/pin13.png"
// import IconPin14 from "../assets/icon/pin14.png"
// import IconPin15 from "../assets/icon/pin15.png"
// import IconPin16 from "../assets/icon/pin16.png"
// import IconPin17 from "../assets/icon/pin17.png"
// import IconPin18 from "../assets/icon/pin18.png"
// import IconPort1 from "../assets/icon/port1.png"
// import IconPort2 from "../assets/icon/port2.png"
// import IconPort3 from "../assets/icon/port3.png"
// import IconPort4 from "../assets/icon/port4.png"
// import IconPort5 from "../assets/icon/port5.png"
// import IconPort6 from "../assets/icon/port6.png"
// import IconPort7 from "../assets/icon/port7.png"
// import IconPort8 from "../assets/icon/port8.png"
import IconEnglish from "../assets/icon/en.png"
import IconArmenia from "../assets/icon/hy.png"
import IconRussian from "../assets/icon/ru.png"
import { windowHeight, windowWidth } from "./Const"

export const ASPECT_RATIO = windowWidth / windowHeight
export const LATITUDE_DELTA = 0.0922
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
    title: "հայերեն",
    active: false,
    icon: IconArmenia,
    countryCode: "hy"
  },
  {
    id: 3,
    title: "Русский",
    active: false,
    icon: IconRussian,
    countryCode: "ru"
  }
]

export const dataInputs = [
  {
    id: 1,
    price: "12.500",
    date: "25.03.2021",
    cardType: "Visa",
    cardNumber: "****4569"
  },
  {
    id: 2,
    price: "10.000",
    date: "25.03.2021",
    cardType: "Visa",
    cardNumber: "****4569"
  }
]

export const dataOutputs = [
  {
    id: 1,
    kw: "10.000",
    price: "12.500",
    date: "25.03.2021",
    time: "14:00 - 15:00",
    title: "Solara #79 Parallel"
  },
  {
    id: 2,
    kw: "10.000",
    price: "12.500",
    date: "25.03.2021",
    time: "14:00 - 15:00",
    title: "Solara #79 Parallel"
  }
]

export const regEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i

export const regName = /^(([A-Za-z]+[,.]?[ ]?|[a-z]+['-]?)+)$/i

export const regPassword = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/

export const regPhone = /^([+374]{4})([1-9]{2})(\d{6})/