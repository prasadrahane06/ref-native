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
import { useDispatch } from "react-redux";
import { setSignupDetails } from "@/redux/globalSlice";
const SignupPage = () => {
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
  const router = useRouter();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [signupValues, setSignupValues] = useState({
    qualification: null,
    academic: null,
    language: null,
    country: null,
    city: null,
    state: null,
    email: null,
    phone: null,
    name: null,
  });

  const handleOnSave = () => {
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
    dispatch(setSignupDetails(signupValues));
    console.log(signupValues);
    post(API_URL.sendOTP, signupValues)
      .then((res) => {
        console.log("res", res);
      })
      .catch((e) => {
        console.log(e);
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
          <AUIThemedView style={signupPageStyles.formLayout}>
            <ScrollView
              scrollEnabled
              style={{ backgroundColor: APP_THEME.background }}
            >
              <AUIThemedView style={signupPageStyles.fieldContainer}>
                {Object.keys(SIGNUP_FIELDS).map((item, i) => (
                  <AUIThemedView key={i}>
                    {/* @ts-ignore */}
                    {SIGNUP_FIELDS[item].type === "DROPDOWN" ? (
                      <DropdownComponent
                        // @ts-ignore
                        list={DATA[item]}
                        // @ts-ignore
                        value={signupValues[item]}
                        setValue={(val: any) =>
                          setSignupValues({
                            ...signupValues,
                            [item]: val.value,
                          })
                        }
                        //  @ts-ignore
                        label={SIGNUP_FIELDS[item].label}
                      />
                    ) : (
                      <AUIInputField
                        // @ts-ignore
                        label={SIGNUP_FIELDS[item].label}
                        // @ts-ignore

                        value={signupValues[item]}
                        onChangeText={(val: any) =>
                          setSignupValues({
                            ...signupValues,
                            [item]: val,
                          })
                        }
                        error={
                          // @ts-ignore
                          Object.keys(errors).length > 0 ? errors[item] : ""
                        }
                      />
                    )}
                  </AUIThemedView>
                ))}
              </AUIThemedView>
            </ScrollView>
            <AUIThemedView style={signupPageStyles.buttonContainer}>
              <AUIButton
                title="Save"
                // disabled={!Object.values(signupValues).every((x) => x)}
                style={{ width: "50%" }}
                onPress={handleOnSave}
              />
              <AUIButton
                title={"Next"}
                disabled={!Object.values(signupValues).every((x) => x)}
                selected
                style={{ width: "50%" }}
                onPress={() => router.navigate("/login")}
              />
            </AUIThemedView>
          </AUIThemedView>
        </KeyboardAvoidingView>
      </AUIThemedView>
    </AUISafeAreaView>
  );
};

export default SignupPage;
