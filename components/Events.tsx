import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME } from "@/constants/Colors";
import React from "react";
import { StyleSheet } from "react-native";
import AUIImage from "./common/AUIImage";
import { AUIThemedText } from "./common/AUIThemedText";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export const Events = ({ title, image }: any) => {
    const theme = useSelector((state: RootState) => state.global.theme);

    return (
        <AUIThemedView>
            <AUIImage style={eventStyles.image} path={image} />
            <AUIThemedText style={[eventStyles.title, { color: APP_THEME[theme].gray }]}>
                {title}
            </AUIThemedText>
        </AUIThemedView>
    );
};
const eventStyles = StyleSheet.create({
    image: {
        borderRadius: 8,
        height: 120,
        width: "100%",
        objectFit: "fill",
    },
    title: {
        fontSize: 14,
        // color: APP_THEME.gray,
    },
});
