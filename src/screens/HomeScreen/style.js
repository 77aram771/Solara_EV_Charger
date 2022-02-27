import {Platform, StyleSheet} from "react-native"
import {windowHeight, windowWidth} from "../../shared/Const"
import {BrightGray, MineShaft, White, WildSand} from "../../shared/Colors"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: White,
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
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 12,
        backgroundColor: White
    },
    qrBox: {
        position: 'absolute',
        top: windowHeight / 24,
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
        right: 20,
        zIndex: 10,
        backgroundColor: White,
        padding: 10,
        elevation: 3,
        borderRadius: 50,
    },
    infoContainer: {
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'absolute',
        bottom: 15,
        zIndex: 10,
    },
    infoBox: {
        width: windowWidth / 1.2,
        // height: windowHeight / 6,
        backgroundColor: White,
        borderRadius: 10,
        marginBottom: 20,
        paddingTop: 15,
        paddingBottom: 20,
        paddingLeft: 25,
        paddingRight: 25,
    },
    infoBoxTop: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5
    },
    topTitleBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    kmBox: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        backgroundColor: WildSand,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoBottomBox: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    buttonsBox: {
        width: windowWidth / 1.2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    addressesBox: {
        position: 'absolute',
        top: windowHeight / 20,
        zIndex: 10,
        width: windowWidth / 1.2,
        backgroundColor: White,
        borderRadius: 10,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    iconBox: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    },
    dot: {
        width: 3,
        height: 3,
        backgroundColor: MineShaft,
        borderRadius: 50,
        marginVertical: 7
    },
    line: {
        width: windowWidth / 1.8,
        borderWidth: 1.5,
        borderColor: BrightGray,
    },
    textBox: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: '100%'
    },
    clockBox: {
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        backgroundColor: White,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    somethingBox: {
        flexDirection: 'row',
        position: 'absolute',
        top: Platform.OS === 'ios' ? windowHeight /  4.5 : windowHeight /  4.1,
        zIndex: 10,
        width: windowWidth / 1.2,
    }
})
