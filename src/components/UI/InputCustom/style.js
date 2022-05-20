import { Platform, StyleSheet } from "react-native"
import { MineShaft, White } from "../../../shared/Colors"

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  input: {
    backgroundColor: White,
    width: "100%",
    borderWidth: 1,
    paddingVertical: Platform.OS === "ios" ? 16 : 8,
    paddingLeft: 20,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 15,
    color: MineShaft
  },
  iconBox: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 20
  },
})
