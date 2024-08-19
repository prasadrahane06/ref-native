import AUIButton from "@/components/common/AUIButton";
import DropdownComponent from "@/components/common/AUIDropdown";
import AUIImage from "@/components/common/AUIImage";
import AUIInputField from "@/components/common/AUIInputField";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { ApiErrorToast, ApiSuccessToast } from "@/components/common/AUIToast";
import { APP_THEME, BACKGROUND_THEME, TEXT_THEME } from "@/constants/Colors";
import { languagesData } from "@/constants/dummy data/languagesData";
import { storeUserData } from "@/constants/RNAsyncStore";
import { API_URL } from "@/constants/urlProperties";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { setResponse } from "@/redux/apiSlice";
import { setLoader, setUser } from "@/redux/globalSlice";
import { RootState } from "@/redux/store";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { City, Country, State } from "country-state-city";
import { Asset } from "expo-asset";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
    Alert,
    KeyboardAvoidingView,
    Modal,
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
import AUIModal from "@/components/common/AUIModal";

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

const Profile: React.FC = () => {
    const { patch } = useAxios();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const userProfileData = useLangTransformSelector(
        (state: RootState) => state.api.userProfileData
    );

    const { from, type, planId, courseId, clientId } = useLocalSearchParams<{
        from: string;
        type: string;
        planId: string;
        courseId: string;
        clientId: string;
    }>();

    const theme = useSelector((state: RootState) => state.global.theme);
    const [dateOfBirth, setDateOfBirth] = useState(
        userProfileData?.dob ? new Date(userProfileData?.dob) : new Date()
    );
    const gender = userProfileData?.gender;

    const maleAvatar =
        Asset.fromModule(require("@/assets/images/local/user.png")).uri ||
        Asset.fromModule(require("@/assets/images/local/user.png")).localUri;
    const femaleAvatar =
        Asset.fromModule(require("@/assets/images/local/female.png")).uri ||
        Asset.fromModule(require("@/assets/images/local/female.png")).localUri;

    const avatar = gender === "Male" ? maleAvatar : femaleAvatar;

    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const [profileImage, setProfileImage] = useState<any>(userProfileData?.photo || avatar);

    const [profileBase64, setProfileBase64] = useState<any>(null);
    const [selectedCountry, setSelectedCountry] = useState<any>(null);
    const [selectedState, setSelectedState] = useState<any>(null);
    const [selectedCity, setSelectedCity] = useState<any>(userProfileData?.city); // DONT REMOVE IT, IT IS USED IN COUNTRY AND STATE
    const [canSkip, setCanSkip] = useState(true);

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

    const schema = Yup.object().shape({
        name: Yup.string().required(`${t("name_is_required")}`),
        // phoneNumber: Yup.string().required(`${t("enter_valid_mobile_number")}`),
        // email: Yup.string().email(GLOBAL_TEXT.validate_email).required(`${t("please_provide_valid_email")}`),
        language: Yup.string().required(`${t("language_is_required")}`),
        dateOfBirth: Yup.string().required(`${t("date_of_birth_is_required")}`),
        gender: Yup.string().required(`${t("gender_is_required")}`),
        qualification: Yup.string().required(`${t("qualification_is_required")}`),
        academicSession: Yup.string().required(`${t("academic_session_is_required")}`),
        country: Yup.string().required(`${t("country_is_required")}`),
        city: Yup.string().optional(),
        state: Yup.string().required(`${t("state_is_required")}`),
    });

    const formData = {
        name: userProfileData?.name,
        language: userProfileData?.language,
        dateOfBirth: dateOfBirth && dateOfBirth?.toISOString(),
        gender: userProfileData?.gender || "",
        qualification: userProfileData?.qualification,
        academicSession: userProfileData?.academicSession,
        country: countryCode,
        state: stateCode,
        city: userProfileData?.city,
    };
    const { reset, setValue, control, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            name: userProfileData?.name,
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

    useEffect(() => {
        setCanSkip(!formState.isDirty);
    }, [formState.isDirty]);

    useEffect(() => {
        if (from === "buyButton" || from === "bookYourSeatButton") {
            if (isAnyFieldEmpty(formData) || formState.isDirty) {
                ApiErrorToast(t("check_you_profile_before_making_payment"));
            } else {
                ApiSuccessToast(t("verify_you_profile_before_making_payment"));
            }
            setCanSkip(!formState.isDirty);
        }
    }, []);

    const isAnyFieldEmpty = (formData: any) => {
        for (let key in formData) {
            if (!formData[key]) {
                return true;
            }
        }
        return false;
    };

    const resetState = (value: string) => {
        setSelectedCountry(value);
        setSelectedState(null);
        setSelectedCity(null);
        setValue("state", "");
        setValue("city", "");
    };

    const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || dateOfBirth;
        setShowDatePicker(Platform.OS === "ios");
        setDateOfBirth(currentDate);
        setValue("dateOfBirth", currentDate.toISOString());
        setCanSkip(false);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString().slice(-2);

        return `${day}/${month}/${year}`;
    };

    const pickImageAsync = async (value: any) => {
        setCanSkip(false);
        let result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            allowsEditing: true,
            quality: 0.5,
        });

        if (!result.canceled) {
            setProfileBase64(result.assets[0].base64);
            setProfileImage(result.assets[0]?.uri);
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

        let updatedCity = city;

        if (
            country === userProfileData?.countryCode &&
            state === userProfileData?.stateCode &&
            city === userProfileData?.city
        ) {
            updatedCity = userProfileData?.city;
        }

        if (!selectedCity) {
            updatedCity = stateName;
        }

        const payload: any = {
            id: userProfileData?._id,
            name: data.name,
            language: data.language,
            dob: data.dateOfBirth,
            gender: data.gender,
            qualification: data.qualification,
            academicSession: data.academicSession,
            country: countryName,
            state: stateName,
            city: updatedCity,
        };

        if (profileBase64) {
            payload.photo = `data:image/png;base64,${profileBase64}`;
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
                        //@ts-ignore
                        pathname: `/(home)/courseDetails/purchase/${JSON.stringify({
                            type: type,
                            planId: planId,
                            courseId: courseId,
                            clientId: clientId,
                        })}`,
                    });
                }

                if (from === "bookYourSeatButton") {
                    router.push({
                        //@ts-ignore
                        pathname: `/(home)/courseDetails/purchase/${JSON.stringify({
                            type: type,
                            planId: planId,
                            courseId: courseId,
                            clientId: clientId,
                        })}`,
                    });
                }
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

    const handleRemovepic = () => {
        Alert.alert(
            `${t("delete_profile_picture")}`,
            `${t("delete_profile_description")}`,
            [
                {
                    text: `${t("cancel")}`,
                    onPress: () => console.log("Remove cancelled"),
                    style: "cancel",
                },
                {
                    text: `${t("confirm_delete")}`,
                    onPress: () => {
                        dispatch(setLoader(true));

                        const payload = {
                            id: userProfileData?._id,
                            photo: "",
                        };
                        patch(API_URL.user, payload)
                            .then((res: any) => {
                                dispatch(setLoader(false));

                                storeUserData("@user-data", {
                                    ...res?.data,
                                });
                                setProfileImage(avatar);
                                dispatch(setUser(res?.data));
                                dispatch(
                                    setResponse({
                                        storeName: "userProfileData",
                                        data: res?.data,
                                    })
                                );
                                ApiSuccessToast("Profile picture deleted successfully");
                            })
                            .catch((error: any) => {
                                dispatch(setLoader(false));
                                console.log("Error deleting profile picture:", error);
                                ApiErrorToast("Failed to delete profile picture");
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
            <ScrollView automaticallyAdjustKeyboardInsets={true}>
                <AUIThemedView style={styles.container}>
                    <AUIThemedView style={styles.profileImageContainer}>
                        <TouchableOpacity onPress={pickImageAsync}>
                            <AUIImage icon path={profileImage} style={styles.profileImage} />
                        </TouchableOpacity>
                        {profileImage !== avatar ? (
                            <TouchableOpacity style={styles.closeIcon} onPress={handleRemovepic}>
                                <MaterialCommunityIcons
                                    name="delete-forever"
                                    size={24}
                                    color="red"
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={styles.editIconContainer1}
                                onPress={pickImageAsync}
                            >
                                <Ionicons
                                    name="create-outline"
                                    size={24}
                                    color={APP_THEME.light.primary.first}
                                    style={styles.editIcon}
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
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder={t("enter_your_name")}
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
                            style={[
                                styles.disabledInput,
                                { backgroundColor: theme === "light" ? "#f0f0f0" : "#777777" },
                            ]}
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
                            style={[
                                styles.disabledInput,
                                { backgroundColor: theme === "light" ? "#f0f0f0" : "#777777" },
                            ]}
                            editable={false}
                            value={userProfileData?.email}
                        />
                    </AUIThemedView>

                    <AUIThemedView>
                        <AUIThemedText style={styles.label}>{t("date_of_birth")}</AUIThemedText>
                        <Controller
                            name="dateOfBirth"
                            control={control}
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                                <>
                                    {Platform.OS === "ios" ? (
                                        <>
                                            <AUIButton
                                                title={`${
                                                    dateOfBirth ? formatDate(`${dateOfBirth}`) : ""
                                                }`}
                                                style={{ borderWidth: 0, width: "48%" }}
                                                onPress={() => setShowDatePicker(!showDatePicker)}
                                                borderColor={APP_THEME.light.primary.first}
                                            />

                                            {showDatePicker && (
                                                <Modal
                                                    animationType="slide"
                                                    transparent={true}
                                                    visible={showDatePicker}
                                                    onRequestClose={() => {
                                                        setShowDatePicker(false);
                                                    }}
                                                >
                                                    <AUIThemedView
                                                        style={
                                                            Platform.OS === "ios"
                                                                ? styles.iosModalContent
                                                                : styles.andoridModalContent
                                                        }
                                                    >
                                                        <AUIThemedView
                                                            style={styles.titleContainer}
                                                        >
                                                            <AUIThemedText style={styles.dateTitle}>
                                                                {t("pickDateOfBirth")}
                                                            </AUIThemedText>
                                                        </AUIThemedView>
                                                        <DateTimePicker
                                                            value={dateOfBirth}
                                                            mode="date"
                                                            display={
                                                                Platform.OS === "ios"
                                                                    ? "spinner"
                                                                    : "default"
                                                            }
                                                            onChange={onDateChange}
                                                            maximumDate={new Date()}
                                                        />
                                                        <AUIThemedView
                                                            style={styles.dateBtnContainer}
                                                        >
                                                            <AUIButton
                                                                title={`Cancel`}
                                                                style={{
                                                                    borderWidth: 0,
                                                                    width: "48%",
                                                                }}
                                                                onPress={() =>
                                                                    setShowDatePicker(false)
                                                                }
                                                                borderColor="#5BD894"
                                                            />
                                                            <AUIButton
                                                                title={`Select`}
                                                                style={{
                                                                    borderWidth: 0,
                                                                    width: "48%",
                                                                }}
                                                                onPress={() =>
                                                                    setShowDatePicker(false)
                                                                }
                                                                borderColor="#5BD894"
                                                                selected
                                                            />
                                                        </AUIThemedView>
                                                    </AUIThemedView>
                                                </Modal>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <AUIThemedView
                                                style={{
                                                    flex: 1,
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    height: 50,
                                                    borderWidth: 1,
                                                    borderColor: "#5BD894",
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
                                                {showDatePicker && (
                                                    <DateTimePicker
                                                        value={dateOfBirth}
                                                        mode="date"
                                                        display="default"
                                                        onChange={onDateChange}
                                                        maximumDate={new Date()}
                                                    />
                                                )}
                                            </AUIThemedView>
                                        </>
                                    )}
                                </>
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
                                    labelStyles={{
                                        marginTop: 10,
                                        marginBottom: 5,
                                        fontSize: 13,
                                        fontWeight: "bold",
                                        fontStyle: "normal",
                                        color: "#333",
                                    }}
                                    valueField="gender"
                                    placeholder={t("select_your_gender")}
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
                                    placeholder={t("select_your_qualification")}
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
                                    placeholder={t("select_your_academic_session")}
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
                                    placeholder={t("select_your_language")}
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
                                        resetState(value);
                                    }}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={t("select_your_country")}
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
                                        setSelectedCity(null);
                                    }}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={t("select_your_state")}
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
                                <AUIThemedText style={styles.label}>
                                    {t("my_city")} (optional)
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
                                    placeholder={t("select_your_city")}
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
                                ApiSuccessToast(`${t("reset")}`);
                                reset();
                            }}
                            style={{ width: "48%" }}
                        />
                        <AUIButton
                            title={!canSkip ? t("save") : t("verify")}
                            selected
                            onPress={
                                !canSkip
                                    ? handleSubmit(onSave)
                                    : () => {
                                          if (from === "buyButton") {
                                              router.push({
                                                  //@ts-ignore
                                                  pathname: `/(home)/courseDetails/purchase/${JSON.stringify(
                                                      {
                                                          type: type,
                                                          planId: planId,
                                                          courseId: courseId,
                                                          clientId: clientId,
                                                      }
                                                  )}`,
                                              });
                                          }

                                          if (from === "bookYourSeatButton") {
                                              router.push({
                                                  //@ts-ignore
                                                  pathname: `/(home)/courseDetails/purchase/${JSON.stringify(
                                                      {
                                                          type: type,
                                                          planId: planId,
                                                          courseId: courseId,
                                                          clientId: clientId,
                                                      }
                                                  )}`,
                                              });
                                          }
                                      }
                            }
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
    andoridModalContent: {
        height: "100%",
        width: "100%",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    iosModalContent: {
        position: "absolute",
        bottom: 0,
        height: "50%",
        width: "100%",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    titleContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    dateTitle: {
        padding: 10,
        fontSize: 16,
        marginBottom: 10,
    },
    dateBtnContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    disabledInput: {
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
    editIconContainer1: {
        position: "absolute",
        left: 10,
    },
    editIcon: {
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
        width: 100,
        height: 100,
    },
    profileImage: {
        width: "100%",
        height: "100%",
        borderRadius: 50,
    },
    closeIcon: {
        position: "absolute",
        right: 0,
        backgroundColor: APP_THEME.light.lightGray,
        borderRadius: 20,
        padding: 2,
    },
    label: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 13,
        fontWeight: "bold",
        fontStyle: "normal",
    },
    dateInputStyle: {
        borderColor: "#5BD894",
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
