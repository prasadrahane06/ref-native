import React from "react";
import { Image, ViewStyle } from "react-native";
import { AUIThemedView } from "./AUIThemedView";
import AUIImage from "./AUIImage";
import { Asset } from "expo-asset";

interface AUIFilterProps {
    style?: ViewStyle;
}

export default function AUIFilter({ style }: AUIFilterProps) {
    return (
        <AUIThemedView style={[style, { paddingHorizontal: 10 }]}>
            <AUIImage
                path={
                    Asset.fromModule(require("@/assets/icons/filter.png")).uri
                }
                style={{
                    width: 25,
                    height: 25,
                }}
            />
        </AUIThemedView>
    );
}
