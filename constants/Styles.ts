import { StatusBar, StyleSheet } from "react-native";
import { APP_THEME } from "./Colors";

export const defaultStyles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        // marginTop: StatusBar.currentHeight,
    },
});

export const initialPageStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        marginTop: StatusBar.currentHeight,
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
        // color: APP_THEME.light.gray,
        lineHeight: 21,
        left: "50%",
        position: "absolute",
    },
    title: {
        top: 120,
        fontSize: 18,
        fontWeight: "700",
        // fontFamily: font,
        // color: APP_THEME.light.gray,
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
        width: "100%",
        height: 20,
        marginHorizontal: "auto",
        borderRadius: 50,
        paddingBottom: 25,
        backgroundColor: APP_THEME.light.primary.first, //"#9DD393",
    },
});

export const loginPageStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    heading: {
        fontSize: 25,
        // marginTop: 40,
        paddingTop: 10,
        fontWeight: "bold",
    },
    mobileEmailButtonContainer: {
        flexDirection: "row",
        gap: 15,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        // backgroundColor: "#ffffff",
    },
    sendOtpContainer: {
        marginTop: 20,
        flexDirection: "column",
        // backgroundColor: "#ffffff",
        gap: 20,
    },
    otpViewContainer: {
        marginTop: 20,
        flexDirection: "column",
        alignItems: "flex-start",
        // gap: 30,
        // backgroundColor: "#ffffff",
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        borderRadius: 5,
        width: 680,
        height: 40,
        paddingHorizontal: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
    },
    regularText: {
        fontSize: 12,
        fontWeight: "500",
        textAlign: "left",
        justifyContent: "flex-start",
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
        marginTop: 30,
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
        // backgroundColor: "#ffffff",
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
        fontWeight: "semibold",
        letterSpacing: -0.32,
        // color: APP_THEME.light.gray,
        fontFamily: "Gilroy",
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

export const signupPageStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        position: "relative",
        backgroundColor: "#ffffff",
    },
    heading: {
        fontSize: 30,
        // marginTop: 40,
        paddingTop: 20,
        fontWeight: "bold",
        color: APP_THEME.light.gray,
    },
    formLayout: {
        gap: 10,
        marginTop: 20,
        flex: 1,
        backgroundColor: "#ffffff",

        // justifyContent: "space-between",
    },
    fieldContainer: {
        gap: 15,
        backgroundColor: "#ffffff",
    },
    buttonContainer: {
        width: "100%",
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 5,
    },
    section: {
        marginTop: 30,
    },
    signInLink: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        backgroundColor: "#ffffff",
    },
    link: {
        color: "blue",
        textDecorationLine: "underline",
    },
});

export const loaderStyles = StyleSheet.create({
    container: {
        position: "absolute",
        flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        // top: "50%",
        // left: "45%",
        backgroundColor: "gray",
        width: "100%",
        opacity: 0.5,
        display: "none",
        zIndex: 1000,
    },
});

export const imageStyles = StyleSheet.create({
    defaultIcon: {
        height: 50,
        width: 50,
    },
    defaultPreview: {
        height: 300,
        width: "100%",
    },
});
