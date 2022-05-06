import React, { useContext } from "react"
import RangeSlider from "react-native-range-slider-expo"
import { View } from "react-native"
import { Fiord, Manatee, MySin } from "../../../shared/Colors"
import { TextCustom } from "../TextCustom"
import Context from "../../../../Context"
import { lang } from "../../../shared/Lang"

export const RangeLineCustom = ({ percent, min, max, handleMin, handleMax, checkMax, checkMin }) => {

  const { countryCode } = useContext(Context)

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
          text={percent ? `${checkMin}%` : `${checkMin}  ${lang[countryCode].kw}`}
        />
        <TextCustom text={percent ? `${checkMax}%` : `${checkMax} ${lang[countryCode].kw}`} />
      </View>
      <RangeSlider
        styleSize={"medium"}
        min={min !== null ? min : 0}
        max={max}
        fromValueOnChange={value => handleMin(value)}
        toValueOnChange={value => handleMax(value)}
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

