import { AUIThemedView } from "@/components/common/AUIThemedView";
import React from "react";
import { StyleSheet } from "react-native";
import AUIImage from "./common/AUIImage";
import { AUIThemedText } from "./common/AUIThemedText";

export const Facilities = ({ title, image }: any) => {
    return (
        <AUIThemedView style={facilitiestyles.container}>
            <AUIImage path={image} icon />
            <AUIThemedText style={facilitiestyles.title}>{title}</AUIThemedText>
        </AUIThemedView>
    );
};

const facilitiestyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        gap: 7,
    },
    title: {
        fontSize: 14,
        fontWeight: "600",
    },
});
