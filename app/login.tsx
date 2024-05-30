import AUIInputField from "@/components/common/AUIInputField";
import AUIButton from "@/components/common/AUIButton";
import AUISplitOTPInput from "@/components/common/AUISplitOTPInput";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME, BUTTON_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT } from "@/constants/Properties";
import {
  loginPageStyles,
  secondaryButtonStyle,
  splitOTPInputContainer,
} from "@/constants/Styles";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import AUIOTPInput from "@/components/common/AUIOtpInput";
import { useRouter } from "expo-router";

const LoginPage = () => {
  const router = useRouter();

  const [inputValue, setInputValue] = useState<string>("");
  const [inputError, setInputError] = useState({
    show: false,
    label: "",
  });
  const [selectedButton, setSelectedButton] = useState<string>("mobile");
  const [otp, setOtp] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [submitOtp, setSubmitOtp] = useState<string>("");

  const validateMobileNumber = (number: string): boolean => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(number);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleOnInputChange = (val: string) => {
    let isValid = true;

    setInputValue(val);

    if (selectedButton === "mobile" && !validateMobileNumber(val)) {
      setInputError({ show: true, label: GLOBAL_TEXT.validate_mobile });
      isValid = false;
    }

    if (selectedButton === "email" && !validateEmail(val)) {
      setInputError({ show: true, label: GLOBAL_TEXT.validate_email });
      isValid = false;
    }
    if (isValid) {
      setInputError({ show: false, label: "" });
    }
  };

  const handleOTPChange = (newOtp: string) => {
    setOtp(newOtp);
    console.log("Current OTP:", newOtp);
  };
  const handleSendOtp = () => {
    let isValid = true;
    if (selectedButton === "mobile" && !validateMobileNumber(inputValue)) {
      setInputError({ show: true, label: GLOBAL_TEXT.validate_mobile });
      isValid = false;
    }

    if (selectedButton === "email" && !validateEmail(inputValue)) {
      setInputError({ show: true, label: GLOBAL_TEXT.validate_email });
      isValid = false;
    }

    if (isValid) {
      setInputError({ show: false, label: "" });

      setOtpSent(true);
    }
  };

  const handleSubmitOtp = () => {};
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;

  return (
    <AUIThemedView style={loginPageStyles.container}>
      <AUIThemedText style={loginPageStyles.heading}>
        {GLOBAL_TEXT.login_to_continue}
      </AUIThemedText>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <AUIThemedView style={loginPageStyles.mobileEmailButtonContainer}>
          <AUIButton
            style={{ width: "50%" }}
            title="Mobile Number"
            onPress={() => setSelectedButton("mobile")}
            selected={selectedButton === "mobile"}
          />
          <AUIButton
            style={{ width: "50%" }}
            title="Email ID"
            onPress={() => setSelectedButton("email")}
            selected={selectedButton === "email"}
          />
        </AUIThemedView>
        {!otpSent && (
          <AUIThemedView style={loginPageStyles.sendOtpContainer}>
            <AUIInputField
              label=""
              placeholder={
                selectedButton === "mobile"
                  ? GLOBAL_TEXT.enter_mobile_number
                  : GLOBAL_TEXT.enter_email_id
              }
              value={inputValue}
              onChangeText={handleOnInputChange}
              error={inputError.label}
            />
            <View style={secondaryButtonStyle.buttonContainer}>
              <AUIButton
                title="Send OTP"
                disabled={!Boolean(inputValue) || inputError.show}
                selected={Boolean(inputValue) && !inputError.show}
                style={{ width: "50%" }}
                background={APP_THEME.primary.first}
                onPress={handleSendOtp}
              />
            </View>
          </AUIThemedView>
        )}

        {otpSent && (
          <>
            <AUIThemedView style={loginPageStyles.otpViewContainer}>
              <AUIOTPInput length={4} onChange={handleOTPChange} />
              <AUIButton
                title="Submit"
                style={{ width: "50%" }}
                disabled={!Boolean(otp)}
                selected={otp.length === 4 && otp !== ""}
                onPress={handleSubmitOtp}
                onPressIn={() => router.push({ pathname: "(student)/home" })}
              />
            </AUIThemedView>
          </>
        )}
      </KeyboardAvoidingView>
    </AUIThemedView>
  );
};

export default LoginPage;
