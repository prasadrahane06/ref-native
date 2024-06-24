import { Asset } from "expo-asset";
import React from "react";
import { ViewStyle } from "react-native";
import AUIImage from "./AUIImage";
import { AUIThemedView } from "./AUIThemedView";

interface AUIFilterProps {
    style?: ViewStyle;
}

export default function AUIFilter({ style }: AUIFilterProps) {
    return (
        <AUIThemedView style={[style, { paddingHorizontal: 10 }]}>
            <AUIImage
                path={Asset.fromModule(require("@/assets/icons/filter.png")).uri}
                style={{
                    width: 25,
                    height: 25,
                }}
            />
        </AUIThemedView>
    );
}
