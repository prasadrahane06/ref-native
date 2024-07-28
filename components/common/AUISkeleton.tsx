import { View, StyleSheet, ViewStyle } from "react-native";
import React from "react";

interface SkeletonProps {
    style?: ViewStyle;
}

const AUISkeleton = ({ style }: SkeletonProps) => {
    return <View style={[styles.skeleton, style]} />;
};

const styles = StyleSheet.create({
    skeleton: {
        backgroundColor: "red", // light grey background
        borderRadius: 4, // rounded corners
        // any other default styles you want for the skeleton loader
    },
});

export default AUISkeleton;
