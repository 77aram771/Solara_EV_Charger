import {StyleSheet} from "react-native"
import {BrightGray} from "../../../shared/Colors"
import { windowHeight } from "../../../shared/Const";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: windowHeight / 60,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: BrightGray
    }
})
