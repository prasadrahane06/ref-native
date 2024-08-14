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
import { City, Country, State } from "country-state-city";
import { DETAILS_FIELDS } from "@/constants/Properties";
import CustomTooltip from "@/components/common/AUIToolTip";
import { Ionicons } from "@expo/vector-icons";
import { APP_THEME } from "@/constants/Colors";
import { useTranslation } from "react-i18next";

const schema = Yup.object().shape({
    remark: Yup.string().required("Remark is required"),
    website: Yup.string().required("Website is required"),
    description: Yup.string().required("Description is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().optional(),
    state: Yup.string().required("State is required"),
    zip: Yup.string().required("Zip is required"),
    street: Yup.string().required("Street is required"),
    logo: Yup.string().required("Logo is required"),
    banner: Yup.string().required("Banner is required"),
});

interface LocationData {
    _id: string;
    location: string;
}

export default function SchoolDetails() {
    const { requestFn } = useApiRequest();
    const { patch } = useAxios();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const router = useRouter();

    // const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
    const userData = useLangTransformSelector((state: RootState) => state.global.user);

    const [locationData, setLocationData] = useState<LocationData[]>([]);
    const [selectedLogo, setSelectedLogo] = useState("");
    const [selectedBanner, setSelectedBanner] = useState("");

    const [selectedCountry, setSelectedCountry] = useState<any>(null);
    const [selectedState, setSelectedState] = useState<any>(null);
    const [selectedCity, setSelectedCity] = useState<any>(null); // DONT REMOVE IT, IT IS USED IN COUNTRY AND STATE

    const allCountries = Country.getAllCountries();
    const states = selectedCountry ? State.getStatesOfCountry(selectedCountry) : [];
    const cities = selectedState ? City.getCitiesOfState(selectedCountry, selectedState) : [];

    const { setValue, control, handleSubmit } = useForm({
        resolver: yupResolver(schema),
        mode: "all",
        defaultValues: {
            remark: "",
            website: "",
            description: "",
            country: "",
            city: "",
            state: "",
            zip: "",
            street: "",
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

        const country = data.country;
        const state = data.state;
        const city = data.city;

        const countryName = Country.getCountryByCode(country)?.name;
        const stateName = State.getStateByCodeAndCountry(state, country)?.name;

        const logoBase64 = `data:image/png;base64,${data.logo}`;
        const bannerBase64 = `data:image/png;base64,${data.banner}`;

        const locationId = locationData.find((loc: any) => loc.location === countryName)?._id;

        const payload: any = {
            id: userData?.client,
            remark: data.remark,
            website: data.website,
            description: data.description,
            logo: logoBase64,
            banner: bannerBase64,
            country: countryName,
            state: stateName,
            zip: data.zip,
            street: data.street,
        };

        if (locationId) {
            payload.location = locationId;
        }

        if (city) {
            payload.city = city;
        }

        patch(API_URL.school, payload)
            .then((res: any) => {
                dispatch(setLoader(false));

                if (res.statusCode === 200) {
                    storeUserData("@user-data", {
                        ...res?.data,
                    }).then(() => {
                        dispatch(setUser({ ...userData, ...res?.data }));
                        ApiSuccessToast(res.message);

                        router.dismissAll();
                        router.replace("/(home)/(school)");
                    });
                }
            })
            .catch((error: any) => {
                dispatch(setLoader(false));
                console.log("error in schooldetails onSave =>", error);

                if (error.response?.status === 413) {
                    ApiErrorToast(t("image_too_large"));
                    return;
                }

                ApiErrorToast(error.response?.data?.message);
            });
    };

    const pickImageAsync = async (value: any) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            allowsEditing: true,
            quality: 0.5,
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
                                    <AUIThemedView style={styles.fieldSpacing}>
                                        <AUIThemedView
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                gap: 5,
                                            }}
                                        >
                                            <AUIThemedText>Remark</AUIThemedText>
                                            <CustomTooltip
                                                text={`A remark is a short description of your school`}
                                                tooltipStyle={{ padding: 15 }}
                                            >
                                                <Ionicons
                                                    name="information-circle-outline"
                                                    size={20}
                                                    color={APP_THEME.light.primary.first}
                                                />
                                            </CustomTooltip>
                                        </AUIThemedView>
                                        <AUIInputField
                                            value={value}
                                            onChangeText={onChange}
                                            placeholder="Enter your remark"
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
                                    <AUIThemedView style={styles.fieldSpacing}>
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
                                    <AUIThemedView style={styles.fieldSpacing}>
                                        <AUIThemedView
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                gap: 5,
                                            }}
                                        >
                                            <AUIThemedText>Description</AUIThemedText>
                                            <CustomTooltip
                                                text={`A brief description of your school`}
                                                tooltipStyle={{ padding: 15 }}
                                            >
                                                <Ionicons
                                                    name="information-circle-outline"
                                                    size={20}
                                                    color={APP_THEME.light.primary.first}
                                                />
                                            </CustomTooltip>
                                        </AUIThemedView>

                                        <AUIInputField
                                            value={value}
                                            onChangeText={onChange}
                                            placeholder="Enter your description"
                                            multiline
                                            numberOfLines={3}
                                            blurOnSubmit={false}
                                            returnKeyType="default"
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

                            {/* <Controller
                                name="location"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <AUIThemedView style={styles.fieldSpacing}>
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
                            /> */}

                            <Controller
                                name="country"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <AUIThemedView>
                                        <DropdownComponent
                                            label={DETAILS_FIELDS.country.label}
                                            list={allCountries.map((country) => ({
                                                label: country.name,
                                                value: country.isoCode,
                                            }))}
                                            //@ts-ignore
                                            value={value}
                                            //@ts-ignore
                                            setValue={({ value }) => {
                                                onChange(value);
                                                setSelectedCountry(value);

                                                // Automatically map the country to the corresponding location ID
                                                // const selectedCountryName =
                                                //     Country.getCountryByCode(value)?.name;
                                                // const locationId = locationData.find(
                                                //     (loc) => loc.location === selectedCountryName
                                                // )?._id;
                                                // setValue("location", locationId); // Set the location ID in the form
                                            }}
                                            labelField="label"
                                            valueField="value"
                                            listWithIcon
                                            placeholder={"Select your country"}
                                            position="top"
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
                                name="state"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <AUIThemedView>
                                        <DropdownComponent
                                            label={DETAILS_FIELDS.state.label}
                                            //@ts-ignore
                                            list={states?.map((state) => ({
                                                label: state.name,
                                                value: state.isoCode,
                                            }))}
                                            value={value}
                                            //@ts-ignore
                                            setValue={({ value }) => {
                                                onChange(value);
                                                setSelectedState(value);
                                            }}
                                            labelField="label"
                                            valueField="value"
                                            placeholder={"Select your state"}
                                            listWithIcon
                                            position="top"
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
                                name="city"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <AUIThemedView>
                                        <DropdownComponent
                                            label={`${DETAILS_FIELDS.city.label} (optional)`}
                                            list={cities.map((city) => ({
                                                label: city.name,
                                                value: city.name,
                                            }))}
                                            value={value}
                                            //@ts-ignore
                                            setValue={({ value }) => {
                                                onChange(value);
                                                setSelectedCity(value);
                                            }}
                                            labelField="label"
                                            valueField="value"
                                            listWithIcon
                                            placeholder={"Select your city"}
                                            position="top"
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
                                name="zip"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <AUIThemedView style={styles.fieldSpacing}>
                                        <AUIInputField
                                            value={value}
                                            onChangeText={onChange}
                                            placeholder="Enter your zipcode"
                                            label="Zipcode"
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
                                name="street"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <AUIThemedView style={styles.fieldSpacing}>
                                        <AUIInputField
                                            value={value}
                                            onChangeText={onChange}
                                            placeholder="Enter your street name"
                                            label="Street Name"
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
                                    <AUIThemedView style={styles.fieldSpacing}>
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
                                                borderColor={APP_THEME.light.primary.first}
                                                style={{
                                                    borderWidth: 1,
                                                    borderColor: APP_THEME.light.primary.first,
                                                }}
                                            />
                                        </AUIThemedView>
                                    </AUIThemedView>
                                )}
                            />

                            <Controller
                                name="banner"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <AUIThemedView style={styles.fieldSpacing}>
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
                                                placeholderImageSource={Asset.fromModule(
                                                    require("@/assets/images/favicon.png")
                                                )}
                                                style={{ width: 350, height: 200 }}
                                            />
                                        </AUIThemedView>

                                        <AUIThemedView style={{ marginTop: 20 }}>
                                            <AUIButton
                                                title="Choose a photo"
                                                onPress={() => pickImageAsync("banner")}
                                                borderColor={APP_THEME.light.primary.first}
                                                style={{
                                                    borderWidth: 1,
                                                    borderColor: APP_THEME.light.primary.first,
                                                }}
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
    fieldSpacing: {
        marginBottom: 10,
    },
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
