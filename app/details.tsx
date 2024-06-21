import AUIButton from "@/components/common/AUIButton";
import DropdownComponent from "@/components/common/AUIDropdown";
import { AUISafeAreaView } from "@/components/common/AUISafeAreaView";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { DETAILS_FIELDS, GLOBAL_TEXT } from "@/constants/Properties";
import { signupPageStyles } from "@/constants/Styles";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import DATA from "@/app/services/data.json";
import { useDispatch, useSelector } from "react-redux";
import { setSignupDetails } from "@/redux/globalSlice";
import { RootState } from "@/redux/store";
import "react-native-gesture-handler"

const DetailsPage = () => {
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
  const router = useRouter();
  const profile = useSelector((state: RootState) => state.global.profile);
  const signInType = useSelector((state: RootState) => state.global.signInType);
  const signupDetails = useSelector(
    (state: RootState) => state.global.signupDetails
  );
  const dispatch = useDispatch();
  const [signupValues, setSignupValues] = useState({
    qualification: null,
    academic: null,
    language: null,
    country: null,
    city: null,
    state: null,
  });

  const handleOnSave = () => {
    dispatch(setSignupDetails({ ...signupDetails, ...signupValues }));
    console.log(signupValues);
    router.navigate(`(home)/(${profile})`);
    // post(API_URL.sendOTP, signupValues)
    //   .then((res) => {
    //     console.log("res", res);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  };

  return (
    <AUISafeAreaView edges={["bottom"]}>
      <ScrollView>
      <AUIThemedView style={signupPageStyles.container}>
        <AUIThemedText style={signupPageStyles.heading}>
          {GLOBAL_TEXT.additional_details}
        </AUIThemedText>
          <AUIThemedView style={signupPageStyles.formLayout}>
            <AUIThemedView style={signupPageStyles.fieldContainer}>
              {Object.keys(DETAILS_FIELDS).map((item, i) => (
                <AUIThemedView key={i}>
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
                    style={{ backgroundColor: "#ffffff" }}
                    //  @ts-ignore
                    label={DETAILS_FIELDS[item].label}
                    //  @ts-ignore
                    placeholder={DETAILS_FIELDS[item].placeholder}
                    position={i > 2 ? "top" : "bottom"}
                    listWithIcon
                  />
                </AUIThemedView>
              ))}
            </AUIThemedView>
            <AUIThemedView style={signupPageStyles.buttonContainer}>
              <AUIButton
                title="Skip"
                style={{ width: "50%" }}
                onPress={() => router.navigate(`(home)/(${profile})`)}
              />
              <AUIButton
                title={"Save"}
                disabled={!Object.values(signupValues).every((x) => x)}
                selected
                style={{ width: "50%" }}
                onPress={handleOnSave}
              />
            </AUIThemedView>
          </AUIThemedView>
      </AUIThemedView>
      </ScrollView>
    </AUISafeAreaView>
  );
};

export default DetailsPage;
