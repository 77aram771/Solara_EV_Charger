import {StyleSheet} from "react-native"
import {BleachWhite, MySin, White} from "../../../shared/Colors"
import {windowWidth} from "../../../shared/Const"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: White,
    },
    langBox: {
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'column',
        paddingTop: 40,
    },
    langItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        paddingHorizontal: 30,
        paddingVertical: 25,
        width: windowWidth
    },
    langItemActive: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        paddingHorizontal: 30,
        paddingVertical: 25,
        width: windowWidth,
        borderTopWidth: 2,
        borderTopColor: MySin,
        borderBottomWidth: 2,
        borderBottomColor: MySin,
        backgroundColor: BleachWhite
    },
})
