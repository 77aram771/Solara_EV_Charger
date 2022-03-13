import {StyleSheet} from "react-native"
import {windowHeight, windowWidth} from "../../shared/Const"
import {paddingHorizontal} from "../../shared/GlobalStyle"
import {Fiord} from "../../shared/Colors"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 10,
        backgroundColor: Fiord
    },
    sliderBox: {
        width: windowWidth,
        alignItems: 'center',
        marginBottom: 30,
    },
    titleBox: {
        width: windowWidth,
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 50,
        marginTop: windowHeight / 6,
    },
    infoBox: {
        width: windowWidth / 1.1,
        alignSelf: 'center',
    },
    infoItem: {
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal,
        width: windowWidth,
        alignSelf: 'flex-end'
    },
})
