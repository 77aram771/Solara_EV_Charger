import {StyleSheet} from "react-native"
import {BrightGray, Fiord, White} from "../../../shared/Colors"
import {windowHeight, windowWidth} from "../../../shared/Const"
import {paddingHorizontal} from "../../../shared/GlobalStyle"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: White,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingBottom: 10,
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
    sliderBox: {
        height: windowHeight / 3,
    },
    bookInfoBox: {
        zIndex: 0,
        position: 'absolute',
        top: windowHeight / 4,
        left: 0,
        right: 0,
        alignItems: "center",
    },
    typeBox: {
        width: windowWidth / 1.1,
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 20,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: Fiord,
        marginTop: 110
    },
    typeItem: {
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: BrightGray,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    }
})
