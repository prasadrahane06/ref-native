import AUIButton from "@/components/common/AUIButton";
import DropdownComponent from "@/components/common/AUIDropdown";
import AUIInputField from "@/components/common/AUIInputField";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { ApiErrorToast } from "@/components/common/AUIToast";
import OTPScreen from "@/components/screenComponents/OTPScreen";
import { APP_THEME, BACKGROUND_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT, SIGNUP_FIELDS } from "@/constants/Properties";
import { storeUserData } from "@/constants/RNAsyncStore";
import { loginPageStyles, secondaryButtonStyle } from "@/constants/Styles";
import { countriesData } from "@/constants/dummy data/countriesData";
import { API_URL } from "@/constants/urlProperties";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { setLoader, setToken, setUser } from "@/redux/globalSlice";
import { RootState } from "@/redux/store";
import { MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import useAxios from "./services/axiosClient";

const schema = Yup.object().shape({
    input: Yup.string().when("selectedButton", {
        is: "mobile",
        then: (schema) =>
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
        otherwise: (schema) =>
            schema
                .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, GLOBAL_TEXT.validate_email)
                .required(GLOBAL_TEXT.validate_email),
    }),
    phoneCode: Yup.string(),
    selectedButton: Yup.string().required(),
});
const LoginPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const globalState = useLangTransformSelector((state: RootState) => state.global);
    const theme = useSelector((state: RootState) => state.global.theme);
    const deviceToken = useSelector((state: RootState) => state.global.deviceToken);

    const profile = globalState.profile;
    const signInType = globalState.signInType;
    const signupDetails = globalState.signupDetails;

    // const [countryData, setCountryData] = useState(countriesData);

    const { post } = useAxios();
    const [otpSent, setOtpSent] = useState<boolean>(false);
    const [otp, setOtp] = useState({
        signUpEmail: "",
        signUpPhone: "",
        login: "",
    });
    const [otpVerified, setOtpVerified] = useState({
        signUpEmail: false,
        signUpPhone: false,
        login: false,
    });
    const { watch, reset, setValue, control, formState, trigger } = useForm({
        resolver: yupResolver(schema),
        mode: "onBlur",
        criteriaMode: "all",
        defaultValues: {
            input: "",
            phoneCode: "+91",
            selectedButton: "mobile",
        },
    });
    const selectedButton = watch("selectedButton");
    const inputValue = watch("input");
    const phoneCode = watch("phoneCode");
    useEffect(() => {
        countriesData.map((x: any) => {
            x.iconUri = `https://flagcdn.com/w320/${x.code.toLowerCase()}.png`;
            return x;
        });
    }, []);
    const handleSendOtp = () => {
        let code = phoneCode?.split("+")[1];
        let payload =
            selectedButton === "mobile"
                ? {
                      phone: `${code}${inputValue}`,
                      deviceToken: deviceToken,
                  }
                : {
                      email: inputValue,
                      deviceToken: deviceToken,
                  };
        dispatch(setLoader(true));
        post(API_URL.login, payload)
            .then((res) => {
                dispatch(setLoader(false));
                setOtpSent(true);
            })
            .catch((e) => {
                dispatch(setLoader(false));
            });
    };
    const handleOTPChange = (newOtp: string, name: string) => {
        setOtp({
            ...otp,
            [name]: newOtp,
        });
        if (newOtp.length === 4) {
            if (name === "signUpEmail") {
                handleSubmitEmailOtp(newOtp);
                return;
            } else if (name === "signUpPhone") {
                handleSubmitPhoneOtp(newOtp);
                // router.push({ pathname: "/details" });
                return;
            } else {
                handleSubmitLoginOtp(newOtp);
                return;
            }
        }
    };
    const handleSubmitEmailOtp = (newOtp: any) => {
        let payload = {
            email: signupDetails?.email,
            otp: newOtp,
            verificationType: "register",
        };
        post(API_URL.verifyOTP, payload)
            .then((res) => {
                setOtpVerified({
                    ...otpVerified,
                    signUpEmail: res?.data?.emailVerified,
                });
                if (res?.data?.accessToken) {
                    storeUserData({ profile, ...res });
                    dispatch(setToken(res?.data?.accessToken));

                    if (profile === "student") {
                        router.push({ pathname: "/details" });
                    } else {
                        router.push({ pathname: "/schooldetails" });
                    }
                }
            })
            .catch((e: any) => {
                console.log("e", e.response.data);
            });
    };
    const handleSubmitPhoneOtp = (newOtp: any) => {
        let payload = {
            phone: signupDetails?.phone,
            otp: newOtp,
            verificationType: "register",
        };
        post(API_URL.verifyOTP, payload)
            .then((res) => {
                setOtpVerified({
                    ...otpVerified,
                    signUpPhone: res?.data?.phoneVerified,
                });
                if (res?.data?.accessToken) {
                    storeUserData({ profile, ...res });
                    dispatch(setToken(res?.data?.accessToken));

                    if (profile === "student") {
                        router.push({ pathname: "/details" });
                    } else {
                        router.push({ pathname: "/schooldetails" });
                    }
                }
            })
            .catch((e: any) => {
                console.log("e", e);
            });
    };
    const handleSubmitLoginOtp = (newOtp: any) => {
        let code = phoneCode?.split("+")[1];
        let payload = {};

        if (selectedButton === "mobile") {
            payload = {
                phone: `${code}${inputValue}`,
                otp: newOtp,
            };
        }
        if (selectedButton === "email") {
            payload = {
                email: `${inputValue}`,
                otp: newOtp,
            };
        }

        dispatch(setLoader(true));
        post(API_URL.verifyOTP, payload)
            .then((res) => {
                if (res.statusCode === 400) {
                    return ApiErrorToast(res.message);
                }

                dispatch(setLoader(false));
                setOtpVerified({
                    ...otpVerified,
                    login: res?.data?.accessToken,
                });
                if (res?.data?.accessToken) {
                    storeUserData({ profile, ...res });
                    dispatch(setToken(res?.data?.accessToken));
                    dispatch(setUser(res?.data?.user));
                    router.push({
                        pathname: `(home)/(${profile})`,
                    });
                }
            })
            .catch((e: any) => {
                dispatch(setLoader(false));
                console.log("e", e.response.data);
                if (e?.response?.data?.statusCode === 500) {
                }
            });
    };
    const handleBackToInput = () => {
        setOtpSent(false);
        reset({ input: inputValue, selectedButton });
    };
    const handleOnResendOtp = (val: any, name: string) => {
        let payload = {
            [name]: val,
        };
        post(API_URL.resendOTP, payload)
            .then((res) => {
                console.log("res", res);
            })
            .catch((e: any) => {
                console.log("e", e);
            });
    };
    const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
    if (signInType === "new") {
        return (
            <AUIThemedView style={loginPageStyles.container}>
                <AUIThemedText style={loginPageStyles.heading}>
                    {GLOBAL_TEXT.enter_otp}
                </AUIThemedText>
                <KeyboardAvoidingView
                    style={{ flex: 1, backgroundColor: BACKGROUND_THEME[theme].background }}
                    behavior="padding"
                    keyboardVerticalOffset={keyboardVerticalOffset}
                >
                    <AUIThemedView style={loginPageStyles.otpViewContainer}>
                        <OTPScreen
                            length={4}
                            changeLabel={"email"}
                            onChange={(val: any) => handleOTPChange(val, "signUpEmail")}
                            onBackToInput={handleBackToInput}
                            onResendOtp={() => handleOnResendOtp(signupDetails?.email, "email")}
                            disabled={otpVerified.signUpEmail}
                            inputValue={signupDetails?.email}
                        />
                        {otpVerified.signUpEmail && <OTPVerified label={"Email verified"} />}
                        {/* )} */}
                    </AUIThemedView>
                    <AUIThemedView style={[loginPageStyles.otpViewContainer, { marginTop: 50 }]}>
                        <OTPScreen
                            changeLabel={"mobile number"}
                            length={4}
                            onChange={(val: any) => handleOTPChange(val, "signUpPhone")}
                            onBackToInput={handleBackToInput}
                            onResendOtp={() => handleOnResendOtp(signupDetails?.phone, "phone")}
                            disabled={otpVerified.signUpPhone}
                            inputValue={signupDetails?.phone}
                        />
                        {otpVerified.signUpPhone && (
                            <OTPVerified label={"Mobile number verified"} />
                        )}
                    </AUIThemedView>
                </KeyboardAvoidingView>
            </AUIThemedView>
        );
    }
    const dismissKeyboard = () => {
        Keyboard.dismiss();
        trigger("input");
    };
    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <AUIThemedView style={loginPageStyles.container}>
                <AUIThemedText style={loginPageStyles.heading}>
                    {otpSent ? GLOBAL_TEXT.enter_otp : GLOBAL_TEXT.login_to_continue}
                </AUIThemedText>
                <KeyboardAvoidingView
                    style={{ flex: 1, backgroundColor: BACKGROUND_THEME[theme].background }}
                    behavior="padding"
                    keyboardVerticalOffset={keyboardVerticalOffset}
                >
                    {!otpSent && (
                        <>
                            <AUIThemedView style={loginPageStyles.mobileEmailButtonContainer}>
                                <Pressable
                                    style={[
                                        buttonStyle.container,
                                        selectedButton === "mobile" && buttonStyle.selected,
                                    ]}
                                    onPress={() => {
                                        setValue("selectedButton", "mobile");
                                        reset({
                                            input: "",
                                            phoneCode: "+91",
                                            selectedButton: "mobile",
                                        });
                                    }}
                                >
                                    <View style={[buttonStyle.buttonInner]}>
                                        <AUIThemedText style={[buttonStyle.buttonText]}>
                                            Mobile Number
                                        </AUIThemedText>
                                    </View>
                                </Pressable>

                                <Pressable
                                    style={[
                                        buttonStyle.container,
                                        selectedButton === "email" && buttonStyle.selected,
                                    ]}
                                    onPress={() => {
                                        setValue("selectedButton", "email");
                                        reset({
                                            input: "",
                                            selectedButton: "email",
                                        });
                                    }}
                                >
                                    <View style={[buttonStyle.buttonInner]}>
                                        <AUIThemedText style={[buttonStyle.buttonText]}>
                                            Email ID
                                        </AUIThemedText>
                                    </View>
                                </Pressable>
                            </AUIThemedView>

                            <AUIThemedView style={loginPageStyles.sendOtpContainer}>
                                {selectedButton === "mobile" ? (
                                    <ContactNumberField control={control} trigger={trigger} />
                                ) : (
                                    <InputField control={control} trigger={trigger} />
                                )}
                                <View style={secondaryButtonStyle.buttonContainer}>
                                    <AUIButton
                                        title="Send OTP"
                                        disabled={!formState.isValid}
                                        selected
                                        icon={"arrowright"}
                                        style={{ width: "50%" }}
                                        background={APP_THEME[theme].primary.first}
                                        onPress={handleSendOtp}
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
                                    onChange={(val: any) => handleOTPChange(val, "login")}
                                    onBackToInput={handleBackToInput}
                                    onResendOtp={() => handleOnResendOtp(inputValue, "phone")}
                                    disabled={otpVerified.login}
                                    inputValue={inputValue}
                                />
                                {otpVerified.login && <OTPVerified label={"OTP verified"} />}
                            </AUIThemedView>
                        </>
                    )}
                </KeyboardAvoidingView>
            </AUIThemedView>
        </TouchableWithoutFeedback>
    );
};
const OTPVerified = ({ label }: any) => (
    <AUIThemedView style={{ flexDirection: "row", gap: 10 }}>
        <AUIThemedText style={{ fontSize: 14, fontWeight: "bold" }}>{label}</AUIThemedText>
        <MaterialIcons name="verified-user" size={24} color="green" />
    </AUIThemedView>
);
const ContactNumberField = ({ label, control }: any) => {
    const theme = useSelector((state: RootState) => state.global.theme);

    return (
        <AUIThemedView style={{ backgroundColor: "#ffffff" }}>
            {label && (
                <AUIThemedText
                    style={{
                        marginBottom: 5,
                        fontSize: 16,
                        fontWeight: "semibold",
                        letterSpacing: -0.32,
                        color: APP_THEME[theme].gray,
                    }}
                >
                    {label}
                </AUIThemedText>
            )}
            <AUIThemedView
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 10,
                }}
            >
                <Controller
                    name="phoneCode"
                    control={control}
                    render={({ field: { onChange, value } }) => {
                        return (
                            <DropdownComponent
                                style={{ flex: 0.8 }}
                                // @ts-ignore
                                list={countriesData}
                                // @ts-ignore
                                value={value}
                                setValue={({ dialling_code }: { dialling_code: string }) =>
                                    onChange(dialling_code)
                                }
                                labelField="dialling_code"
                                valueField="dialling_code"
                                listWithIcon
                                renderLeftIcon
                            />
                        );
                    }}
                />
                <Controller
                    name="input"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => {
                        return (
                            <AUIInputField
                                style={{ flex: 2 }}
                                value={value}
                                onChangeText={onChange}
                                placeholder={SIGNUP_FIELDS.phone.placeholder}
                                keyboardType="numeric"
                                autoFocus={true}
                            />
                        );
                    }}
                />
            </AUIThemedView>
            <Controller
                name="input"
                control={control}
                render={({ fieldState: { error } }) => {
                    return (
                        <AUIThemedText
                            style={{
                                position: "absolute",
                                color: "red",
                                fontSize: 14,
                                marginTop: 52,
                            }}
                        >
                            {error?.message || ""}
                        </AUIThemedText>
                    );
                }}
            />
        </AUIThemedView>
    );
};
const InputField = ({ control }: any) => (
    <Controller
        name="input"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
                <>
                    <AUIInputField
                        value={value}
                        onChangeText={onChange}
                        placeholder={SIGNUP_FIELDS.email.placeholder}
                        autoFocus={true}
                    />
                    {error && (
                        <AUIThemedText
                            style={{
                                position: "absolute",
                                color: "red",
                                fontSize: 14,
                                marginTop: 52,
                            }}
                        >
                            {error.message}
                        </AUIThemedText>
                    )}
                </>
            );
        }}
    />
);
export default LoginPage;

const buttonStyle = StyleSheet.create({
    selected: {
        backgroundColor: APP_THEME.light.primary.first,
    },
    container: { width: "50%", height: 40, borderRadius: 5 },
    button: {
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    buttonInner: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        borderRadius: 5,
        height: 40,
        paddingHorizontal: 10,
        borderWidth: 1,
        // borderColor: APP_THEME.light.primary.first,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
    },
});
