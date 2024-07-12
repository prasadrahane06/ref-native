import { APP_THEME } from "@/constants/Colors";
import { loaderStyles } from "@/constants/Styles";
import { RootState } from "@/redux/store";
import React from "react";
import { ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { AUIThemedView } from "./AUIThemedView";

export default function AUILoader() {
    const loader = useSelector((state: RootState) => state.global.loader);

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
