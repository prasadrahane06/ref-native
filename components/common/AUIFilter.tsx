import React from "react";
import { Image, ViewStyle } from "react-native";
import { AUIThemedView } from "./AUIThemedView";

interface AUIFilterProps {
    style?: ViewStyle;
}

export default function AUIFilter({ style }: AUIFilterProps) {
    return (
        <AUIThemedView style={[style, { paddingHorizontal: 10 }]}>
            <Image source={require("@/assets/icons/filter.png")} />
        </AUIThemedView>
    );
}
