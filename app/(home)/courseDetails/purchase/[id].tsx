import useAxios from "@/app/services/axiosClient";
import BlinkingText from "@/components/AUIBlinkingText";
import AUIImage from "@/components/common/AUIImage";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME, BACKGROUND_THEME } from "@/constants/Colors";
import { GLOBAL_TRANSLATION_LABEL } from "@/constants/Properties";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import { Asset } from "expo-asset";
import { router, useLocalSearchParams } from "expo-router";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

const paymentModes = [
    {
        mode: "CardPay",
        icon: require("@/assets/icons/card.png"),
        label: GLOBAL_TRANSLATION_LABEL.cardPayment,
        disable: false,
    },
    // can be enabled in future
    // {
    //     mode: "Gpay",
    //     icon: require("@/assets/icons/google-pay.png"),
    //     label: GLOBAL_TRANSLATION_LABEL.gPay,
    //     disable: true,
    // },
    {
        mode: "ApplePay",
        icon: require("@/assets/icons/apple-pay.png"),
        label: GLOBAL_TRANSLATION_LABEL.applePay,
        disable: true,
    },
];

export default function PurchaseScreen() {
    const { id } = useLocalSearchParams<{ id: any }>();
    const { requestFn } = useApiRequest();
    const { post } = useAxios();
    const [isLoading, setLoading] = useState(false);

    const newid = JSON.parse(id);

    const individualPlan = useLangTransformSelector((state: RootState) => state.api.individualPlan);
    const taxAmount = useLangTransformSelector((state: RootState) => state.api.taxAmount);
    const paymentDetialsForThisCourse = useLangTransformSelector(
        (state: RootState) => state.api.paymentIsPurchasedCourse || {}
    );
    const theme = useSelector((state: RootState) => state.global.theme);

    const [paymentMode, setPaymentMode] = useState("CardPay");
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
        requestFn(API_URL.tax , "taxAmount" )
    }, [newid.planId]);

    useEffect(() => {
        if (newid.clientId && newid?.courseId && newid?.type && newid?.planId) {
            requestFn(API_URL.paymentIsPurchasedCourse, "paymentIsPurchasedCourse", {
                plan: newid?.planId,
                type: newid?.type,
                course: newid?.courseId,
                client: newid?.clientId,
            });
        }
    }, [newid.clientId,newid?.courseId,newid?.type,newid?.planId]);

    useEffect(() => {
        console.log("paymentDetialsForThisCourse ", paymentDetialsForThisCourse);
        if (paymentDetialsForThisCourse) {

        }
    }, [paymentDetialsForThisCourse]);

   

    useEffect(() => {
        if (individualPlan && taxAmount) {
            const price = newid.type === "buy" ? individualPlan.price : individualPlan.bookYourSeat;
            console.log ("price ", price);
            console.log("taxAmount ", taxAmount[0].value);
            console.log("bookyourseat amount " , individualPlan.bookYourSeat);
            console.log("price of course is ", individualPlan.price);
            const tax = taxAmount[0].value
            ? (price * taxAmount[0].value / 100)
            : (price * 0.18);
          
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
    }, [individualPlan, paymentMode, newid.planId]);

    const handlePayment = async () => {
        setLoading(true);
        const result = await post(API_URL.paymentInitiate, {
            amount: planValue?.total,
            paymentMode: paymentMode,
            plan: newid?.planId,
            type: newid?.type,
            course: newid?.courseId,
            client: newid?.clientId,
        });
        if (result?.data?.paymentDetails?.paymentId) {
            setLoading(false);
            router.push({
                pathname: "/payment",
                params: {
                    checkoutId: result?.data?.paymentDetails?.paymentId,
                    paymentMode: paymentMode,
                },
            });
        }
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
                            {planValue.price} SAR
                        </AUIThemedText>
                    </AUIThemedView>

                    <AUIThemedView style={styles.planDetails}>
                        <AUIThemedText style={styles.planDetailText}>
                            {t(GLOBAL_TRANSLATION_LABEL.taxes)}
                        </AUIThemedText>
                        <AUIThemedText style={styles.planDetailValue}>
                            {planValue.tax.toFixed(2)} SAR
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
                            {planValue.total.toFixed(2)} SAR
                        </AUIThemedText>
                    </AUIThemedView>
                </AUIThemedView>
            </AUIThemedView>

            <AUIThemedText style={[styles.header, { marginTop: 20 }]}>
                {t(GLOBAL_TRANSLATION_LABEL.selectPaymentMode)}
            </AUIThemedText>

            <AUIThemedView style={styles.paymentModes}>
                {paymentModes.map((payment, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.paymentModeButton,
                            payment.disable && styles.disabledBtn,
                            paymentMode === payment.mode && [
                                styles.selectedButton,
                                {
                                    borderColor: APP_THEME[theme].primary.first,
                                },
                            ],
                        ]}
                        onPress={() => setPaymentMode(payment.mode)}
                        disabled={payment.disable}
                    >
                        <AUIImage
                            path={Asset.fromModule(payment.icon)}
                            style={{ width: 30, height: 30 }}
                        />
                        <AUIThemedText style={styles.paymentModeText}>
                            {t(payment.label)}
                        </AUIThemedText>
                        {payment.disable && (
                            <BlinkingText text="Coming Soon" style={styles.blinkingText} />
                        )}
                    </TouchableOpacity>
                ))}
            </AUIThemedView>
            {paymentDetialsForThisCourse && paymentDetialsForThisCourse?.isPurchased === "Yes" ? (
                <AUIThemedText style={styles.messageText}>
                    {" "}
                    Already Purchased Course !!
                </AUIThemedText>
            ) : paymentDetialsForThisCourse &&
              paymentDetialsForThisCourse?.isPurchased === "MayBe" ? (
                <AUIThemedText style={styles.messageText}>
                    {" "}
                    Your Transaction Is Pending !! Please Contact Admin For Mor details
                </AUIThemedText>
            ) : (
                <TouchableOpacity
                    style={[
                        styles.confirmButton,
                        {
                            backgroundColor: APP_THEME[theme].primary.first,
                            opacity: isLoading ? 0.5 : 1,
                        },
                    ]}
                    onPress={() => handlePayment()}
                    disabled={isLoading}
                >
                    <AUIThemedText style={styles.confirmButtonText}>
                        {t(GLOBAL_TRANSLATION_LABEL.confirmYourPayment)}
                    </AUIThemedText>
                </TouchableOpacity>
            )}
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
    disabledBtn: {
        opacity: 0.5,
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
    blinkingText: {
        fontSize: 9,
        textAlign: "right",
        width: 100,
        color: "red",
    },
    messageText: {
        fontSize: 15,
        textAlign: "center",
        // width: 100,
        paddingTop: 50,
        color: "orange",
    },
});
