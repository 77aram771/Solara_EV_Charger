import {StyleSheet} from "react-native"
import {windowHeight, windowWidth} from "../../shared/Const"
import {White} from "../../shared/Colors"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    filterBox: {
        position: 'absolute',
        top: windowHeight / 20,
        left: 20,
        zIndex: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: White
    },
    qrBox: {
        position: 'absolute',
        top: windowHeight / 20,
        right: 20,
        zIndex: 10,
        backgroundColor: White,
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 12,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
    },
    myLocationButton: {
        position: 'absolute',
        bottom: 10,
        right: 20,
        zIndex: 10,
        backgroundColor: White,
        padding: 10,
        elevation: 3,
        borderRadius: 50
    }
});
