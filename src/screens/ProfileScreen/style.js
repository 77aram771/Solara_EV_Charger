import {StyleSheet} from "react-native"
import {MySin, White} from "../../shared/Colors"
import {windowHeight, windowWidth} from "../../shared/Const"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: White,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'red'
    },
    headerBox: {
        width: windowWidth,
        height: windowHeight / 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: MySin,
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15,
        position: 'relative',
        borderWidth: 1,
        borderColor: 'red'
    },
    mineBox: {

    },
    titleBox: {
        width: windowWidth,
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'red'
    },
    footerBox: {
        width: windowWidth,
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'red'
    }
})
