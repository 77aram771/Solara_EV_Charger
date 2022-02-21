import ImgSlider1 from '../assets/images/img-slider-1.png'
import ImgSlider2 from '../assets/images/img-slider-2.png'
import ImgSlider3 from '../assets/images/img-slider-3.png'
import ImgSlider4 from '../assets/images/img-slider-4.png'
import {lang} from "./Lang"

export const WelcomeSlider = [
    {
        id: 1,
        img: ImgSlider1,
        title: lang["arm"].sliderTitle1,
        text: lang["arm"].sliderText1
    },
    {
        id: 2,
        img: ImgSlider2,
        title: lang["arm"].sliderTitle2,
        text: lang["arm"].sliderText2
    },
    {
        id: 3,
        img: ImgSlider3,
        title: lang["arm"].sliderTitle3,
        text: lang["arm"].sliderText3
    },
    {
        id: 4,
        img: ImgSlider4,
        title: lang["arm"].sliderTitle4,
        text: lang["arm"].sliderText4
    },
]

export const CordinateClusterData = [
    {
        id: 1,
        address: 'Address 1',
        title: 'Title 1',
        latitude: 41.17133563959858,
        longitude: 44.5119974457989,
        active: false,
        charging: false,
        ports: [
            {
                id: 1,
                port: '1'
            },
            {
                id: 2,
                port: '2'
            },
            {
                id: 3,
                port: '3'
            },
            {
                id: 4,
                port: '4'
            }
        ]
    },
    {
        id: 2,
        address: 'Address 2',
        title: 'Title 2',
        latitude: 40.90133563954858,
        longitude: 44.5119974457989,
        active: false,
        charging: true,
        ports: [
            {
                id: 1,
                port: '1'
            },
            {
                id: 2,
                port: '2'
            },
            {
                id: 3,
                port: '3'
            },
            {
                id: 4,
                port: '4'
            }
        ]
    },
    {
        id: 3,
        address: 'Address 3',
        title: 'Title 3',
        latitude: 40.17133563959858,
        longitude: 44.5119974457989,
        active: false,
        charging: false,
        ports: [
            {
                id: 1,
                port: '1'
            },
            {
                id: 2,
                port: '2'
            },
            {
                id: 3,
                port: '3'
            },
            {
                id: 4,
                port: '4'
            }
        ]
    },
    {
        id: 4,
        address: 'Address 4',
        title: 'Title 4',
        latitude: 40.15133563954858,
        longitude: 44.6119974457989,
        active: false,
        charging: true,
        ports: [
            {
                id: 1,
                port: '1'
            },
            {
                id: 2,
                port: '2'
            },
            {
                id: 3,
                port: '3'
            },
            {
                id: 4,
                port: '4'
            }
        ]
    },

]
