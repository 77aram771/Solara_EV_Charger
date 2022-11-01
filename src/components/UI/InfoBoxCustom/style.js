import { StyleSheet } from "react-native"
import { windowWidth } from "../../../shared/Const"
import { Mercurysolid, White } from "../../../shared/Colors"

export const styles = StyleSheet.create({
  infoBox: {
    width: windowWidth / 1.1,
    backgroundColor: White,
    borderRadius: 10,
    marginBottom: 20,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: Mercurysolid
  },
  infoBoxTop: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5
  },
  topTitleBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  infoBottomBox: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row"
  }
})
