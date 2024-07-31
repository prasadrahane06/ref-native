import AUIButton from "@/components/common/AUIButton";
import DropdownComponent from "@/components/common/AUIDropdown";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { ApiErrorToast, ApiSuccessToast } from "@/components/common/AUIToast";
import { APP_THEME, BACKGROUND_THEME } from "@/constants/Colors";
import { languagesData } from "@/constants/dummy data/languagesData";
import { DETAILS_FIELDS, GLOBAL_TEXT } from "@/constants/Properties";
import { storeUserData } from "@/constants/RNAsyncStore";
import { signupPageStyles } from "@/constants/Styles";
import { API_URL } from "@/constants/urlProperties";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { setLoader, setUser } from "@/redux/globalSlice";
import { RootState } from "@/redux/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { City, Country, State } from "country-state-city";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import useAxios from "./services/axiosClient";

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
    qualification: Yup.string().required("Qualification is required"),
    academicSession: Yup.string().required("Academic session is required"),
    language: Yup.string().required("Language is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
});

const DetailsPage = () => {
    const profile = useLangTransformSelector((state: RootState) => state.global.profile);
    const theme = useSelector((state: RootState) => state.global.theme);
    const { patch } = useAxios();
    const dispatch = useDispatch();

    const [selectedCountry, setSelectedCountry] = useState<any>(null);
    const [selectedState, setSelectedState] = useState<any>(null);
    const [selectedCity, setSelectedCity] = useState<any>(null); // DONT REMOVE IT, IT IS USED IN COUNTRY AND STATE

    const allCountries = Country.getAllCountries();
    const states = selectedCountry ? State.getStatesOfCountry(selectedCountry) : [];
    const cities = selectedState ? City.getCitiesOfState(selectedCountry, selectedState) : [];

    const { reset, setValue, control, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema),
        mode: "all",
        defaultValues: {
            qualification: "",
            academicSession: "",
            language: "",
            country: "",
            state: "",
            city: "",
        },
    });

    const onSave = (data: any) => {
        dispatch(setLoader(true));

        const country = data.country;
        const state = data.state;

        const countryName = Country.getCountryByCode(country)?.name;
        const stateName = State.getStateByCodeAndCountry(state, country)?.name;

        const payload = {
            qualification: data.qualification,
            academicSession: data.academicSession,
            language: data.language,
            country: countryName,
            state: stateName,
            city: data.city,
        };

        patch(API_URL.user, payload)
            .then((res: any) => {
                dispatch(setLoader(false));
                if (res.statusCode === 200) {
                    storeUserData("@user-data", {
                        ...res?.data,
                    }).then(() => {
                        dispatch(setUser(res?.data));
                        ApiSuccessToast(res.message);

                        router.dismissAll();
                        router.replace("/(home)/(student)");
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
            <ScrollView style={{ backgroundColor: BACKGROUND_THEME[theme].background }}>
                <AUIThemedView style={signupPageStyles.container}>
                    <AUIThemedText style={signupPageStyles.heading}>
                        {GLOBAL_TEXT.additional_details}
                    </AUIThemedText>
                    <AUIThemedView style={signupPageStyles.formLayout}>
                        <AUIThemedView style={signupPageStyles.fieldContainer}>
                            <Controller
                                name="qualification"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <AUIThemedView>
                                        <DropdownComponent
                                            label={DETAILS_FIELDS.qualification.label}
                                            //@ts-ignore
                                            list={qualificationData}
                                            value={value}
                                            setValue={({
                                                qualification,
                                            }: {
                                                qualification: string;
                                            }) => onChange(qualification)}
                                            labelField="qualification"
                                            valueField="qualification"
                                            placeholder={"Select your qualification"}
                                            listWithIcon
                                        />
                                    </AUIThemedView>
                                )}
                            />

                            <Controller
                                name="academicSession"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <AUIThemedView>
                                        <DropdownComponent
                                            label={DETAILS_FIELDS.academicSession.label}
                                            //@ts-ignore
                                            list={academicSessionData}
                                            value={value}
                                            setValue={({
                                                academicSession,
                                            }: {
                                                academicSession: string;
                                            }) => onChange(academicSession)}
                                            labelField="academicSession"
                                            valueField="academicSession"
                                            placeholder={"Select your academic session"}
                                            listWithIcon
                                        />
                                    </AUIThemedView>
                                )}
                            />

                            <Controller
                                name="language"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <AUIThemedView>
                                        <DropdownComponent
                                            label={DETAILS_FIELDS.language.label}
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
                                        <DropdownComponent
                                            label={DETAILS_FIELDS.city.label}
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
                        <AUIThemedView style={signupPageStyles.buttonContainer}>
                            <AUIButton
                                title="Skip"
                                style={{ width: "50%" }}
                                onPress={() => {
                                    router.dismissAll();
                                    router.replace("/(home)/(student)");
                                }}
                                borderColor={APP_THEME[theme].primary.first}
                            />
                            <AUIButton
                                title="Save"
                                selected
                                onPress={handleSubmit(onSave)}
                                disabled={!formState.isValid}
                                style={{ width: "50%" }}
                            />
                        </AUIThemedView>
                    </AUIThemedView>
                </AUIThemedView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default DetailsPage;
