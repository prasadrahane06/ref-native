import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { useLocalSearchParams } from "expo-router";
import { t } from "i18next";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Asset } from "expo-asset";
import { RootState } from "@/redux/store";
import useApiRequest from "@/customHooks/useApiRequest";
import { API_URL } from "@/constants/urlProperties";
import { APP_THEME, BACKGROUND_THEME } from "@/constants/Colors";
import { GLOBAL_TRANSLATION_LABEL } from "@/constants/Properties";
import AUIImage from "@/components/common/AUIImage";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import useAxios from "@/app/services/axiosClient";
import { ApiErrorToast, ApiSuccessToast } from "@/components/common/AUIToast";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";

type RouteParams = {
    courseDetailsPurchase: {
        courseId: string;
        planId: string;
    };
};

export default function PurchaseScreen() {
    const { id } = useLocalSearchParams<{ id: any }>();
    const { requestFn } = useApiRequest();
    const { post } = useAxios();

    const newid = JSON.parse(id);

    const individualPlan = useLangTransformSelector((state: RootState) => state.api.individualPlan);
    const theme = useSelector((state: RootState) => state.global.theme);

    const [paymentMode, setPaymentMode] = useState("");
    const [planValue, setPlanValue] = useState({
        planId: newid.planId,
        price: newid.type === "buy" ? individualPlan?.price : individualPlan?.bookYourSeat,
        paymentMode: paymentMode,
        duration: individualPlan?.duration,
        tax: 0,
        total: 0,
    });

    useEffect(() => {
        requestFn(API_URL.plan, "individualPlan", { id: newid.planId });
    }, []);

    useEffect(() => {
        if (individualPlan) {
            const price = newid.type === "buy" ? individualPlan.price : individualPlan.bookYourSeat;
            const tax = price * 0.18;
            const total = price + tax;

            setPlanValue({
                planId: newid.planId,
                price: price,
                paymentMode: paymentMode,
                duration: individualPlan.duration,
                tax: tax,
                total: total,
            });
        }
    }, [individualPlan, paymentMode]);

    const handlePayment = () => {
        post(API_URL.purchaseCourse, {
            course: newid.courseId,
            type: newid.type,
            plan: newid.planId,
        })
            .then((res: any) => {
                ApiSuccessToast(res.message);
            })
            .catch((e: any) => {
                ApiErrorToast(e.response?.data?.message);
                console.log(e);
            });
    };

    return (
        <ScrollView
            contentContainerStyle={[
                styles.container,
                { backgroundColor: BACKGROUND_THEME[theme].background },
            ]}
        >
            <AUIThemedText style={styles.header}>
                {t(GLOBAL_TRANSLATION_LABEL.yourSelectedPlanIs)} {individualPlan?.name}
            </AUIThemedText>

            <AUIThemedView style={styles.planContainer}>
                <AUIThemedView style={{ marginHorizontal: 15 }}>
                    <AUIThemedView style={styles.planDetails}>
                        <AUIThemedText style={styles.planDetailText}>
                            {t(GLOBAL_TRANSLATION_LABEL.duration)}
                        </AUIThemedText>
                        <AUIThemedText style={styles.planDetailValue}>
                            {planValue.duration}
                        </AUIThemedText>
                    </AUIThemedView>

                    <AUIThemedView style={styles.planDetails}>
                        <AUIThemedText style={styles.planDetailText}>
                            {newid.type === "buy"
                                ? t(GLOBAL_TRANSLATION_LABEL.fee)
                                : t(GLOBAL_TRANSLATION_LABEL.bookYourSeat)}
                        </AUIThemedText>
                        <AUIThemedText style={styles.planDetailValue}>
                            ${planValue.price}
                        </AUIThemedText>
                    </AUIThemedView>

                    <AUIThemedView style={styles.planDetails}>
                        <AUIThemedText style={styles.planDetailText}>
                            {t(GLOBAL_TRANSLATION_LABEL.taxes)}
                        </AUIThemedText>
                        <AUIThemedText style={styles.planDetailValue}>
                            ${planValue.tax.toFixed(2)}
                        </AUIThemedText>
                    </AUIThemedView>
                </AUIThemedView>

                <AUIThemedView
                    style={[
                        styles.separator,
                        {
                            borderColor: APP_THEME[theme].primary.first,
                        },
                    ]}
                />

                <AUIThemedView style={{ marginHorizontal: 15 }}>
                    <AUIThemedView style={styles.planDetails}>
                        <AUIThemedText style={styles.totalText}>
                            {t(GLOBAL_TRANSLATION_LABEL.total)}
                        </AUIThemedText>
                        <AUIThemedText style={styles.totalValue}>
                            ${planValue.total.toFixed(2)}
                        </AUIThemedText>
                    </AUIThemedView>
                </AUIThemedView>
            </AUIThemedView>

            <AUIThemedText style={[styles.header, { marginTop: 20 }]}>
                {t(GLOBAL_TRANSLATION_LABEL.selectPaymentMode)}
            </AUIThemedText>

            <AUIThemedView style={styles.paymentModes}>
                <TouchableOpacity
                    style={[
                        styles.paymentModeButton,
                        paymentMode === "Razor pay" && [
                            styles.selectedButton,
                            {
                                borderColor: APP_THEME[theme].primary.first,
                            },
                        ],
                    ]}
                    onPress={() => setPaymentMode("Razor pay")}
                >
                    <AUIImage
                        path={Asset.fromModule(require("@/assets/icons/razorpay.png")).uri}
                        style={{ width: 30, height: 30 }}
                    />

                    <AUIThemedText style={styles.paymentModeText}>
                        {t(GLOBAL_TRANSLATION_LABEL.hyperPay)}
                    </AUIThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.paymentModeButton,
                        paymentMode === "Card payment" && [
                            styles.selectedButton,
                            {
                                borderColor: APP_THEME[theme].primary.first,
                            },
                        ],
                    ]}
                    onPress={() => setPaymentMode("Card payment")}
                >
                    <AUIImage
                        path={Asset.fromModule(require("@/assets/icons/card.png")).uri}
                        style={{ width: 30, height: 30 }}
                    />

                    <AUIThemedText style={styles.paymentModeText}>
                        {t(GLOBAL_TRANSLATION_LABEL.cardPayment)}
                    </AUIThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.paymentModeButton,
                        paymentMode === "Net Banking" && [
                            styles.selectedButton,
                            {
                                borderColor: APP_THEME[theme].primary.first,
                            },
                        ],
                    ]}
                    onPress={() => setPaymentMode("Net Banking")}
                >
                    <AUIImage
                        path={Asset.fromModule(require("@/assets/icons/net-banking.png")).uri}
                        style={{ width: 30, height: 30 }}
                    />
                    <AUIThemedText style={styles.paymentModeText}>
                        {t(GLOBAL_TRANSLATION_LABEL.netBanking)}
                    </AUIThemedText>
                </TouchableOpacity>
            </AUIThemedView>

            <TouchableOpacity
                style={[styles.confirmButton, { backgroundColor: APP_THEME[theme].primary.first }]}
                onPress={() => handlePayment()}
            >
                <AUIThemedText style={styles.confirmButtonText}>
                    {t(GLOBAL_TRANSLATION_LABEL.confirmYourPayment)}
                </AUIThemedText>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        // backgroundColor: "#fff",
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
        // color: APP_THEME.primary.first,
    },
    totalValue: {
        fontSize: 18,
        fontWeight: "bold",
        // color: APP_THEME.primary.first,
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
        // borderColor: APP_THEME.primary.first,
        borderWidth: 1,
        borderRadius: 10,
    },
    confirmButton: {
        position: "absolute",
        // backgroundColor: APP_THEME.primary.first,
        padding: 15,
        borderRadius: 10,
        bottom: "10%",
        width: "100%",
        marginHorizontal: 20,
    },
    confirmButtonText: {
        // color: "#fff",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "500",
    },
    separator: {
        marginTop: 10,
        // backgroundColor: APP_THEME.primary.first,
        alignItems: "center",
        justifyContent: "center",
        borderTopWidth: 1,
        // borderColor: APP_THEME.primary.first,
    },
});
