import useAxios from "@/app/services/axiosClient";
import AUIButton from "@/components/common/AUIButton";
import AUIComingSoon from "@/components/common/AUIComingSoon";
import DropdownComponent from "@/components/common/AUIDropdown";
import AUIInputField from "@/components/common/AUIInputField";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { ApiErrorToast, ApiSuccessToast } from "@/components/common/AUIToast";
import SectionTitle from "@/components/home/common/SectionTitle";
import CourseDetailsComponent from "@/components/home/courseDetails/CourseDetailsComponent";
import SimilarCoursesList from "@/components/home/courseDetails/SimilarCourses";
import { APP_THEME, BACKGROUND_THEME, TEXT_THEME } from "@/constants/Colors";
import { ENQUIRY_FIELDS, GLOBAL_TEXT, GLOBAL_TRANSLATION_LABEL } from "@/constants/Properties";
import { inputFieldStyle } from "@/constants/Styles";
import { accommodationData } from "@/constants/dummy data/accommodationData";
import { countriesData } from "@/constants/dummy data/countriesData";
import { nationalityData } from "@/constants/dummy data/nationalityData";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { setLoader } from "@/redux/globalSlice";
import { RootState } from "@/redux/store";
import { AntDesign, Feather, FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
    KeyboardAvoidingView,
    Linking,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import ContactNow from "../schoolDetails/ContactNow";
import { FacilitiesList } from "../schoolDetails/FacilitiesList";
// import { t } from "i18next";

interface PlanComponentProps {
    courseId: string;
    clientId: string;
    clientDetails: any;
    planId: string;
    plan: any;
    scheduleDescription: string;
    lessonDescription: string;
    similarCourses: any;
}

interface EnquireNowModalProps {
    isVisible: boolean;
    onClose: () => void;
    courseId: string;
    clientId: string;
    userId: string;
    planId: string;
}



function EnquireNowModal({
    isVisible,
    onClose,
    courseId,
    userId,
    clientId,
    planId,
}: EnquireNowModalProps) {
    const { t } = useTranslation();
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    const today = new Date();
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    const oneWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);

    const [startDate, setStartDate] = useState(tomorrow);
    const [endDate, setEndDate] = useState(oneWeek);

    const { post } = useAxios();

    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.global.theme);
    const schema = Yup.object().shape({
        name: Yup.string().required(`${t("name_is_required")}`),
        nationality: Yup.string().required(`${t("nationality_is_required")}`),
        phoneCode: Yup.string().required(`${t("phone_code_is_required")}`),
        phoneNumber: Yup.string()
            .matches(/^[0-9]{10}$/, `${t("enter_valid_mobile_number")}`)
            .required("Enter valid mobile number"),
        email: Yup.string().email(GLOBAL_TEXT.validate_email).required(`${t("please_provide_valid_email")}`),
        language: Yup.string().required(`${t("language_is_required")}`),
        startDate: Yup.string().required(`${t("start_date_is_required")}`),
        endDate: Yup.string().required(`${t("end_date_is_required")}`),
        accommodation: Yup.string().required(`${t("accommodation_is_required")}`),
        comment: Yup.string().required(`${t("comment_is_required")}`),
    });

    const { reset, setValue, control, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            name: "",
            nationality: "",
            phoneCode: "+44",
            phoneNumber: "",
            email: "",
            language: "English",
            startDate: tomorrow.toISOString(),
            endDate: oneWeek.toISOString(),
            accommodation: "",
            comment: "",
        },
    });

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString().slice(-2);

        return `${day}/${month}/${year}`;
    };

    const onChangeStartDate = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || startDate;
        setShowStartDatePicker(!showStartDatePicker);
        setStartDate(currentDate);
        setValue("startDate", currentDate.toISOString());
    };

    const onChangeEndDate = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || endDate;
        setShowEndDatePicker(!showEndDatePicker);
        setEndDate(currentDate);
        setValue("endDate", currentDate.toISOString());
    };

    const onSave = (data: any) => {
        dispatch(setLoader(true));
        const phone = data.phoneCode + data.phoneNumber;
        const startDate = new Date(data.startDate).toISOString();
        const endDate = new Date(data.endDate).toISOString();

        const enquiry = {
            user: userId,
            course: courseId,
            client: clientId,
            nationality: data.nationality,
            phone: phone,
            email: data.email,
            languageToLearn: data.language,
            startDate: startDate,
            endDate: endDate,
            accommodation: data.accommodation,
            comment: data.comment,
            plan: planId,
            type: "course",
        };

        post(API_URL.enquiry, enquiry)
            .then((res) => {
                if (res.statusCode === 200) {
                    dispatch(setLoader(false));
                    ApiSuccessToast(res.message);
                    onClose();
                    reset();
                }
            })
            .catch((e) => {
                dispatch(setLoader(false));
                ApiErrorToast(e.response?.data?.message);
                onClose();
                reset();
            });
    };

    const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
            <AUIThemedView
                style={
                    Platform.OS === "ios"
                        ? enquireNowStyles.iosModalContent
                        : enquireNowStyles.andoridModalContent
                }
            >
                <AUIThemedView style={enquireNowStyles.titleContainer}>
                    <AUIThemedText style={enquireNowStyles.title}>
                        {/* {GLOBAL_TEXT.enquire_now} */}
                        {t("enquireNow")}
                    </AUIThemedText>
                    <Pressable onPress={onClose} style={{ padding: 10 }}>
                        <MaterialIcons name="close" color={TEXT_THEME[theme].primary} size={22} />
                    </Pressable>
                </AUIThemedView>

                <KeyboardAvoidingView
                    style={{ flex: 1, backgroundColor: BACKGROUND_THEME[theme].background }}
                    behavior="padding"
                    keyboardVerticalOffset={keyboardVerticalOffset}
                >
                    <ScrollView style={enquiryFormStyles.container}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <AUIThemedView style={enquiryFormStyles.fieldContainer}>
                                    <AUIInputField
                                        value={value}
                                        onChangeText={onChange}
                                        placeholder={t("John_doe")}
                                        label={t("enter_your_name")}
                                    />
                                    <AUIThemedView>
                                        {error && (
                                            <AUIThemedText style={enquiryFormStyles.fieldError}>
                                                {error.message}
                                            </AUIThemedText>
                                        )}
                                    </AUIThemedView>
                                </AUIThemedView>
                            )}
                        />
                        <Controller
                            name="nationality"
                            control={control}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <AUIThemedView
                                    style={{
                                        paddingBottom: 20,
                                    }}
                                >
                                    <AUIThemedText style={[inputFieldStyle.label]}>
                                        {/* {ENQUIRY_FIELDS.nationality.label} */}
                                        {t("nationality")}
                                    </AUIThemedText>
                                    <DropdownComponent
                                        // @ts-ignore
                                        list={nationalityData}
                                        // @ts-ignore
                                        value={value}
                                        setValue={({ nationality }: { nationality: string }) =>
                                            onChange(nationality)
                                        }
                                        labelField="nationality"
                                        valueField="nationality"
                                        placeholder={t("please_specify")}
                                        listWithIcon
                                    />
                                </AUIThemedView>
                            )}
                        />

                        <AUIThemedView style={{ paddingBottom: 30 }}>
                            <AUIThemedText style={inputFieldStyle.label}>
                                {/* {ENQUIRY_FIELDS.phone.label} */}
                                {t("phone_number")}
                            </AUIThemedText>
                            <AUIThemedView style={enquiryFormStyles.phoneContainer}>
                                <Controller
                                    name="phoneCode"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <DropdownComponent
                                            style={enquiryFormStyles.phoneCode}
                                            // @ts-ignore
                                            list={countriesData}
                                            // @ts-ignore
                                            value={value}
                                            setValue={({
                                                dialling_code,
                                            }: {
                                                dialling_code: string;
                                            }) => onChange(dialling_code)}
                                            labelField="dialling_code"
                                            valueField="dialling_code"
                                            listWithIcon
                                            renderLeftIcon
                                        />
                                    )}
                                />
                                <Controller
                                    name="phoneNumber"
                                    control={control}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <AUIThemedView style={enquiryFormStyles.phoneNumber}>
                                            <AUIInputField
                                                value={value}
                                                onChangeText={onChange}
                                                placeholder={t("enter_your_number")}
                                            />
                                            {error && (
                                                <AUIThemedText
                                                    style={[
                                                        enquiryFormStyles.fieldError,
                                                        {
                                                            position: "absolute",
                                                            bottom: -30,
                                                        },
                                                    ]}
                                                >
                                                    {error.message}
                                                </AUIThemedText>
                                            )}
                                        </AUIThemedView>
                                    )}
                                />
                            </AUIThemedView>
                        </AUIThemedView>

                        <Controller
                            name="email"
                            control={control}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <AUIThemedView style={enquiryFormStyles.fieldContainer}>
                                    <AUIThemedText style={enquiryFormStyles.fieldLabel}>
                                        {/* {ENQUIRY_FIELDS.email.label} */}
                                        {t("mail_id")}
                                    </AUIThemedText>
                                    <AUIInputField
                                        value={value}
                                        onChangeText={onChange}
                                        placeholder= {t("enter_your_email")}
                                    />
                                    <AUIThemedView>
                                        {error && (
                                            <AUIThemedText style={enquiryFormStyles.fieldError}>
                                                {error.message}
                                            </AUIThemedText>
                                        )}
                                    </AUIThemedView>
                                </AUIThemedView>
                            )}
                        />

                        <Controller
                            name="language"
                            control={control}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <AUIThemedView style={enquiryFormStyles.fieldContainer}>
                                    <AUIThemedText style={[inputFieldStyle.label]}>
                                        {/* {ENQUIRY_FIELDS.language.label} */}
                                        {t("select_language_to_learn")}
                                    </AUIThemedText>
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
                                    />
                                </AUIThemedView>
                            )}
                        />

                        <AUIThemedView style={{ paddingBottom: 30 }}>
                            <AUIThemedText style={inputFieldStyle.label}>
                                {/* {ENQUIRY_FIELDS.date.label} */}
                                {t("when_you_want_to_start_course")}
                            </AUIThemedText>
                            <AUIThemedView style={enquiryFormStyles.dateContainer}>
                                <AUIThemedText style={inputFieldStyle.label}> {t("from")}</AUIThemedText>
                                <Controller
                                    name="startDate"
                                    control={control}
                                    render={({
                                        field: { value, onChange },
                                        fieldState: { error },
                                    }) => (
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
                                                onPress={() => setShowStartDatePicker(true)}
                                                style={{
                                                    flex: 1,
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    paddingHorizontal: 10,
                                                }}
                                            >
                                                {showStartDatePicker && (
                                                    <DateTimePicker
                                                        value={startDate}
                                                        mode="date"
                                                        display="default"
                                                        onChange={onChangeStartDate}
                                                        minimumDate={tomorrow}
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
                                                    color={APP_THEME[theme].primary.first}
                                                />
                                            </Pressable>
                                            {error && (
                                                <AUIThemedText style={enquiryFormStyles.fieldError}>
                                                    {error.message}
                                                </AUIThemedText>
                                            )}
                                        </AUIThemedView>
                                    )}
                                />
                                <AUIThemedText style={inputFieldStyle.label}>{t("to")}</AUIThemedText>
                                <Controller
                                    name="endDate"
                                    control={control}
                                    render={({
                                        field: { value, onChange },
                                        fieldState: { error },
                                    }) => (
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
                                                onPress={() => setShowEndDatePicker(true)}
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
                                                    color={APP_THEME[theme].primary.first}
                                                />
                                            </Pressable>
                                            {error && (
                                                <AUIThemedText style={enquiryFormStyles.fieldError}>
                                                    {error.message}
                                                </AUIThemedText>
                                            )}
                                            {showEndDatePicker && (
                                                <DateTimePicker
                                                    value={endDate}
                                                    mode="date"
                                                    display="default"
                                                    onChange={onChangeEndDate}
                                                    minimumDate={tomorrow}
                                                />
                                            )}
                                        </AUIThemedView>
                                    )}
                                />
                            </AUIThemedView>
                        </AUIThemedView>

                        <Controller
                            name="accommodation"
                            control={control}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <AUIThemedView style={enquiryFormStyles.fieldContainer}>
                                    <AUIThemedText style={enquiryFormStyles.fieldLabel}>
                                        {/* {ENQUIRY_FIELDS.accommodation.label} */}
                                        {t("select_your_accommodation")}
                                    </AUIThemedText>
                                    <DropdownComponent
                                        //@ts-ignore
                                        list={accommodationData}
                                        //@ts-ignore
                                        value={value}
                                        //@ts-ignore
                                        setValue={(selectedItem) => onChange(selectedItem.name)}
                                        labelField="name"
                                        valueField="name"
                                        listWithIcon
                                        placeholder={t("please_specify")}
                                        position="top"
                                    />
                                </AUIThemedView>
                            )}
                        />

                        <Controller
                            name="comment"
                            control={control}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <AUIThemedView style={{ paddingBottom: 40 }}>
                                    <AUIThemedText style={enquiryFormStyles.fieldLabel}>
                                        {/* {ENQUIRY_FIELDS.comment.label} */}
                                        {t("add_comment")}
                                    </AUIThemedText>
                                    <AUIInputField
                                        multiline
                                        numberOfLines={4}
                                        value={value}
                                        onChangeText={onChange}
                                        placeholder= {t("enter_your_message")}
                                    />
                                    <AUIThemedView>
                                        {error && (
                                            <AUIThemedText style={enquiryFormStyles.fieldError}>
                                                {error.message}
                                            </AUIThemedText>
                                        )}
                                    </AUIThemedView>
                                </AUIThemedView>
                            )}
                        />
                    </ScrollView>
                </KeyboardAvoidingView>

                <AUIThemedView style={enquireNowStyles.footerContainer}>
                    <AUIThemedView style={enquireNowStyles.buttonContainer}>
                        <AUIButton title={t("clear")} onPress={() => reset()} style={{ width: "48%" }} />
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
        </Modal>
    );
}

export default function PlanComponent({
    courseId,
    clientId,
    planId,
    plan,
    scheduleDescription,
    lessonDescription,
    similarCourses,
    clientDetails,
}: PlanComponentProps) {
    const theme = useSelector((state: RootState) => state.global.theme);
    const userData = useSelector((state: RootState) => state.global.user);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const userId = userData?._id;
    const userType = userData?.type;
    const clientPhone = clientDetails?.phone;
    const clientEmail = clientDetails?.email;
    const clientWebsite = clientDetails?.website;

    const { t } = useTranslation();
    const { requestFn } = useApiRequest();
    const isPurchased = useLangTransformSelector((state: RootState) => state.api.isPurchased);

    useEffect(() => {
        requestFn(API_URL.purchaseCourse, "isPurchased", { user: true, course: courseId });
    }, []);

    const handlePhonePress = () => {
        Linking.openURL(`tel:${clientPhone}`);
    };

    const handleEmailPress = () => {
        Linking.openURL(`mailto:${clientEmail}`);
    };

    const handleWebPress = () => {
        Linking.openURL(`https://${clientWebsite}`);
    };

    return (
        <AUIThemedView>
            <AUIThemedView>
                <AUIThemedText style={styles.boldText}>
                    {t(GLOBAL_TRANSLATION_LABEL.courseDetails)}
                </AUIThemedText>
                <CourseDetailsComponent plan={plan} />
            </AUIThemedView>

            <AUIThemedView style={styles.facilityContainer}>
                <SectionTitle>{t(GLOBAL_TRANSLATION_LABEL.facilities)}</SectionTitle>
                {plan.facilities && plan.facilities.length > 0 ? (
                    <FacilitiesList data={plan.facilities} />
                ) : (
                    <AUIComingSoon />
                )}
            </AUIThemedView>

            <AUIThemedView style={styles.contactNowContainer}>
                <SectionTitle>{t(GLOBAL_TRANSLATION_LABEL.contactNow)}</SectionTitle>
                <AUIThemedView style={styles.contactNowIconContainer}>
                    <ContactNow
                        name="phone"
                        IconComponent={FontAwesome}
                        onPress={handlePhonePress}
                    />
                    <ContactNow
                        name="envelope"
                        IconComponent={FontAwesome}
                        onPress={handleEmailPress}
                    />
                    <ContactNow name="globe" IconComponent={Feather} onPress={handleWebPress} />
                </AUIThemedView>
            </AUIThemedView>

            {userType !== "school" && (
                <AUIThemedView style={styles.btnContainer}>
                    <Pressable
                        style={[
                            styles.bookContainer,
                            {
                                backgroundColor: BACKGROUND_THEME[theme].background,
                                borderColor: TEXT_THEME[theme].primary,
                                opacity:
                                    (isPurchased &&
                                        isPurchased?.docs &&
                                        isPurchased?.docs[0]?.type === "bookYourSeat") ||
                                    isPurchased?.docs[0]?.type === "buy"
                                        ? 0.5
                                        : 1,
                            },
                        ]}
                        disabled={
                            isPurchased &&
                            (isPurchased?.docs[0]?.type === "bookYourSeat" ||
                                isPurchased?.docs[0]?.type === "buy")
                        }
                        onPress={() =>
                            router.push({
                                pathname: "/profile",
                                params: {
                                    from: "bookYourSeatButton",
                                    type: "bookYourSeat",
                                    planId: planId,
                                    courseId: courseId,
                                },
                            })
                        }
                    >
                        <AntDesign name="calendar" size={24} color={TEXT_THEME[theme].primary} />
                        <AUIThemedText style={styles.blackBoldText}>
                            {t(GLOBAL_TRANSLATION_LABEL.bookYourSeat)}
                        </AUIThemedText>
                    </Pressable>

                    <Pressable
                        style={[
                            styles.buyContainer,
                            {
                                backgroundColor: APP_THEME[theme].primary.first,
                                opacity:
                                    isPurchased &&
                                    isPurchased?.docs &&
                                    isPurchased?.docs[0]?.type === "buy"
                                        ? 0.5
                                        : 1,
                            },
                        ]}
                        disabled={
                            isPurchased && isPurchased?.docs && isPurchased?.docs[0]?.type === "buy"
                        }
                        onPress={() =>
                            router.push({
                                pathname: "/profile",
                                params: {
                                    from: "buyButton",
                                    type: "buy",
                                    planId: planId,
                                    courseId: courseId,
                                },
                            })
                        }
                    >
                        <Ionicons name="bag-handle-outline" size={24} color="black" />
                        <AUIThemedText style={styles.whiteBoldText}>
                        {t("buy_now")}
                        </AUIThemedText>
                    </Pressable>
                </AUIThemedView>
            )}
            {userType !== "school" && (
                <AUIThemedView>
                    <Pressable
                        style={buttonStyle.container}
                        onPress={() => setIsModalVisible(true)}
                    >
                        <AUIThemedView style={[buttonStyle.buttonInner]}>
                            <AUIThemedText
                                style={[
                                    buttonStyle.buttonText,
                                    { color: TEXT_THEME[theme].primary },
                                ]}
                            >
                                {t(GLOBAL_TRANSLATION_LABEL.enquireNow)}
                            </AUIThemedText>
                        </AUIThemedView>
                    </Pressable>
                </AUIThemedView>
            )}

            <AUIThemedView style={{ marginTop: 25 }}>
                <AUIThemedView
                    style={[styles.borderBottom, { borderColor: APP_THEME[theme].primary.first }]}
                />
            </AUIThemedView>

            {similarCourses?.length > 0 && (
                <AUIThemedView style={styles.similarCourseContainer}>
                    <AUIThemedView>
                        <AUIThemedText style={{ fontWeight: "bold" }}>
                            {t(GLOBAL_TRANSLATION_LABEL.similarCourses)}
                        </AUIThemedText>
                    </AUIThemedView>
                    <AUIThemedView>
                        <SimilarCoursesList data={similarCourses} />
                    </AUIThemedView>
                </AUIThemedView>
            )}

            <EnquireNowModal
                isVisible={isModalVisible}
                courseId={courseId}
                clientId={clientId}
                planId={planId}
                userId={userId}
                onClose={() => {
                    setIsModalVisible(false);
                }}
            />
        </AUIThemedView>
    );
}

const buttonStyle = StyleSheet.create({
    container: {
        marginVertical: 20,
        paddingHorizontal: 15,
        backgroundColor: "transparent",
        borderColor: APP_THEME.light.primary.first,
    },
    button: {
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    buttonInner: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        borderRadius: 5,
        height: 40,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: APP_THEME.light.primary.first,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
    },
});

const enquiryFormStyles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 15,
    },
    fieldContainer: {
        paddingBottom: 27,
    },
    fieldLabel: {
        paddingBottom: 8,
        fontSize: 16,
    },
    fieldError: {
        position: "absolute",
        color: "red",
        fontSize: 13,
    },
    phoneContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    dateContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    phoneCode: { flex: 0.5 },
    phoneNumber: { flex: 1 },
});

const enquireNowStyles = StyleSheet.create({
    andoridModalContent: {
        height: "100%",
        width: "100%",
        // backgroundColor: "#fff",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    iosModalContent: {
        position: "absolute",
        bottom: 0,
        height: "90%",
        width: "100%",
        // backgroundColor: "#fff",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    titleContainer: {
        // backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    title: {
        fontSize: 19,
        fontWeight: "bold",
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
});

const styles = StyleSheet.create({
    boldText: {
        fontWeight: "bold",
        marginHorizontal: 12,
    },
    borderBottom: {
        width: "100%",
        position: "absolute",
        bottom: 0,
        borderWidth: StyleSheet.hairlineWidth,
        // borderColor: APP_THEME.primary.first,
    },
    facilityContainer: {
        borderBottomWidth: 1,
        borderColor: "#9DA1AC",
    },
    contactNowContainer: {
        flexDirection: "column",
    },
    contactNowIconContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
        paddingHorizontal: 40,
    },
    btnContainer: {
        flexDirection: "row",
        gap: 10,
        marginHorizontal: 22,
        marginVertical: 15,
        justifyContent: "center",
    },
    bookContainer: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        width: "50%",
        // backgroundColor: APP_THEME.background,
    },
    blackBoldText: {
        fontWeight: "bold",
        // color: "#000",
    },
    buyContainer: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        padding: 10,
        width: "50%",
        // backgroundColor: APP_THEME.primary.first,
    },
    whiteBoldText: {
        fontWeight: "bold",
        color: "black",
    },
    enquireButton: {
        paddingHorizontal: 15,
    },
    marginTop25: {
        marginTop: 25,
    },
    similarCourseContainer: {
        marginVertical: 10,
        marginHorizontal: 15,
    },
});
