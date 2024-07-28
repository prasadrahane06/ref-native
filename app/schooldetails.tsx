import AUIButton from "@/components/common/AUIButton";
import DropdownComponent from "@/components/common/AUIDropdown";
import AUIInputField from "@/components/common/AUIInputField";
import { AUISafeAreaView } from "@/components/common/AUISafeAreaView";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { ApiErrorToast, ApiSuccessToast } from "@/components/common/AUIToast";
import ImageViewer from "@/components/ImageViewer";
import { inputFieldStyle, signupPageStyles } from "@/constants/Styles";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { Asset } from "expo-asset";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";
import * as Yup from "yup";
import useAxios from "./services/axiosClient";
import { useDispatch } from "react-redux";
import { setLoader, setUser } from "@/redux/globalSlice";
import { storeUserData } from "@/constants/RNAsyncStore";

const schema = Yup.object().shape({
    remark: Yup.string().required("Remark is required"),
    website: Yup.string().required("Website is required"),
    location: Yup.string().required("Location is required"),
    logo: Yup.string().required("Logo is required"),
    banner: Yup.string().required("Banner is required"),
    description: Yup.string().required("Description is required"),
});

export default function SchoolDetails() {
    const { requestFn } = useApiRequest();
    const { patch } = useAxios();
    const dispatch = useDispatch();

    // const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
    const userData = useLangTransformSelector((state: RootState) => state.global.user);

    const router = useRouter();
    const [locationData, setLocationData] = useState([]);
    const [selectedLogo, setSelectedLogo] = useState("");
    const [selectedBanner, setSelectedBanner] = useState("");

    const { setValue, control, handleSubmit } = useForm({
        resolver: yupResolver(schema),
        mode: "all",
        defaultValues: {
            remark: "",
            website: "",
            location: "",
            description: "",
            logo: "",
            banner: "",
        },
    });

    const countryDataForSchool = useLangTransformSelector(
        (state: RootState) => state.api.countryDataForSchool
    );

    useEffect(() => {
        requestFn(API_URL.country, "countryDataForSchool");
    }, []);

    useEffect(() => {
        if (countryDataForSchool && countryDataForSchool.docs) {
            const locationData = countryDataForSchool?.docs?.map((doc: any) => ({
                _id: doc?._id,
                location: doc.name,
            }));

            setLocationData(locationData);
        }
    }, [countryDataForSchool]);

    const onSave = async (data: any) => {
        dispatch(setLoader(true));
        const logoBase64 = `data:image/png;base64,${data.logo}`;
        const bannerBase64 = `data:image/png;base64,${data.banner}`;

        const payload = {
            remark: data.remark,
            website: data.website,
            location: data.location,
            description: data.description,
            logo: logoBase64,
            banner: bannerBase64,
        };

        patch(API_URL.school, payload)
            .then((res: any) => {
                dispatch(setLoader(false));

                if (res.statusCode === 200) {
                    storeUserData("@user-data", {
                        ...res?.data,
                    }).then(() => {
                        dispatch(setUser({ ...userData, ...res?.data }));
                        ApiSuccessToast(res.message);
                        router.replace({
                            pathname: `(home)/(school)`,
                        });
                    });
                }
            })
            .catch((error: any) => {
                dispatch(setLoader(false));
                ApiErrorToast(error.response?.data?.message);
                console.log("error in schooldetails onSave =>", error);
            });
    };

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
                                                <AUIThemedText
                                                    style={styles.fieldError}
                                                    type="subtitle"
                                                >
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
                                    <AUIThemedView style={{ marginTop: 10 }}>
                                        <AUIInputField
                                            value={value}
                                            onChangeText={onChange}
                                            placeholder="Enter your website"
                                            label="Website"
                                        />
                                        <AUIThemedView>
                                            {error && (
                                                <AUIThemedText
                                                    style={styles.fieldError}
                                                    type="subtitle"
                                                >
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
                                                <AUIThemedText
                                                    style={styles.fieldError}
                                                    type="subtitle"
                                                >
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

                                        <AUIThemedView>
                                            {error && (
                                                <AUIThemedText
                                                    style={styles.fieldError}
                                                    type="subtitle"
                                                >
                                                    {error.message}
                                                </AUIThemedText>
                                            )}
                                        </AUIThemedView>
                                    </AUIThemedView>
                                )}
                            />

                            <Controller
                                name="logo"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <AUIThemedView>
                                        <AUIThemedText style={inputFieldStyle.label}>
                                            Pick your school logo
                                        </AUIThemedText>

                                        <AUIThemedView>
                                            {error && (
                                                <AUIThemedText
                                                    style={{
                                                        color: "red",
                                                        fontSize: 12,
                                                    }}
                                                    type="subtitle"
                                                >
                                                    {error.message}
                                                </AUIThemedText>
                                            )}
                                        </AUIThemedView>

                                        <AUIThemedView style={styles.imageContainer}>
                                            <ImageViewer
                                                selectedImage={selectedLogo}
                                                style={{ width: 200, height: 200 }}
                                            />
                                        </AUIThemedView>

                                        <AUIThemedView style={{ marginTop: 20 }}>
                                            <AUIButton
                                                title="Choose a photo"
                                                onPress={() => pickImageAsync("logo")}
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
                                        <AUIThemedText style={inputFieldStyle.label}>
                                            School Banner
                                        </AUIThemedText>
                                        <AUIThemedView>
                                            {error && (
                                                <AUIThemedText
                                                    style={{
                                                        color: "red",
                                                        fontSize: 12,
                                                    }}
                                                    type="subtitle"
                                                >
                                                    {error.message}
                                                </AUIThemedText>
                                            )}
                                        </AUIThemedView>

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
                                                title="Choose a photo"
                                                onPress={() => pickImageAsync("banner")}
                                            />
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
        fontSize: 12,
    },
});
