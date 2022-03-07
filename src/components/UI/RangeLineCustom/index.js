import React, {useState} from 'react'
import RangeSlider from 'react-native-range-slider-expo'
import {View} from "react-native"
import {Fiord, Manatee, MySin} from "../../../shared/Colors"
import {TextCustom} from "../TextCustom"

export const RangeLineCustom = () => {
    const [fromValue, setFromValue] = useState(0)
    const [toValue, setToValue] = useState(0)
    return (
        <View style={{position: "relative"}}>
            <View
                style={{
                    width: '98%',
                    position: "absolute",
                    top: 0,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                }}
            >
                <TextCustom text={fromValue}/>
                <TextCustom text={toValue}/>
            </View>
            <RangeSlider
                styleSize={"medium"}
                min={0}
                max={100}
                fromValueOnChange={value => setFromValue(value)}
                toValueOnChange={value => setToValue(value)}
                initialFromValue={0}
                knobSize={20}
                fromKnobColor={Fiord}
                toKnobColor={Fiord}
                inRangeBarColor={MySin}
                outOfRangeBarColor={Manatee}
                showRangeLabels={false}
            />
        </View>
    )
}

