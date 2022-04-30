import {StyleSheet} from "react-native"
import Constants from "expo-constants"
import {Alabasterapprox, MySin, White} from "../../../shared/Colors"
import {windowHeight, windowWidth} from "../../../shared/Const"
import {paddingHorizontal} from "../../../shared/GlobalStyle"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: White,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    headerBox: {
        width: windowWidth,
        height: Constants.statusBarHeight + windowHeight / 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: MySin,
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15,
        marginBottom: 80,
    },
    mineBox: {
        width: windowWidth,
        alignSelf: 'flex-start',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal,
    },
    footerBox: {
        borderTopWidth: 1,
        borderTopColor: Alabasterapprox,
        width: windowWidth,
        paddingVertical: 30,
    }
})
