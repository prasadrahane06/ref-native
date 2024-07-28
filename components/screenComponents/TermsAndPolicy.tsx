import { APP_THEME } from "@/constants/Colors";
import { RootState } from "@/redux/store";
import React from "react";
import { Linking, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { AUIThemedText } from "../common/AUIThemedText";
import { AUIThemedView } from "../common/AUIThemedView";
import { useTranslation } from "react-i18next";

export default function TermsAndPolicy() {
    const { t } = useTranslation();

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
                    {t("privacy_policy")}
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
                <AUIThemedText style={{ color: "#fff", fontWeight: "bold" }}>
                    {t("termsPolicy")}
                </AUIThemedText>
            </TouchableOpacity>
        </AUIThemedView>
    );
}
