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
  iosIndexHeader: {
    marginLeft: -25,
    top: -71,
    width: 444,
    height: 208,
    backgroundColor: "transparent",
    borderRadius: 104,
  },
  indexHeader: {
    // marginLeft: -25,
    top: -75,

    // width: 444,
    // @ts-ignore
    height: StatusBar.currentHeight + 130,
    backgroundColor: "transparent",
    borderRadius: 100,
  },

  button: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 3,
  },
  iosTitle: {
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
  title: {
    top: 120,
    fontSize: 18,
    fontWeight: "700",
    // fontFamily: font,
    // color: APP_THEME.ternary.first,
    lineHeight: 21,
    width: "100%",
    textAlign: "center",
    position: "absolute",
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  circularViewPosition: {
    height: 150,
    width: 150,
    borderCurve: "circular",
    borderRadius: 200,
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
    paddingTop: 10,
    backgroundColor: "#ffffff",
  },
  heading: {
    fontSize: 25,
    // marginTop: 40,
    paddingTop: 10,
    fontWeight: "bold",
  },
  mobileEmailButtonContainer: {
    flexDirection: "row",
    gap: 5,
    marginTop: 20,
    backgroundColor: "#ffffff",
  },
  sendOtpContainer: {
    marginTop: 20,
    flexDirection: "column",
    backgroundColor: "#ffffff",

    gap: 20,
  },
  otpViewContainer: {
    marginTop: 20,
    flexDirection: "column",
    alignItems: "center",
    gap: 30,
    backgroundColor: "#ffffff",
  },
});

export const buttonStyle = StyleSheet.create({
  button: {
    // padding: 10,
    borderRadius: 5,
    // borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonInner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    width: 680,
    height: 40,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
  },
  // sendOtpButton: {
  //   width: 200,
  // },
});

export const secondaryButtonStyle = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    width: "50%",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonInner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    width: 680,
    height: 40,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
  },
});

export const inputFieldStyle = StyleSheet.create({
  container: {
    // marginVertical: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  error: {
    marginTop: 5,
    fontSize: 14,
    color: "red",
  },
});

export const dropdownStyle = StyleSheet.create({
  container: {
    padding: 10,
  },
  picker: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
});

export const splitOTPInputContainer = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
export const splitOTPinputFieldStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 18,
    width: 40,
    height: 40,
    marginHorizontal: 5,
  },
});
export const signupPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    position: "relative",
  },
  heading: {
    fontSize: 30,
    // marginTop: 40,
    paddingTop: 20,
    fontWeight: "bold",
  },
  formLayout: {
    gap: 10,
    marginTop: 10,
    flex: 1,
    justifyContent: "space-between",
  },
  fieldContainer: {
    gap: 15,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
  },
});
