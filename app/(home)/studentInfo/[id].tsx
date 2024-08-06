import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME } from "@/constants/Colors";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import { useLocalSearchParams } from "expo-router";
import { t } from "i18next";
import React, { useEffect } from "react";
import { StyleSheet, ScrollView, Dimensions } from "react-native";

// const { width } = Dimensions.get("window");

const StudentInfoScreen = () => {
    const { id } = useLocalSearchParams();

    const { requestFn } = useApiRequest();

    const studentData = useLangTransformSelector(
        (state: RootState) => state.api.individualPurchaseCourse?.docs?.[0] || {}
    );

    useEffect(() => {
        requestFn(API_URL.purchaseCourse, "individualPurchaseCourse", { id });
    }, [id]);

    return (
        <ScrollView>
            <AUIThemedView style={styles.container}>
                {/* <AUIThemedText style={styles.header}>Student Info</AUIThemedText> */}
                <AUIThemedText>{t("student_information")}</AUIThemedText>
                <AUIThemedView style={styles.contactContainerHeader}>
                    {/* <AUIThemedView style={styles.userImageContainer}>
                        <AUIThemedText style={styles.userImage}></AUIThemedText>
                    </AUIThemedView> */}

                    <AUIThemedView style={styles.contactContainer}>
                        <AUIThemedText style={styles.contactText}>
                            {studentData?.user?.name}
                        </AUIThemedText>
                        <AUIThemedText style={styles.contactText}>
                        {t("student_id")}:
                            <AUIThemedText style={styles.value}>
                                {studentData?.user?._id}
                            </AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText style={styles.contactText}>
                        {t("contact_no")}:
                            <AUIThemedText style={styles.value}>
                                {studentData?.user?.phone}
                            </AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText style={styles.contactText}>
                        {t("mail_id")}:
                            <AUIThemedText style={styles.value}>
                                {studentData?.user?.email}
                            </AUIThemedText>
                        </AUIThemedText>
                    </AUIThemedView>
                </AUIThemedView>

                <AUIThemedView style={styles.section}>
                    <AUIThemedText>{t("personal_details")}</AUIThemedText>
                    <AUIThemedView style={styles.personalDetailContainer}>
                        <AUIThemedText style={styles.detailText}>
                        {t("date_of_birth")}:
                            <AUIThemedText style={styles.value}>
                                {new Date(studentData?.user?.dob).toLocaleDateString()}
                            </AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText style={styles.detailText}>
                        {t("academic_session")}:
                            <AUIThemedText style={styles.value}>
                                {studentData?.user?.academicSession}
                            </AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText style={styles.detailText}>
                        {t("qualification")}:
                            <AUIThemedText style={styles.value}>
                                {studentData?.user?.qualification}
                            </AUIThemedText>
                        </AUIThemedText>
                    </AUIThemedView>
                </AUIThemedView>

                <AUIThemedView style={styles.section}>
                    <AUIThemedText>{t("preferences")}</AUIThemedText>
                    <AUIThemedView style={styles.personalDetailContainer}>
                        <AUIThemedText style={styles.detailText}>
                        {t("language")}:
                            <AUIThemedText style={styles.value}>
                                {studentData?.user?.language}
                            </AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText style={styles.detailText}>
                        {t("state")}:
                            <AUIThemedText style={styles.value}>
                                {studentData?.user?.state}
                            </AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText style={styles.detailText}>
                        {t("country")}:
                            <AUIThemedText style={styles.value}>
                                {studentData?.user?.country}
                            </AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText style={styles.detailText}>
                        {t("city")}:
                            <AUIThemedText style={styles.value}>
                                {studentData?.user?.city}
                            </AUIThemedText>
                        </AUIThemedText>
                    </AUIThemedView>
                </AUIThemedView>
                <AUIThemedView style={styles.section}>
                    <AUIThemedText>{t("course_information")}</AUIThemedText>
                    <AUIThemedView style={styles.personalDetailContainer}>
                        <AUIThemedText style={styles.detailText}>
                        {t("course_name")} :
                            <AUIThemedText style={styles.value}>
                                {studentData?.course?.courseName}
                            </AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText style={styles.detailText}>
                        {t("language")} :
                            <AUIThemedText style={styles.value}>
                                {studentData?.course?.language}
                            </AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText style={styles.detailText}>
                        {t("startdate")}:
                            <AUIThemedText style={styles.value}>
                                {studentData?.course?.startDate}
                            </AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText style={styles.detailText}>
                        {t("enddate")}:
                            <AUIThemedText style={styles.value}>
                                {studentData?.course?.endDate}
                            </AUIThemedText>
                        </AUIThemedText>
                    </AUIThemedView>
                </AUIThemedView>

                <AUIThemedView style={styles.section}>
                    <AUIThemedText>{t("course_information")}</AUIThemedText>
                    <AUIThemedView style={styles.personalDetailContainer}>
                        <AUIThemedText style={styles.detailText}>
                            {t("payment_method")}:
                            <AUIThemedText style={styles.value}>{t("hyperpay")}</AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText style={styles.detailText}>
                        {t("transition_id")}:
                            <AUIThemedText style={styles.value}>{t("not_available")}</AUIThemedText>
                        </AUIThemedText>
                    </AUIThemedView>
                    <AUIThemedView style={styles.paymentContainer}>
                        <AUIThemedView style={styles.paymentColumn}>
                            <AUIThemedText style={styles.paymentLabel}>{t("total_fees")}</AUIThemedText>
                            <AUIThemedText style={styles.paymentValue}>
                                {studentData?.plan?.price}
                            </AUIThemedText>
                        </AUIThemedView>
                        <AUIThemedView style={styles.paymentColumn}>
                            <AUIThemedText style={styles.paymentLabel}>{t("paid")}</AUIThemedText>
                            <AUIThemedText style={styles.paymentValue}>
                                {studentData?.plan?.type === "buy"
                                    ? studentData?.plan?.price
                                    : studentData?.plan?.bookYourSeat}
                            </AUIThemedText>
                        </AUIThemedView>
                        <AUIThemedView style={styles.paymentColumn}>
                            <AUIThemedText style={styles.paymentLabel}>{t("pending")}</AUIThemedText>
                            <AUIThemedText style={styles.paymentValue}>
                                {studentData && studentData?.plan?.type === "buy"
                                    ? studentData?.plan?.bookYourSeat
                                    : studentData?.plan?.price - studentData?.plan?.bookYourSeat}
                            </AUIThemedText>
                        </AUIThemedView>
                        <AUIThemedView style={styles.paymentColumn}>
                            <AUIThemedText style={styles.paymentLabel}>{t("last_paid_on")}</AUIThemedText>
                            <AUIThemedText style={styles.paymentValue}>
                                {studentData?.plan?.lastPaidOn
                                    ? new Date(studentData?.plan?.lastPaidOn).toLocaleDateString()
                                    : `${t("not_available")}`}
                            </AUIThemedText>
                        </AUIThemedView>
                    </AUIThemedView>
                </AUIThemedView>
            </AUIThemedView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    userImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    contactContainerHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    userImageContainer: {
        marginRight: 10,
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 15,
        textAlign: "left",
        color: APP_THEME.light.ternary.first,
    },
    contactContainer: {
        padding: 15,
        backgroundColor: APP_THEME.light.secondary.first,
        borderRadius: 10,
        flex: 1,
    },
    contactText: {
        fontSize: 16,
        marginBottom: 5,
        color: APP_THEME.light.ternary.first,
    },
    section: {
        marginBottom: 20,
    },
    personalDetailContainer: {
        backgroundColor: APP_THEME.light.secondary.first,
        padding: 15,
        borderRadius: 10,
    },
    detailText: {
        fontSize: 16,
        marginBottom: 10,
        color: APP_THEME.light.ternary.first,
    },
    titleHeader: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        color: APP_THEME.light.ternary.first,
    },
    paymentContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: APP_THEME.light.secondary.first,
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    paymentColumn: {
        flex: 1,
        alignItems: "center",
        backgroundColor: APP_THEME.light.secondary.first,
    },
    paymentLabel: {
        fontSize: 16,
        fontWeight: "bold",
        color: APP_THEME.light.ternary.first,
        backgroundColor: APP_THEME.light.secondary.first,
    },
    paymentValue: {
        fontSize: 16,
        marginTop: 5,
        color: APP_THEME.light.ternary.first,
        backgroundColor: APP_THEME.light.secondary.first,
    },
    value: {
        fontWeight: "bold",
        backgroundColor: APP_THEME.light.secondary.first,
        color: APP_THEME.light.ternary.first,
    },
});

export default StudentInfoScreen;
