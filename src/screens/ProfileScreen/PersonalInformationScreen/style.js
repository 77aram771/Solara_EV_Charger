import { StyleSheet } from "react-native"
import { White } from "../../../shared/Colors"
import { paddingHorizontal } from "../../../shared/GlobalStyle"
import { windowHeight, windowWidth } from "../../../shared/Const"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: White,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal
  },
  mineBox: {
    flex: 1,
    width: windowWidth,
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginBottom: 10,
    paddingHorizontal,
    paddingTop: windowHeight / 15
  }
})
