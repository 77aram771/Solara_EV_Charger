import {StyleSheet} from "react-native"
import {windowHeight, windowWidth} from "../../shared/Const"
import {BrightGray, MineShaft, White, WildSand} from "../../shared/Colors"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: White,
        alignItems: "center",
        justifyContent: "center"
    },
    box: {
        position: "absolute",
        top: windowHeight / 10,
        left: 20,
        zIndex: 10,
        flexDirection: "row"
    },
    chargeListBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 12,
        backgroundColor: White
    },
    filterBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 12,
        backgroundColor: White,
        marginRight: 15
    },
    qrBox: {
        position: "absolute",
        top: windowHeight / 11,
        right: 20,
        zIndex: 10,
        backgroundColor: White,
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 12
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1
    },
    myLocationButtonOut: {
        position: "absolute",
        right: 20,
        zIndex: 10,
        backgroundColor: White,
        padding: 10,
        elevation: 3,
        borderRadius: 50
    },
    myLocationButton: {
        backgroundColor: White,
        padding: 10,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 50
    },
    infoContainer: {
        justifyContent: "center",
        flexDirection: "column",
        position: "absolute",
        bottom: 15,
        zIndex: 10
    },
    kmBox: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        backgroundColor: WildSand,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonsBox: {
        width: windowWidth / 1.1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    boxTop: {
        position: "absolute",
        top: windowHeight / 10,
        zIndex: 10,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    addressesBox: {
        width: windowWidth / 1.2,
        height: 120,
        backgroundColor: White,
        borderRadius: 10,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginBottom: 30
    },
    somethingBox: {
        flexDirection: "row",
        width: windowWidth / 1.2
    },
    iconBox: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
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
        borderColor: BrightGray
    },
    textBox: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "90%",
        height: "100%"
    },
    clockBox: {
        flexDirection: "row",
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        backgroundColor: White,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10
    }
})
