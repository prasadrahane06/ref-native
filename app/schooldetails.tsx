import { View, Text, StyleSheet, ScrollView, Platform, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "expo-router";
import DATA from "@/app/services/data.json";
import AUIButton from "@/components/common/AUIButton";
import DropdownComponent from "@/components/common/AUIDropdown";
import { AUISafeAreaView } from "@/components/common/AUISafeAreaView";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { inputFieldStyle, signupPageStyles } from "@/constants/Styles";
import AUIInputField from "@/components/common/AUIInputField";
import { RootState } from "@/redux/store";
import useApiRequest from "@/customHooks/useApiRequest";
import { API_URL } from "@/constants/urlProperties";
import { ApiErrorToast, ApiSuccessToast } from "@/components/common/AUIToast";
import useAxios from "./services/axiosClient";
import { getUserData } from "@/constants/RNAsyncStore";
import axios from "axios";
import { setToken } from "@/redux/globalSlice";
import ImageViewer from "@/components/ImageViewer";
import * as ImagePicker from "expo-image-picker";
import { Asset } from "expo-asset";
import { t } from "i18next";

const schema = Yup.object().shape({
    remark: Yup.string().required("Remark is required"),
    website: Yup.string().required("Website is required"),
    location: Yup.string().required("Location is required"),
    // logo: Yup.string().required("Logo is required"),
    // banner: Yup.string().required("Banner is required"),
    description: Yup.string().required("Description is required"),
});

export default function SchoolDetails() {
    const { requestFn } = useApiRequest();
    const { patch } = useAxios();
    const dispatch = useDispatch();

    const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
    const router = useRouter();
    const profile = useSelector((state: RootState) => state.global.profile);
    const [locationData, setLocationData] = useState([]);
    const [selectedLogo, setSelectedLogo] = useState("");
    const [selectedBanner, setSelectedBanner] = useState("");

    const { watch, reset, setValue, control, handleSubmit, formState, getValues } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            remark: "",
            website: "",
            location: "",
            description: "",
            // logo: "",
            // banner: "",
        },
    });
    console.log("form data", getValues());

    const countryDataForSchool = useSelector((state: RootState) => state.api.countryDataForSchool);

    useEffect(() => {
        requestFn(API_URL.country, "countryDataForSchool");
    }, []);

    useEffect(() => {
        if (countryDataForSchool && countryDataForSchool.docs) {
            const locationData = countryDataForSchool?.docs?.map((doc: any) => ({
                _id: doc._id,
                location: doc.name.en,
            }));

            setLocationData(locationData);
        }
    }, [countryDataForSchool]);

    const onSave = async (data: any) => {
        // console.log("schooldetails form data", data);

        patch(API_URL.popularSchool, data)
            .then((response: any) => {
                console.log("schooldetails response =>", response);
                ApiSuccessToast("School Details has been saved successfully");
                router.push({
                    pathname: `(home)/(school)`,
                });
            })
            .catch((error: any) => {
                ApiErrorToast(error);
                console.log("error in schooldetails onSave =>", error);
            });
    };

    const pickImageAsync = async (value: any, imageType: any) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            if (imageType === "logo") {
                setSelectedLogo(result.assets[0].uri);
                setValue(value, result.assets[0].base64);
                console.log("logo image selected data =>", result);
            } else {
                setSelectedBanner(result.assets[0].uri);
                setValue(value, result.assets[0].base64);
                console.log("banner image selected data =>", result);
            }
        } else {
            alert("You did not select any image.");
        }
    };

    return (
        <AUISafeAreaView edges={["bottom"]}>
            <ScrollView>
                <AUIThemedView style={signupPageStyles.container}>
                    <AUIThemedText style={signupPageStyles.heading}>
                        Enter Your School Details
                    </AUIThemedText>
                    <AUIThemedView style={signupPageStyles.formLayout}>
                        <AUIThemedView style={signupPageStyles.fieldContainer}>
                            <Controller
                                name="remark"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <AUIThemedView>
                                        <AUIInputField
                                            value={value}
                                            onChangeText={onChange}
                                            placeholder="Enter your remark"
                                            label="Remark"
                                        />
                                        <AUIThemedView>
                                            {error && (
                                                <AUIThemedText style={styles.fieldError}>
                                                    {error.message}
                                                </AUIThemedText>
                                            )}
                                        </AUIThemedView>
                                    </AUIThemedView>
                                )}
                            />

                            <Controller
                                name="website"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <AUIThemedView>
                                        <AUIInputField
                                            value={value}
                                            onChangeText={onChange}
                                            placeholder="Enter your website"
                                            label="Website"
                                        />
                                        <AUIThemedView>
                                            {error && (
                                                <AUIThemedText style={styles.fieldError}>
                                                    {error.message}
                                                </AUIThemedText>
                                            )}
                                        </AUIThemedView>
                                    </AUIThemedView>
                                )}
                            />

                            <Controller
                                name="description"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <AUIThemedView>
                                        <AUIInputField
                                            value={value}
                                            onChangeText={onChange}
                                            placeholder="Enter your description"
                                            label="Description"
                                        />
                                        <AUIThemedView>
                                            {error && (
                                                <AUIThemedText style={styles.fieldError}>
                                                    {error.message}
                                                </AUIThemedText>
                                            )}
                                        </AUIThemedView>
                                    </AUIThemedView>
                                )}
                            />

                            <Controller
                                name="location"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <AUIThemedView
                                        style={{
                                            paddingBottom: 20,
                                        }}
                                    >
                                        <DropdownComponent
                                            list={locationData}
                                            value={value}
                                            setValue={({ _id }: { _id: string }) => onChange(_id)}
                                            label="Select your location"
                                            labelField="location"
                                            valueField="_id"
                                            placeholder="Select your location"
                                            position="top"
                                            listWithIcon
                                        />
                                    </AUIThemedView>
                                )}
                            />

                            {/* <Controller
                                name="logo"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <AUIThemedView>
                                        <Text style={inputFieldStyle.label}>
                                            Pick your school logo
                                        </Text>
                                        <AUIThemedView style={styles.imageContainer}>
                                            <ImageViewer
                                                selectedImage={selectedLogo}
                                                placeholderImageSource={
                                                    Asset.fromModule(
                                                        require("@/assets/images/favicon.png")
                                                    ).uri
                                                }
                                                style={{ width: 200, height: 200 }}
                                            />
                                        </AUIThemedView>

                                        <AUIThemedView style={{ marginTop: 20 }}>
                                            <AUIButton
                                                selected
                                                title="Choose a photo"
                                                onPress={() => pickImageAsync("logo", "logo")}
                                            />
                                        </AUIThemedView>
                                    </AUIThemedView>
                                )}
                            />

                            <Controller
                                name="banner"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <AUIThemedView>
                                        <Text style={inputFieldStyle.label}>School Banner</Text>
                                        <AUIThemedView style={styles.imageContainer}>
                                            <ImageViewer
                                                selectedImage={selectedBanner}
                                                placeholderImageSource={
                                                    Asset.fromModule(
                                                        require("@/assets/images/favicon.png")
                                                    ).uri
                                                }
                                                style={{ width: 350, height: 200 }}
                                            />
                                        </AUIThemedView>

                                        <AUIThemedView style={{ marginTop: 20 }}>
                                            <AUIButton
                                                selected
                                                title="Choose a photo"
                                                onPress={() => pickImageAsync("banner", "banner")}
                                            />
                                        </AUIThemedView>
                                    </AUIThemedView>
                                )}
                            /> */}
                        </AUIThemedView>

                        <AUIThemedView
                            style={[signupPageStyles.buttonContainer, { marginBottom: 20 }]}
                        >
                            <AUIButton
                                title={"Submit"}
                                // disabled={!formState.isValid}
                                selected
                                style={{ width: "100%" }}
                                onPress={handleSubmit(onSave)}
                            />
                        </AUIThemedView>
                    </AUIThemedView>
                </AUIThemedView>
            </ScrollView>
        </AUISafeAreaView>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    fieldError: {
        position: "absolute",
        color: "red",
        fontSize: 13,
    },
});
