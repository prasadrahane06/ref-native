import AUIAccordion from "@/components/common/AUIAccordion";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME } from "@/constants/Colors";
import { Asset } from "expo-asset";
import React from "react";
import { StyleSheet } from "react-native";

export default function CourseDetailsComponent({ plan }: any) {
    console.log("plan", plan);

    return (
        <AUIThemedView style={styles.container}>
            <AUIThemedView style={styles.accordionSection}>
                <AUIAccordion title="Introduction to french">
                    <AUIThemedView>
                        <AUIThemedView style={styles.row}>
                            <AUIThemedText style={styles.value}>Ownership</AUIThemedText>
                            <AUIThemedView style={styles.rowContainer}>
                                <AUIThemedText style={styles.label}>Private</AUIThemedText>
                                <AUIThemedText style={styles.label2}>Private</AUIThemedText>
                            </AUIThemedView>
                        </AUIThemedView>
                    </AUIThemedView>
                </AUIAccordion>

                <AUIAccordion title="Culture Introduction to - French">
                    <AUIThemedView>
                        <AUIThemedView style={styles.row}>
                            <AUIThemedText style={styles.value}>Ownership</AUIThemedText>
                            <AUIThemedView style={styles.rowContainer}>
                                <AUIThemedText style={styles.label}>Private</AUIThemedText>
                                <AUIThemedText style={styles.label2}>Private</AUIThemedText>
                            </AUIThemedView>
                        </AUIThemedView>
                    </AUIThemedView>
                </AUIAccordion>

                <AUIAccordion title="Intermediate French 1">
                    <AUIThemedView>
                        <AUIThemedView style={styles.row}>
                            <AUIThemedText style={styles.value}>Ownership</AUIThemedText>
                            <AUIThemedView style={styles.rowContainer}>
                                <AUIThemedText style={styles.label}>Private</AUIThemedText>
                                <AUIThemedText style={styles.label2}>Private</AUIThemedText>
                            </AUIThemedView>
                        </AUIThemedView>
                    </AUIThemedView>
                </AUIAccordion>

                <AUIAccordion title="Intermediate French 2">
                    <AUIThemedView>
                        <AUIThemedView style={styles.row}>
                            <AUIThemedText style={styles.value}>Ownership</AUIThemedText>
                            <AUIThemedView style={styles.rowContainer}>
                                <AUIThemedText style={styles.label}>Private</AUIThemedText>
                                <AUIThemedText style={styles.label2}>Private</AUIThemedText>
                            </AUIThemedView>
                        </AUIThemedView>
                    </AUIThemedView>
                </AUIAccordion>

                <AUIAccordion title="Medium French 3">
                    <AUIThemedView>
                        <AUIThemedView style={styles.row}>
                            <AUIThemedText style={styles.value}>Ownership</AUIThemedText>
                            <AUIThemedView style={styles.rowContainer}>
                                <AUIThemedText style={styles.label}>Private</AUIThemedText>
                                <AUIThemedText style={styles.label2}>Private</AUIThemedText>
                            </AUIThemedView>
                        </AUIThemedView>
                    </AUIThemedView>
                </AUIAccordion>

                <AUIAccordion title="Advance French 4">
                    <AUIThemedView>
                        <AUIThemedView style={styles.row}>
                            <AUIThemedText style={styles.value}>Ownership</AUIThemedText>
                            <AUIThemedView style={styles.rowContainer}>
                                <AUIThemedText style={styles.label}>Private</AUIThemedText>
                                <AUIThemedText style={styles.label2}>Private</AUIThemedText>
                            </AUIThemedView>
                        </AUIThemedView>
                    </AUIThemedView>
                </AUIAccordion>
            </AUIThemedView>

            <AUIThemedView style={styles.detailsContainer2}>
                <AUIThemedText style={styles.courseDetailsText}>Course Fees</AUIThemedText>
                <AUIThemedView style={styles.detailsHeader}>
                    <AUIThemedText style={styles.courseLabel}>Total Fee</AUIThemedText>
                    <AUIThemedText style={styles.primaryText}>{plan.duration}</AUIThemedText>
                </AUIThemedView>

                <AUIThemedView style={styles.detailsHeader}>
                    <AUIThemedText style={styles.courseLabel}>Book your seet</AUIThemedText>
                    <AUIThemedText style={styles.primaryText}>{plan.duration}</AUIThemedText>
                </AUIThemedView>

                <AUIThemedView style={styles.detailsHeader}>
                    <AUIThemedText style={styles.courseLabel}>Rating</AUIThemedText>
                    <AUIThemedText style={styles.primaryText}>{plan.duration}</AUIThemedText>
                </AUIThemedView>
            </AUIThemedView>

            {/* <AUIThemedView style={styles.borderBottom} /> */}
        </AUIThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginHorizontal: 12,
        borderBottomWidth: 1,
        borderColor: "#9DA1AC",
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
    detailsContainer2: {
        flexDirection: "column",
        marginHorizontal: 12,
        marginBottom: 5,
    },
    courseDetailsText: {
        fontWeight: "bold",
        marginBottom: 3,
    },
    detailsHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    courseLabel: {
        marginVertical: 4,
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
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: APP_THEME.primary.first,
    },
    accordionSection: {
        width: "100%",
        marginVertical: 15,
        borderBottomWidth: 1,
        borderColor: "#9DA1AC",
    },
    row: {
        flexDirection: "column",
        justifyContent: "space-between",
        borderBottomWidth: 2,
        borderBottomColor: "#ddd",
    },
    value: {
        textAlign: "center",
        color: "#9DA1AC",
        fontWeight: "400",
        fontSize: 14,
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    label: {
        flex: 1,
        textAlign: "center",
        fontWeight: "500",
        fontSize: 14,
        marginRight: 50,
        paddingVertical: 3,
    },
    label2: {
        flex: 1,
        textAlign: "center",
        fontWeight: "500",
        fontSize: 14,
        marginLeft: 50,
        paddingVertical: 3,
    },
    courseFeesContainer: {
        marginTop: 20,
        borderTopWidth: 1,
        borderColor: "#9DA1AC",
        paddingTop: 10,
    },
    courseFeesTitle: {
        fontWeight: "600",
        marginBottom: 10,
    },
    courseFeeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    feeValue: {
        color: APP_THEME.primary.first,
    },
});
