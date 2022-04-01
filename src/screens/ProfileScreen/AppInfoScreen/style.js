import {StyleSheet} from "react-native"
import {windowWidth} from "../../../shared/Const"
import {paddingHorizontal} from "../../../shared/GlobalStyle"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: windowWidth,
        alignItems: 'center',
        paddingHorizontal,
        paddingBottom: 20
    }
})
