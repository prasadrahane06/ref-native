import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME, TEXT_THEME } from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, ScrollView, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const StudentInfoScreen = () => {
    const { student } = useLocalSearchParams();

    const studentData = typeof student === "string" ? JSON.parse(student) : student;
    console.log("studentData.user------", studentData.user);

    return (
        <ScrollView>
            <AUIThemedView style={styles.container}>
                <AUIThemedText style={styles.header}>Student Info</AUIThemedText>

                <AUIThemedView style={styles.contactContainerHeader}>
                    <AUIThemedView style={styles.userImageContainer}>
                        <AUIThemedText style={styles.userImage}></AUIThemedText>
                    </AUIThemedView>

                    <AUIThemedView style={styles.contactContainer}>
                        <AUIThemedText>{studentData.user.name}</AUIThemedText>
                        <AUIThemedText>
                            Student ID : <AUIThemedText style={styles.value}>{studentData.user._id}</AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText>
                            Contact No : <AUIThemedText style={styles.value}>{studentData.user.phone}</AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText>
                            Mail ID : <AUIThemedText style={styles.value}>{studentData.user.email}</AUIThemedText>
                        </AUIThemedText>
                    </AUIThemedView>
                </AUIThemedView>

                <AUIThemedView>
                    <AUIThemedText style={styles.titleHeader}>Personal Details</AUIThemedText>
                    <AUIThemedView style={styles.personalDetailContainer}>
                        <AUIThemedText>{studentData.user.dob}</AUIThemedText>
                        <AUIThemedText>
                            Gender: <AUIThemedText style={styles.value}>Male</AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText>
                            Address : <AUIThemedText style={styles.value}>{studentData.user.address}</AUIThemedText>
                        </AUIThemedText>
                    </AUIThemedView>
                </AUIThemedView>

                <AUIThemedView>
                    <AUIThemedText style={styles.titleHeader}>Educational Details</AUIThemedText>
                    <AUIThemedView style={styles.personalDetailContainer}>
                        <AUIThemedText>
                            qualification: <AUIThemedText style={styles.value}>{studentData.user.country}</AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText>
                            Course: <AUIThemedText style={styles.value}>Male</AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText>
                            Total Duration : <AUIThemedText style={styles.value}>{studentData.user.city}</AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText>
                            Acadamic Session: <AUIThemedText style={styles.value}>{studentData.user.city}</AUIThemedText>
                        </AUIThemedText>
                    </AUIThemedView>
                </AUIThemedView>

                <AUIThemedView>
                    <AUIThemedText style={styles.titleHeader}>Preferences</AUIThemedText>
                    <AUIThemedView style={styles.personalDetailContainer}>
                        <AUIThemedText>
                            Language: <AUIThemedText style={styles.value}>{studentData.user.language}</AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText>
                            State : <AUIThemedText style={styles.value}>{studentData.user.state}</AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText>
                            Country : <AUIThemedText style={styles.value}>{studentData.user.country}</AUIThemedText>
                        </AUIThemedText>
                        <AUIThemedText>
                            City : <AUIThemedText style={styles.value}>{studentData.user.city}</AUIThemedText>
                        </AUIThemedText>
                    </AUIThemedView>
                </AUIThemedView>
            </AUIThemedView>

            <AUIThemedView>
                <AUIThemedText style={styles.titleHeader}>Payment Details</AUIThemedText>
                <AUIThemedView style={styles.personalDetailContainer}>
                    <AUIThemedText>
                        Payment Method: <AUIThemedText style={styles.value}>Hyperpay</AUIThemedText>
                    </AUIThemedText>
                    <AUIThemedText>
                        Transition ID : <AUIThemedText style={styles.value}>{studentData.user.country}</AUIThemedText>
                    </AUIThemedText>
                </AUIThemedView>
                <AUIThemedView style={styles.paymentContainer}>
                    <AUIThemedView style={styles.paymentColumn}>
                        <AUIThemedText style={styles.paymentLabel}>Total Fees</AUIThemedText>
                        <AUIThemedText style={styles.paymentValue}>
                            {studentData.plan.price}
                        </AUIThemedText>
                    </AUIThemedView>
                    <AUIThemedView style={styles.paymentColumn}>
                        <AUIThemedText style={styles.paymentLabel}>Paid</AUIThemedText>
                        <AUIThemedText style={styles.paymentValue}>
                            {studentData.plan.paid || "0"}
                        </AUIThemedText>
                    </AUIThemedView>
                    <AUIThemedView style={styles.paymentColumn}>
                        <AUIThemedText style={styles.paymentLabel}>Pending</AUIThemedText>
                        <AUIThemedText style={styles.paymentValue}>
                            {studentData.plan.pending || "0"}
                        </AUIThemedText>
                    </AUIThemedView>
                    <AUIThemedView style={styles.paymentColumn}>
                        <AUIThemedText style={styles.paymentLabel}>Last Paid On</AUIThemedText>
                        <AUIThemedText style={styles.paymentValue}>
                            {studentData.plan.lastPaidOn
                                ? new Date(studentData.plan.lastPaidOn).toLocaleDateString()
                                : "Not Available"}
                        </AUIThemedText>
                    </AUIThemedView>
                </AUIThemedView>
            </AUIThemedView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userImage: {
        padding: 40,
        paddingHorizontal: 50,
        borderRadius: 10,
        backgroundColor: TEXT_THEME.light.secondary,
    },
    contactContainerHeader: {
        flexDirection: "row",
    },
    userImageContainer: {
        margin: 5,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop:10,
        marginBottom: 3,
        textAlign: "left",
    },
    contactContainer: {
        padding: 10,
        margin: 5,
        paddingHorizontal: 15,
        backgroundColor: APP_THEME.light.primary.first,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    personalDetailContainer: {
        backgroundColor: APP_THEME.light.primary.second,
        padding: width * 0.04,
        marginBottom: 8,
    },
    infoRow: {
        marginBottom: 15,
        marginHorizontal: 10,
    },
    infoRowMiddleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
    },
    value: {
        fontSize: 16,
    },
    paymentContainer: {
        backgroundColor: APP_THEME.light.primary.second,
        padding: width * 0.04,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    titleHeader: {
        fontSize: 18,
        fontWeight: "bold",
        paddingHorizontal: width * 0.04,
        marginBottom: 2,
        textAlign: "left",
    },
    paymentColumn: {
        flex: 1,
        alignItems: "center",
        backgroundColor: APP_THEME.light.primary.second
    },
    paymentLabel: {
        fontSize: 16,
        fontWeight: "bold",
    },
    paymentValue: {
        fontSize: 16,
        marginTop: 5,
    },
});

export default StudentInfoScreen;
