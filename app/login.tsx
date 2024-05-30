import AUIInputField from "@/components/common/AUIInputField";
import AUIPrimaryButton from "@/components/common/AUIPrimaryButton";
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

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [mobileNumberError, setmobileNumberError] = useState<string>("");
  const [selectedButton, setSelectedButton] = useState<string>("mobile");
  const [otp, setOtp] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [submitOtp, setSubmitOtp] = useState<string>("");

  const handleOTPChange = (newOtp: string) => {
    setOtp(newOtp);
    console.log("Current OTP:", newOtp);
  };

  const validateMobileNumber = (number: string): boolean => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(number);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendOtp = () => {
    let isValid = true;

    if (selectedButton === "mobile") {
      if (!mobileNumber) {
        setmobileNumberError("Mobile number is required");
        isValid = false;
      } else if (!validateMobileNumber(mobileNumber)) {
        setmobileNumberError("Invalid mobile number");
        isValid = false;
      } else {
        setmobileNumberError("");
      }
    }

    if (selectedButton === "email") {
      if (!email) {
        setEmailError("Email ID is required");
        isValid = false;
      } else if (!validateEmail(email)) {
        setEmailError("Invalid email ID");
        isValid = false;
      } else {
        setEmailError("");
      }
    }

    if (isValid) {
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
        <AUIThemedView>
          <View style={loginPageStyles.mobileEmailButtonContainer}>
            <AUIPrimaryButton
              title="Mobile Number"
              onPress={() => setSelectedButton("mobile")}
              selected={selectedButton === "mobile"}
            />
            <AUIPrimaryButton
              title="Email ID"
              onPress={() => setSelectedButton("email")}
              selected={selectedButton === "email"}
            />
          </View>
          {!otpSent && (
            <>
              {selectedButton === "mobile" && (
                <AUIInputField
                  label=""
                  placeholder="Enter your Mobile Number"
                  value={mobileNumber}
                  onChangeText={setMobileNumber}
                  error={mobileNumberError}
                  secureTextEntry
                />
              )}

              {selectedButton === "email" && (
                <AUIInputField
                  label=""
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  error={emailError}
                />
              )}
            </>
          )}

          {otpSent && (
            <>
              <View style={splitOTPInputContainer.container}>
                <AUISplitOTPInput length={4} onOTPChange={handleOTPChange} />
              </View>
              <View style={secondaryButtonStyle.buttonContainer}>
                <AUIPrimaryButton
                  title="Submit"
                  background={APP_THEME.primary.first}
                  onPress={handleSubmitOtp}
                />
              </View>
            </>
          )}
          {!otpSent && (
            <View style={secondaryButtonStyle.buttonContainer}>
              <AUIPrimaryButton
                title="Send OTP"
                background={APP_THEME.primary.first}
                onPress={handleSendOtp}
              />
            </View>
          )}
        </AUIThemedView>
      </KeyboardAvoidingView>
    </AUIThemedView>
  );
};

export default LoginPage;
