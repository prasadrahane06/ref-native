import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

interface SectionTitleProps {
    children: React.ReactNode;
    viewAll?: string;
    onViewAllClick?: () => void;
    style?: ViewStyle;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
    children,
    viewAll,
    onViewAllClick,
    style,
}) => {
    return (
        <AUIThemedView style={[styles.container, style]}>
            <AUIThemedText style={styles.title}>{children}</AUIThemedText>
            {viewAll && (
                <Link href={viewAll} style={styles.viewAll}>
                    View All
                </Link>
            )}
            {onViewAllClick && (
                <TouchableOpacity onPress={onViewAllClick}>
                    <AUIThemedText style={styles.viewAll}>View All</AUIThemedText>
                </TouchableOpacity>
            )}
        </AUIThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingTop: 15,
    },
    title: {
        fontWeight: "bold",
        fontSize: 17,
    },
    viewAll: {
        textDecorationLine: "underline",
        fontSize: 14,
        fontWeight: "500",
    },
});

export default SectionTitle;
