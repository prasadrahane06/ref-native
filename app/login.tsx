import AUIInputField from "@/components/common/AUIInputField";
import AUIButton from "@/components/common/AUIButton";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { loginPageStyles, secondaryButtonStyle } from "@/constants/Styles";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import AUIOTPInput from "@/components/common/AUIOtpInput";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

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

  const handleSendOtp = () => {
    handleSubmit(() => {
      setOtpSent(true);
    })();
  };

  const handleOTPChange = (newOtp: string) => {
    setOtp(newOtp);
    console.log("Current OTP:", newOtp);
  };

  const handleSubmitOtp = () => {
    router.push({ pathname: "(student)/home" });
  };

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
            onPress={() => {
              setValue("selectedButton", "mobile");
              // setValue("input", "");
              reset({ input: "", selectedButton: "mobile" });
            }}
            selected={selectedButton === "mobile"}
          />
          <AUIButton
            style={{ width: "50%" }}
            title="Email ID"
            onPress={() => {
              setValue("selectedButton", "email");
              // setValue("input", "");
              reset({ input: "", selectedButton: "email" });
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
              <AUIOTPInput length={4} onChange={handleOTPChange} />
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
