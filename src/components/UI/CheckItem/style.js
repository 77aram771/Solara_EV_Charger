import {StyleSheet} from "react-native"
import {BrightGray} from "../../../shared/Colors"

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: BrightGray,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 10,
        borderRadius: 12
    }
})
