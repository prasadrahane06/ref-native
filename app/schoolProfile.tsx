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
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ImageBackground, ScrollView, StyleSheet } from "react-native";
import * as Yup from "yup";
import useAxios from "./services/axiosClient";
const SchoolProfile = () => {
    const MySchoolDetails = useLangTransformSelector(
        (state: RootState) => state.api.MySchoolDetails
    );
    const [selectedLogo, setSelectedLogo] = useState("");
    const [selectedBanner, setSelectedBanner] = useState("");
    const { patch } = useAxios();
    const schema = Yup.object().shape({
        name: Yup.string().required(`${t("name_is_required")}`),
        phoneNumber: Yup.string().required(`${t("enter_valid_mobile_number")}`),
        email: Yup.string().email(GLOBAL_TEXT.validate_email).required(`${t("please_provide_valid_email")}`),
        description: Yup.string().required(`${t("description_is_required")}`),
        logo: Yup.string().required(`${t("logo_is_required")}`),
        banner: Yup.string().required(`${t("banner_is_required")}`),
        remark: Yup.string().required(`${t("remark_is_required")}`),
    });



    const { reset, setValue, control, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            name: MySchoolDetails?.name,
            phoneNumber: MySchoolDetails?.phone,
            email: MySchoolDetails?.email,
            description: MySchoolDetails?.description,
            remark: MySchoolDetails?.remark,
            // name: "",
            // phoneNumber: "",
            // email: "",
            // description: "",
            // remark: "",
        },
    });
    useEffect(() => {
        if (MySchoolDetails) {
            reset({
                name: MySchoolDetails.name || "",
                phoneNumber: MySchoolDetails.phone || "",
                email: MySchoolDetails.email || "",
                description: MySchoolDetails.description || "",
                remark: MySchoolDetails.remark || "",
            });
        }
    }, [MySchoolDetails]);
    const pickImageAsync = async (value: any) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            if (value === "logo") {
                setValue(value, result.assets[0].base64);
                setSelectedLogo(result.assets[0]?.uri);
            } else {
                setValue(value, result.assets[0].base64);
                setSelectedBanner(result.assets[0]?.uri);
            }
        } else {
            alert(`${t("you_did_not_select_any_image")}`);
        }
    };
    const onSave = (data: any) => {
        const payload = {
            name: data.name,
            phone: data.phoneNumber,
            email: data.email,
            description: data.description,
            remark: data.remark,
        };

        patch(API_URL.school, payload)
            .then((res: any) => {
                ApiSuccessToast(res.message);
                router.push({
                    pathname: `/(home)/(school)`,
                });
            })
            .catch((error: any) => {
                ApiErrorToast(error);
                console.log("error in schooldetails onSave =>", error);
            });
    };
    return (
        <ScrollView>
            <AUIThemedView style={styles.container}>
                <ImageBackground
                    source={{
                        uri:
                            MySchoolDetails?.banner ||
                            selectedBanner ||
                            "https://linguest-assets-dev.s3.ap-south-1.amazonaws.com/1721125318338-2650.jpeg",
                    }}
                    style={styles.banner}
                />
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
                <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <AUIThemedView>
                            <AUIThemedText style={styles.label}>{t("mobile_number")}</AUIThemedText>
                            <AUIInputField
                                onChangeText={onChange}
                                placeholder={t("enter_your_mobile_number")}
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
                    name="email"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <AUIThemedView>
                            <AUIThemedText style={styles.label}>{t("email")}</AUIThemedText>
                            <AUIInputField
                                onChangeText={onChange}
                                placeholder={t("enter_your_mail_id")}
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
                    name="description"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <AUIThemedView>
                            <AUIThemedText style={styles.label}>{t("description")}</AUIThemedText>
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
                <AUIThemedView style={styles.footerContainer}>
                    <AUIThemedView style={styles.buttonContainer}>
                        <AUIButton title={t("clear")} onPress={() => reset()} style={{ width: "48%" }} />
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
    );
};

const styles = StyleSheet.create({
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
    logo: {
        width: 50,
        height: 50,
        borderRadius: 25,
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
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    footerContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        justifyContent: "center",
    },
});

export default SchoolProfile;
