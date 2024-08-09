import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { AUIThemedView } from "../common/AUIThemedView";
import { ApiSuccessToast } from "../common/AUIToast";
import { htmlFile } from "./formHtmlConstant";
import { router } from "expo-router";

const AUICopyAndPay = ({ checkoutId, paymentMode }: any) => {
    const [loading, setLoading] = useState(true);
    const [htmlContent, setHtmlContent] = useState("");
    const webViewRef = useRef<WebView>(null);

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

    const handleWebViewNavigationStateChange = (newNavState: any) => {
        const { url } = newNavState;

        if (!url) return;

        if (url.includes("your-success-url")) {
            // navigation.navigate("SuccessScreen");
        } else if (url.includes("your-failure-url")) {
            // navigation.navigate("FailureScreen");
        }
    };

    const handleWebViewMessage = (event: any) => {
        const { status } = JSON.parse(event.nativeEvent.data);
        console.log("JSON.parse(event.nativeEvent.data) ", JSON.parse(event.nativeEvent.data));
        if (status === "success") {
            ApiSuccessToast(status);
        } else if (status === "GoToHome") {
            router.replace("/(home)/(student)");
        }
    };

    useEffect(() => {
        // Trigger any necessary actions when payment is complete
    }, []);

    return (
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
                    <ActivityIndicator size="large" color="#0000ff" />
                </AUIThemedView>
            )}
        />
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
