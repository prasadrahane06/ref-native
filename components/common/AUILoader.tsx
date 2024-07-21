import { APP_THEME } from "@/constants/Colors";
import { loaderStyles } from "@/constants/Styles";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import React from "react";
import { ActivityIndicator } from "react-native";
import { AUIThemedView } from "./AUIThemedView";

export default function AUILoader() {
    const loader = useLangTransformSelector((state: RootState) => state.global.loader);

    return (
        <AUIThemedView style={[loaderStyles.container, loader && { display: "flex" }]}>
            <ActivityIndicator
                size="large"
                color={APP_THEME.light.primary.first}
                shouldRasterizeIOS
            />
        </AUIThemedView>
    );
}
