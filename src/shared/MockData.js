import IconPin1 from '../assets/icon/pin1.png'
import IconPin2 from '../assets/icon/pin2.png'
import IconPin3 from '../assets/icon/pin3.png'
import IconPin4 from '../assets/icon/pin4.png'
import IconPin5 from '../assets/icon/pin5.png'
import IconPin6 from '../assets/icon/pin6.png'
import IconPin7 from '../assets/icon/pin7.png'
import IconPin8 from '../assets/icon/pin8.png'
import IconPin9 from '../assets/icon/pin9.png'
import IconPin10 from '../assets/icon/pin10.png'
import IconPin11 from '../assets/icon/pin11.png'
import IconPin12 from '../assets/icon/pin12.png'
import IconPin13 from '../assets/icon/pin13.png'
import IconPin14 from '../assets/icon/pin14.png'
import IconPin15 from '../assets/icon/pin15.png'
import IconPin16 from '../assets/icon/pin16.png'
import IconPin17 from '../assets/icon/pin17.png'
import IconPin18 from '../assets/icon/pin18.png'
import IconPort1 from '../assets/icon/port1.png'
import IconPort2 from '../assets/icon/port2.png'
import IconPort3 from '../assets/icon/port3.png'
import IconPort4 from '../assets/icon/port4.png'
import IconPort5 from '../assets/icon/port5.png'
import IconPort6 from '../assets/icon/port6.png'
import IconPort7 from '../assets/icon/port7.png'
import IconPort8 from '../assets/icon/port8.png'
import {windowHeight, windowWidth} from "./Const"
import IconEnglish from "../assets/icon/en.png"
import IconArmenia from "../assets/icon/hy.png"
import IconRussian from "../assets/icon/ru.png"

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
                            outputRange: [layouts.screen.width, 0],
                        }),
                    },
                ],
            },
        }
    },
}

export const langData = [
    {
        id: 1,
        title: 'English',
        active: true,
        icon: IconEnglish,
        countryCode: 'en'
    },
    {
        id: 2,
        title: 'հայերեն',
        active: false,
        icon: IconArmenia,
        countryCode: 'arm'
    },
    {
        id: 3,
        title: 'Русский',
        active: false,
        icon: IconRussian,
        countryCode: 'ru'
    },
]

export const CordinateClusterData = [
    {
        id: 1,
        address: 'Address 1',
        title: 'Title 1',
        icon: IconPin1,
        latitude: 40.154,
        longitude: 44.50,
        active: false,
        charging: false,
        phone: '+374 99 00 00 00',
        ports: [
            {
                id: 1,
                port: '1',
                icon: IconPort1,
                text: 'Type 1',
                rate: '22',
                price: '4,00'
            },
            {
                id: 2,
                port: '2',
                icon: IconPort2,
                text: 'Type 2',
                rate: '22',
                price: '4,00'
            },
            {
                id: 3,
                port: '3',
                icon: IconPort3,
                text: 'Type 3',
                rate: '22',
                price: '4,00'
            },
            {
                id: 4,
                port: '4',
                icon: IconPort4,
                text: 'Type 4',
                rate: '22',
                price: '4,00'
            },
            {
                id: 5,
                port: '5',
                icon: IconPort5,
                text: 'Type 5',
                rate: '22',
                price: '4,00'
            },
            {
                id: 6,
                port: '6',
                icon: IconPort6,
                text: 'Type 6',
                rate: '22',
                price: '4,00'
            },
            {
                id: 7,
                port: '7',
                icon: IconPort7,
                text: 'Type 7',
                rate: '22',
                price: '4,00'
            },
            {
                id: 8,
                port: '8',
                icon: IconPort8,
                text: 'Type 8',
                rate: '22',
                price: '4,00'
            },
        ]
    },
    {
        id: 2,
        address: 'Address 2',
        title: 'Title 2',
        icon: IconPin2,
        latitude: 40.159918752176985,
        longitude: 44.511966705322266,
        active: false,
        charging: true,
        phone: '+374 99 00 00 00',
        ports: [
            {
                id: 1,
                port: '1',
                icon: IconPort1,
                text: 'Type 1',
                rate: '22',
                price: '4,00'
            },
            {
                id: 2,
                port: '2',
                icon: IconPort2,
                text: 'Type 2',
                rate: '22',
                price: '4,00'
            },
            {
                id: 3,
                port: '3',
                icon: IconPort3,
                text: 'Type 3',
                rate: '22',
                price: '4,00'
            },
            {
                id: 4,
                port: '4',
                icon: IconPort4,
                text: 'Type 4',
                rate: '22',
                price: '4,00'
            },
            {
                id: 5,
                port: '5',
                icon: IconPort5,
                text: 'Type 5',
                rate: '22',
                price: '4,00'
            },
            {
                id: 6,
                port: '6',
                icon: IconPort6,
                text: 'Type 6',
                rate: '22',
                price: '4,00'
            },
            {
                id: 7,
                port: '7',
                icon: IconPort7,
                text: 'Type 7',
                rate: '22',
                price: '4,00'
            },
            {
                id: 8,
                port: '8',
                icon: IconPort8,
                text: 'Type 8',
                rate: '22',
                price: '4,00'
            },
        ]
    },
    {
        id: 3,
        address: 'Address 3',
        title: 'Title 3',
        icon: IconPin3,
        latitude: 40.16651081787604,
        longitude: 44.51977729797364,
        active: false,
        charging: false,
        phone: '+374 99 00 00 00',
        ports: [
            {
                id: 1,
                port: '1',
                icon: IconPort1,
                text: 'Type 1',
                rate: '22',
                price: '4,00'
            },
            {
                id: 2,
                port: '2',
                icon: IconPort2,
                text: 'Type 2',
                rate: '22',
                price: '4,00'
            },
            {
                id: 3,
                port: '3',
                icon: IconPort3,
                text: 'Type 3',
                rate: '22',
                price: '4,00'
            },
            {
                id: 4,
                port: '4',
                icon: IconPort4,
                text: 'Type 4',
                rate: '22',
                price: '4,00'
            },
            {
                id: 5,
                port: '5',
                icon: IconPort5,
                text: 'Type 5',
                rate: '22',
                price: '4,00'
            },
            {
                id: 6,
                port: '6',
                icon: IconPort6,
                text: 'Type 6',
                rate: '22',
                price: '4,00'
            },
            {
                id: 7,
                port: '7',
                icon: IconPort7,
                text: 'Type 7',
                rate: '22',
                price: '4,00'
            },
            {
                id: 8,
                port: '8',
                icon: IconPort8,
                text: 'Type 8',
                rate: '22',
                price: '4,00'
            },
        ]
    },
    {
        id: 4,
        address: 'Address 4',
        title: 'Title 4',
        icon: IconPin4,
        latitude: 40.17467622056341,
        longitude: 44.50531482696533,
        active: false,
        charging: true,
        phone: '+374 99 00 00 00',
        ports: [
            {
                id: 1,
                port: '1',
                icon: IconPort1,
                text: 'Type 1',
                rate: '22',
                price: '4,00'
            },
            {
                id: 2,
                port: '2',
                icon: IconPort2,
                text: 'Type 2',
                rate: '22',
                price: '4,00'
            },
            {
                id: 3,
                port: '3',
                icon: IconPort3,
                text: 'Type 3',
                rate: '22',
                price: '4,00'
            },
            {
                id: 4,
                port: '4',
                icon: IconPort4,
                text: 'Type 4',
                rate: '22',
                price: '4,00'
            },
            {
                id: 5,
                port: '5',
                icon: IconPort5,
                text: 'Type 5',
                rate: '22',
                price: '4,00'
            },
            {
                id: 6,
                port: '6',
                icon: IconPort6,
                text: 'Type 6',
                rate: '22',
                price: '4,00'
            },
            {
                id: 7,
                port: '7',
                icon: IconPort7,
                text: 'Type 7',
                rate: '22',
                price: '4,00'
            },
            {
                id: 8,
                port: '8',
                icon: IconPort8,
                text: 'Type 8',
                rate: '22',
                price: '4,00'
            },
        ]
    },
]

export const FilterPortsData = [
    {
        id: 1,
        name: 'Type 1',
        icon: IconPort1,
        active: false,
    },
    {
        id: 2,
        name: 'Type 2',
        icon: IconPort2,
        active: false,
    },
    {
        id: 3,
        name: 'Type 3',
        icon: IconPort3,
        active: false,
    },
    {
        id: 4,
        name: 'Type 4',
        icon: IconPort4,
        active: false,
    },
    {
        id: 5,
        name: 'Type 5',
        icon: IconPort5,
        active: false,
    },
    {
        id: 6,
        name: 'Type 6',
        icon: IconPort6,
        active: false,
    },
    {
        id: 7,
        name: 'Type 7',
        icon: IconPort7,
        active: false,
    },
    {
        id: 8,
        name: 'Type 8',
        icon: IconPort8,
        active: false,
    },
]

export const options = {
    latitude: CordinateClusterData[0].latitude,
    longitude: CordinateClusterData[0].longitude,
    googleForceLatLon: false,
    alwaysIncludeGoogle: true,
    appsWhiteList: ['google-maps', 'apple-maps', 'waze', 'yandex', 'yandex-maps'],
    naverCallerName: 'com.example.myapp',
    directionsMode: 'car'
}

export const dataInputs = [
    {
        id: 1,
        price: '12.500',
        date: '25.03.2021',
        cardType: 'Visa',
        cardNumber: '****4569'
    },
    {
        id: 2,
        price: '10.000',
        date: '25.03.2021',
        cardType: 'Visa',
        cardNumber: '****4569'
    },
]

export const dataOutputs = [
    {
        id: 1,
        kw: '10.000',
        price: '12.500',
        date: '25.03.2021',
        time: '14:00 - 15:00',
        title: 'Solara #79 Parallel'
    },
    {
        id: 2,
        kw: '10.000',
        price: '12.500',
        date: '25.03.2021',
        time: '14:00 - 15:00',
        title: 'Solara #79 Parallel'
    },
]
