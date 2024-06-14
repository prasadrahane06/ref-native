import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME } from "@/constants/Colors";
import React from "react";
import { Image, StyleSheet } from "react-native";
import { AUIThemedText } from "./common/AUIThemedText";

export const Events = ({ title, image }: any) => (
    <AUIThemedView>
        <Image style={eventStyles.image} source={image} />
        <AUIThemedText style={eventStyles.title}>{title}</AUIThemedText>
    </AUIThemedView>
);

const eventStyles = StyleSheet.create({
    image: {
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        width: "100%",
        objectFit: "fill",
    },
    title: {
        fontSize: 14,
        color: APP_THEME.gray,
    },
});
