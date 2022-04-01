import {StyleSheet} from "react-native"
import {windowWidth} from "../../../shared/Const"
import {paddingHorizontal} from "../../../shared/GlobalStyle"
import {White} from "../../../shared/Colors"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: windowWidth,
        alignItems: 'center',
        backgroundColor: White,
        paddingHorizontal,
    }
})
