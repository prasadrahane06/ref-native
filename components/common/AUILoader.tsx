import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { AUIThemedView } from "./AUIThemedView";
import { loaderStyles } from "@/constants/Styles";
import { APP_THEME } from "@/constants/Colors";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function AUILoader() {
  const loader = useSelector((state: RootState) => state.global.loader);

  return (
    <AUIThemedView
      style={[loaderStyles.container, loader && { display: "flex" }]}
    >
      <ActivityIndicator
        size="large"
        color={APP_THEME.primary.first}
        shouldRasterizeIOS
      />
    </AUIThemedView>
  );
}
