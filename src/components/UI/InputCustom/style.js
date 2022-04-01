import {Platform, StyleSheet} from "react-native"
import {MineShaft, White} from "../../../shared/Colors"

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'column'
    },
    input: {
        backgroundColor: White,
        width: '100%',
        borderWidth: 1,
        paddingVertical: Platform.OS === 'ios' ? 16 : 8,
        paddingLeft: 20,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 15,
        color: MineShaft
    },
    icon: {
        position: 'absolute',
        right: 15,
        justifyContent: 'center',
        alignItems: 'center',
        top: Platform.OS === 'ios' ? 20 : 15
    }
})
