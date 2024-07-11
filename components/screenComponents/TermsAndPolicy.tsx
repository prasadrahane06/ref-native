import { APP_THEME } from "@/constants/Colors";
import { useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import { Dimensions, Linking, Text, TouchableOpacity } from "react-native";
import { AUIThemedView } from "../common/AUIThemedView";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { AUIThemedText } from "../common/AUIThemedText";

const { height: windowHeight } = Dimensions.get("window");
export default function TermsAndPolicy() {
    const theme = useSelector((state: RootState) => state.global.theme);

    return (
        <AUIThemedView
            style={{
                flex: 1,
                alignContent: "center",
            }}
        >
            <TouchableOpacity
                style={{
                    width: "50%",
                    backgroundColor: APP_THEME[theme].primary.first,
                    padding: 10,
                    borderRadius: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    marginVertical: 20,
                    marginHorizontal: "auto",
                }}
                onPress={() => {
                    Linking.openURL(
                        "https://linguistedu.com/assets/Privacy-Policy-Linguist_ORG.pdf"
                    );
                }}
            >
                <AUIThemedText style={{ color: "#fff", fontWeight: "bold" }}>
                    Privacy Policy
                </AUIThemedText>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    width: "50%",
                    backgroundColor: APP_THEME[theme].primary.first,
                    padding: 10,
                    borderRadius: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    marginHorizontal: "auto",
                }}
                onPress={() => {
                    Linking.openURL("https://linguistedu.com/assets/Terms.pdf");
                }}
            >
                <AUIThemedText style={{ color: "#fff", fontWeight: "bold" }}>Terms</AUIThemedText>
            </TouchableOpacity>
        </AUIThemedView>
    );
}
