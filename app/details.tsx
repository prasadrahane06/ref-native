import DATA from "@/app/services/data.json";
import AUIButton from "@/components/common/AUIButton";
import DropdownComponent from "@/components/common/AUIDropdown";
import AUIInputField from "@/components/common/AUIInputField";
import { AUISafeAreaView } from "@/components/common/AUISafeAreaView";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME } from "@/constants/Colors";
import { countriesData } from "@/constants/dummy data/countriesData";
import { DETAILS_FIELDS, GLOBAL_TEXT } from "@/constants/Properties";
import { signupPageStyles } from "@/constants/Styles";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { setSignupDetails } from "@/redux/globalSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Platform, ScrollView } from "react-native";
import "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";

const DetailsPage = () => {
    const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
    const router = useRouter();
    const profile = useLangTransformSelector((state: RootState) => state.global.profile);
    const signInType = useLangTransformSelector((state: RootState) => state.global.signInType);
    const signupDetails = useLangTransformSelector(
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
        <AUIThemedView style={{ backgroundColor: "#ffffff" }}>
            <AUIThemedText
                style={{
                    marginBottom: 5,
                    fontSize: 16,
                    fontWeight: "semibold",
                    letterSpacing: -0.32,
                    color: APP_THEME[theme].gray,
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
                {/* @ts-ignore */}
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

export default DetailsPage;
