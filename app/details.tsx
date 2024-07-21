import DATA from "@/app/services/data.json";
import AUIButton from "@/components/common/AUIButton";
import DropdownComponent from "@/components/common/AUIDropdown";
import { AUISafeAreaView } from "@/components/common/AUISafeAreaView";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { ApiErrorToast, ApiSuccessToast } from "@/components/common/AUIToast";
import { DETAILS_FIELDS, GLOBAL_TEXT } from "@/constants/Properties";
import { signupPageStyles } from "@/constants/Styles";
import { API_URL } from "@/constants/urlProperties";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { setSignupDetails } from "@/redux/globalSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView } from "react-native";
import "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import useAxios from "./services/axiosClient";


const DetailsPage = () => {
    // const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
    const router = useRouter();
    const profile = useLangTransformSelector((state: RootState) => state.global.profile);
    const {patch} = useAxios();


    const dispatch = useDispatch();
    const [signupValues, setSignupValues] = useState({
        qualification: null,
        academicSession: null,
        language: null,
        country: null,
        city: null,
        state: null,
    });

    const handleOnSave = () => {
        dispatch(setSignupDetails({ ...signupValues }));
       
        patch(API_URL.user, { ...signupValues })
            .then((res: any) => {
                ApiSuccessToast(res.message);
                router.navigate(`(home)/(${profile})`);
            })
            .catch((error: any) => {
                ApiErrorToast(error.message);
            });
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
