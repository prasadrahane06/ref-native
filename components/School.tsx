import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import "react-native-gesture-handler";
import AUIBackgroundImage from "./common/AUIBackgroundImage";
import { AUIThemedText } from "./common/AUIThemedText";
import { AUIThemedView } from "./common/AUIThemedView";

interface SchoolProps {
    id: string;
    title: string;
    image: any;
    caption?: string;
    favorite?: boolean;
    schoolWidth: number;
    schoolHeight: number;
}

const School: React.FC<SchoolProps> = ({
    id,
    title,
    image,
    caption,
    favorite,
    schoolWidth,
    schoolHeight,
}) => {
    const router = useRouter();

    return (
        <TouchableOpacity
            onPress={() =>
                router.push({
                    pathname: `(home)/schoolDetails/${id}`,
                })
            }
        >
            <AUIThemedView
                style={[styles.schoolContainer, { width: schoolWidth, height: schoolHeight }]}
            >
                <AUIThemedView style={styles.schoolItem}>
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
                        <AUIThemedText style={styles.schoolTitle}>{title}</AUIThemedText>
                        {caption && (
                            <AUIThemedText style={styles.schoolCaption}>{caption}</AUIThemedText>
                        )}
                        {favorite && (
                            <AUIThemedView style={styles.iconContainer}>
                                <MaterialIcons
                                    name="favorite"
                                    size={18}
                                    color="red"
                                    style={styles.icon}
                                />
                            </AUIThemedView>
                        )}
                    </AUIBackgroundImage>
                </AUIThemedView>
            </AUIThemedView>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    schoolContainer: { marginRight: 10 },
    schoolItem: {
        borderRadius: 10,
        overflow: "hidden",
    },
    schoolTitle: {
        top: 100,
        textAlign: "center",
        color: "white",
        fontSize: 14,
        fontWeight: "600",
    },
    schoolCaption: {
        top: 95,
        textAlign: "center",
        color: "white",
        fontSize: 13,
        fontWeight: "400",
    },
    image: {
        width: "100%",
        height: "100%",
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
    iconContainer: {
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        borderRadius: 20,
        padding: 5,
    },
    icon: {
        alignSelf: "center",
    },
});

export default School;
