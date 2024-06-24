import { AUIThemedView } from "@/components/common/AUIThemedView";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet } from "react-native";
import AUIBackgroundImage from "./common/AUIBackgroundImage";
interface PhotoGallaryProps {
    image: any;
}
const PhotoGallary: React.FC<PhotoGallaryProps> = ({ image }) => {
    return (
        <AUIThemedView style={styles.photoContainer}>
            <AUIThemedView style={styles.photoItem}>
                <AUIBackgroundImage style={[styles.image]} path={image}>
                    <LinearGradient
                        colors={[
                            "rgba(10, 21, 47, 0.9)",
                            "rgba(10, 21, 47, 0.6)",
                            "rgba(91, 216, 148, 0.3)",
                            "transparent",
                        ]}
                        style={styles.gradient}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 0, y: 0 }}
                    />
                </AUIBackgroundImage>
            </AUIThemedView>
        </AUIThemedView>
    );
};
export default PhotoGallary;
const styles = StyleSheet.create({
    photoContainer: { marginRight: 18 },
    photoItem: {
        borderRadius: 10,
        overflow: "hidden",
    },
    image: {
        width: 270,
        height: 160,
        borderRadius: 7,
    },
    gradient: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: "100%",
        borderRadius: 7,
    },
});
