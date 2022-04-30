import React, { useContext, useEffect, useState } from "react"
import RangeSlider from "react-native-range-slider-expo"
import { View } from "react-native"
import { Fiord, Manatee, MySin } from "../../../shared/Colors"
import { TextCustom } from "../TextCustom"
import Context from "../../../../Context"
import { lang } from "../../../shared/Lang"

export const RangeLineCustom = ({ percent, min, max }) => {

  const { countryCode } = useContext(Context)

  const [fromValue, setFromValue] = useState(null)
  const [toValue, setToValue] = useState(null)

  useEffect(() => {
    if (typeof max === "number") {
      setFromValue(min)
      setToValue(max)
    }
  }, [min, max])

  return (
    <View style={{ position: "relative" }}>
      <View
        style={{
          width: "98%",
          position: "absolute",
          top: 0,
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: 10
        }}
      >
        <TextCustom
          text={percent ? `${fromValue !== null ? min : 0}%` : `${fromValue !== null ? min : 0} ${lang[countryCode].kw}`} />
        <TextCustom text={percent ? `${toValue}%` : `${toValue} ${lang[countryCode].kw}`} />
      </View>
      {
        toValue !== null
          ? (
            <RangeSlider
              styleSize={"medium"}
              min={min !== null ? min : 0}
              max={max}
              fromValueOnChange={value => setFromValue(value)}
              toValueOnChange={value => setToValue(value)}
              knobSize={20}
              fromKnobColor={Fiord}
              toKnobColor={Fiord}
              inRangeBarColor={MySin}
              outOfRangeBarColor={Manatee}
              showRangeLabels={false}
            />
          )
          : null
      }
    </View>
  )
}

