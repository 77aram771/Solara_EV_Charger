import { StyleSheet } from "react-native"
import { BrightGray, Mercurysolid, MySin, White } from "../../../shared/Colors"
import { windowWidth } from "../../../shared/Const"
import { paddingHorizontal } from "../../../shared/GlobalStyle"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: White,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingBottom: 10
  },
  buttonContainer: {
    position: "absolute",
    bottom: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal,
    width: windowWidth,
    alignSelf: "flex-end"
  },
  sliderBox: {
    width: windowWidth,
    paddingBottom: 30,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: MySin
  },
  bookInfoBox: {
    position: "absolute",
    bottom: -20,
    width: windowWidth / 2.5,
    height: 40,
    borderRadius: 14,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Mercurysolid,
    backgroundColor: White,
    zIndex: 1
  },
  typeBox: {
    width: windowWidth / 1.1,
    alignSelf: "center",
    marginBottom: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 40
  },
  typeItem: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: BrightGray,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  titleBox: {
    width: windowWidth / 1.1,
    alignSelf: "center",
    paddingHorizontal: 20,
    marginBottom: 10
  },
  rangeBox: {
    width: "100%",
    height: 80,
    paddingHorizontal: 30
  }
})
