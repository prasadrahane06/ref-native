import AUIButton from "@/components/common/AUIButton";
import AUIInputField from "@/components/common/AUIInputField";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { ApiErrorToast, ApiSuccessToast } from "@/components/common/AUIToast";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { API_URL } from "@/constants/urlProperties";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
// import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import * as Yup from "yup";
import useAxios from "./services/axiosClient";
import { BACKGROUND_THEME } from "@/constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import AUIBackgroundImage from "@/components/common/AUIBackgroundImage";
import { useTranslation } from "react-i18next";
import { setLoader, setUser } from "@/redux/globalSlice";
import { storeUserData } from "@/constants/RNAsyncStore";
import { setResponse } from "@/redux/apiSlice";
import AUIImage from "@/components/common/AUIImage";
import useApiRequest from "@/customHooks/useApiRequest";

const SchoolProfile = () => {
    const { patch } = useAxios();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { requestFn } = useApiRequest();

    const theme = useSelector((state: RootState) => state.global.theme);
    // const mySchoolDetails = useLangTransformSelector(
    //     (state: RootState) => state.api.MySchoolDetails
    // );
    
    const userProfileData = useLangTransformSelector(
        (state: RootState) => state.api.userProfileData
    );
    const [banner, setBanner] = useState<string>(userProfileData?.banner);
    const [logo, setLogo] = useState<string>(userProfileData?.logo);


    const [bannerBase64, setBannerBase64] = useState<any>(null);
    const [logoBase64, setLogoBase64] = useState<any>(null);
    const user = useLangTransformSelector((state: RootState) => state.global.user);
    const _id = user?.client;

    const schema = Yup.object().shape({
        name: Yup.string().required(`${t("name_is_required")}`),
        description: Yup.string().required(`${t("description_is_required")}`),
        remark: Yup.string().required(`${t("remark_is_required")}`),
        website: Yup.string().required(`${t("website_is_required")}`),
    });

    const { reset, control, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            name: userProfileData?.name,
            description: userProfileData?.description,
            remark: userProfileData?.remark,
            website: userProfileData?.website,
        },
    });

    useEffect(() => {
        if (_id) {
            requestFn(API_URL.school, "userProfileData", { id: _id });
        }
    }, []);

    useEffect(() => {
        if (userProfileData && reset) {
            reset({
                name: userProfileData?.name,
                description: userProfileData?.description,
                remark: userProfileData?.remark,
                website: userProfileData?.website,
            });
            setLogo(userProfileData?.logo);
            setBanner(userProfileData?.banner);
        }
    }, [userProfileData, reset]);


    const pickImageAsync = async (value: any) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            if (value === "logo") {
                setLogoBase64(result.assets[0].base64);
                setLogo(result.assets[0]?.uri);
            } else {
                setBannerBase64(result.assets[0].base64);
                setBanner(result.assets[0]?.uri);
            }
        } else {
            alert(`${t("you_did_not_select_any_image")}`);
        }
    };

    const onSave = (data: any) => {
        dispatch(setLoader(true));

        const payload: any = {
            name: data.name,
            description: data.description,
            remark: data.remark,
            website: data.website,
        };

        if (bannerBase64) {
            payload.banner = `data:image/png;base64,${bannerBase64}`;
        }

        if (logoBase64) {
            payload.logo = `data:image/png;base64,${logoBase64}`;
        }

        patch(API_URL.school, payload)
            .then((res: any) => {
                storeUserData("@user-data", {
                    ...res?.data,
                });
                dispatch(setUser(res?.data));
                dispatch(setResponse({ storeName: "api.MySchoolDetails", data: res?.data }));
                ApiSuccessToast(res.message);
                dispatch(setLoader(false));
            })
            .catch((error: any) => {
                console.log("error in school profile save", error);
                ApiErrorToast(error);
                console.log("error in schooldetails onSave =>", error);
            });
    };

    const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: BACKGROUND_THEME[theme].background }}
            behavior="padding"
            keyboardVerticalOffset={keyboardVerticalOffset}
        >
            <ScrollView>
                <AUIThemedView style={styles.container}>
                    <TouchableOpacity onPress={() => pickImageAsync("logo")}>
                        <AUIThemedText style={styles.label}>School Logo</AUIThemedText>
                        <AUIImage path={logo} style={styles.logo} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => pickImageAsync("banner")}>
                        <AUIThemedText style={styles.label}>School Banner</AUIThemedText>
                        <AUIBackgroundImage path={banner} style={styles.banner} />
                    </TouchableOpacity>

                    <Controller
                        name="name"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AUIThemedView>
                                <AUIThemedText style={styles.label}>{t("name")}</AUIThemedText>
                                <AUIInputField
                                    onChangeText={onChange}
                                    placeholder={t("enter_your_name")}
                                    value={value}
                                />
                                {error && (
                                    <AUIThemedText style={styles.fieldError}>
                                        {error.message}
                                    </AUIThemedText>
                                )}
                            </AUIThemedView>
                        )}
                    />

                    <AUIThemedView>
                        <AUIThemedView style={styles.labelContainer}>
                            <AUIThemedText style={styles.label}>{t("mobile_number")}</AUIThemedText>
                            <TouchableOpacity
                                onPress={() =>
                                    router.push({
                                        pathname: "/changeNumberEmail",
                                        params: { type: "phoneNumber" },
                                    })
                                }
                            >
                                <AUIThemedText style={styles.link}>
                                    {t("change_number")}
                                </AUIThemedText>
                            </TouchableOpacity>
                        </AUIThemedView>
                        <AUIInputField
                            style={styles.disabledInput}
                            editable={false}
                            value={userProfileData?.phone}
                        />
                    </AUIThemedView>

                    <AUIThemedView>
                        <AUIThemedView style={styles.labelContainer}>
                            <AUIThemedText style={styles.label}>{t("email")}</AUIThemedText>
                            <TouchableOpacity
                                onPress={() =>
                                    router.push({
                                        pathname: "/changeNumberEmail",
                                        params: { type: "email" },
                                    })
                                }
                            >
                                <AUIThemedText style={styles.link}>
                                    {t("change_email")}
                                </AUIThemedText>
                            </TouchableOpacity>
                        </AUIThemedView>
                        <AUIInputField
                            style={styles.disabledInput}
                            editable={false}
                            value={userProfileData?.email}
                        />
                    </AUIThemedView>

                    <Controller
                        name="description"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AUIThemedView>
                                <AUIThemedText style={styles.label}>
                                    {t("description")}
                                </AUIThemedText>
                                <AUIInputField
                                    onChangeText={onChange}
                                    placeholder={t("enter_description")}
                                    value={value}
                                />
                                {error && (
                                    <AUIThemedText style={styles.fieldError}>
                                        {error.message}
                                    </AUIThemedText>
                                )}
                            </AUIThemedView>
                        )}
                    />
                    <Controller
                        name="remark"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AUIThemedView>
                                <AUIThemedText style={styles.label}>{t("remark")}</AUIThemedText>
                                <AUIInputField
                                    onChangeText={onChange}
                                    placeholder={t("enter_remark")}
                                    value={value}
                                />
                                {error && (
                                    <AUIThemedText style={styles.fieldError}>
                                        {error.message}
                                    </AUIThemedText>
                                )}
                            </AUIThemedView>
                        )}
                    />

                    <Controller
                        name="website"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AUIThemedView>
                                <AUIThemedText style={styles.label}>{t("website")}</AUIThemedText>
                                <AUIInputField
                                    onChangeText={onChange}
                                    placeholder={t("enter_website")}
                                    value={value}
                                />
                                {error && (
                                    <AUIThemedText style={styles.fieldError}>
                                        {error.message}
                                    </AUIThemedText>
                                )}
                            </AUIThemedView>
                        )}
                    />

                    <AUIThemedView style={styles.footerContainer}>
                        <AUIThemedView style={styles.buttonContainer}>
                            <AUIButton
                                title={t("reset_defaults")}
                                onPress={() => {
                                    ApiSuccessToast(`${t("reset")}`);
                                    reset();
                                }}
                                style={{ width: "48%" }}
                            />
                            <AUIButton
                                title={t("save")}
                                selected
                                onPress={handleSubmit(onSave)}
                                disabled={!formState.isValid}
                                style={{ width: "48%" }}
                            />
                        </AUIThemedView>
                    </AUIThemedView>
                </AUIThemedView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    disabledInput: {
        backgroundColor: "#f0f0f0",
        opacity: 0.5,
        borderWidth: 0,
        borderRadius: 10,
    },
    link: {
        color: "blue",
        marginTop: 10,
        marginBottom: 5,
        fontSize: 13,
        fontWeight: "bold",
        fontStyle: "normal",
    },
    labelContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    container: {
        flex: 1,
        padding: 20,
    },
    banner: {
        width: "100%",
        height: 200,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    logoContainer: {
        position: "absolute",
        bottom: -25, // Adjust this value to position the logo over the banner
        left: "50%",
        transform: [{ translateX: -25 }],
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: "hidden",
        backgroundColor: "white", // Add background color to make logo stand out
        justifyContent: "center",
        alignItems: "center",
    },
    label: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 13,
        fontWeight: "bold",
    },
    fieldError: {
        color: "red",
        fontSize: 13,
    },
    buttonContainer: {
        marginVertical: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    footerContainer: {
        justifyContent: "center",
    },
});

export default SchoolProfile;
