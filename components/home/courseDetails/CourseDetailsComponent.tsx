import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME } from "@/constants/Colors";
import React from "react";
import { StyleSheet } from "react-native";

export default function CourseDetailsComponent({ data }: any) {
    return (
        <AUIThemedView style={styles.container}>
            <AUIThemedView style={styles.detailsContainer}>
                <AUIThemedText style={styles.marginBottom15}>
                    Total Duration
                </AUIThemedText>
                <AUIThemedText style={styles.primaryText}>
                    {data.duration}
                </AUIThemedText>
            </AUIThemedView>

            <AUIThemedView style={styles.detailsContainer}>
                <AUIThemedText style={styles.marginBottom15}>
                    Total Fee
                </AUIThemedText>
                <AUIThemedText style={styles.primaryText}>
                    {data.fee}
                </AUIThemedText>
            </AUIThemedView>

            <AUIThemedView style={styles.detailsContainer}>
                <AUIThemedText style={styles.marginBottom15}>
                    Book your seat
                </AUIThemedText>
                <AUIThemedText style={styles.primaryText}>
                    {data.book}
                </AUIThemedText>
            </AUIThemedView>

            <AUIThemedView style={styles.ratingsContainer}>
                <AUIThemedText style={styles.marginBottom15}>
                    Rating
                </AUIThemedText>
                <AUIThemedText style={styles.primaryText}>
                    {data.rating}
                </AUIThemedText>
            </AUIThemedView>

            <AUIThemedView style={styles.borderBottom} />
        </AUIThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        gap: 10,
    },
    detailsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
        marginHorizontal: 12,
        borderBottomWidth: 1,
        borderColor: "#9DA1AC",
    },
    ratingsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 12,
    },
    primaryText: {
        color: APP_THEME.primary.first,
        fontWeight: "600",
    },
    marginBottom15: {
        marginBottom: 15,
    },
    borderBottom: {
        width: "100%",
        position: "absolute",
        bottom: 0,
        borderWidth: 0.6,
        borderColor: APP_THEME.primary.first,
    },
});
