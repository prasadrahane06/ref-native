import AUIInputField from "@/components/common/AUIInputField";
import AUIButton from "@/components/common/AUIButton";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { loginPageStyles, secondaryButtonStyle } from "@/constants/Styles";
import { useEffect, useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import AUIOTPInput from "@/components/common/AUIOtpInput";
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
  const [otp, setOtp] = useState<string>("");
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      input: "",
      selectedButton: "mobile",
    },
  });

  const selectedButton = watch("selectedButton");
  const inputValue = watch("input");

  useEffect(() => {
    if (signInType === "new" && signupDetails?.email) {
      setOtpSent(true);
      setValue("input", signupDetails?.phone);
      setValue("selectedButton", "mobile");
    }
  }, []);
  const handleSendOtp = () => {
    handleSubmit(() => {
      setOtpSent(true);
    })();
  };

  const handleOTPChange = (newOtp: string) => {
    setOtp(newOtp);
  };

  const handleSubmitOtp = () => {
    let payload = {
      phone: inputValue,
      otp,
    };
    console.log(payload);
    post(API_URL.verifyOTP, payload)
      .then((res) => {
        console.log("res", res);
      })
      .catch((e: any) => {
        console.log("e", e);
      });
    router.push({ pathname: `(home)/(${profile})` });
  };

  const handleBackToInput = () => {
    setOtpSent(false);
    reset({ input: inputValue, selectedButton });
  };

  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;

  return (
    <AUIThemedView style={loginPageStyles.container}>
      <AUIThemedText style={loginPageStyles.heading}>
        {otpSent
          ? GLOBAL_TEXT.enter_pin
          : signInType === "new"
          ? GLOBAL_TEXT.create_account
          : GLOBAL_TEXT.login_to_continue}
      </AUIThemedText>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#ffffff" }}
        behavior="padding"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <AUIThemedView style={loginPageStyles.mobileEmailButtonContainer}>
          <AUIButton
            style={{ width: "50%" }}
            title="Mobile Number"
            onPress={() => {
              setValue("selectedButton", "mobile");
              // setValue("input", "");
              reset({
                input: signupDetails?.phone || "",
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
                input: signupDetails?.email || "",
                selectedButton: "email",
              });
            }}
            selected={selectedButton === "email"}
          />
        </AUIThemedView>
        {!otpSent && (
          <AUIThemedView style={loginPageStyles.sendOtpContainer}>
            <Controller
              name="input"
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  {/* <DropdownComponent
                    // list={degreeCertificates}
                    // @ts-ignore
                    value={signupValues[item]}
                    // setValue={(val: any) =>
                    //   // setSignupValues({ ...signupValues, [item]: val })
                    // }
                    //  @ts-ignore
                    label={SIGNUP_FIELDS[item].label}
                  /> */}
                  <AUIInputField
                    label=""
                    placeholder={
                      selectedButton === "mobile"
                        ? GLOBAL_TEXT.enter_mobile_number
                        : GLOBAL_TEXT.enter_email_id
                    }
                    value={value}
                    onChangeText={onChange}
                    error={errors.input ? errors.input.message : ""}
                  />
                </>
              )}
            />
            <View style={secondaryButtonStyle.buttonContainer}>
              <AUIButton
                title="Send OTP"
                disabled={!isValid}
                selected={isValid}
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
              <OTPScreen
                length={4}
                onChange={handleOTPChange}
                onBackToInput={handleBackToInput}
                inputValue={inputValue}
              />
              <AUIButton
                title="Submit"
                style={{ width: "50%" }}
                disabled={!Boolean(otp)}
                selected={otp.length === 4 && otp !== ""}
                onPress={handleSubmitOtp}
              />
            </AUIThemedView>
          </>
        )}
      </KeyboardAvoidingView>
    </AUIThemedView>
  );
};

export default LoginPage;
