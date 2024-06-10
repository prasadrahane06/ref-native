import AUIInputField from "@/components/common/AUIInputField";
import AUIButton from "@/components/common/AUIButton";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { loginPageStyles, secondaryButtonStyle } from "@/constants/Styles";
import { useEffect, useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import OTPScreen from "@/components/screenComponents/OTPScreen";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import DropdownComponent from "@/components/common/AUIDropdown";
import { post } from "./services/axiosClient";
import { API_URL } from "@/constants/urlProperties";
import { MaterialIcons } from "@expo/vector-icons";
const schema = Yup.object().shape({
  input: Yup.string().when("selectedButton", {
    is: "mobile",
    then: (schema) =>
      schema
        .matches(/^[0-9]{10}$/, GLOBAL_TEXT.validate_mobile)
        .required(GLOBAL_TEXT.validate_mobile),
    otherwise: (schema) =>
      schema
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, GLOBAL_TEXT.validate_email)
        .required(GLOBAL_TEXT.validate_email),
  }),
  selectedButton: Yup.string().required(),
});

const LoginPage = () => {
  const router = useRouter();
  const profile = useSelector((state: RootState) => state.global.profile);
  const signInType = useSelector((state: RootState) => state.global.signInType);

  const signupDetails = useSelector(
    (state: RootState) => state.global.signupDetails
  );

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
  const { watch, reset, setValue, control } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      input: "",
      selectedButton: "mobile",
    },
  });

  const selectedButton = watch("selectedButton");
  const inputValue = watch("input");

  const handleSendOtp = () => {
    let payload =
      selectedButton === "mobile"
        ? {
            phone: `91${inputValue}`,
          }
        : {
            email: inputValue,
          };
    console.log(payload);
    post(API_URL.login, payload)
      .then((res) => {
        console.log("res", res);
        setOtpSent(true);
      })
      .catch((e) => {
        console.log(e.response.data);
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
    console.log(payload);
    post(API_URL.verifyOTP, payload)
      .then((res) => {
        setOtpVerified({
          ...otpVerified,
          signUpEmail: true,
        });
        if (otpVerified.signUpPhone) {
          router.push({ pathname: "/details" });
        }

        console.log("res", res);
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
    console.log(payload);
    post(API_URL.verifyOTP, payload)
      .then((res) => {
        setOtpVerified({
          ...otpVerified,
          signUpPhone: true,
        });
        if (otpVerified.signUpEmail) {
          router.push({ pathname: "/details" });
        }
        console.log("res", res);
      })
      .catch((e: any) => {
        console.log("e", e);
      });
  };
  const handleSubmitLoginOtp = (newOtp: any) => {
    let payload = {
      phone: `91${inputValue}`,
      otp: newOtp,
    };
    console.log(payload);
    post(API_URL.verifyOTP, payload)
      .then((res) => {
        setOtpVerified({
          ...otpVerified,
          login: true,
        });
        router.push({
          pathname: `(home)/(${profile})`,
        });
        console.log("res", res);
      })
      .catch((e: any) => {
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
    console.log(payload);
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
          {GLOBAL_TEXT.enter_pin}
        </AUIThemedText>
        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: "#ffffff" }}
          behavior="padding"
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <AUIThemedView style={loginPageStyles.otpViewContainer}>
            {/* {otpVerified.signUpEmail ? (
              <OTPVerified label={"Email OTP verified"} />
            ) : ( */}
            <OTPScreen
              length={4}
              changeLabel={"email"}
              onChange={(val: any) => handleOTPChange(val, "signUpEmail")}
              onBackToInput={handleBackToInput}
              onResendOtp={() =>
                handleOnResendOtp(signupDetails?.email, "email")
              }
              disabled={otpVerified.signUpEmail}
              inputValue={signupDetails?.email}
            />
            {otpVerified.signUpEmail && (
              <OTPVerified label={"Email verified"} />
            )}

            {/* )} */}
          </AUIThemedView>
          <AUIThemedView
            style={[loginPageStyles.otpViewContainer, { marginTop: 50 }]}
          >
            {/* {otpVerified.signUpPhone ? (
              <OTPVerified label={"Phone number OTP verified"} />
            ) : ( */}
            <OTPScreen
              changeLabel={"mobile number"}
              length={4}
              onChange={(val: any) => handleOTPChange(val, "signUpPhone")}
              onBackToInput={handleBackToInput}
              onResendOtp={() =>
                handleOnResendOtp(signupDetails?.phone, "phone")
              }
              disabled={otpVerified.signUpPhone}
              inputValue={signupDetails?.phone}
            />
            {otpVerified.signUpPhone && (
              <OTPVerified label={"Mobile number verified"} />
            )}
            {/* )} */}
          </AUIThemedView>
        </KeyboardAvoidingView>
      </AUIThemedView>
    );
  }
  return (
    <AUIThemedView style={loginPageStyles.container}>
      <AUIThemedText style={loginPageStyles.heading}>
        {otpSent ? GLOBAL_TEXT.enter_pin : GLOBAL_TEXT.login_to_continue}
      </AUIThemedText>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#ffffff" }}
        behavior="padding"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        {!otpSent && (
          <>
            <AUIThemedView style={loginPageStyles.mobileEmailButtonContainer}>
              <AUIButton
                style={{ width: "50%" }}
                title="Mobile Number"
                onPress={() => {
                  setValue("selectedButton", "mobile");
                  // setValue("input", "");
                  reset({
                    input: "",
                    selectedButton: "mobile",
                  });
                }}
                selected={selectedButton === "mobile"}
              />
              <AUIButton
                style={{ width: "50%" }}
                title="Email ID"
                onPress={() => {
                  setValue("selectedButton", "email");
                  // setValue("input", "");
                  reset({
                    input: "",
                    selectedButton: "email",
                  });
                }}
                selected={selectedButton === "email"}
              />
            </AUIThemedView>
            <AUIThemedView style={loginPageStyles.sendOtpContainer}>
              <Controller
                name="input"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <AUIInputField
                      label=""
                      placeholder={
                        selectedButton === "mobile"
                          ? GLOBAL_TEXT.enter_mobile_number
                          : GLOBAL_TEXT.enter_email_id
                      }
                      value={value}
                      onChangeText={onChange}
                      error={error?.message}
                    />
                  );
                }}
              />
              <View style={secondaryButtonStyle.buttonContainer}>
                <AUIButton
                  title="Send OTP"
                  disabled={!inputValue}
                  selected
                  icon={"arrowright"}
                  style={{ width: "50%" }}
                  background={APP_THEME.primary.first}
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
  );
};

const OTPVerified = ({ label }: any) => (
  <AUIThemedView
    style={{ flexDirection: "row", gap: 10, backgroundColor: "#ffffff" }}
  >
    <AUIThemedText style={{ fontSize: 14, fontWeight: "bold" }}>
      {label}
    </AUIThemedText>
    <MaterialIcons name="verified-user" size={24} color="green" />
  </AUIThemedView>
);
export default LoginPage;
