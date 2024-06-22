import DropdownComponent from "@/components/common/AUIDropdown";
import AUIImage from "@/components/common/AUIImage";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { Asset } from "expo-asset";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

export default function PurchaseScreen() {
    const plans = [
        {
            label: "Plan 1",
            value: "Plan 1",
            duration: "5 Week",
            fee: "£5 00",
            taxes: "£ 5",
            total: "£ 505",
        },
        {
            label: "Plan 2",
            value: "Plan 2",
            duration: "10 Week",
            fee: "£ 1000",
            taxes: "£ 10",
            total: "£ 1010",
        },
        {
            label: "Plan 3",
            value: "Plan 3",
            duration: "15 Week",
            fee: "£ 1500",
            taxes: "£ 15",
            total: "£ 1515",
        },
    ];

    const [selectedPlan, setSelectedPlan] = useState(plans[0]);
    const [paymentMode, setPaymentMode] = useState("");

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <AUIThemedText style={styles.header}>
                {GLOBAL_TEXT.your_selected_plan}
            </AUIThemedText>

            <AUIThemedView style={styles.planContainer}>
                <DropdownComponent
                    label=""
                    list={plans}
                    value={selectedPlan}
                    setValue={setSelectedPlan}
                    listWithIcon
                    style={{ paddingVertical: 10 }}
                />

                <AUIThemedView style={{ marginHorizontal: 15 }}>
                    <AUIThemedView style={styles.planDetails}>
                        <AUIThemedText style={styles.planDetailText}>
                            Duration
                        </AUIThemedText>
                        <AUIThemedText style={styles.planDetailValue}>
                            {selectedPlan.duration}
                        </AUIThemedText>
                    </AUIThemedView>

                    <AUIThemedView style={styles.planDetails}>
                        <AUIThemedText style={styles.planDetailText}>
                            Fee
                        </AUIThemedText>
                        <AUIThemedText style={styles.planDetailValue}>
                            {selectedPlan.fee}
                        </AUIThemedText>
                    </AUIThemedView>

                    <AUIThemedView style={styles.planDetails}>
                        <AUIThemedText style={styles.planDetailText}>
                            Taxes
                        </AUIThemedText>
                        <AUIThemedText style={styles.planDetailValue}>
                            {selectedPlan.taxes}
                        </AUIThemedText>
                    </AUIThemedView>
                </AUIThemedView>

                <AUIThemedView style={styles.separator} />

                <AUIThemedView style={{ marginHorizontal: 15 }}>
                    <AUIThemedView style={styles.planDetails}>
                        <AUIThemedText style={styles.totalText}>
                            Total
                        </AUIThemedText>
                        <AUIThemedText style={styles.totalValue}>
                            {selectedPlan.total}
                        </AUIThemedText>
                    </AUIThemedView>
                </AUIThemedView>
            </AUIThemedView>

            <AUIThemedText style={[styles.header, { marginTop: 20 }]}>
                {GLOBAL_TEXT.select_payment_mode}
            </AUIThemedText>

            <AUIThemedView style={styles.paymentModes}>
                <TouchableOpacity
                    style={[
                        styles.paymentModeButton,
                        paymentMode === "Razor pay" && styles.selectedButton,
                    ]}
                    onPress={() => setPaymentMode("Razor pay")}
                >
                    <AUIImage
                        path={
                            Asset.fromModule(
                                require("@/assets/icons/razorpay.png")
                            ).uri
                        }
                        style={{ width: 30, height: 30 }}
                    />

                    <AUIThemedText style={styles.paymentModeText}>
                        Razor pay
                    </AUIThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.paymentModeButton,
                        paymentMode === "Card payment" && styles.selectedButton,
                    ]}
                    onPress={() => setPaymentMode("Card payment")}
                >
                    <AUIImage
                        path={
                            Asset.fromModule(require("@/assets/icons/card.png"))
                                .uri
                        }
                        style={{ width: 30, height: 30 }}
                    />

                    <AUIThemedText style={styles.paymentModeText}>
                        Card payment
                    </AUIThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.paymentModeButton,
                        paymentMode === "Net Banking" && styles.selectedButton,
                    ]}
                    onPress={() => setPaymentMode("Net Banking")}
                >
                    <AUIImage
                        path={
                            Asset.fromModule(
                                require("@/assets/icons/net-banking.png")
                            ).uri
                        }
                        style={{ width: 30, height: 30 }}
                    />
                    <AUIThemedText style={styles.paymentModeText}>
                        Net Banking
                    </AUIThemedText>
                </TouchableOpacity>
            </AUIThemedView>

            <TouchableOpacity style={styles.confirmButton}>
                <AUIThemedText style={styles.confirmButtonText}>
                    {GLOBAL_TEXT.confirm_your_payment}
                </AUIThemedText>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    planContainer: {
        marginBottom: 20,
    },
    planDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5,
    },
    planDetailText: {
        fontSize: 18,
    },
    planDetailValue: {
        fontSize: 18,
    },
    totalText: {
        fontSize: 18,
        fontWeight: "bold",
        color: APP_THEME.primary.first,
    },
    totalValue: {
        fontSize: 18,
        fontWeight: "bold",
        color: APP_THEME.primary.first,
    },
    paymentModes: {
        marginVertical: 15,
    },
    paymentModeButton: {
        flexDirection: "row",
        padding: 10,
        marginBottom: 10,
        alignItems: "center",
        gap: 15,
    },
    paymentModeText: {
        fontSize: 16,
    },
    selectedButton: {
        borderColor: APP_THEME.primary.first,
        borderWidth: 1,
        borderRadius: 10,
    },
    confirmButton: {
        position: "absolute",
        backgroundColor: APP_THEME.primary.first,
        padding: 15,
        borderRadius: 10,
        bottom: "10%",
        width: "100%",
        marginHorizontal: 20,
    },
    confirmButtonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "500",
    },
    separator: {
        marginTop: 10,
        backgroundColor: APP_THEME.primary.first,
        alignItems: "center",
        justifyContent: "center",
        borderTopWidth: 1,
        borderColor: APP_THEME.primary.first,
    },
});
