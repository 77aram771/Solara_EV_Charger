import {StyleSheet} from "react-native"
import {White} from "../../../shared/Colors"

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'column',
        backgroundColor: White,
        borderWidth: 1,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 15,
    },
    icon: {
        position: 'absolute',
        right: 15,
        justifyContent: 'center',
        alignItems: 'center',
        top: 17
    }
})
