import useAxios from "@/app/services/axiosClient";
import AUIInfoCard from "@/components/AUIInfoCard";
import AUIButton from "@/components/common/AUIButton";
import AUIComingSoon from "@/components/common/AUIComingSoon";
import DropdownComponent from "@/components/common/AUIDropdown";
import AUIInputField from "@/components/common/AUIInputField";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { ApiErrorToast, ApiSuccessToast } from "@/components/common/AUIToast";
import SectionTitle from "@/components/home/common/SectionTitle";
import { EventsList } from "@/components/home/schoolDetails/EventsList";
import { FacilitiesList } from "@/components/home/schoolDetails/FacilitiesList";
import { ReviewList } from "@/components/home/schoolDetails/ReviewList";
import { APP_THEME, BACKGROUND_THEME, TEXT_THEME } from "@/constants/Colors";
import { ENQUIRY_FIELDS, GLOBAL_TEXT, GLOBAL_TRANSLATION_LABEL } from "@/constants/Properties";
import { inputFieldStyle } from "@/constants/Styles";
import { accommodationData } from "@/constants/dummy data/accommodationData";
import { countriesData } from "@/constants/dummy data/countriesData";
import { nationalityData } from "@/constants/dummy data/nationalityData";
import { API_URL } from "@/constants/urlProperties";
import { setLoader } from "@/redux/globalSlice";
import { RootState } from "@/redux/store";
import { Feather, FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
    Dimensions,
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    Linking,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import ContactNow from "./ContactNow";
import { Asset } from "expo-asset";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";

interface EnquireNowModalProps {
    isVisible: boolean;
    onClose: () => void;
    courseId: string;
    clientId: string;
    userId: string;
}

interface OverviewTabProps {
    schoolOverView: any;
    courseId: string;
    clientId: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    nationality: Yup.string().required("Nationality is required"),
    phoneCode: Yup.string().required("Phone code is required"),
    phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Enter valid mobile number")
        .required(GLOBAL_TEXT.validate_mobile),
    email: Yup.string().email(GLOBAL_TEXT.validate_email).required(GLOBAL_TEXT.validate_email),
    language: Yup.string().required("Language is required"),
    startDate: Yup.string().required("Start date is required"),
    endDate: Yup.string().required("End date is required"),
    accommodation: Yup.string().required("Accommodation is required"),
    comment: Yup.string().required("Comment is required"),
});

function EnquireNowModal({ isVisible, onClose, courseId, userId, clientId }: EnquireNowModalProps) {
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const { post } = useAxios();

    const today = new Date();
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    const oneWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);

    const [startDate, setStartDate] = useState(tomorrow);
    const [endDate, setEndDate] = useState(oneWeek);

    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.global.theme);

    const { reset, setValue, control, handleSubmit, formState, trigger } = useForm({
        resolver: yupResolver(schema),
        mode: "onBlur",
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
            type: "client",
        };

        post(API_URL.enquiry, enquiry)
            .then((res) => {
                // dispatch(addEnquiry(enquiry));

                if (res.statusCode === 200) {
                    dispatch(setLoader(false));
                    ApiSuccessToast(res.message);
                    onClose();
                    reset();
                }
            })
            .catch((e) => {
                dispatch(setLoader(false));
                console.log("Enquiry Error =>", e.response.data);
                ApiErrorToast(e.response?.data?.message);
                onClose();
                reset();
            });
    };

    const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;

    const dismissKeyboard = () => {
        Keyboard.dismiss();
        trigger(["name", "email", "phoneNumber", "accommodation", "comment"]);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <AUIThemedView
                    style={
                        Platform.OS === "ios"
                            ? enquireNowStyles.iosModalContent
                            : enquireNowStyles.andoridModalContent
                    }
                >
                    <AUIThemedView
                        style={[
                            enquireNowStyles.titleContainer,
                            { backgroundColor: BACKGROUND_THEME[theme].background },
                        ]}
                    >
                        <AUIThemedText style={enquireNowStyles.title}>
                            {GLOBAL_TEXT.enquire_now}
                        </AUIThemedText>
                        <Pressable onPress={onClose} style={{ padding: 10 }}>
                            <MaterialIcons
                                name="close"
                                color={TEXT_THEME[theme].primary}
                                size={22}
                            />
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
                                            placeholder={ENQUIRY_FIELDS.name.placeholder}
                                            label={ENQUIRY_FIELDS.name.label}
                                            autoFocus={true}
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
                                            {ENQUIRY_FIELDS.nationality.label}
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
                                            placeholder={ENQUIRY_FIELDS.nationality.placeholder}
                                            listWithIcon
                                        />
                                    </AUIThemedView>
                                )}
                            />

                            <AUIThemedView style={{ paddingBottom: 30 }}>
                                <AUIThemedText style={inputFieldStyle.label}>
                                    {ENQUIRY_FIELDS.phone.label}
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
                                                    placeholder={ENQUIRY_FIELDS.phone.placeholder}
                                                    keyboardType="numeric"
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
                                            {ENQUIRY_FIELDS.email.label}
                                        </AUIThemedText>
                                        <AUIInputField
                                            value={value}
                                            onChangeText={onChange}
                                            placeholder={ENQUIRY_FIELDS.email.placeholder}
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
                                            {ENQUIRY_FIELDS.language.label}
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
                                    {ENQUIRY_FIELDS.date.label}
                                </AUIThemedText>
                                <AUIThemedView style={enquiryFormStyles.dateContainer}>
                                    <AUIThemedText style={inputFieldStyle.label}>
                                        From
                                    </AUIThemedText>
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
                                                    <AUIThemedText
                                                        style={enquiryFormStyles.fieldError}
                                                    >
                                                        {error.message}
                                                    </AUIThemedText>
                                                )}
                                            </AUIThemedView>
                                        )}
                                    />
                                    <AUIThemedText style={inputFieldStyle.label}>To</AUIThemedText>
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
                                                    <AUIThemedText
                                                        style={enquiryFormStyles.fieldError}
                                                    >
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
                                            {ENQUIRY_FIELDS.accommodation.label}
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
                                            placeholder={ENQUIRY_FIELDS.nationality.placeholder}
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
                                            {ENQUIRY_FIELDS.comment.label}
                                        </AUIThemedText>
                                        <AUIInputField
                                            multiline
                                            numberOfLines={4}
                                            value={value}
                                            onChangeText={onChange}
                                            placeholder={ENQUIRY_FIELDS.comment.placeholder}
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
                            <AUIButton
                                title="Clear"
                                onPress={() => reset()}
                                style={{ width: "48%" }}
                            />
                            <AUIButton
                                title={"Save"}
                                selected
                                onPress={handleSubmit(onSave)}
                                disabled={!formState.isValid}
                                style={{ width: "48%" }}
                            />
                        </AUIThemedView>
                    </AUIThemedView>
                </AUIThemedView>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

export default function OverviewTab({ schoolOverView, courseId, clientId }: OverviewTabProps) {
    const theme = useSelector((state: RootState) => state.global.theme);
    const userData = useSelector((state: RootState) => state.global.user);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const { t } = useTranslation();
    const userId = userData._id;

    const [overallReviews, setReviews] = useState([]);
    const reviewOfTheSchool = useLangTransformSelector(
        (state: RootState) => state.api.ratingsOfTheSchool || {}
    );
    const handlePhonePress = (number: string) => {
        Linking.openURL("tel:${number}");
    };

    const handleEmailPress = (email: string) => {
        Linking.openURL("mailto:${email}");
    };

    const handleWebPress = (website: string) => {
        Linking.openURL("https://${website}");
    };

    useEffect(() => {
        if (reviewOfTheSchool?.docs) {
            const overallReviewsData = reviewOfTheSchool?.docs.map((rtng: any) => {
                return {
                    id: "a1",
                    name: rtng?.user?.name,
                    image: rtng?.user?.photo
                        ? rtng?.user?.photo
                        : Asset.fromModule(require("@/assets/images/local/user.png")),
                    role: "Student",
                    comment: rtng?.comment,
                    rating: rtng?.rating,
                };
            });
            setReviews(overallReviewsData);
        }
    }, [reviewOfTheSchool]);

    return (
        <AUIThemedView>
            <AUIThemedView style={{ marginTop: 15, marginHorizontal: "auto" }}>
                <FlatList
                    scrollEnabled={false}
                    data={schoolOverView?.schoolInfo}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <AUIInfoCard
                            titleStyle={{ fontSize: 21 }}
                            subtitleStyle={{
                                fontSize: 14,
                                color: APP_THEME.light.gray,
                            }}
                            title={item.title}
                            subtitle={item.subtitle}
                            cardStyle={{
                                width: Dimensions.get("window").width / 2 - 19,
                            }}
                        />
                    )}
                    keyExtractor={(item) => item?._id}
                />
            </AUIThemedView>

            <AUIThemedView>
                <SectionTitle>{t(GLOBAL_TRANSLATION_LABEL.latestEvents)}</SectionTitle>
                {schoolOverView?.events.length > 0 ? (
                    <>
                        <EventsList data={schoolOverView?.events} />
                    </>
                ) : (
                    <AUIComingSoon />
                )}
            </AUIThemedView>

            <AUIThemedView>
                <SectionTitle>{t(GLOBAL_TRANSLATION_LABEL.facilities)}</SectionTitle>
                {schoolOverView?.facilities.length > 0 ? (
                    <FacilitiesList data={schoolOverView?.facilities} />
                ) : (
                    <AUIComingSoon />
                )}
            </AUIThemedView>

            <AUIThemedView style={enquireNowStyles.contactNowContainer}>
                <SectionTitle>{t(GLOBAL_TRANSLATION_LABEL.contactNow)}</SectionTitle>
                <AUIThemedView style={enquireNowStyles.contactNowIconContainer}>
                    <ContactNow
                        name="phone"
                        IconComponent={FontAwesome}
                        onPress={() => {
                            handlePhonePress(schoolOverView.phone);
                        }}
                    />
                    <ContactNow
                        name="envelope"
                        IconComponent={FontAwesome}
                        onPress={() => {
                            handleEmailPress(schoolOverView.email);
                        }}
                    />
                    <ContactNow
                        name="globe"
                        IconComponent={Feather}
                        onPress={() => {
                            handleWebPress(schoolOverView.website);
                        }}
                    />
                </AUIThemedView>
            </AUIThemedView>

            <AUIThemedView>
                <Pressable style={buttonStyle.container} onPress={() => setIsModalVisible(true)}>
                    <AUIThemedView style={[buttonStyle.buttonInner]}>
                        <AUIThemedText
                            style={[buttonStyle.buttonText, { color: TEXT_THEME[theme].primary }]}
                        >
                            {t(GLOBAL_TRANSLATION_LABEL.enquireNow)}
                        </AUIThemedText>
                    </AUIThemedView>
                </Pressable>
            </AUIThemedView>

            <AUIThemedView>
                <SectionTitle viewAll="(home)/ratingsAndReview/AUIRatingsAndReview">
                    {t(GLOBAL_TRANSLATION_LABEL.ratingsAndReview)}
                </SectionTitle>
                <ReviewList data={overallReviews} horizontal />
            </AUIThemedView>

            <EnquireNowModal
                isVisible={isModalVisible}
                userId={userId}
                courseId={courseId}
                clientId={clientId}
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
    contactNowContainer: {
        flexDirection: "column",
    },
    contactNowIconContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
        paddingHorizontal: 40,
        marginBottom: 5,
    },
});
