import useAxios from "@/app/services/axiosClient";
import { API_URL } from "@/constants/urlProperties";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { AUIThemedView } from "../common/AUIThemedView";
import { htmlFile } from "./formHtmlConstant";
import StatusModal from "./successModal";

const AUICopyAndPay = ({ checkoutId, paymentMode }: any) => {
    const [loading, setLoading] = useState(true);
    const [htmlContent, setHtmlContent] = useState("");
    const webViewRef = useRef<WebView>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState<any>(null);
    const [resourcePath, setResourcePath] = useState<any>(null);
    const [eventMessages, setEventMessage] = useState<any>(null);

    const { get } = useAxios();

    const clearCookiesAndCache = async () => {
        if (webViewRef && webViewRef?.current) {
            webViewRef?.current?.clearCache?.(true);
        }
    };

    useEffect(() => {
        const loadHtmlFile = async () => {
            await clearCookiesAndCache();
            let paymentForm = htmlFile[paymentMode?.toLowerCase() || "cardpay"];

            if (paymentForm) {
                paymentForm = paymentForm.replace("REPLACE_WITH_CHECKOUT_ID", checkoutId);
                // paymentForm = paymentForm.replace("REPLACE_WITH_CHECKOUT_ID_WEB", checkoutId);
                setHtmlContent(paymentForm);
                setLoading(false);
            }
        };

        loadHtmlFile();
    }, [checkoutId]);

    useEffect(() => {
        const eventUrl = eventMessages?.details?.url || "";
        const resourceId = resourcePath ? getCheckoutIdFromResourcePath(resourcePath) : null;
        const eventId = eventUrl ? getCheckoutIdFromEvent(eventUrl) : null;

        if (resourceId && eventId && eventId === resourceId) {
            const debounceTimeout = setTimeout(async () => {
                setLoading(true);
                const result = await get(API_URL.paymentCheckoutStatus, {
                    id: resourceId
                });
                if (result?.data) {
                    setLoading(false);
                    setPaymentDetails(result?.data);
                    setModalVisible(true);
                }
               
            }, 300); // Adjust the debounce delay as needed

            return () => clearTimeout(debounceTimeout);
        }
    }, [eventMessages, resourcePath]);


    const handleWebViewNavigationStateChange = (newNavState: any) => {
        const { url } = newNavState;
        if (!url) return;

        if (url.includes("/payment-status?id=")) {
            const urlParams = new URLSearchParams(new URL(url).search);
            const receivedPath = urlParams.get("resourcePath");
            if(receivedPath !== resourcePath){
                setResourcePath(receivedPath);
            }
        }
    };

    const handleWebViewMessage = (event: any) => {
        if (event?.nativeEvent?.data) {
            const eventData = JSON.parse(event?.nativeEvent?.data);
            const { type } = eventData;

            if (type === "GoToHome") {
                router.replace("/(home)/(student)");
            } else {
                setEventMessage(eventData);
            }
        }
    };

    const getCheckoutIdFromResourcePath = (url: string): string | null => {
        const regex = /checkouts\/([^\/]+)\/payment/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const getCheckoutIdFromEvent = (eventMsg: any) => {

        if (!eventMsg) {
            return "";
        }

        const match = eventMsg?.match(/id=([^&]+)/);

        if (match) {
            const id = match[1];
            return id;
        }
    };


    const handleModalClose = () => {
        setModalVisible(false);
        router.replace("/(home)/(student)");
    };

    return (
        <>
            {!modalVisible && (
                <WebView
                    ref={webViewRef}
                    originWhitelist={["*"]}
                    source={{
                        html: htmlContent,
                        // uri: "https://linguistedu.com/",
                    }}
                    onLoad={() => setLoading(false)}
                    onNavigationStateChange={handleWebViewNavigationStateChange}
                    onMessage={handleWebViewMessage}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    incognito={true}
                    renderLoading={() => (
                        <AUIThemedView style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#6CEDA7" />
                        </AUIThemedView>
                    )}
                />
            )}
            {modalVisible && (
                <StatusModal
                    visible={modalVisible}
                    paymentDetails={paymentDetails}
                    status={paymentDetails?.result?.code}
                    onClose={handleModalClose}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
    },
});

export default AUICopyAndPay;
