import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

interface SchoolCardProps {
    title: string;
    courses: string;
    image: any;
}

const FavoritesSchoolCard: React.FC<SchoolCardProps> = ({ title, courses, image }) => {
    return (
        <AUIThemedView style={styles.card}>
            <Image source={image} style={styles.image} />
            <AUIThemedView style={styles.info}>
                <AUIThemedText style={styles.title}>{title}</AUIThemedText>
                <AUIThemedText style={styles.courses}>{courses}</AUIThemedText>
            </AUIThemedView>
            <View style={styles.iconContainer}>
                <MaterialIcons name="favorite" size={18} color="red" style={styles.icon} />
            </View>
        </AUIThemedView>
    );
};

export default FavoritesSchoolCard;

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: "column",
        borderWidth: 1,
        borderColor: "#5BD894",
        borderRadius: 10,
        margin: 7,
        overflow: "hidden",
    },
    info: {
        position: "absolute",
        top: 90,
        left: 0,
        right: 0,
        backgroundColor: "transparent",
        zIndex: 1,
    },
    title: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    },
    courses: {
        fontSize: 12,
        color: "#fff",
        textAlign: "center",
    },
    image: {
        width: "100%",
        height: 140,
        backgroundColor: "#808080",
    },
    iconContainer: {
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        borderRadius: 20,
        padding: 5,
        zIndex: 2,
    },
    icon: {
        alignSelf: "center",
    },
});
