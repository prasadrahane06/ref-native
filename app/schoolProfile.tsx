import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Image, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { useLangTransformSelector } from '@/customHooks/useLangTransformSelector';
import { RootState } from '@/redux/store';
import AUIInputField from "@/components/common/AUIInputField";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import AUIButton from '@/components/common/AUIButton';
import { GLOBAL_TEXT } from "@/constants/Properties";
import { AUIThemedView } from '@/components/common/AUIThemedView';
import useAxios from './services/axiosClient';
import { API_URL } from '@/constants/urlProperties';
import { ApiErrorToast, ApiSuccessToast } from '@/components/common/AUIToast';
import AUIImage from '@/components/common/AUIImage';
import { router } from 'expo-router';
const SchoolProfile = () => {
    const userProfileData = useLangTransformSelector(
        (state: RootState) => state.api.userProfileData
    );
    const [selectedLogo, setSelectedLogo] = useState("");
    const [selectedBanner, setSelectedBanner] = useState("");
    const { patch } = useAxios();
    const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        phoneNumber: Yup.string().required(GLOBAL_TEXT.validate_mobile),
        email: Yup.string().email(GLOBAL_TEXT.validate_email).required(GLOBAL_TEXT.validate_email),
        description: Yup.string().required("Description is required"),
        logo: Yup.string().required("Logo is required"),
        banner: Yup.string().required("Banner is required"),
        remark: Yup.string().required("Remark is required"),
    });
    const { watch, reset, setValue, control, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            name: userProfileData?.name,
            phoneNumber: userProfileData?.phone,
            email: userProfileData?.email,
            description: userProfileData?.description,
            remark: userProfileData?.remark,
        },
    });
    const pickImageAsync = async (value: any) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            if (value === "logo") {
                setValue(value, result.assets[0].base64);
                setSelectedLogo(result.assets[0].uri);
            } else {
                setValue(value, result.assets[0].base64);
                setSelectedBanner(result.assets[0].uri);
            }
        } else {
            alert("You did not select any image.");
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
                pathname: `(home)/(school)`,
            });
        })
        .catch((error: any) => {
            ApiErrorToast(error);
            console.log("error in schooldetails onSave =>", error);
        });
    };
    return (
        <ScrollView >
            <AUIThemedView style={styles.container} >
                <ImageBackground
                    source={{ uri: userProfileData?.banner || selectedBanner || "https://linguest-assets-dev.s3.ap-south-1.amazonaws.com/1721125318338-2650.jpeg" }}
                    style={styles.banner}
                >
                    <AUIThemedView style={styles.logoContainer}>
                        <AUIImage
                            source={{ uri: userProfileData?.logo || selectedLogo || "https://linguest-assets-dev.s3.ap-south-1.amazonaws.com/1721125318557-7666.png" }}
                            style={styles.logo}
                        />
                    </AUIThemedView>
                </ImageBackground>
                <Controller
                    name="name"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <AUIThemedView>
                            <AUIThemedText style={styles.label}>Name</AUIThemedText>
                            <AUIInputField
                                onChangeText={onChange}
                                placeholder="Enter Your Name"
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
                            <AUIThemedText style={styles.label}>Mobile Number</AUIThemedText>
                            <AUIInputField
                                onChangeText={onChange}
                                placeholder="Enter Your Mobile Number"
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
                            <AUIThemedText style={styles.label}>Email</AUIThemedText>
                            <AUIInputField
                                onChangeText={onChange}
                                placeholder="Enter Your Mail ID"
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
                            <AUIThemedText style={styles.label}>Description</AUIThemedText>
                            <AUIInputField
                                onChangeText={onChange}
                                placeholder="Enter Description"
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
                            <AUIThemedText style={styles.label}>Remark</AUIThemedText>
                            <AUIInputField
                                onChangeText={onChange}
                                placeholder="Enter Remark"
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
                        <AUIButton title="Clear" onPress={() => reset()} style={{ width: "48%" }} />
                        <AUIButton
                            title="Save"
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
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        position: 'absolute',
        bottom: -25,  // Adjust this value to position the logo over the banner
        left: '50%',
        transform: [{ translateX: -25 }],
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
        backgroundColor: 'white', // Add background color to make logo stand out
        justifyContent: 'center',
        alignItems: 'center',
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
    }
});

export default SchoolProfile;
