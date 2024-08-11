import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Button, StyleSheet } from "react-native";
import { AUIThemedText } from "../common/AUIThemedText";
import { AUIThemedView } from "../common/AUIThemedView";

const statusStyles = StyleSheet.create({
    success: {
        borderColor: "green",
        color: "green",
    },
    pending: {
        borderColor: "gold",
        color: "gold",
    },
    cancelled: {
        borderColor: "darkorange",
        color: "darkorange",
    },
    "error-limit-exceed": {
        borderColor: "darkred",
        color: "darkred",
    },
    "error-too-many-tries": {
        borderColor: "darkred",
        color: "darkred",
    },
    error: {
        borderColor: "darkred",
        color: "darkred",
    },
    "no-data": {
        borderColor: "darkgray",
        color: "darkgray",
    },
    unknown: {
        borderColor: "darkgray",
        color: "darkgray",
    },
});

const StatusModal: React.FC<{
    visible: boolean;
    status: string;
    onClose: () => void;
    paymentDetails: any;
}> = ({ visible, status = "unknown", onClose, paymentDetails }) => {
    const { t } = useTranslation();

    const getStatusCode = (resultCode: string) => {
        switch (resultCode) {
            case "000.100.110":
                return "success";
            case "100.396.101":
                return "cancelled";
            case "000.200.000":
                return "pending";
            case "800.100.162":
                return "error-limit-exceed";
            case "800.100.161":
                return "error-too-many-tries";
            default:
                return "error";
        }
    };

    const getIconName = () => {
        switch (resultCode) {
            case "success":
                return "checkmark-circle-outline"; // Success checkmark icon
            case "pending":
                return "hourglass"; // Pending hourglass icon
            case "cancelled":
                return "close-circle"; // Cancelled cross icon
            case "error-limit-exceed":
            case "error-too-many-tries":
            case "error":
                return "alert-circle"; // Error exclamation icon
            default:
                return "help-circle"; // Unknown status icon
        }
    };

    const resultCode = getStatusCode(status);
    const statusClass = statusStyles[resultCode];
    const statusTitle = `${resultCode.charAt(0).toUpperCase() + resultCode.slice(1)} !!`;

    return (
        <AUIThemedView style={styles.modalContainerStyle}>
            <AUIThemedView
                style={[
                    styles.modalContent,
                    {
                        borderColor: statusClass.borderColor,
                        borderWidth: 2,
                        borderRadius: 10,
                    },
                ]}
            >
                <AUIThemedView style={styles.headerContainer}>
                    <Ionicons
                        name={getIconName()}
                        size={35}
                        color={statusClass.color}
                        style={styles.icon}
                    />
                    <AUIThemedText style={[styles.titleText, { color: statusClass.color }]}>
                        {statusTitle}
                    </AUIThemedText>
                </AUIThemedView>
                <AUIThemedText style={styles.modalText}>
                    {t("amount")}: {paymentDetails?.amount} {paymentDetails?.currency}
                </AUIThemedText>
                <AUIThemedText style={styles.modalText}>
                    {t("card_holder")}: {paymentDetails?.card.holder}
                </AUIThemedText>
                <AUIThemedText style={styles.modalText}>
                    {t("card_number")}: **** **** **** {paymentDetails?.card.last4Digits}
                </AUIThemedText>
                <AUIThemedText style={styles.modalText}>
                    {t("payment_brand")}: {paymentDetails?.paymentBrand}
                </AUIThemedText>
                <AUIThemedText style={styles.modalText}>
                    {t("payment_type")}: {paymentDetails?.paymentType}
                </AUIThemedText>
                <AUIThemedText style={styles.modalText}>
                    {t("result_description")}: {paymentDetails?.result.description}
                </AUIThemedText>
                <AUIThemedText style={styles.modalText}>
                    {t("timestamp")}: {paymentDetails?.timestamp}
                </AUIThemedText>
                <AUIThemedText style={styles.modalText}>
                    {t("transaction_id")}: {paymentDetails?.id}
                </AUIThemedText>
                <Button title={t("close")} onPress={onClose} color={statusClass.borderColor} />
            </AUIThemedView>
        </AUIThemedView>
    );
};

const styles = StyleSheet.create({
    modalContainerStyle: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Transparent white background
        padding: 20,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    modalContent: {
        width: "100%",
        padding: 20,
        borderRadius: 10,
        backgroundColor: "white",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        // marginBottom: 10,
        color: "black",
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
        color: "black",
    },
    headerContainer: {
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 20,
        backgroundColor: "white",
        justifyContent: "center",
    },
    icon: {
        marginRight: 10,
        padding:10
    },
    titleText:{
        fontSize: 25,
    }
});

export default StatusModal;
