import AUIBackgroundImage from "@/components/common/AUIBackgroundImage";
import AUIButton from "@/components/common/AUIButton";
import DropdownComponent from "@/components/common/AUIDropdown";
import AUIImage from "@/components/common/AUIImage";
import AUIInputField from "@/components/common/AUIInputField";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { ApiErrorToast, ApiSuccessToast } from "@/components/common/AUIToast";
import { APP_THEME, BACKGROUND_THEME } from "@/constants/Colors";
import { storeUserData } from "@/constants/RNAsyncStore";
import { API_URL } from "@/constants/urlProperties";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { setResponse } from "@/redux/apiSlice";
import { setLoader, setUser } from "@/redux/globalSlice";
import { RootState } from "@/redux/store";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { City, Country, State } from "country-state-city";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import useAxios from "./services/axiosClient";

const SchoolProfile = () => {
    const { patch } = useAxios();
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const user = useLangTransformSelector((state: RootState) => state.global.user);
    const theme = useSelector((state: RootState) => state.global.theme);
    const mySchoolDetails = useLangTransformSelector(
        (state: RootState) => state.api.MySchoolDetails
    );
    const countryDataForSchool = useLangTransformSelector(
        (state: RootState) => state.api.countryDataForSchool
    );

    const [banner, setBanner] = useState<string | null>(mySchoolDetails?.banner);
    const [logo, setLogo] = useState<string | null>(mySchoolDetails?.logo);

    const [bannerBase64, setBannerBase64] = useState<any>(null);
    const [logoBase64, setLogoBase64] = useState<any>(null);

    const [locationData, setLocationData] = useState<any>([]);

    const [selectedCountry, setSelectedCountry] = useState<any>(null);
    const [selectedState, setSelectedState] = useState<any>(null);
    const [selectedCity, setSelectedCity] = useState<any>(null);

    const country = mySchoolDetails?.country;
    const state = mySchoolDetails?.state;

    const countryCode = Country.getAllCountries().find((c) => c.name === country)?.isoCode || "SA";
    const stateCode =
        State.getStatesOfCountry(countryCode).find((s) => s.name === state)?.isoCode || "01";
    const allStatesOfCountry = State.getStatesOfCountry(countryCode);
    const allCitiesOfState = City.getCitiesOfState(countryCode, stateCode);

    const allCountries = Country.getAllCountries();
    const states = selectedCountry ? State.getStatesOfCountry(selectedCountry) : allStatesOfCountry;
    const cities = selectedState
        ? City.getCitiesOfState(selectedCountry, selectedState)
        : allCitiesOfState;

    const schema = Yup.object().shape({
        name: Yup.string().required(`${t("name_is_required")}`),
        description: Yup.string().required(`${t("description_is_required")}`),
        remark: Yup.string().required(`${t("remark_is_required")}`),
        website: Yup.string().required(`${t("website_is_required")}`),
        country: Yup.string().required(`${t("country_is_required")}`),
        city: Yup.string().optional(),
        state: Yup.string().required(`${t("state_is_required")}`),
        zip: Yup.string().required(`${t("zip_is_required")}`),
        street: Yup.string().required(`${t("street_is_required")}`),
    });

    const { reset, control, handleSubmit, formState, setValue } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            name: mySchoolDetails?.name,
            description: mySchoolDetails?.description,
            remark: mySchoolDetails?.remark,
            website: mySchoolDetails?.website,
            country: countryCode,
            state: stateCode,
            city: mySchoolDetails?.city,
            zip: mySchoolDetails?.zip,
            street: mySchoolDetails?.street,
        },
    });

    useEffect(() => {
        if (countryDataForSchool && countryDataForSchool.docs) {
            const locationData = countryDataForSchool?.docs?.map((doc: any) => ({
                _id: doc?._id,
                location: doc.name,
            }));

            setLocationData(locationData);
        }
    }, [countryDataForSchool]);

    useEffect(() => {
        if (mySchoolDetails && reset) {
            reset({
                name: mySchoolDetails?.name,
                description: mySchoolDetails?.description,
                remark: mySchoolDetails?.remark,
                website: mySchoolDetails?.website,
            });
            setLogo(mySchoolDetails?.logo);
            setBanner(mySchoolDetails?.banner);
        }
    }, [mySchoolDetails, reset]);

    const resetState = (value: string) => {
        setSelectedCountry(value);
        setSelectedState(null);
        setSelectedCity(null);
        setValue("state", "");
        setValue("city", "");
        setValue("zip", "");
        setValue("street", "");
    };

    const pickImageAsync = async (value: any) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            allowsEditing: true,
            quality: 0.5,
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

        const country = data.country;
        const state = data.state;
        const city = data.city;

        const countryName = Country.getCountryByCode(country)?.name;
        const stateName = State.getStateByCodeAndCountry(state, country)?.name;

        const locationId = locationData.find((loc: any) => loc.location === countryName)?._id;

        let updatedCity = city;

        if (
            country === mySchoolDetails?.countryCode &&
            state === mySchoolDetails?.stateCode &&
            city === mySchoolDetails?.city
        ) {
            updatedCity = mySchoolDetails?.city;
        }

        if (!selectedCity) {
            updatedCity = stateName;
        }

        const payload: any = {
            name: data.name,
            description: data.description,
            remark: data.remark,
            website: data.website,
            country: countryName,
            state: stateName,
            city: updatedCity,
            zip: data.zip,
            street: data.street,
        };

        if (locationId) {
            payload.location = locationId;
        }

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
                dispatch(setResponse({ storeName: "MySchoolDetails", data: res?.data }));
                ApiSuccessToast(res.message);
                dispatch(setLoader(false));
            })
            .catch((error: any) => {
                dispatch(setLoader(false));
                console.log("error in school profile save", error);

                if (error.response?.status === 413) {
                    ApiErrorToast(t("image_too_large"));
                    return;
                }

                ApiErrorToast(error.message);
            });
    };

    const handleRemovepic = (type: string) => {
        Alert.alert(
            type === "banner" ? t("delete_banner") : t("delete_logo"),
            type === "banner"
                ? t("profileBanner_delete_confirmation")
                : t("profileLogo_delete_confirmation"),
            [
                {
                    text: `${t("cancel")}`,
                    onPress: () => console.log("Remove cancelled"),
                    style: "cancel",
                },
                {
                    text: `${t("confirm_delete")}`,
                    onPress: () => {
                        if (!type) return;

                        dispatch(setLoader(true));

                        const payload = {
                            id: mySchoolDetails?._id,
                            [type]: "",
                        };

                        patch(API_URL.school, payload)
                            .then((res: any) => {
                                dispatch(setLoader(false));

                                storeUserData("@user-data", {
                                    ...res?.data,
                                });
                                dispatch(setUser(res?.data));
                                dispatch(
                                    setResponse({ storeName: "MySchoolDetails", data: res?.data })
                                );
                                ApiSuccessToast(
                                    `${type === "logo" ? "Logo" : "Banner"} deleted successfully`
                                );
                            })
                            .catch((error: any) => {
                                dispatch(setLoader(false));
                                console.log("error in school profile delete", error);
                                ApiErrorToast(
                                    `Failed to delete ${type === "logo" ? "logo" : "banner"}`
                                );
                            });
                    },
                    style: "destructive",
                },
            ],
            { cancelable: false }
        );
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
                    <AUIThemedView>
                        <AUIThemedText style={styles.label}>School Logo</AUIThemedText>
                        <AUIThemedView style={styles.logoWrapper}>
                            <TouchableOpacity onPress={() => pickImageAsync("logo")}>
                                <AUIImage path={logo} style={styles.logo} />
                                <AUIThemedView style={styles.halfCircleOverlay}>
                                    <Feather
                                        name="edit"
                                        size={24}
                                        color={APP_THEME.light.background}
                                        style={{
                                            alignSelf: "center",
                                            marginTop: 10,
                                        }}
                                    />
                                </AUIThemedView>
                            </TouchableOpacity>
                            {logo && (
                                <TouchableOpacity
                                    style={styles.logoCloseIcon}
                                    onPress={() => {
                                        handleRemovepic("logo");
                                    }}
                                >
                                    <MaterialCommunityIcons
                                        name="delete-forever"
                                        size={24}
                                        color="red"
                                    />
                                </TouchableOpacity>
                            )}
                        </AUIThemedView>
                    </AUIThemedView>

                    <AUIThemedView>
                        <TouchableOpacity onPress={() => pickImageAsync("banner")}>
                            <AUIThemedText style={styles.label}>School Banner</AUIThemedText>
                            <AUIBackgroundImage path={banner} style={styles.banner} />
                            <AUIThemedView style={styles.bannerOverlay}>
                                <Feather
                                    name="edit"
                                    size={24}
                                    color={APP_THEME.light.background}
                                    style={{
                                        alignSelf: "center",
                                        marginTop: 10,
                                    }}
                                />
                            </AUIThemedView>
                        </TouchableOpacity>
                        {banner && (
                            <TouchableOpacity
                                style={styles.closeIcon}
                                onPress={() => {
                                    handleRemovepic("banner");
                                }}
                            >
                                <MaterialCommunityIcons
                                    name="delete-forever"
                                    size={24}
                                    color="red"
                                />
                            </TouchableOpacity>
                        )}
                    </AUIThemedView>

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
                            value={mySchoolDetails?.phone}
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
                            value={mySchoolDetails?.email}
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

                    <Controller
                        name="country"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AUIThemedView>
                                <AUIThemedText style={styles.label}>{t("country")}</AUIThemedText>
                                {/* @ts-ignore */}
                                <DropdownComponent
                                    list={allCountries.map((country) => ({
                                        label: country.name,
                                        value: country.isoCode,
                                    }))}
                                    //@ts-ignore
                                    value={value}
                                    //@ts-ignore
                                    setValue={({ value }) => {
                                        onChange(value);
                                        resetState(value);

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
                                />

                                <AUIThemedView>
                                    {error && (
                                        <AUIThemedText style={styles.fieldError} type="subtitle">
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
                                <AUIThemedText style={styles.label}>{t("state")}</AUIThemedText>
                                {/* @ts-ignore */}
                                <DropdownComponent
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
                                />
                                <AUIThemedView>
                                    {error && (
                                        <AUIThemedText style={styles.fieldError} type="subtitle">
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
                                <AUIThemedText style={styles.label}>
                                    {t("city")} (optional)
                                </AUIThemedText>
                                {/* @ts-ignore */}
                                <DropdownComponent
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
                                />
                                <AUIThemedView>
                                    {error && (
                                        <AUIThemedText style={styles.fieldError} type="subtitle">
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
                            <AUIThemedView>
                                <AUIThemedText style={styles.label}>{t("zipCode")}</AUIThemedText>
                                <AUIInputField
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="Enter your zipcode"
                                />
                                <AUIThemedView>
                                    {error && (
                                        <AUIThemedText style={styles.fieldError} type="subtitle">
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
                            <AUIThemedView>
                                <AUIThemedText style={styles.label}>{t("street")}</AUIThemedText>
                                <AUIInputField
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="Enter your street name"
                                />
                                <AUIThemedView>
                                    {error && (
                                        <AUIThemedText style={styles.fieldError} type="subtitle">
                                            {error.message}
                                        </AUIThemedText>
                                    )}
                                </AUIThemedView>
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
    logoWrapper: {
        width: 100,
        height: 100,
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    logoContainer: {
        position: "absolute",
        bottom: -25,
        left: "50%",
        transform: [{ translateX: -25 }],
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: "hidden",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
    logoCloseIcon: {
        position: "absolute",
        right: -2,
        top: -10,
        backgroundColor: APP_THEME.light.lightGray,
        borderRadius: 20,
        padding: 2,
    },
    closeIcon: {
        position: "absolute",
        right: -5,
        top: 25,
        backgroundColor: APP_THEME.light.lightGray,
        borderRadius: 20,
        padding: 2,
    },
    halfCircleOverlay: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: 100,
        height: 50,
        backgroundColor: "rgba(91, 216, 148, 0.4)",
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    bannerOverlay: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 90,
        backgroundColor: "rgba(91, 216, 148, 0.5)",
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
