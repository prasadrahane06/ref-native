import { APP_THEME } from "@/constants/Colors";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { AUIThemedText } from "./common/AUIThemedText";
import { AUIThemedView } from "./common/AUIThemedView";
import AUIImage from "./common/AUIImage";

export const Review = ({ name, role, image, comment }: any) => (
    <AUIThemedView style={reviewStyle.container}>
        <AUIThemedView style={reviewStyle.item}>
            <AUIThemedView style={reviewStyle.row}>
                <AUIImage icon path={image} />
                <AUIThemedView style={reviewStyle.textContainer}>
                    <AUIThemedText style={reviewStyle.name}>
                        {name}
                    </AUIThemedText>
                    <AUIThemedText style={reviewStyle.role}>
                        {role}
                    </AUIThemedText>
                </AUIThemedView>
            </AUIThemedView>
            <AUIThemedView>
                <AUIThemedText style={reviewStyle.comment}>
                    {comment}
                </AUIThemedText>
            </AUIThemedView>
        </AUIThemedView>
    </AUIThemedView>
);

const reviewStyle = StyleSheet.create({
    container: {
        paddingVertical: 10,
        marginRight: 18,
    },
    item: {
        width: 300,
        borderRadius: 10,
        overflow: "hidden",
        padding: 15,
        backgroundColor: "#D3FFE7",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#D3FFE7",
    },
    textContainer: {
        paddingLeft: 10,
        backgroundColor: "#D3FFE7",
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
    role: {
        fontSize: 13,
        color: APP_THEME.gray,
    },
    comment: {
        paddingTop: 10,
        fontSize: 14,
        fontWeight: "400",
        backgroundColor: "#D3FFE7",
    },
});
