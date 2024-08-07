import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

export default function Transactions() {
    const { t } = useTranslation();
    return (
        <AUIThemedView style={style.container}>
            <AUIThemedText>{t("transactions_page")}</AUIThemedText>
        </AUIThemedView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
