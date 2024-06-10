import AUIButton from "@/components/common/AUIButton";
import DropdownComponent from "@/components/common/AUIDropdown";
import AUIInputField from "@/components/common/AUIInputField";
import { AUISafeAreaView } from "@/components/common/AUISafeAreaView";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT, SIGNUP_FIELDS } from "@/constants/Properties";
import { loginPageStyles, signupPageStyles } from "@/constants/Styles";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import Toast from "react-native-root-toast";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import DATA from "@/app/services/data.json";
import { post } from "./services/axiosClient";
import { API_URL } from "@/constants/urlProperties";
import { useDispatch, useSelector } from "react-redux";
import { setSignupDetails } from "@/redux/globalSlice";
import { countriesData } from "@/constants/dummy data/countriesData";
import { RootState } from "@/redux/store";
const SignupPage = () => {
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
  const router = useRouter();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.global.profile);

  const [errors, setErrors] = useState({});
  const [signupValues, setSignupValues] = useState({
    name: null,
    email: null,
    phone: null,
    phoneCode: "+91",
  });

  const handleOnSave = () => {
    console.log(signupValues);
    const { name, email, phone, phoneCode } = signupValues;
    // @ts-ignore
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupValues.email)) {
      setErrors({
        ...errors,
        email: GLOBAL_TEXT.validate_email,
      });
      return;
    }
    // @ts-ignore
    if (!/^[0-9]{10}$/.test(signupValues.phone)) {
      setErrors({
        ...errors,
        phone: GLOBAL_TEXT.validate_mobile,
      });
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
    console.log(payload);
    post(API_URL.register, payload)
      .then((res) => {
        console.log("res", res);
        router.navigate("/login");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleOnChange = (val: any, item: string) => {
    setSignupValues({
      ...signupValues,
      [item]: val,
    });
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
  return (
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
          <Toast visible>Thanks for subscribing!</Toast>

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
                      handleOnChange={(val: any) => handleOnChange(val, item)}
                      // @ts-ignore

                      error={Object.keys(errors).length > 0 ? errors[item] : ""}
                    />
                  ) : (
                    <AUIInputField
                      // @ts-ignore
                      label={SIGNUP_FIELDS[item].label}
                      // @ts-ignore
                      placeholder={SIGNUP_FIELDS[item].placeholder}
                      // @ts-ignore

                      value={signupValues[item]}
                      onChangeText={(val: any) => handleOnChange(val, item)}
                      error={
                        // @ts-ignore
                        Object.keys(errors).length > 0 ? errors[item] : ""
                      }
                    />
                  )}
                </AUIThemedView>
              ))}
            </AUIThemedView>
            <AUIThemedView style={{ marginTop: 20 }}>
              <AUIButton
                title={GLOBAL_TEXT.continue_n_verify}
                disabled={!Object.values(signupValues).every((x) => x)}
                selected
                icon={"arrowright"}
                onPress={handleOnSave}
              />
            </AUIThemedView>
          </AUIThemedView>
        </KeyboardAvoidingView>
      </AUIThemedView>
    </AUISafeAreaView>
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
}: any) => (
  <AUIThemedView style={{ backgroundColor: "#ffffff" }}>
    <AUIThemedText
      style={{
        marginBottom: 5,
        fontSize: 16,
        fontWeight: "semibold",
        letterSpacing: -0.32,
        color: APP_THEME.gray,
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
        labelField="name"
        valueField="dialling_code"
      />
      <AUIInputField
        style={{ flex: 2 }}
        // @ts-ignore
        placeholder={placeholder}
        value={value}
        onChangeText={handleOnChange}
      />
    </AUIThemedView>
    {error && (
      <AUIThemedText style={{ color: "red", fontSize: 14 }}>
        {error}
      </AUIThemedText>
    )}
  </AUIThemedView>
);

export default SignupPage;
