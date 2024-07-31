import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import React from "react";
import { StyleSheet } from "react-native";

export default function Transactions() {
    return (
        <AUIThemedView style={style.container}>
            <AUIThemedText>Transactions Page</AUIThemedText>
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
