import {StyleSheet} from "react-native"
import Constants from "expo-constants"
import {MySin, White} from "../../shared/Colors"
import {windowHeight, windowWidth} from "../../shared/Const"
import {paddingHorizontal} from "../../shared/GlobalStyle"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: White,
        alignItems: 'center',
        paddingHorizontal
    },
    headerBox: {
        width: windowWidth,
        height: Constants.statusBarHeight + windowHeight / 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: MySin,
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15,
        position: 'relative',
        marginBottom: windowHeight / 7
    },
    mineBox: {
        width: windowWidth,
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal
    },
    titleBox: {
        width: windowWidth,
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    footerBox: {
        width: windowWidth,
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    headerBoxUser: {
        width: windowWidth,
        height: Constants.statusBarHeight + windowHeight / 3.2,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 20,
        marginBottom: 30
    }
})
