import React, {useContext, useRef, useState} from 'react'
import {Image, TouchableOpacity, View} from 'react-native'
import {SwiperFlatList} from 'react-native-swiper-flatlist'
import {styles} from './style'
import IconArrow from '../../assets/icon/arrow1.png'
import {TextCustom} from "../../components/UI/TextCustom"
import {Fiord, Gray, MineShaft, MySin} from "../../shared/Colors"
import {windowHeight, windowWidth} from "../../shared/Const"
import {ButtonCustom} from "../../components/UI/ButtonCustom"
import {lang} from "../../shared/Lang"
import {WelcomeSlider} from "../../shared/MockData"
import {TitleCustom} from "../../components/UI/TitleCustom"
import Context from "../../../Context"

export const WelcomeScreen = () => {

    const {handleCheck} = useContext(Context)

    const scrollRef = useRef(null)
    const [activeId, setActiveId] = useState(0)

    const goToSecondIndex = () => {
        if (activeId === 4) {
            setActiveId(0)
            scrollRef.current?.scrollToIndex({index: 0})
        } else {
            scrollRef.current?.scrollToIndex({index: activeId + 1})
            setActiveId(activeId + 1)
        }
    }

    // const goToLastIndex = () => {
    //     scrollRef.current?.goToLastIndex()
    // }
    //
    // const goToFirstIndex = () => {
    //     scrollRef.current?.goToFirstIndex()
    // }

    // const getCurrentIndex = () => {
    //     const currentIndex = scrollRef.current?.getCurrentIndex()
    //     // Alert.alert(`the current index is ${currentIndex}`)
    // }
    //
    // const getPrevIndex = () => {
    //     const prevIndex = scrollRef.current?.getPrevIndex()
    //     Alert.alert(`the previous index is ${prevIndex}`)
    // }

    return (
        <View style={styles.container}>
            <SwiperFlatList
                showPagination={true}
                ref={scrollRef}
                // onChangeIndex={({index, prevIndex}) => console.log({index, prevIndex})}
                e2eID="container_swiper"
                paginationStyle={styles.paginationStyle}
                paginationStyleItem={styles.paginationStyleItem}
                paginationStyleItemActive={styles.paginationStyleItemActive}
                paginationStyleItemInactive={styles.paginationStyleItemInactive}
                onMomentumScrollEnd={({index}) => {
                    if (activeId === 4) {
                        setActiveId(0)
                    } else {
                        setActiveId(index)
                    }
                    console.log('activeId', activeId)
                }}
            >
                {
                    WelcomeSlider.map(item => {
                        return (
                            <View
                                style={[styles.child]}
                                testID="container_swiper_screen_0"
                                key={item.id}
                            >
                                <Image
                                    source={item.img}
                                    style={{
                                        width: windowWidth / 1.2,
                                        height: windowHeight / 3,
                                        marginBottom: 40,
                                    }}
                                    resizeMode={'contain'}
                                />
                                <TitleCustom
                                    text={item.title}
                                    color={Fiord}
                                    fontSize={26}
                                    textAlign={'center'}
                                    marginBottom={30}
                                />
                                <TextCustom
                                    text={item.text}
                                    fontSize={16}
                                    color={MineShaft}
                                    textAlign={'center'}
                                    fontWeight={'400'}
                                />
                            </View>
                        )
                    })
                }
            </SwiperFlatList>
            {
                activeId === 3
                    ? (
                        <View style={[styles.bottomBox, {bottom: windowHeight / 8, justifyContent: 'center'}]}>
                            <ButtonCustom
                                width={windowWidth / 2.5}
                                height={windowHeight / 13}
                                backgroundColor={MySin}
                                borderRadius={15}
                                text={lang['arm'].start}
                                color={Fiord}
                                fontSize={22}
                                click={() => handleCheck()}
                                fontWeight={'700'}
                            />
                        </View>
                    )
                    : (
                        <View style={styles.bottomBox}>
                            <TouchableOpacity onPress={() => alert('test')}>
                                <TextCustom text={lang['arm'].skip} fontSize={14} color={Gray}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => goToSecondIndex()}>
                                <Image source={IconArrow} style={{width: 30, height: 30}}/>
                            </TouchableOpacity>
                        </View>
                    )
            }
        </View>
    )
}
