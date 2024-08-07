import AUIButton from "@/components/common/AUIButton";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { ApiErrorToast, ApiSuccessToast } from "@/components/common/AUIToast";
import OTPScreen from "@/components/screenComponents/OTPScreen";
import { APP_THEME, BACKGROUND_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { storeUserData } from "@/constants/RNAsyncStore";
import { loginPageStyles, secondaryButtonStyle } from "@/constants/Styles";
import { API_URL } from "@/constants/urlProperties";
import useIsomorphicLayoutEffect from "@/customHooks/useIsomorphicLayoutEffect";
import { setResponse } from "@/redux/apiSlice";
import { setLoader, setToken, setUser } from "@/redux/globalSlice";
import { RootState } from "@/redux/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { ContactNumberField, InputField } from "./login";
import useAxios from "./services/axiosClient";

const schema = Yup.object().shape({
    input: Yup.string().when("selectedType", {
        is: "email",
        then: (schema) =>
            schema
                .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, GLOBAL_TEXT.validate_email)
                .required(GLOBAL_TEXT.validate_email),

        otherwise: (schema) =>
            schema
                .required(GLOBAL_TEXT.validate_mobile)
                .test("mobile-phoneCode-length", "Mobile number is not valid", function (value) {
                    if (value) {
                        const { phoneCode } = this.parent;
                        const onlyPhoneCode = phoneCode.split("+")[1];
                        const totalLength =
                            (value ? value.length : 0) + (onlyPhoneCode ? onlyPhoneCode.length : 0);
                        return totalLength === 12;
                    }
                }),
    }),
    phoneCode: Yup.string(),
    selectedType: Yup.string().required(),
});

export default function ChangeNumberEmail() {
    const { type } = useLocalSearchParams<{ type: any }>();
    const effect = useIsomorphicLayoutEffect();
    const navigation = useNavigation();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { post } = useAxios();

    const [otpSent, setOtpSent] = useState<boolean>(false);
    const [otp, setOtp] = useState({
        changeOtp: "",
    });

    const theme = useSelector((state: RootState) => state.global.theme);

    const { watch, control, formState, trigger } = useForm({
        resolver: yupResolver(schema),
        mode: "all",
        criteriaMode: "all",
        defaultValues: {
            input: "",
            phoneCode: "+966",
            selectedType: type,
        },
    });

    const selectedType = watch("selectedType");
    const inputValue = watch("input");
    const phoneCode = watch("phoneCode");

    effect(() => {
        navigation.setOptions({
            headerBackVisible: false,

            headerTitle: () => (
                <AUIThemedText style={[styles.screenTitle]}>
                    {type === "email" ? t("change_email") : t("change_number")}
                </AUIThemedText>
            ),
        });
    }, [type]);

    const handleOTPChange = (newOtp: string, name: string) => {
        setOtp({
            ...otp,
            [name]: newOtp,
        });
        if (newOtp.length === 4) {
            handleSubmitOtp(newOtp);
        }
    };

    const handleSubmitOtp = (newOtp: any) => {
        let code = phoneCode?.split("+")[1];
        let payload = {};

        if (selectedType === "email") {
            payload = {
                newEmail: `${inputValue}`,
                emailOtp: newOtp,
            };
        } else {
            payload = {
                newPhone: `${code}${inputValue}`,
                phoneOtp: newOtp,
            };
        }

        verifyOtp(payload);
    };

    const verifyOtp = async (payload: any) => {
        try {
            dispatch(setLoader(true));
            const res = await post(API_URL.verifyChangeDetails, payload);

            const accessToken = res?.data?.token;
            const userData = res?.data?.user;

            storeUserData("@user-data", {
                accessToken,
                ...userData,
            });

            dispatch(setToken(accessToken));
            dispatch(setUser(userData));
            dispatch(setResponse({ storeName: "userProfileData", data: userData }));

            // //@ts-ignore
            router.back();
        } catch (error: any) {
            console.log("error in verifyOtp", error);
            ApiErrorToast(error);
            dispatch(setLoader(false));
        } finally {
            dispatch(setLoader(false));
        }
    };

    const handleSendOtp = () => {
        let code = phoneCode?.split("+")[1];
        let payload =
            selectedType === "email"
                ? {
                      newEmail: inputValue,
                  }
                : {
                      newPhone: `${code}${inputValue}`,
                  };

        dispatch(setLoader(true));
        post(API_URL.changeContact, payload)
            .then((res) => {
                dispatch(setLoader(false));

                ApiSuccessToast(res.message);
                setOtpSent(true);
            })
            .catch((error) => {
                console.log("error in verifyOtp", error);
                ApiErrorToast(error);
                dispatch(setLoader(false));
            });
    };

    const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;

    return (
        <AUIThemedView style={{ flex: 1, paddingTop: 30, paddingHorizontal: 20 }}>
            <AUIThemedText style={loginPageStyles.heading}>
                {otpSent
                    ? GLOBAL_TEXT.enter_otp
                    : selectedType === "email"
                    ? t("enter_new_email")
                    : t("enter_new_number")}
            </AUIThemedText>
            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor: BACKGROUND_THEME[theme].background }}
                behavior="padding"
                keyboardVerticalOffset={keyboardVerticalOffset}
            >
                {!otpSent && (
                    <>
                        <AUIThemedView style={loginPageStyles.sendOtpContainer}>
                            {selectedType === "email" ? (
                                <InputField control={control} trigger={trigger} />
                            ) : (
                                <ContactNumberField control={control} trigger={trigger} />
                            )}
                            <View style={secondaryButtonStyle.buttonContainer}>
                                <AUIButton
                                    title="Send OTP"
                                    disabled={!formState.isValid}
                                    selected
                                    icon={"arrowright"}
                                    style={{ width: "50%" }}
                                    background={APP_THEME[theme].primary.first}
                                    onPress={() => handleSendOtp()}
                                />
                            </View>
                        </AUIThemedView>
                    </>
                )}
                {otpSent && (
                    <>
                        <AUIThemedView style={loginPageStyles.otpViewContainer}>
                            <OTPScreen
                                length={4}
                                onChange={(val: any) => handleOTPChange(val, "changeOtp")}
                                onResendOtp={() => handleSendOtp()}
                                inputValue={inputValue}
                            />
                        </AUIThemedView>
                    </>
                )}
            </KeyboardAvoidingView>
        </AUIThemedView>
    );
}

const styles = StyleSheet.create({
    screenHeader: {
        // backgroundColor: APP_THEME.primary.first,
        height: 100,
        borderBottomWidth: StyleSheet.hairlineWidth,
        // borderColor: APP_THEME.gray,
    },
    screenTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    container: {
        flex: 1,
    },
});
