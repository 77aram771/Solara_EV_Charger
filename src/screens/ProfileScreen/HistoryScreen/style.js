import { StyleSheet } from "react-native"
import { windowWidth } from "../../../shared/Const"
import { paddingHorizontal } from "../../../shared/GlobalStyle"
import { Mercurysolid, White, WildSand } from "../../../shared/Colors"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    backgroundColor: White,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal,
    paddingVertical: 20
  },
  tabBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    marginBottom: 35
  },
  leftTab: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 7,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 1,
    borderColor: Mercurysolid
  },
  rightTab: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 7,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: Mercurysolid
  },
  titleBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  priceBox: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 8,
    backgroundColor: WildSand,
    borderRadius: 8
  },
  itemContainer: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: Mercurysolid,
    marginBottom: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  }
})
