// import DATA from "@/app/services/data.json";
// import AUIButton from "@/components/common/AUIButton";
// import DropdownComponent from "@/components/common/AUIDropdown";
// import AUIInputField from "@/components/common/AUIInputField";
// import { AUISafeAreaView } from "@/components/common/AUISafeAreaView";
// import { AUIThemedText } from "@/components/common/AUIThemedText";
// import { AUIThemedView } from "@/components/common/AUIThemedView";
// import { APP_THEME } from "@/constants/Colors";
// import { DETAILS_FIELDS, GLOBAL_TEXT, SCHOOL_DETAILS_FIELDS } from "@/constants/Properties";
// import { signupPageStyles } from "@/constants/Styles";
// import { countriesData } from "@/constants/dummy data/countriesData";
// import { setLoader, setSchoolDetails, setSignupDetails } from "@/redux/globalSlice";
// import { RootState } from "@/redux/store";
// import { useRouter } from "expo-router";
// import { useState } from "react";
// import { Platform, ScrollView } from "react-native";
// import "react-native-gesture-handler";
// import { useDispatch, useSelector } from "react-redux";
// import useAxios from "./services/axiosClient";
// import { API_URL } from "@/constants/urlProperties";
// import { ApiErrorToast, ApiSuccessToast } from "@/components/common/AUIToast";

// const DetailsPage = () => {
//     const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
//     const router = useRouter();
//     const profile = useSelector((state: RootState) => state.global.profile);
//     const signInType = useSelector((state: RootState) => state.global.signInType);
//     const signupDetails = useSelector((state: RootState) => state.global.signupDetails);
//     const dispatch = useDispatch();
//     const [signupValues, setSignupValues] = useState({
//         qualification: null,
//         academic: null,
//         language: null,
//         country: null,
//         city: null,
//         state: null,
//     });
//     const [schoolAdditionalDetails, setSchoolAdditionalDetails] = useState({
//         name: null,
//         email: null,
//         phone: null,
//         description: null,
//         website: null,
//         location: null,
//         // logo: null,
//         // banner: null,
//     });
//     const { post } = useAxios();

//     const [phoneCode, setPhoneCode] = useState("+91");
//     const handleOnSave = () => {
//         dispatch(setSignupDetails({ ...signupDetails, ...signupValues }));
//         console.log(signupValues);
//         router.navigate(`(home)/(${profile})`);
//     };
//     const handleOnSchoolDetailsSave = () => {
//         let code = phoneCode.split("+")[1];
//         dispatch(
//             setSchoolDetails({
//                 ...schoolAdditionalDetails,
//                 phone: `${code}${schoolAdditionalDetails.phone}`,
//             })
//         );
//         console.log(schoolAdditionalDetails);

//         let payload = {
//             ...schoolAdditionalDetails,
//             phone: `${code}${schoolAdditionalDetails.phone}`,
//             registerType: `${profile}`,
//         };
//         console.log(payload);
//         dispatch(setLoader(true));

//         post(API_URL.register, payload)
//             .then((res) => {
//                 dispatch(setLoader(false));

//                 const { data, message } = res;
//                 console.log("res", res);
//                 ApiSuccessToast(message);
//                 if (
//                     Object.keys(data).includes("emailSent") &&
//                     Object.keys(data).includes("smsSent")
//                 ) {
//                     router.navigate("/login");
//                 }
//             })
//             .catch((e) => {
//                 dispatch(setLoader(false));

//                 console.log(e.response.data);
//                 ApiErrorToast(e.response?.data?.message);
//             });
//         // router.navigate(`(home)/(${profile})`);
//     };
//     const onSchoolInputChange = (val: string, item: string) => {
//         setSchoolAdditionalDetails({
//             ...schoolAdditionalDetails,
//             [item]: val,
//         });
//     };
//     const handleDropdownChange = (val: any) => {
//         setPhoneCode(val?.dialling_code);
//     };

//     return (
//         <AUISafeAreaView edges={["bottom"]}>
//             <ScrollView>
//                 <AUIThemedView style={signupPageStyles.container}>
//                     <AUIThemedText style={signupPageStyles.heading}>
//                         {GLOBAL_TEXT.additional_details}
//                     </AUIThemedText>
//                     <AUIThemedView style={signupPageStyles.formLayout}>
//                         <AUIThemedView style={signupPageStyles.fieldContainer}>
//                             {/* {profile === "student" && (
//                                 <>
//                                     {Object.keys(DETAILS_FIELDS).map((item, i) => (
//                                         <AUIThemedView key={i}>
//                                             <DropdownComponent
//                                                 // @ts-ignore
//                                                 list={DATA[item]}
//                                                 // @ts-ignore
//                                                 value={signupValues[item]}
//                                                 setValue={(val: any) =>
//                                                     setSignupValues({
//                                                         ...signupValues,
//                                                         [item]: val.value,
//                                                     })
//                                                 }
//                                                 style={{ backgroundColor: "#ffffff" }}
//                                                 //  @ts-ignore
//                                                 label={DETAILS_FIELDS[item].label}
//                                                 //  @ts-ignore
//                                                 placeholder={DETAILS_FIELDS[item].placeholder}
//                                                 position={i > 2 ? "top" : "bottom"}
//                                                 listWithIcon
//                                             />
//                                         </AUIThemedView>
//                                     ))}
//                                 </>
//                             )} */}
//                             {profile === "school" && (
//                                 <>
//                                     {Object.keys(SCHOOL_DETAILS_FIELDS).map((item, i) => (
//                                         <AUIThemedView key={i}>
//                                             {/* @ts-ignore */}
//                                             {SCHOOL_DETAILS_FIELDS[item].type === "INPUT" && (
//                                                 <AUIInputField
//                                                     // @ts-ignore
//                                                     label={SCHOOL_DETAILS_FIELDS[item].label}
//                                                     // @ts-ignore

//                                                     value={schoolAdditionalDetails[item]}
//                                                     onChangeText={(val) =>
//                                                         onSchoolInputChange(val, item)
//                                                     }
//                                                     placeholder={
//                                                         // @ts-ignore
//                                                         SCHOOL_DETAILS_FIELDS[item].placeholder
//                                                     }
//                                                     autoFocus={true}
//                                                 />
//                                             )}
//                                             {/* @ts-ignore */}
//                                             {SCHOOL_DETAILS_FIELDS[item].type === "CONTACT" && (
//                                                 <ContactNumberField
//                                                     // @ts-ignore
//                                                     label={SCHOOL_DETAILS_FIELDS[item].label}
//                                                     placeholder={
//                                                         // @ts-ignore
//                                                         SCHOOL_DETAILS_FIELDS[item].placeholder
//                                                     }
//                                                     // @ts-ignore
//                                                     value={schoolAdditionalDetails[item]}
//                                                     dropdownValue={phoneCode}
//                                                     handleDropdownChange={handleDropdownChange}
//                                                     handleOnChange={(val: any) =>
//                                                         onSchoolInputChange(val, item)
//                                                     }
//                                                 />
//                                             )}
//                                             {/* @ts-ignore */}

//                                             {SCHOOL_DETAILS_FIELDS[item].type === "DROPDOWN" && (
//                                                 <DropdownComponent
//                                                     // @ts-ignore
//                                                     list={DATA[item]}
//                                                     // @ts-ignore
//                                                     value={schoolAdditionalDetails[item]}
//                                                     setValue={(val: any) => {
//                                                         setSchoolAdditionalDetails({
//                                                             ...schoolAdditionalDetails,
//                                                             [item]: val.value,
//                                                         });
//                                                     }}
//                                                     style={{ backgroundColor: "#ffffff" }}
//                                                     //  @ts-ignore
//                                                     label={SCHOOL_DETAILS_FIELDS[item].label}
//                                                     placeholder={
//                                                         //  @ts-ignore
//                                                         SCHOOL_DETAILS_FIELDS[item].placeholder
//                                                     }
//                                                     position={i > 2 ? "top" : "bottom"}
//                                                     listWithIcon
//                                                 />
//                                             )}
//                                         </AUIThemedView>
//                                     ))}
//                                 </>
//                             )}
//                         </AUIThemedView>
//                         <AUIThemedView style={signupPageStyles.buttonContainer}>
//                             <AUIButton
//                                 title="Skip"
//                                 style={{ width: "50%" }}
//                                 onPress={() => router.navigate(`(home)/(${profile})`)}
//                             />
//                             <AUIButton
//                                 title={"Save"}
//                                 disabled={
//                                     profile === "school"
//                                         ? !Object.values(schoolAdditionalDetails).every((x) => x)
//                                         : !Object.values(signupValues).every((x) => x)
//                                 }
//                                 selected
//                                 style={{ width: "50%" }}
//                                 onPress={
//                                     profile === "school" ? handleOnSchoolDetailsSave : handleOnSave
//                                 }
//                             />
//                         </AUIThemedView>
//                     </AUIThemedView>
//                 </AUIThemedView>
//             </ScrollView>
//         </AUISafeAreaView>
//     );
// };
// const ContactNumberField = ({
//     label,
//     value,
//     handleOnChange,
//     error,
//     dropdownValue,
//     handleDropdownChange,
//     placeholder,
//     onBlur,
// }: any) => (
//     <AUIThemedView style={{ backgroundColor: "#ffffff" }}>
//         <AUIThemedText
//             style={{
//                 marginBottom: 5,
//                 fontSize: 16,
//                 fontWeight: "semibold",
//                 letterSpacing: -0.32,
//                 color: APP_THEME.gray,
//             }}
//         >
//             {label}
//         </AUIThemedText>
//         <AUIThemedView
//             style={{
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 gap: 10,
//             }}
//         >
//             <DropdownComponent
//                 style={{ flex: 1 }}
//                 // @ts-ignore
//                 list={countriesData}
//                 // @ts-ignore
//                 value={dropdownValue}
//                 setValue={handleDropdownChange}
//                 labelField="dialling_code"
//                 valueField="dialling_code"
//                 listWithIcon
//                 renderLeftIcon
//             />
//             <AUIInputField
//                 style={{ flex: 2 }}
//                 // @ts-ignore
//                 placeholder={placeholder}
//                 value={value}
//                 onChangeText={handleOnChange}
//                 keyboardType="numeric"
//                 onBlur={onBlur}
//             />
//         </AUIThemedView>
//         {error && (
//             <AUIThemedText
//                 style={{ position: "absolute", color: "red", fontSize: 14, marginTop: 78 }}
//             >
//                 {error}
//             </AUIThemedText>
//         )}
//     </AUIThemedView>
// );
// export default DetailsPage;

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
    const profile = useSelector((state: RootState) => state.global.profile);
    const signInType = useSelector((state: RootState) => state.global.signInType);
    const signupDetails = useSelector((state: RootState) => state.global.signupDetails);
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
