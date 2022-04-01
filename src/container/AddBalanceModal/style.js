import {StyleSheet} from "react-native"
import {windowWidth} from "../../shared/Const"
import {paddingHorizontal} from "../../shared/GlobalStyle"
import {MySin, White} from "../../shared/Colors"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: White,
    },
    sliderBox: {
        width: windowWidth,
        alignItems: 'center',
        marginBottom: 30,
        backgroundColor: MySin,
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15,
        paddingBottom: 15
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal,
        width: windowWidth,
        alignSelf: 'flex-end'
    }
})
