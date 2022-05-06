import {StyleSheet} from "react-native"
import Constants from "expo-constants"
import {Manatee, MySin, White} from "../../../shared/Colors"
import {windowHeight, windowWidth} from "../../../shared/Const"
import {paddingHorizontal} from "../../../shared/GlobalStyle"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: White,
        alignItems: 'center',
        justifyContent: 'flex-start',
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
    checkboxContainer: {
        width: '100%',
        flexDirection: "row",
        alignSelf: 'flex-start'
    },
    checkbox: {
        alignSelf: "center",
        borderWidth: 1,
        borderColor: Manatee
    },
    label: {
        margin: 5,
    },
})
