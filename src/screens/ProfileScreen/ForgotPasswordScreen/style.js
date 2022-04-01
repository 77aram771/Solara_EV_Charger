import {StyleSheet} from "react-native"
import {White} from "../../../shared/Colors"
import {windowWidth} from "../../../shared/Const"
import {paddingHorizontal} from "../../../shared/GlobalStyle"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: White,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    mineBox: {
        width: windowWidth,
        alignSelf: 'flex-start',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal,
    }
})
