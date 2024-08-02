import AUIImage from "@/components/common/AUIImage";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Asset } from "expo-asset";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function TabThreeScreen(props: any) {
    const { t } = useTranslation();

    return (
        <AUIThemedView style={styles.container}>
            <AUIThemedText style={styles.title}>{t("compare_schools")}</AUIThemedText>
            <AUIImage
                style={styles.image}
                path={Asset.fromModule(require("@/assets/images/local/group_36754.png"))}
                contentFit="contain"
            />
            <AUIThemedText style={styles.description}>{t("compare_description")}</AUIThemedText>
            <AUIThemedView style={styles.cardContainer}>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() =>
                        router.push({
                            pathname: `/(home)/compare/searchSchool`,
                            params: { compareSlot: "compareSchool1" },
                        })
                    }
                >
                    <Ionicons name="add-circle-outline" size={50} color="#5BD894" />
                    <AUIThemedText style={styles.cardText}>{t("add_school")}</AUIThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() =>
                        router.push({
                            pathname: `/(home)/compare/searchSchool`,
                            params: { compareSlot: "compareSchool2" },
                        })
                    }
                >
                    <Ionicons name="add-circle-outline" size={50} color="#5BD894" />
                    <AUIThemedText style={styles.cardText}>{t("add_school")}</AUIThemedText>
                </TouchableOpacity>
            </AUIThemedView>
        </AUIThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 15,
    },
    title: {
        alignSelf: "flex-start",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    image: {
        width: "90%",
        height: 180,
        marginBottom: 20,
    },
    description: {
        fontSize: 17,
        fontWeight: "500",
        textAlign: "center",
        marginBottom: 20,
    },
    cardContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    card: {
        width: "48%",
        height: 160,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        padding: 10,
    },
    cardText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: "400",
    },
});
