import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import DATA from "@/app/services/data.json";
import AUIButton from "@/components/common/AUIButton";
import DropdownComponent from "@/components/common/AUIDropdown";
import { AUISafeAreaView } from "@/components/common/AUISafeAreaView";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { DETAILS_FIELDS, GLOBAL_TEXT } from "@/constants/Properties";
import { inputFieldStyle, signupPageStyles } from "@/constants/Styles";
import { setSignupDetails } from "@/redux/globalSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Platform, ScrollView } from "react-native";
import "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import AUIInputField from "@/components/common/AUIInputField";
import useApiRequest from "@/customHooks/useApiRequest";
import { API_URL } from "@/constants/urlProperties";
import * as ImagePicker from "expo-image-picker";
import ImageViewer from "@/components/ImageViewer";
import { Asset } from "expo-asset";

const schema = Yup.object().shape({
    remark: Yup.string().required("Remark is required"),
    website: Yup.string().required("Website is required"),
    location: Yup.string().required("Location is required"),
    logo: Yup.string().required("Logo is required"),
    banner: Yup.string().required("Banner is required"),
    description: Yup.string().required("Description is required"),
});

export default function schooldetails() {
    const { requestFn } = useApiRequest();

    const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
    const router = useRouter();
    const profile = useSelector((state: RootState) => state.global.profile);
    const [locationData, setLocationData] = useState([]);
    const [selectedLogo, setSelectedLogo] = useState("");
    const [selectedBanner, setSelectedBanner] = useState("");

    console.log("location data => ", locationData);

    const { watch, reset, setValue, control, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            remark: "",
            website: "",
            location: "",
            logo: "",
            banner: "",
            description: "",
        },
    });

    const countryDataForSchool = useSelector((state: RootState) => state.api.countryDataForSchool);

    useEffect(() => {
        requestFn(API_URL.country, "countryDataForSchool");
    }, []);

    console.log("countryDataForSchool => ", JSON.stringify(countryDataForSchool));

    useEffect(() => {
        if (countryDataForSchool && countryDataForSchool.docs) {
            const locationData = countryDataForSchool?.docs?.map((doc: any) => ({
                _id: doc._id,
                location: doc.name.en,
            }));

            setLocationData(locationData);
        }
    }, [countryDataForSchool]);

    const pickImageAsync = async (value: any, imageType: any) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            if (imageType === "logo") {
                setSelectedLogo(result.assets[0].uri);
                setValue(value, result.assets[0].uri);
                console.log("image selected data =>", result);
            } else {
                setSelectedBanner(result.assets[0].uri);
                setValue(value, result.assets[0].uri);
                console.log("image selected data =>", result);
            }
        } else {
            alert("You did not select any image.");
        }
    };

    const onSave = (data: any) => {
        console.log("schooldetails form data", data);
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
                                        <Text style={inputFieldStyle.label}>Location</Text>
                                        {/* @ts-ignore */}
                                        <DropdownComponent
                                            // @ts-ignore
                                            list={locationData}
                                            // @ts-ignore
                                            value={value}
                                            setValue={({ _id }: { _id: string }) => onChange(_id)}
                                            labelField="location"
                                            valueField="_id"
                                            placeholder="Select your location"
                                            position="top"
                                            listWithIcon
                                        />
                                    </AUIThemedView>
                                )}
                            />

                            <Controller
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
                                            />
                                        </AUIThemedView>

                                        <AUIThemedView>
                                            <AUIButton
                                                selected
                                                title="Choose a photo"
                                                onPress={() => pickImageAsync("logo", "logo")}
                                            />
                                            {/* <AUIButton title="Use this photo" /> */}
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
                                            />
                                        </AUIThemedView>

                                        <AUIThemedView>
                                            <AUIButton
                                                selected
                                                title="Choose a photo"
                                                onPress={() => pickImageAsync("banner", "banner")}
                                            />
                                            {/* <AUIButton title="Use this photo" /> */}
                                        </AUIThemedView>
                                    </AUIThemedView>
                                )}
                            />
                        </AUIThemedView>

                        <AUIThemedView
                            style={[signupPageStyles.buttonContainer, { marginBottom: 20 }]}
                        >
                            <AUIButton
                                title={"Submit"}
                                disabled={!formState.isValid}
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
