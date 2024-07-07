import { APP_THEME } from "@/constants/Colors";
import { useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import { Dimensions, Linking, Text, TouchableOpacity } from "react-native";
import { AUIThemedView } from "../common/AUIThemedView";

const { height: windowHeight } = Dimensions.get("window");
export default function TermsAndPolicy() {
    return (
        <AUIThemedView
            style={{
                justifyContent: "flex-start",
                alignContent: "center",
                paddingVertical: 20,
                height: windowHeight,
            }}
        >
            <TouchableOpacity
                style={{
                    width: "50%",
                    backgroundColor: APP_THEME.primary.first,
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
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Privacy Policy</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    width: "50%",
                    backgroundColor: APP_THEME.primary.first,
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
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Terms</Text>
            </TouchableOpacity>
        </AUIThemedView>
    );
}
