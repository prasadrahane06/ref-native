import AUIPrimaryButton from "@/components/AUIPrimaryButton";
import DropdownComponent from "@/components/common/AUIDropdown";
import { AUISafeAreaView } from "@/components/common/AUISafeAreaView";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { GLOBAL_TEXT, SIGNUP_FIELDS } from "@/constants/Properties";
import { loginPageStyles, signupPageStyles } from "@/constants/Styles";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

const SignupPage = () => {
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
  const [signupValues, setSignupValues] = useState({
    qualification: null,
    academic: null,
    language: null,
    country: null,
    city: null,
    state: null,
  });
  const degreeCertificates = [
    {
      label: "degree",
      value: "Bachelor of Science in Computer Science",
    },
    {
      label: "institution",
      value: "University of Example",
    },

    {
      label: "honors",
      value: "Summa Cum Laude",
    },
    {
      label: "degree",
      value: "Master of Business Administration",
    },
    {
      label: "institution",
      value: "Business School Example",
    },

    {
      label: "honors",
      value: "Magna Cum Laude",
    },
    {
      label: "degree",
      value: "PhD in Artificial Intelligence",
    },
    {
      label: "institution",
      value: "Institute of Advanced Studies",
    },

    {
      label: "honors",
      value: "Cum Laude",
    },
  ];

  return (
    <AUISafeAreaView edges={["top", "bottom"]}>
      <AUIThemedView style={loginPageStyles.container}>
        <AUIThemedText style={loginPageStyles.heading}>
          {GLOBAL_TEXT.tell_about_yourself}
        </AUIThemedText>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="padding"
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <AUIThemedView style={signupPageStyles.formLayout}>
            {/* <AUIDropdown
              items={degreeCertificates}
              onValueChange={handleDropdownValue}
              key={"qualification"}
              placeholder=""
              value=""
            /> */}
            <AUIThemedView style={signupPageStyles.fieldContainer}>
              {Object.keys(SIGNUP_FIELDS).map((item, i) => (
                <AUIThemedView key={i}>
                  <DropdownComponent
                    list={degreeCertificates}
                    // @ts-ignore
                    value={signupValues[item]}
                    setValue={(val: any) =>
                      setSignupValues({ ...signupValues, [item]: val })
                    }
                    //  @ts-ignore
                    label={SIGNUP_FIELDS[item]}
                  />
                </AUIThemedView>
              ))}
            </AUIThemedView>
            <AUIThemedView style={signupPageStyles.buttonContainer}>
              <AUIPrimaryButton title={"Save"} style={{ width: "50%" }} />
              <AUIPrimaryButton title={"Next"} style={{ width: "50%" }} />
            </AUIThemedView>
          </AUIThemedView>
        </KeyboardAvoidingView>
      </AUIThemedView>
    </AUISafeAreaView>
  );
};

export default SignupPage;
