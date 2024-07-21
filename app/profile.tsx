import AUIButton from "@/components/common/AUIButton";
import DropdownComponent from "@/components/common/AUIDropdown";
import AUIImage from "@/components/common/AUIImage";
import AUIInputField from "@/components/common/AUIInputField";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { ApiErrorToast, ApiSuccessToast } from "@/components/common/AUIToast";
import { APP_THEME, TEXT_THEME } from "@/constants/Colors";
import { countriesData } from "@/constants/dummy data/countriesData";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { API_URL } from "@/constants/urlProperties";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Asset } from "expo-asset";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    TextInput
} from "react-native";
import "react-native-gesture-handler";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import useAxios from "./services/axiosClient";

const genderData = [
    {
        gender: "Male",
    },
    {
        gender: "Female",
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
        academicSession: "2020-2021",
    },
    {
        academicSession: "2021-2022",
    },
    {
        academicSession: "2022-2023",
    },
];

const stateData = [
    { state: "California" },
    { state: "Texas" },
    { state: "Florida" },
    { state: "New York" },
    { state: "Illinois" },
    { state: "Pennsylvania" },
    { state: "Ohio" },
    { state: "Georgia" },
    { state: "North Carolina" },
    { state: "Michigan" },
    { state: "New Jersey" },
    { state: "Virginia" },
    { state: "Washington" },
    { state: "Arizona" },
    { state: "Massachusetts" },
];

const cityData = [
    { city: "New York" },
    { city: "Los Angeles" },
    { city: "Chicago" },
    { city: "Houston" },
    { city: "Phoenix" },
    { city: "Philadelphia" },
    { city: "San Antonio" },
    { city: "San Diego" },
    { city: "Dallas" },
    { city: "San Jose" },
    { city: "Austin" },
    { city: "Jacksonville" },
    { city: "Fort Worth" },
    { city: "Columbus" },
    { city: "Charlotte" },
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
    const userProfileData = useLangTransformSelector(
        (state: RootState) => state.api.userProfileData
    );

    const theme = useSelector((state: RootState) => state.global.theme);
    const [dateOfBirth, setDateOfBirth] = useState(userProfileData?.dob && new Date(userProfileData?.dob) || '');
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

    const { patch } = useAxios();

    const { reset, setValue, control, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            name: userProfileData?.name,
            phoneNumber: userProfileData?.phone,
            email: userProfileData?.email,
            language: userProfileData?.language,
            dateOfBirth: dateOfBirth && dateOfBirth?.toISOString(),
            gender: "",
            qualification: userProfileData?.qualification,
            academicSession: userProfileData?.academicSession,
            country: userProfileData?.country,
            city: userProfileData?.city,
            state: userProfileData?.state,
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

    const onSave = (data: any) => {
        const payload = {
            id: userProfileData?._id,
            name: data.name,
            phone: data.phoneNumber,
            email: data.email,
            language: data.language,
            dob: data.dateOfBirth,
            qualification: data.qualification,
            academicSession: data.academicSession,
            country: data.country,
            city: data.city,
            state: data.state,
        };

        patch(API_URL.user, payload)
            .then((res: any) => {
                ApiSuccessToast(res.message);
            })
            .catch((error: any) => {
                ApiErrorToast(error.message);
            });
    };

    return (
        <ScrollView>
            <AUIThemedView style={styles.container}>
                <AUIThemedView style={styles.profileImageContainer}>
                    <AUIImage
                        icon
                        path={Asset.fromModule(require("@/assets/images/user.png")).uri}
                        style={styles.profileImage}
                    />
                </AUIThemedView>

                <Controller
                    name="name"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <AUIThemedView>
                            <AUIThemedText style={styles.label}>Name</AUIThemedText>
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
                            <AUIThemedText style={styles.label}>Mobile Number</AUIThemedText>
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
                            <AUIThemedText style={styles.label}>Email</AUIThemedText>
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
                    <AUIThemedText style={styles.label}>Date of Birth</AUIThemedText>
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
                            <AUIThemedText style={styles.label}>Select your gender</AUIThemedText>
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
                                itemLabelStyle={{ fontSize: 14, color: "#333" }}
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
                            <AUIThemedText style={styles.label}>My Qualification</AUIThemedText>
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
                                itemLabelStyle={{ fontSize: 14, color: "#333" }}
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
                            <AUIThemedText style={styles.label}>Academic Session</AUIThemedText>
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
                                itemLabelStyle={{ fontSize: 14, color: "#333" }}
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
                            <AUIThemedText style={styles.label}>My Language</AUIThemedText>
                            {/* @ts-ignore */}
                            <DropdownComponent
                                list={countriesData.map((country) => ({
                                    label: country.language.name,
                                    value: country.language.name,
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
                            <AUIThemedText style={styles.label}>My Country</AUIThemedText>
                            {/* @ts-ignore */}
                            <DropdownComponent
                                list={countriesData.map((country) => ({
                                    label: country.name,
                                    value: country.name,
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
                    name="state"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <AUIThemedView>
                            <AUIThemedText style={styles.label}>My State</AUIThemedText>
                            <DropdownComponent
                                // @ts-ignore
                                list={stateData}
                                //@ts-ignore
                                value={value}
                                //@ts-ignore
                                setValue={({ state }) => onChange(state)}
                                labelField="state"
                                valueField="state"
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
                            <AUIThemedText style={styles.label}>My City</AUIThemedText>
                            <DropdownComponent
                                // @ts-ignore
                                list={cityData}
                                //@ts-ignore
                                value={value}
                                //@ts-ignore
                                setValue={({ city }) => onChange(city)}
                                labelField="city"
                                valueField="city"
                                listWithIcon
                                position="top"
                            />
                        </AUIThemedView>
                    )}
                />
            </AUIThemedView>

            <AUIThemedView style={styles.footerContainer}>
                <AUIThemedView style={styles.buttonContainer}>
                    <AUIButton title="Clear" onPress={() => reset()} style={{ width: "48%" }} />
                    <AUIButton
                        title={"Save"}
                        selected
                        onPress={handleSubmit(onSave)}
                        disabled={!formState.isValid}
                        style={{ width: "48%" }}
                    />
                </AUIThemedView>
            </AUIThemedView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
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
    editIcon: {
        top: 8,
    },
    profileImageContainer: {
        alignItems: "flex-start",
        marginBottom: 20,
    },
    profileImage: {
        height: 100,
        width: 100,
        borderRadius: 50,
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
