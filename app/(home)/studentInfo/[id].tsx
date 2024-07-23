import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME } from "@/constants/Colors";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, ScrollView, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

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
                <AUIThemedText>Student Information</AUIThemedText>
                <AUIThemedView style={styles.contactContainerHeader}>
                    {/* <AUIThemedView style={styles.userImageContainer}>
                        <AUIThemedText style={styles.userImage}></AUIThemedText>
                    </AUIThemedView> */}

                    <AUIThemedView style={styles.contactContainer}>
                        <AUIThemedText style={styles.contactText}>{studentData?.user?.name}</AUIThemedText>
                        <AUIThemedText style={styles.contactText}>
                            Student ID: <AUIThemedText style={styles.value}>{studentData?.user?._id}</AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText style={styles.contactText}>
                            Contact No: <AUIThemedText style={styles.value}>{studentData?.user?.phone}</AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText style={styles.contactText}>
                            Mail ID: <AUIThemedText style={styles.value}>{studentData?.user?.email}</AUIThemedText>
                        </AUIThemedText>
                    </AUIThemedView>
                </AUIThemedView>

                <AUIThemedView style={styles.section}>
                    <AUIThemedText>Personal Details</AUIThemedText>
                    <AUIThemedView style={styles.personalDetailContainer}>
                        <AUIThemedText style={styles.detailText}>
                            Date of Birth: <AUIThemedText style={styles.value}>{new Date(studentData?.user?.dob).toLocaleDateString()}</AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText style={styles.detailText}>
                            Academic Session: <AUIThemedText style={styles.value}>{studentData?.user?.academicSession}</AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText style={styles.detailText}>
                            Qualification: <AUIThemedText style={styles.value}>{studentData?.user?.qualification}</AUIThemedText>
                        </AUIThemedText>
                    </AUIThemedView>
                </AUIThemedView>

                <AUIThemedView style={styles.section}>
                    <AUIThemedText >Preferences</AUIThemedText>
                    <AUIThemedView style={styles.personalDetailContainer}>
                        <AUIThemedText style={styles.detailText}>
                            Language: <AUIThemedText style={styles.value}>{studentData?.user?.language}</AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText style={styles.detailText}>
                            State: <AUIThemedText style={styles.value}>{studentData?.user?.state}</AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText style={styles.detailText}>
                            Country: <AUIThemedText style={styles.value}>{studentData?.user?.country}</AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText style={styles.detailText}>
                            City: <AUIThemedText style={styles.value}>{studentData?.user?.city}</AUIThemedText>
                        </AUIThemedText>
                    </AUIThemedView>
                </AUIThemedView>
                <AUIThemedView style={styles.section}>
                    <AUIThemedText >Course Information </AUIThemedText>
                    <AUIThemedView style={styles.personalDetailContainer}>
                        <AUIThemedText style={styles.detailText}>
                            course Name : <AUIThemedText style={styles.value}>{studentData?.course?.courseName}</AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText style={styles.detailText}>
                            Language : <AUIThemedText style={styles.value}>{studentData?.course?.language}</AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText style={styles.detailText}>
                            StartDate: <AUIThemedText style={styles.value}>{studentData?.course?.startDate}</AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText style={styles.detailText}>
                            EndDate: <AUIThemedText style={styles.value}>{studentData?.course?.endDate}</AUIThemedText>
                        </AUIThemedText>
                    </AUIThemedView>
                </AUIThemedView>

                <AUIThemedView style={styles.section}>
                    <AUIThemedText >Payment Details</AUIThemedText>
                    <AUIThemedView style={styles.personalDetailContainer}>
                        <AUIThemedText style={styles.detailText}>
                            Payment Method: <AUIThemedText style={styles.value}>Hyperpay</AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText style={styles.detailText}>
                            Transition ID: <AUIThemedText style={styles.value}>Not Available</AUIThemedText>
                        </AUIThemedText>
                    </AUIThemedView>
                    <AUIThemedView style={styles.paymentContainer}>
                        <AUIThemedView style={styles.paymentColumn}>
                            <AUIThemedText style={styles.paymentLabel}>Total Fees</AUIThemedText>
                            <AUIThemedText style={styles.paymentValue}>
                                {studentData?.plan?.price}
                            </AUIThemedText>
                        </AUIThemedView>
                        <AUIThemedView style={styles.paymentColumn}>
                            <AUIThemedText style={styles.paymentLabel}>Paid</AUIThemedText>
                            <AUIThemedText style={styles.paymentValue}>
                                {studentData?.plan?.type === "buy" ? studentData?.plan?.price : studentData?.plan?.bookYourSeat}
                            </AUIThemedText>
                        </AUIThemedView>
                        <AUIThemedView style={styles.paymentColumn}>
                            <AUIThemedText style={styles.paymentLabel}>Pending</AUIThemedText>
                            <AUIThemedText style={styles.paymentValue}>
                                {
                                    studentData && studentData?.plan?.type === "buy" ?  studentData?.plan?.bookYourSeat :  studentData?.plan?.price - studentData?.plan?.bookYourSeat

                                }
                            </AUIThemedText>
                        </AUIThemedView>
                        <AUIThemedView style={styles.paymentColumn}>
                            <AUIThemedText style={styles.paymentLabel}>Last Paid On</AUIThemedText>
                            <AUIThemedText style={styles.paymentValue}>
                                {studentData?.plan?.lastPaidOn
                                    ? new Date(studentData?.plan?.lastPaidOn).toLocaleDateString()
                                    : "Not Available"}
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
        backgroundColor: APP_THEME.light.background,
    },
    userImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: APP_THEME.light.primary.third,
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
        marginTop : 10,
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
    },
});

export default StudentInfoScreen;
