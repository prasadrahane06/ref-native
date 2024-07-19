import AUIButton from "@/components/common/AUIButton";
import DropdownComponent from "@/components/common/AUIDropdown";
import AUIInputField from "@/components/common/AUIInputField";
import { AUISafeAreaView } from "@/components/common/AUISafeAreaView";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { ApiErrorToast, ApiSuccessToast, FormValidateToast } from "@/components/common/AUIToast";
import { APP_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT, SIGNUP_FIELDS } from "@/constants/Properties";
import { countriesData } from "@/constants/dummy data/countriesData";
import { API_URL } from "@/constants/urlProperties";
import { setLoader, setSignInType, setSignupDetails } from "@/redux/globalSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "./services/axiosClient";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
const SignupPage = () => {
    const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
    const router = useRouter();
    const dispatch = useDispatch();
    const profile = useLangTransformSelector((state: RootState) => state.global.profile);
    const { post } = useAxios();
    const [errors, setErrors] = useState<any>({});
    const [signupValues, setSignupValues] = useState<any>({
        name: "",
        email: "",
        phone: "",
        phoneCode: "+91",
    });
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const emailInputRef = useRef(null);
    const phoneInputRef = useRef(null);
    useEffect(() => {
        const isValid =
            Object.values(signupValues).every((x) => x) && Object.keys(errors).length === 0;
        setIsButtonEnabled(isValid);
    }, [signupValues, errors]);
    const handleOnSave = () => {
        const { name, email, phone, phoneCode } = signupValues;
        // @ts-ignore
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupValues.email)) {
            setErrors({
                ...errors,
                email: GLOBAL_TEXT.validate_email,
            });
            FormValidateToast().email;
            return;
        }
        // @ts-ignore
        if (!/^[0-9]{10}$/.test(signupValues.phone)) {
            setErrors({
                ...errors,
                phone: GLOBAL_TEXT.validate_mobile,
            });
            FormValidateToast().phone;
            return;
        }
        setErrors({});
        let code = phoneCode.split("+")[1];
        let payload = {
            name,
            email,
            phone: `${code}${phone}`,
            registerType: profile,
        };
        dispatch(setSignupDetails(payload));
        dispatch(setLoader(true));
        post(API_URL.register, payload)
            .then((res) => {
                dispatch(setLoader(false));
                const { data, message } = res;
                ApiSuccessToast(message);
                if (
                    Object.keys(data).includes("emailSent") &&
                    Object.keys(data).includes("smsSent")
                ) {
                    router.navigate("/login");
                }
            })
            .catch((e) => {
                dispatch(setLoader(false));
                ApiErrorToast(e.response?.data?.message);
            });
    };
    const handleOnChange = (val: any, item: string) => {
        setSignupValues({
            ...signupValues,
            [item]: val,
        });
    };
    const validateField = (val: any, item: string) => {
        // @ts-ignore
        if (item === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
            setErrors({
                ...errors,
                email: GLOBAL_TEXT.validate_email,
            });
            return;
        }
        // @ts-ignore
        if (item === "phone" && !/^[0-9]{10}$/.test(val)) {
            setErrors({
                ...errors,
                phone: GLOBAL_TEXT.validate_mobile,
            });
            return;
        }
        setErrors({});
    };
    const handleDropdownChange = (val: any) => {
        setSignupValues({
            ...signupValues,
            phoneCode: val?.dialling_code,
        });
    };
    const navigateToLogin = () => {
        dispatch(setSignInType("exist"));
        router.navigate("/login");
    };
    const handleTouchOutside = () => {
        Keyboard.dismiss();
        validateField(signupValues.email, "email");
        validateField(signupValues.phone, "phone");
    };
    return (
        <TouchableWithoutFeedback onPress={handleTouchOutside}>
            <AUISafeAreaView edges={["bottom"]}>
                <AUIThemedView style={signupPageStyles.container}>
                    <AUIThemedText style={signupPageStyles.heading}>
                        {GLOBAL_TEXT.tell_about_yourself}
                    </AUIThemedText>
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior="padding"
                        keyboardVerticalOffset={keyboardVerticalOffset}
                    >
                        <AUIThemedView style={signupPageStyles.formLayout}>
                            <AUIThemedView style={signupPageStyles.fieldContainer}>
                                {Object.keys(SIGNUP_FIELDS).map((item, i) => (
                                    <AUIThemedView key={i}>
                                        {item === "phone" ? (
                                            <ContactNumberField
                                                label={SIGNUP_FIELDS[item].label}
                                                placeholder={SIGNUP_FIELDS[item].placeholder}
                                                value={signupValues[item]}
                                                dropdownValue={signupValues.phoneCode}
                                                handleDropdownChange={handleDropdownChange}
                                                handleOnChange={(val: any) =>
                                                    handleOnChange(val, item)
                                                }
                                                error={
                                                    // @ts-ignore
                                                    Object.keys(errors).length > 0
                                                        ? errors[item]
                                                        : ""
                                                }
                                                onBlur={() =>
                                                    validateField(signupValues[item], item)
                                                }
                                            />
                                        ) : (
                                            <View
                                                ref={
                                                    item === "email" ? emailInputRef : phoneInputRef
                                                }
                                            >
                                                <AUIInputField
                                                    // @ts-ignore
                                                    label={SIGNUP_FIELDS[item].label}
                                                    // @ts-ignore
                                                    placeholder={SIGNUP_FIELDS[item].placeholder}
                                                    // @ts-ignore
                                                    value={signupValues[item]}
                                                    onChangeText={(val: any) =>
                                                        handleOnChange(val, item)
                                                    }
                                                    error={
                                                        // @ts-ignore
                                                        Object.keys(errors).length > 0
                                                            ? errors[item]
                                                            : ""
                                                    }
                                                    onBlur={() =>
                                                        validateField(signupValues[item], item)
                                                    }
                                                />
                                            </View>
                                        )}
                                    </AUIThemedView>
                                ))}
                            </AUIThemedView>
                            <AUIThemedView style={signupPageStyles.section}>
                                <AUIButton
                                    title={GLOBAL_TEXT.continue_n_verify}
                                    disabled={!isButtonEnabled}
                                    selected
                                    icon={"arrowright"}
                                    onPress={handleOnSave}
                                />
                            </AUIThemedView>
                            <AUIThemedView
                                style={[signupPageStyles.section, signupPageStyles.signInLink]}
                            >
                                <AUIThemedText>Already have an account?</AUIThemedText>
                                <AUIThemedText
                                    onPress={navigateToLogin}
                                    style={signupPageStyles.link}
                                >
                                    Sign in
                                </AUIThemedText>
                            </AUIThemedView>
                        </AUIThemedView>
                    </KeyboardAvoidingView>
                </AUIThemedView>
            </AUISafeAreaView>
        </TouchableWithoutFeedback>
    );
};
const ContactNumberField = ({
    label,
    value,
    handleOnChange,
    error,
    dropdownValue,
    handleDropdownChange,
    placeholder,
    onBlur,
}: any) => {
    const theme = useSelector((state: RootState) => state.global.theme);

    return (
        <AUIThemedView>
            <AUIThemedText
                style={{
                    marginBottom: 5,
                    fontSize: 16,
                    fontWeight: "semibold",
                    letterSpacing: -0.32,
                }}
            >
                {label}
            </AUIThemedText>
            <AUIThemedView
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 10,
                }}
            >
                <DropdownComponent
                    style={{ flex: 1 }}
                    // @ts-ignore
                    list={countriesData}
                    // @ts-ignore
                    value={dropdownValue}
                    setValue={handleDropdownChange}
                    labelField="dialling_code"
                    valueField="dialling_code"
                    listWithIcon
                    renderLeftIcon
                />
                <AUIInputField
                    style={{ flex: 2 }}
                    // @ts-ignore
                    placeholder={placeholder}
                    value={value}
                    onChangeText={handleOnChange}
                    keyboardType="numeric"
                    onBlur={onBlur}
                />
            </AUIThemedView>
            {error && (
                <AUIThemedText
                    style={{ position: "absolute", color: "red", fontSize: 14, marginTop: 78 }}
                >
                    {error}
                </AUIThemedText>
            )}
        </AUIThemedView>
    );
};

const signupPageStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        position: "relative",
        // backgroundColor: "#ffffff",
    },
    heading: {
        fontSize: 30,
        // marginTop: 40,
        paddingTop: 20,
        fontWeight: "bold",
        // color: APP_THEME.light.gray,
    },
    formLayout: {
        gap: 10,
        marginTop: 20,
        flex: 1,
        // backgroundColor: "#ffffff",

        // justifyContent: "space-between",
    },
    fieldContainer: {
        gap: 15,
        // backgroundColor: "#ffffff",
    },
    buttonContainer: {
        width: "100%",
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 5,
    },
    section: {
        marginTop: 30,
    },
    signInLink: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        // backgroundColor: "#ffffff",
    },
    link: {
        color: "blue",
        textDecorationLine: "underline",
    },
});

export default SignupPage;
