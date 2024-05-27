import { StatusBar, StyleSheet } from "react-native";
import { APP_THEME } from "./Colors";

export const defaultStyles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});

export const initialPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  loginScreenInner: {
    marginLeft: -22,
    top: -71,
    width: 444,
    height: 208,
    backgroundColor: "transparent",
  },
  rectangleViewPosition: {
    borderRadius: 104,
  },
  title: {
    marginLeft: -87,
    top: 150,
    fontSize: 18,
    fontWeight: "700",
    // fontFamily: font,
    color: APP_THEME.ternary.first,
    lineHeight: 21,
    left: "50%",
    position: "absolute",
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  circularViewPosition: {
    height: 150,
    width: 150,
    borderRadius: 200,
    borderWidth: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  optionLabel: {
    color: APP_THEME.primary.first,
    // fontFamily: FontFamily.interSemiBold,
    fontSize: 16,
    textAlign: "left",
    fontWeight: "600",
    lineHeight: 21,
    letterSpacing: 0,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  bottomLayout: {
    width: "94%",
    height: 20,
    marginHorizontal: "auto",
    borderRadius: 50,
    paddingBottom: 25,
    backgroundColor: APP_THEME.secondary.second, //"#9DD393",
  },
});

export const loginPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 30,
    // marginTop: 40,
    paddingTop: 30,
    fontWeight: "bold",
  },
});
