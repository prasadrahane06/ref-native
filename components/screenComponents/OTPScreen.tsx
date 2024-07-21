import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import AUIOTPInput from "../common/AUIOtpInput";
import { AUIThemedText } from "../common/AUIThemedText";
import { AUIThemedView } from "../common/AUIThemedView";

const OTPScreen = ({
    length,
    onChange,
    onBackToInput,
    inputValue,
    onResendOtp,
    changeLabel,
    disabled,
}: any) => {
    const theme = useSelector((state: RootState) => state.global.theme);
    // const [otp, setOtp] = useState(Array(length).fill(""));
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (timer > 0) {
            const intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    const handleResendOtp = () => {
        setTimer(30);
        setCanResend(false);
        onResendOtp();
    };

    return (
        <AUIThemedView style={styles.container}>
            <AUIThemedText style={{ fontSize: 14 }}>
                Sent to: {inputValue} {"  "}
            </AUIThemedText>
            <AUIThemedText
                style={[
                    styles.changeText,
                    { color: theme === "light" ? "#007aff" : "#66CCFF" },
                    disabled && { opacity: 0.5 },
                ]}
                onPress={disabled ? () => null : onBackToInput}
            >
                {`Change ${changeLabel || ""}`}
            </AUIThemedText>
            <AUIThemedView style={styles.AUIOTPInput}>
                <AUIOTPInput length={length} onChange={onChange} disabled={disabled} />
            </AUIThemedView>

            {canResend ? (
                <TouchableOpacity onPress={handleResendOtp} style={styles.resendOtpText}>
                    <AUIThemedText style={{ fontSize: 14, color: "gray" }}>
                        Did't receive the OTP? {"  "}
                        <AUIThemedText style={[styles.resendLink, disabled && { opacity: 0.5 }]}>
                            Resend OTP
                        </AUIThemedText>
                    </AUIThemedText>
                </TouchableOpacity>
            ) : (
                <AUIThemedText style={styles.resendOtpText}>
                    {`Resend OTP in 00:${timer < 10 ? `0${timer}` : timer}`}
                </AUIThemedText>
            )}
        </AUIThemedView>
    );
};

export default OTPScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        // backgroundColor: "#ffffff",
        // alignItems: "center",
    },
    changeText: {
        // color: "blue",
        fontSize: 14,
        textDecorationLine: "underline",
    },
    resendOtpText: {
        marginTop: 15,
        fontSize: 14,
    },
    resendLink: {
        // color: "blue",
        fontSize: 14,
        textDecorationLine: "underline",
    },
    AUIOTPInput: {
        marginTop: 10,
    },
});
