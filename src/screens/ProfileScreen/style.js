import {StyleSheet} from "react-native"
import {MySin, White} from "../../shared/Colors"
import {windowHeight, windowWidth} from "../../shared/Const"
import {paddingHorizontal} from "../../shared/GlobalStyle"
import Constants from "expo-constants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: White,
        alignItems: 'center',
        justifyContent: 'space-between',
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
    },
    mineBox: {
        width: windowWidth,
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal,
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
        height: Constants.statusBarHeight + windowHeight / 2.5,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: windowHeight / 30
    }
})
