import AUIAccordion from "@/components/common/AUIAccordion";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME, TEXT_THEME } from "@/constants/Colors";
import { RootState } from "@/redux/store";
import React from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function CourseDetailsComponent({ plan }: any) {
    const theme = useSelector((state: RootState) => state.global.theme);

    return (
        <AUIThemedView style={styles.container}>
            <AUIThemedView style={styles.accordionSection}>
                {plan.courseDetails.map((courseDetail: any) => (
                    <AUIAccordion
                        key={courseDetail._id}
                        title={courseDetail.title}
                        style={{ borderColor: TEXT_THEME[theme].primary }}
                    >
                        <AUIThemedView>
                            <AUIThemedView style={styles.row}>
                                <AUIThemedView style={styles.rowContainer}>
                                    <AUIThemedText style={styles.subtitle}>
                                        {courseDetail.subtitle}
                                    </AUIThemedText>
                                </AUIThemedView>
                            </AUIThemedView>
                        </AUIThemedView>
                    </AUIAccordion>
                ))}
            </AUIThemedView>

            <AUIThemedView style={styles.detailsContainer2}>
                <AUIThemedText style={styles.courseDetailsText}>Course Fees</AUIThemedText>
                <AUIThemedView style={styles.detailsHeader}>
                    <AUIThemedText style={styles.courseLabel}>Total Fee</AUIThemedText>
                    <AUIThemedText
                        style={[styles.primaryText, { color: APP_THEME[theme].primary.first }]}
                    >
                        ${plan.price}
                    </AUIThemedText>
                </AUIThemedView>

                <AUIThemedView style={styles.detailsHeader}>
                    <AUIThemedText style={styles.courseLabel}>Book your seat</AUIThemedText>
                    <AUIThemedText
                        style={[styles.primaryText, { color: APP_THEME[theme].primary.first }]}
                    >
                        ${plan.bookYourSeat}
                    </AUIThemedText>
                </AUIThemedView>
                <AUIThemedView style={styles.detailsHeader}>
                    <AUIThemedText style={styles.courseLabel}>Duration</AUIThemedText>
                    <AUIThemedText
                        style={[styles.primaryText, { color: APP_THEME[theme].primary.first }]}
                    >
                        {plan.duration}
                    </AUIThemedText>
                </AUIThemedView>
            </AUIThemedView>
        </AUIThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        // marginVertical: 10,
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
        // color: APP_THEME.primary.first,
        fontWeight: "600",
    },
    marginBottom15: {
        marginBottom: 15,
    },
    accordionSection: {
        width: "100%",
        marginVertical: 7,
        borderBottomWidth: 1,
        borderColor: "#9DA1AC",
    },
    row: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    column: {
        flexDirection: "column",
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
        alignItems: "center",
    },
    label: {
        flex: 1,
        textAlign: "left",
        fontWeight: "500",
        fontSize: 14,
        marginRight: 10,
        paddingVertical: 3,
    },
    subtitle: {
        flex: 1,
        textAlign: "justify",
        fontWeight: "400",
        fontSize: 14,
        marginLeft: 10,
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
});
