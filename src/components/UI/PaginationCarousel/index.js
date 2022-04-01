import React, {useState, useRef} from 'react'
import {View, Image} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import {windowHeight, windowWidth} from "../../../shared/Const"

const data = [
    {
        id: 1,
        name: 'React JS',
        url: 'https://icon-library.com/images/react-icon/react-icon-29.jpg',
    },
    {
        id: 2,
        name: 'JavaScript',
        url: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Javascript_Logo.png',
    },
    {
        id: 3,
        name: 'Node JS',
        url: 'https://upload.wikimedia.org/wikipedia/commons/6/67/NodeJS.png',
    },
]

const renderItem = ({item}) => {
    return (
        <View
            style={{
                padding: 20,
                borderRadius: 20,
                alignItems: 'center',
                backgroundColor: 'white',
            }}
        >
            <Image
                source={{uri: item.url}}
                style={{width: windowWidth / 3, height: windowHeight / 8}}
                resizeMode={'cover'}
            />
        </View>
    )
}

export const PaginationCarousel = () => {
    const [index, setIndex] = useState(0)
    const isCarousel = useRef(null)

    return (
        <Carousel
            ref={isCarousel}
            data={data}
            renderItem={renderItem}
            sliderWidth={windowWidth}
            itemWidth={Math.round(windowWidth * 0.5)}
            onSnapToItem={index => setIndex(index)}
        />
    )
}