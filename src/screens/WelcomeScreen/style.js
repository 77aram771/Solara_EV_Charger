import {StyleSheet} from "react-native"
import {windowHeight, windowWidth} from "../../shared/Const"
import {Dandelion, Silver} from "../../shared/Colors"
import {paddingHorizontal} from "../../shared/GlobalStyle"

let SliderBottomWidth = windowWidth / 3

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: windowWidth,
        position: 'relative'
    },
    child: {
        width: windowWidth,
        height: windowHeight / 1.2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: windowWidth / 20
    },
    text: {
        fontSize: windowWidth * 0.1,
        textAlign: 'center',
    },
    paginationStyle: {
        backgroundColor: Silver,
        marginBottom: windowHeight / 16,
        height: 6,
        borderRadius: 10,
    },
    paginationStyleItem: {
        borderRadius: 0,
        width: SliderBottomWidth / 4,
        height: 6,
        marginLeft: 0,
        marginRight: 0,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    paginationStyleItemActive: {
        backgroundColor: Dandelion,
        borderRadius: 10,
        height: 10,
        top: -2,
    },
    paginationStyleItemInactive: {
        backgroundColor: Silver,
        height: 6,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    bottomBox: {
        width: windowWidth,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        bottom: windowHeight / 20,
        paddingHorizontal
    }
})
