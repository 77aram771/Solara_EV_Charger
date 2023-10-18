import {StyleSheet} from "react-native"
import {windowWidth} from "../../../shared/Const"
import {paddingHorizontal} from "../../../shared/GlobalStyle"
import { White } from "../../../shared/Colors"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 10,
        backgroundColor: White
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal,
        width: windowWidth,
        alignSelf:'center',
        marginTop: 20
    },
    portsBox: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginBottom: 15,
        borderRadius: 12,
    },
    rangeBox: {
        width: '100%',
        height: 80,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginBottom: 15,
        borderRadius: 12,
    },
})
