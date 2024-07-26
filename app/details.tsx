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
import { setLoader, setSignupDetails, setUser } from "@/redux/globalSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView } from "react-native";
import "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "./services/axiosClient";
import { APP_THEME, BACKGROUND_THEME } from "@/constants/Colors";
import AUIInputField from "@/components/common/AUIInputField";
import { storeUserData } from "@/constants/RNAsyncStore";

const DetailsPage = () => {
    // const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
    const router = useRouter();
    const profile = useLangTransformSelector((state: RootState) => state.global.profile);
    const theme = useSelector((state: RootState) => state.global.theme);
    const { patch } = useAxios();

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
        dispatch(setLoader(true));
        patch(API_URL.user, { ...signupValues })
            .then((res: any) => {
                dispatch(setLoader(false));
                if (res.statusCode === 200) {
                    storeUserData("@user-data", {
                        ...res?.data,
                    }).then(() => {
                        dispatch(setUser(res?.data));
                        ApiSuccessToast(res.message);
                        router.replace(`(home)/(student)`);
                    });
                }
            })
            .catch((error: any) => {
                dispatch(setLoader(false));
                ApiErrorToast(error.message);
            });
    };

    return (
        <ScrollView style={{ backgroundColor: BACKGROUND_THEME[theme].background }}>
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
                            onPress={() => router.replace(`(home)/(${profile})`)}
                            borderColor={APP_THEME[theme].primary.first}
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
    );
};

export default DetailsPage;
