import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME } from "@/constants/Colors";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import { useLocalSearchParams } from "expo-router";
// import { t } from "i18next";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, ScrollView, Dimensions } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Foundation from "@expo/vector-icons/Foundation";
import Entypo from "@expo/vector-icons/Entypo";
// import NotificationDrawer from "../notification/notification";

const StudentInfoScreen = () => {
    const { t } = useTranslation();
    const { id } = useLocalSearchParams();

    const { requestFn } = useApiRequest();

    const studentData = useLangTransformSelector(
        (state: RootState) => state.api.individualPurchaseCourse?.docs?.[0] || {}
    );
    // console.log("Student Data", studentData);

    useEffect(() => {
        requestFn(API_URL.purchaseCourse, "individualPurchaseCourse", { id });
    }, [id]);

    return (
        <ScrollView>
            <AUIThemedView style={styles.container}>
                <AUIThemedText style={styles.header}>Student Info</AUIThemedText>
                <AUIThemedView style={styles.contactContainerHeader}>
                    <AUIThemedView style={styles.userImageContainer}>
                        <AUIThemedText style={styles.userImage}></AUIThemedText>
                    </AUIThemedView>

                    <AUIThemedView style={styles.contactContainer}>
                        <AUIThemedText style={styles.contactText}>
                            {studentData?.user?.name}
                        </AUIThemedText>
                        <AUIThemedText style={styles.contactText}>
                            {t("student_id")}:
                            <AUIThemedText style={styles.value}>
                                {studentData?.user?.studentId}
                            </AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText style={styles.contactText}>
                            {t("contact_no")}:
                            <AUIThemedText style={styles.value}>
                                {studentData?.user?.phone}
                            </AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText
                            style={styles.contactText}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {t("mail_id")}:
                            <AUIThemedText style={styles.value}>
                                {studentData?.user?.email}
                            </AUIThemedText>
                        </AUIThemedText>
                    </AUIThemedView>
                </AUIThemedView>
                <AUIThemedView style={styles.section}>
                    <AUIThemedText style={{ fontSize: 20, fontWeight: "bold" }}>
                        {t("personal_details")}
                    </AUIThemedText>
                    <AUIThemedView style={styles.personalDetailContainer}>
                        <AUIThemedView style={styles.row}>
                            <AUIThemedView style={styles.detailRow}>
                                <FontAwesome5
                                    name="birthday-cake"
                                    size={20}
                                    color={APP_THEME.light.primary.first}
                                    style={styles.icon}
                                />
                                <AUIThemedText style={styles.value}>
                                    {new Date(studentData?.user?.dob).toLocaleDateString()}
                                </AUIThemedText>
                            </AUIThemedView>
                            {studentData?.user?.gender && (
                                <AUIThemedView style={styles.detailRow}>
                                    <Foundation
                                        name="male-female"
                                        size={20}
                                        color={APP_THEME.light.primary.first}
                                        style={styles.icon}
                                    />
                                    <AUIThemedText style={styles.value}>
                                        {studentData.user.gender}
                                    </AUIThemedText>
                                </AUIThemedView>
                            )}
                        </AUIThemedView>
                        <AUIThemedView style={styles.row}>
                            <AUIThemedView style={styles.detailRow}>
                                <Entypo
                                    name="location-pin"
                                    size={20}
                                    color={APP_THEME.light.primary.first}
                                    style={styles.icon}
                                />
                                <AUIThemedText style={styles.value}>
                                    {studentData?.user?.country}
                                </AUIThemedText>
                            </AUIThemedView>
                            <AUIThemedText style={styles.detailText}>
                                {t("state")} :
                                <AUIThemedText style={styles.value}>
                                    {studentData?.user?.state}
                                </AUIThemedText>
                            </AUIThemedText>
                        </AUIThemedView>
                    </AUIThemedView>
                </AUIThemedView>

                {/* <AUIThemedView style={styles.section}>
                    <AUIThemedText style={{ fontSize: 20, fontWeight: "bold" }}>
                        {t("personal_details")}
                    </AUIThemedText>
                    <AUIThemedView style={styles.personalDetailContainer}>
                        <AUIThemedView style={styles.detailRow}>
                            <FontAwesome5
                                name="birthday-cake"
                                size={20}
                                color={APP_THEME.light.primary.first}
                                style={styles.icon}
                            />
                            <AUIThemedText style={styles.value}>
                                {new Date(studentData?.user?.dob).toLocaleDateString()}
                            </AUIThemedText>
                        </AUIThemedView>
                        {studentData?.user?.gender && (
                            <AUIThemedView style={styles.detailRow}>
                                <Foundation
                                    name="male-female"
                                    size={20}
                                    color={APP_THEME.light.primary.first}
                                    style={styles.icon}
                                />
                                <AUIThemedText style={styles.value}>
                                    {studentData.user.gender}
                                </AUIThemedText>
                            </AUIThemedView>
                        )}
                        <AUIThemedView style={styles.detailRow}>
                            <Entypo
                                name="location-pin"
                                size={20}
                                color={APP_THEME.light.primary.first}
                                style={styles.icon}
                            />
                            <AUIThemedText style={styles.value}>
                                {studentData?.user?.country}
                            </AUIThemedText>
                        </AUIThemedView>

                        <AUIThemedText style={styles.detailText}>
                            {t("state")} :
                            <AUIThemedText style={styles.value}>
                                {studentData?.user?.state}
                            </AUIThemedText>
                        </AUIThemedText>
                    </AUIThemedView>
                </AUIThemedView> */}

                {/* <AUIThemedView style={styles.section}>
                    <AUIThemedText style={{ fontSize: 20, fontWeight: "bold" }}>
                        {t("educationaldetails")}
                    </AUIThemedText>
                    <AUIThemedView style={styles.personalDetailContainer}>
                        <AUIThemedText style={styles.detailText}>
                            {t("qualification")} :
                            <AUIThemedText style={styles.value}>
                                {studentData?.user?.qualification}
                            </AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText style={styles.detailText}>
                            {t("course")} :
                            <AUIThemedText style={styles.value}>
                                {studentData?.course?.courseName}
                            </AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText style={styles.detailText}>
                            {t("academic_session")} :
                            <AUIThemedText style={styles.value}>
                                {studentData?.user?.academicSession}
                            </AUIThemedText>
                        </AUIThemedText>
                    </AUIThemedView>
                </AUIThemedView> */}

                <AUIThemedView style={styles.section}>
                    <AUIThemedText style={{ fontSize: 20, fontWeight: "bold" }}>
                        {t("educationaldetails")}
                    </AUIThemedText>
                    <AUIThemedView style={styles.personalDetailContainer}>
                        <AUIThemedView style={styles.row}>
                            <AUIThemedText style={styles.detailText}>
                                {t("qualification")}:
                            </AUIThemedText>
                            <AUIThemedText style={styles.value}>
                                {studentData?.user?.qualification}
                            </AUIThemedText>
                        </AUIThemedView>
                        <AUIThemedView style={styles.row}>
                            <AUIThemedText style={styles.detailText}>{t("course")}:</AUIThemedText>
                            <AUIThemedText style={styles.value}>
                                {studentData?.course?.courseName}
                            </AUIThemedText>
                        </AUIThemedView>
                        <AUIThemedView style={styles.row}>
                            <AUIThemedText style={styles.detailText}>
                                {t("academic_session")}:
                            </AUIThemedText>
                            <AUIThemedText style={styles.value}>
                                {studentData?.user?.academicSession}
                            </AUIThemedText>
                        </AUIThemedView>
                    </AUIThemedView>
                </AUIThemedView>

                <AUIThemedView style={styles.section}>
                    <AUIThemedText style={{ fontSize: 20, fontWeight: "bold" }}>
                        {t("preferences")}
                    </AUIThemedText>
                    <AUIThemedView style={styles.personalDetailContainer}>
                        <AUIThemedView style={styles.row}>
                            <AUIThemedText style={styles.detailText}>
                                {t("language")}:
                            </AUIThemedText>
                            <AUIThemedText style={styles.value}>
                                {studentData?.user?.language}
                            </AUIThemedText>
                        </AUIThemedView>
                        <AUIThemedView style={styles.row}>
                            <AUIThemedText style={styles.detailText}>{t("country")}:</AUIThemedText>
                            <AUIThemedText style={styles.value}>
                                {studentData?.user?.country}
                            </AUIThemedText>
                        </AUIThemedView>
                        <AUIThemedView style={styles.row}>
                            <AUIThemedText style={styles.detailText}>{t("city")}:</AUIThemedText>
                            <AUIThemedText style={styles.value}>
                                {studentData?.user?.city}
                            </AUIThemedText>
                        </AUIThemedView>
                    </AUIThemedView>
                </AUIThemedView>

                <AUIThemedView style={styles.section}>
                    <AUIThemedText style={{ fontSize: 20, fontWeight: "bold" }}>
                        {t("payment_details")}
                    </AUIThemedText>
                    <AUIThemedView style={styles.personalDetailContainer}>
                        <AUIThemedView style={styles.row}>
                            <AUIThemedText style={styles.detailText}>
                                {t("payment_method")}:
                            </AUIThemedText>
                            <AUIThemedText style={styles.value}>{t("hyperpay")}</AUIThemedText>
                        </AUIThemedView>
                        <AUIThemedView style={styles.row}>
                            <AUIThemedText style={styles.detailText}>
                                {t("transition_id")}:
                            </AUIThemedText>
                            <AUIThemedText style={styles.value}>{t("not_available")}</AUIThemedText>
                        </AUIThemedView>
                    </AUIThemedView>

                    <AUIThemedView style={styles.paymentContainer}>
                        <AUIThemedView style={styles.paymentColumn}>
                            <AUIThemedText style={styles.paymentLabel}>
                                {t("total_fees")}
                            </AUIThemedText>
                            <AUIThemedText style={styles.paymentValue}>
                                {studentData?.plan?.price} SAR
                            </AUIThemedText>
                        </AUIThemedView>
                        <AUIThemedView style={styles.paymentColumn}>
                            <AUIThemedText style={styles.paymentLabel}>{t("paid")}</AUIThemedText>
                            <AUIThemedText style={styles.paymentValue}>
                                {studentData?.plan?.type === "buy"
                                    ? studentData?.plan?.price
                                    : studentData?.plan?.bookYourSeat}{" "}
                                SAR
                            </AUIThemedText>
                        </AUIThemedView>
                        <AUIThemedView style={styles.paymentColumn}>
                            <AUIThemedText style={styles.paymentLabel}>
                                {t("pending")}
                            </AUIThemedText>
                            <AUIThemedText style={styles.paymentValue}>
                                {studentData && studentData?.plan?.type === "buy"
                                    ? studentData?.plan?.bookYourSeat
                                    : studentData?.plan?.price -
                                      studentData?.plan?.bookYourSeat}{" "}
                                SAR
                            </AUIThemedText>
                        </AUIThemedView>
                        <AUIThemedView style={styles.paymentColumn}>
                            <AUIThemedText style={styles.paymentLabel}>
                                {t("last_paid_on")}
                            </AUIThemedText>
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
        padding: 15,
    },
    userImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        // backgroundColor:"F5F5F5",
    },
    contactContainerHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    userImageContainer: {
        marginRight: 10,
        backgroundColor: "grey",
        padding: 15,
        borderRadius: 10,
    },
    header: {
        fontSize: 25,
        fontWeight: "bold",
        // marginTop: 18,
        marginBottom: 20,
        // textAlign: "left",
        // marginLeft:8,
        // color: APP_THEME.light.ternary.first,
    },

    contactContainer: {
        padding: 10,
        // backgroundColor: APP_THEME.light.secondary.first,
        backgroundColor: APP_THEME.light.primary.third,
        borderRadius: 10,
        // flex: 1,
    },
    contactText: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: "bold",
        color: APP_THEME.light.ternary.first,
    },
    section: {
        marginBottom: 20,
    },
    personalDetailContainer: {
        // backgroundColor: APP_THEME.light.secondary.first,
        backgroundColor: APP_THEME.light.primary.third,
        padding: 15,
        borderRadius: 10,
    },
    detailText: {
        fontSize: 18,
        marginBottom: 10,
        color: APP_THEME.light.ternary.first,
        // color: APP_THEME.light.ternary.first,
        backgroundColor: APP_THEME.light.primary.third,
        marginLeft: 10,
        fontWeight: "bold",
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
        backgroundColor: APP_THEME.light.primary.third,
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    paymentColumn: {
        flex: 1,
        alignItems: "center",
        // backgroundColor: APP_THEME.light.secondary.first,
        backgroundColor: APP_THEME.light.primary.third,
    },
    paymentLabel: {
        fontSize: 16,
        fontWeight: "bold",
        color: APP_THEME.light.ternary.first,
        // backgroundColor: APP_THEME.light.secondary.first,
        backgroundColor: APP_THEME.light.primary.third,
    },
    paymentValue: {
        fontSize: 16,
        marginTop: 5,
        color: APP_THEME.light.ternary.first,
        // backgroundColor: APP_THEME.light.secondary.first,
    },
    value: {
        // fontWeight: "bold",
        backgroundColor: APP_THEME.light.primary.third,
        color: APP_THEME.light.ternary.first,
        // fontSize:12,
        // alignItems: "center",
    },

    detailRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        backgroundColor: APP_THEME.light.primary.third,
        color: APP_THEME.light.ternary.first,
        marginLeft: 10,
    },
    icon: {
        marginRight: 15,
        backgroundColor: APP_THEME.light.primary.third,
        color: APP_THEME.light.ternary.first,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
        backgroundColor: APP_THEME.light.primary.third,
        color: APP_THEME.light.ternary.first,
    },
});

export default StudentInfoScreen;
