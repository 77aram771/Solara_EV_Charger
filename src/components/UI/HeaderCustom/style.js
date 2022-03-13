import {StyleSheet} from "react-native"
import {windowWidth} from "../../../shared/Const"
import {paddingHorizontal} from "../../../shared/GlobalStyle"

export const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: 70,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal,
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15,
        zIndex: 1
    }
})
