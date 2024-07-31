import AUIButton from "@/components/common/AUIButton";
import DropdownComponent from "@/components/common/AUIDropdown";
import AUIImage from "@/components/common/AUIImage";
import AUIInputField from "@/components/common/AUIInputField";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { ApiErrorToast, ApiSuccessToast } from "@/components/common/AUIToast";
import { APP_THEME, BACKGROUND_THEME, TEXT_THEME } from "@/constants/Colors";
import { languagesData } from "@/constants/dummy data/languagesData";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { storeUserData } from "@/constants/RNAsyncStore";
import { API_URL } from "@/constants/urlProperties";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { setResponse } from "@/redux/apiSlice";
import { setLoader, setUser } from "@/redux/globalSlice";
import { RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { City, Country, State } from "country-state-city";
import { Asset } from "expo-asset";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import useAxios from "./services/axiosClient";

const genderData = [
    {
        gender: "Male",
    },
    {
        gender: "Female",
    },
    {
        gender: "Other",
    },
];

const qualificationData = [
    {
        qualification: "High School",
    },
    {
        qualification: "Diploma",
    },
    {
        qualification: "Graduate",
    },
    {
        qualification: "Post Graduation",
    },
];

const academicSessionData = [
    {
        academicSession: "2010-2011",
    },
    {
        academicSession: "2011-2012",
    },
    {
        academicSession: "2012-2013",
    },
    {
        academicSession: "2013-2014",
    },
    {
        academicSession: "2014-2015",
    },
    {
        academicSession: "2015-2016",
    },
    {
        academicSession: "2016-2017",
    },
    {
        academicSession: "2017-2018",
    },
    {
        academicSession: "2018-2019",
    },
    {
        academicSession: "2019-2020",
    },
    {
        academicSession: "2020-2021",
    },
    {
        academicSession: "2021-2022",
    },
    {
        academicSession: "2022-2023",
    },
    {
        academicSession: "2023-2024",
    },
    {
        academicSession: "2024-2025",
    },
];

const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phoneNumber: Yup.string().required(GLOBAL_TEXT.validate_mobile),
    email: Yup.string().email(GLOBAL_TEXT.validate_email).required(GLOBAL_TEXT.validate_email),
    language: Yup.string().required("Language is required"),
    dateOfBirth: Yup.string().required("Date of birth is required"),
    gender: Yup.string().required("Gender is required"),
    qualification: Yup.string().required("Qualification is required"),
    academicSession: Yup.string().required("Academic session is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
});

const Profile: React.FC = () => {
    const { patch } = useAxios();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const userProfileData = useLangTransformSelector(
        (state: RootState) => state.api.userProfileData
    );

    const { from, type, planId, courseId } = useLocalSearchParams<{
        from: string;
        type: string;
        planId: string;
        courseId: string;
    }>();

    if (from === "buyButton" || from === "bookYourSeatButton") {
        ApiSuccessToast("❗Check you profile before making payment");
    }

    const theme = useSelector((state: RootState) => state.global.theme);
    const [dateOfBirth, setDateOfBirth] = useState(
        userProfileData?.dob ? new Date(userProfileData?.dob) : new Date()
    );
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const [profileImage, setProfileImage] = useState<string>(
        userProfileData?.photo || Asset.fromModule(require("@/assets/images/user.png")).uri
    );
    const [profileBase64, setProfileBase64] = useState<any>(null);
    const [selectedCountry, setSelectedCountry] = useState<any>(null);
    const [selectedState, setSelectedState] = useState<any>(null);
    const [selectedCity, setSelectedCity] = useState<any>(null); // DONT REMOVE IT, IT IS USED IN COUNTRY AND STATE

    const country = userProfileData?.country;
    const state = userProfileData?.state;

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

    const { reset, setValue, control, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            name: userProfileData?.name,
            phoneNumber: userProfileData?.phone,
            email: userProfileData?.email,
            language: userProfileData?.language,
            dateOfBirth: dateOfBirth && dateOfBirth?.toISOString(),
            gender: userProfileData?.gender || "",
            qualification: userProfileData?.qualification,
            academicSession: userProfileData?.academicSession,
            country: countryCode,
            state: stateCode,
            city: userProfileData?.city,
        },
    });

    const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || dateOfBirth;
        setShowDatePicker(Platform.OS === "ios");
        setDateOfBirth(currentDate);
        setValue("dateOfBirth", currentDate.toISOString());
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString().slice(-2);

        return `${day}/${month}/${year}`;
    };

    const pickImageAsync = async (value: any) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setProfileBase64(result.assets[0].base64);
            setProfileImage(result.assets[0].uri);
        } else {
            alert("You did not select any image.");
        }
    };

    const onSave = (data: any) => {
        dispatch(setLoader(true));

        const country = data.country;
        const state = data.state;

        const countryName = Country.getCountryByCode(country)?.name;
        const stateName = State.getStateByCodeAndCountry(state, country)?.name;

        const payload: any = {
            id: userProfileData?._id,
            name: data.name,
            phone: data.phoneNumber,
            email: data.email,
            language: data.language,
            dob: data.dateOfBirth,
            gender: data.gender,
            qualification: data.qualification,
            academicSession: data.academicSession,
            country: countryName,
            state: stateName,
            city: data.city,
        };

        if (profileBase64) {
            payload["photo"] = `data:image/png;base64,${profileBase64}`;
        }

        patch(API_URL.user, payload)
            .then((res: any) => {
                storeUserData("@user-data", {
                    ...res?.data,
                });
                dispatch(setUser(res?.data));
                dispatch(setResponse({ storeName: "userProfileData", data: res?.data }));
                ApiSuccessToast(res.message);
                dispatch(setLoader(false));

                if (from === "buyButton") {
                    router.push({
                        pathname: `(home)/courseDetails/purchase/${JSON.stringify({
                            type: type,
                            planId: planId,
                            courseId: courseId,
                        })}`,
                    });
                }

                if (from === "bookYourSeatButton") {
                    router.push({
                        pathname: `(home)/courseDetails/purchase/${JSON.stringify({
                            type: type,
                            planId: planId,
                            courseId: courseId,
                        })}`,
                    });
                }
            })
            .catch((error: any) => {
                dispatch(setLoader(false));
                ApiErrorToast(error.message);
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
                    <TouchableOpacity style={styles.profileImageContainer} onPress={pickImageAsync}>
                        <AUIImage icon path={profileImage} style={[styles.profileImage]} />
                        <Ionicons
                            name="create-outline"
                            size={24}
                            color={APP_THEME.light.primary.first}
                            style={styles.editIcon}
                        />
                    </TouchableOpacity>

                    <Controller
                        name="name"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AUIThemedView>
                                <AUIThemedText style={styles.label}>{t("name")}</AUIThemedText>
                                <AUIInputField
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder={"Enter Your Name"}
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
                        name="phoneNumber"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AUIThemedView>
                                <AUIThemedText style={styles.label}>
                                    {t("mobile_number")}
                                </AUIThemedText>
                                <AUIInputField
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder={"Enter Your Mobile Number"}
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
                        name="email"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AUIThemedView>
                                <AUIThemedText style={styles.label}>{t("email")}</AUIThemedText>
                                <AUIInputField
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder={"Enter Your Mail ID"}
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

                    <AUIThemedView>
                        <AUIThemedText style={styles.label}>{t("date_of_birth")}</AUIThemedText>
                        <Controller
                            name="dateOfBirth"
                            control={control}
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                                <AUIThemedView
                                    style={{
                                        flex: 1,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        borderWidth: 2,
                                        borderColor: "#ccc",
                                        borderRadius: 6,
                                    }}
                                >
                                    <Pressable
                                        onPress={() => setShowDatePicker(true)}
                                        style={{
                                            flex: 1,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            paddingHorizontal: 10,
                                        }}
                                    >
                                        {showDatePicker && (
                                            <DateTimePicker
                                                value={dateOfBirth}
                                                mode="date"
                                                display="default"
                                                onChange={onDateChange}
                                            />
                                        )}
                                        <TextInput
                                            style={{
                                                flex: 1,
                                                paddingVertical: 10,
                                                color: TEXT_THEME[theme].primary,
                                            }}
                                            value={formatDate(value)}
                                            editable={false}
                                            onChangeText={onChange}
                                        />
                                        <Ionicons
                                            name="calendar-clear"
                                            size={20}
                                            color={APP_THEME.light.primary.first}
                                        />
                                    </Pressable>
                                    {error && (
                                        <AUIThemedText style={styles.fieldError}>
                                            {error.message}
                                        </AUIThemedText>
                                    )}
                                </AUIThemedView>
                            )}
                        />
                    </AUIThemedView>

                    <Controller
                        name="gender"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AUIThemedView>
                                <AUIThemedText style={styles.label}>{t("gender")}</AUIThemedText>
                                <DropdownComponent
                                    //@ts-ignore
                                    list={genderData}
                                    value={value}
                                    setValue={({ gender }: { gender: string }) => onChange(gender)}
                                    labelField="gender"
                                    // label="Select your gender"
                                    labelStyles={{
                                        marginTop: 10,
                                        marginBottom: 5,
                                        fontSize: 13,
                                        fontWeight: "bold",
                                        fontStyle: "normal",
                                        color: "#333",
                                    }}
                                    valueField="gender"
                                    placeholder={"Select your gender"}
                                    listWithIcon
                                    isSearchable={false}
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
                        name="qualification"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AUIThemedView>
                                <AUIThemedText style={styles.label}>
                                    {t("qualification")}
                                </AUIThemedText>
                                <DropdownComponent
                                    //@ts-ignore
                                    list={qualificationData}
                                    value={value}
                                    setValue={({ qualification }: { qualification: string }) =>
                                        onChange(qualification)
                                    }
                                    // label="My Qualification"
                                    labelField="qualification"
                                    labelStyles={{
                                        marginTop: 10,
                                        marginBottom: 5,
                                        fontSize: 13,
                                        fontWeight: "bold",
                                        fontStyle: "normal",
                                        color: "#333",
                                    }}
                                    valueField="qualification"
                                    placeholder={"Select your qualification"}
                                    listWithIcon
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
                        name="academicSession"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AUIThemedView>
                                <AUIThemedText style={styles.label}>
                                    {t("academic_session")}
                                </AUIThemedText>
                                <DropdownComponent
                                    //@ts-ignore
                                    list={academicSessionData}
                                    value={value}
                                    setValue={({ academicSession }: { academicSession: string }) =>
                                        onChange(academicSession)
                                    }
                                    // label="Academic Session"
                                    labelField="academicSession"
                                    labelStyles={{
                                        marginTop: 10,
                                        marginBottom: 5,
                                        fontSize: 13,
                                        fontWeight: "bold",
                                        fontStyle: "normal",
                                        color: "#333",
                                    }}
                                    valueField="academicSession"
                                    placeholder={"Select your academic session"}
                                    listWithIcon
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
                        name="language"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AUIThemedView>
                                <AUIThemedText style={styles.label}>
                                    {" "}
                                    {t("my_language")}
                                </AUIThemedText>
                                {/* @ts-ignore */}
                                <DropdownComponent
                                    list={languagesData.map((language) => ({
                                        label: language.name,
                                        value: language.name,
                                    }))}
                                    //@ts-ignore
                                    value={value}
                                    //@ts-ignore
                                    setValue={({ value }) => onChange(value)}
                                    labelField="label"
                                    valueField="value"
                                    listWithIcon
                                    position="top"
                                />
                            </AUIThemedView>
                        )}
                    />

                    <Controller
                        name="country"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AUIThemedView>
                                <AUIThemedText style={styles.label}>
                                    {t("my_country")}
                                </AUIThemedText>
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
                                        setSelectedCountry(value);
                                    }}
                                    labelField="label"
                                    valueField="value"
                                    listWithIcon
                                    position="top"
                                />
                            </AUIThemedView>
                        )}
                    />

                    <Controller
                        name="state"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AUIThemedView>
                                <AUIThemedText style={styles.label}> {t("my_state")}</AUIThemedText>
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
                                    listWithIcon
                                    position="top"
                                />
                            </AUIThemedView>
                        )}
                    />
                    <Controller
                        name="city"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AUIThemedView>
                                <AUIThemedText style={styles.label}> {t("my_city")}</AUIThemedText>
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
                                    position="top"
                                />
                            </AUIThemedView>
                        )}
                    />
                </AUIThemedView>

                <AUIThemedView style={styles.footerContainer}>
                    <AUIThemedView style={styles.buttonContainer}>
                        <AUIButton
                            title={t("reset_defaults")}
                            onPress={() => {
                                ApiSuccessToast("Resetting to default values...");
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
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    editIcon: {
        position: "absolute",
        left: 70,
    },
    editIconContainer: {
        position: "absolute",
        bottom: 0,
        padding: 10,
        width: 100,
        height: 50,
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
        backgroundColor: "rgba(91, 216, 148, 0.3)",
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
    fieldError: {
        position: "absolute",
        color: "red",
        fontSize: 13,
    },
    container: {
        flex: 1,
        padding: 20,
        // backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    profileImageContainer: {
        position: "relative",
        alignItems: "flex-start",
        marginBottom: 20,
    },
    profileImage: {
        height: 100,
        width: 100,
        borderRadius: 100,
    },
    label: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 13,
        fontWeight: "bold",
        fontStyle: "normal",
        // color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 7,
        marginBottom: 15,
    },
    datePicker: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
    },
});

export default Profile;
