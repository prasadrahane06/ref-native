import AUIButton from "@/components/common/AUIButton";
import DropdownComponent from "@/components/common/AUIDropdown";
import AUIInputField from "@/components/common/AUIInputField";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { ApiSuccessToast } from "@/components/common/AUIToast";
import SectionTitle from "@/components/home/common/SectionTitle";
import CourseDetailsComponent from "@/components/home/courseDetails/CourseDetailsComponent";
import ScheduleAndLesson from "@/components/home/courseDetails/ScheduleAndLesson";
import SimilarCoursesList from "@/components/home/courseDetails/SimilarCourses";
import { APP_THEME } from "@/constants/Colors";
import { ENQUIRY_FIELDS, GLOBAL_TEXT } from "@/constants/Properties";
import { inputFieldStyle } from "@/constants/Styles";
import { accommodationData } from "@/constants/dummy data/accommodationData";
import { countriesData } from "@/constants/dummy data/countriesData";
import { nationalityData } from "@/constants/dummy data/nationalityData";
import { addEnquiry } from "@/redux/enquiryformSlice";
import { RootState } from "@/redux/store";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { FacilitiesList } from "../schoolDetails/FacilitiesList";

interface PlanComponentProps {
    courseId: string;
    plan: any;
    scheduleDescription: string;
    lessonDescription: string;
    similarCourses: any;
}

interface EnquireNowModalProps {
    isVisible: boolean;
    onClose: () => void;
    content: React.ReactNode;
    onSave: () => void;
    onClear: () => void;
    isSaveDisabled: boolean;
}

function EnquireNowModal({
    isVisible,
    onClose,
    content,
    onSave,
    onClear,
    isSaveDisabled,
}: EnquireNowModalProps) {
    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <AUIThemedView style={enquireNowStyles.modalContent}>
                <AUIThemedView style={enquireNowStyles.titleContainer}>
                    <AUIThemedText style={enquireNowStyles.title}>
                        {GLOBAL_TEXT.enquire_now}
                    </AUIThemedText>
                    <Pressable onPress={onClose} style={{ padding: 10 }}>
                        <MaterialIcons name="close" color="#000" size={22} />
                    </Pressable>
                </AUIThemedView>

                {content}

                <AUIThemedView style={enquireNowStyles.footerContainer}>
                    <AUIThemedView style={enquireNowStyles.buttonContainer}>
                        <AUIButton
                            title="Clear"
                            onPress={onClear}
                            style={{ width: "48%" }}
                        />
                        <AUIButton
                            title={"Save"}
                            selected
                            onPress={onSave}
                            disabled={isSaveDisabled}
                            style={{ width: "48%" }}
                        />
                    </AUIThemedView>
                </AUIThemedView>
            </AUIThemedView>
        </Modal>
    );
}

const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    nationality: Yup.string().required("Nationality is required"),
    phoneCode: Yup.string().required("Phone code is required"),
    phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Enter valid mobile number")
        .required(GLOBAL_TEXT.validate_mobile),
    email: Yup.string()
        .email(GLOBAL_TEXT.validate_email)
        .required(GLOBAL_TEXT.validate_email),
    language: Yup.string().required("Language is required"),
    startDate: Yup.string().required("Start date is required"),
    endDate: Yup.string().required("End date is required"),
    accommodation: Yup.string().required("Accommodation is required"),
    comment: Yup.string().required("Comment is required"),
});

export default function PlanComponent({
    courseId,
    plan,
    scheduleDescription,
    lessonDescription,
    similarCourses,
}: PlanComponentProps) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const dispatch = useDispatch();
    const enquiryData = useSelector((state: RootState) => state.enquiryForm);
    console.log("enquiryData", JSON.stringify(enquiryData));

    const { watch, reset, setValue, control, handleSubmit, formState } =
        useForm({
            resolver: yupResolver(schema),
            mode: "onChange",
            defaultValues: {
                name: "",
                nationality: "",
                phoneCode: "+44",
                phoneNumber: "",
                email: "",
                language: "English",
                startDate: new Date().toISOString(),
                endDate: new Date().toISOString(),
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

    const onSave = (data: any) => {
        console.log("formdata", data);

        const enquiry = {
            ...data,
            courseId,
            plan,
        };

        dispatch(addEnquiry(enquiry));
        ApiSuccessToast("Enquiry Send 🎉. We will contact you soon!");
        setIsModalVisible(false);
        reset();
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

    const EnquiryForm = ({ control }: any) => {
        return (
            <ScrollView style={enquiryFormStyles.container}>
                <Controller
                    name="name"
                    control={control}
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
                        <AUIThemedView style={enquiryFormStyles.fieldContainer}>
                            <AUIInputField
                                value={value}
                                onChangeText={onChange}
                                placeholder={ENQUIRY_FIELDS.name.placeholder}
                                label={ENQUIRY_FIELDS.name.label}
                            />
                            <AUIThemedView>
                                {error && (
                                    <AUIThemedText
                                        style={enquiryFormStyles.fieldError}
                                    >
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
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
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
                                setValue={({
                                    nationality,
                                }: {
                                    nationality: string;
                                }) => onChange(nationality)}
                                labelField="nationality"
                                valueField="nationality"
                                placeholder={
                                    ENQUIRY_FIELDS.nationality.placeholder
                                }
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
                                <AUIThemedView
                                    style={enquiryFormStyles.phoneNumber}
                                >
                                    <AUIInputField
                                        value={value}
                                        onChangeText={onChange}
                                        placeholder={
                                            ENQUIRY_FIELDS.phone.placeholder
                                        }
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
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
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
                                    <AUIThemedText
                                        style={enquiryFormStyles.fieldError}
                                    >
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
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
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
                                        onPress={() =>
                                            setShowStartDatePicker(true)
                                        }
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
                                                minimumDate={new Date()}
                                                style={{
                                                    backgroundColor:
                                                        APP_THEME.primary.first, // iOS only
                                                }}
                                            />
                                        )}
                                        <TextInput
                                            style={{
                                                flex: 1,
                                                paddingVertical: 10,
                                                color: "#000",
                                            }}
                                            value={formatDate(value)}
                                            editable={false}
                                            onChangeText={onChange}
                                        />
                                        <Ionicons
                                            name="calendar-clear"
                                            size={20}
                                            color={APP_THEME.primary.first}
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
                        <AUIThemedText style={inputFieldStyle.label}>
                            To
                        </AUIThemedText>
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
                                        onPress={() =>
                                            setShowEndDatePicker(true)
                                        }
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
                                                color: "#000",
                                            }}
                                            value={formatDate(value)}
                                            editable={false}
                                            onChangeText={onChange}
                                        />
                                        <Ionicons
                                            name="calendar-clear"
                                            size={20}
                                            color={APP_THEME.primary.first}
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
                                            display="spinner"
                                            onChange={onChangeEndDate}
                                            minimumDate={new Date()}
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
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
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
                                setValue={(selectedItem) =>
                                    onChange(selectedItem.name)
                                }
                                labelField="name"
                                valueField="name"
                                listWithIcon
                                placeholder={
                                    ENQUIRY_FIELDS.nationality.placeholder
                                }
                                position="top"
                            />
                        </AUIThemedView>
                    )}
                />

                <Controller
                    name="comment"
                    control={control}
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
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
                                    <AUIThemedText
                                        style={enquiryFormStyles.fieldError}
                                    >
                                        {error.message}
                                    </AUIThemedText>
                                )}
                            </AUIThemedView>
                        </AUIThemedView>
                    )}
                />
            </ScrollView>
        );
    };

    return (
        <AUIThemedView>
            <AUIThemedView style={{ marginTop: 10 }}>
                <AUIThemedText style={styles.boldText}>
                    {GLOBAL_TEXT.course_details}
                </AUIThemedText>
                <CourseDetailsComponent data={plan} />
            </AUIThemedView>

            <AUIThemedView>
                <ScheduleAndLesson
                    scheduleDescription={scheduleDescription}
                    lessonDescription={lessonDescription}
                />
            </AUIThemedView>

            <AUIThemedView>
                <SectionTitle>{GLOBAL_TEXT.facilities}</SectionTitle>
                <FacilitiesList data={plan.facilities} />
            </AUIThemedView>

            <AUIThemedView style={styles.btnContainer}>
                <AUIThemedView style={styles.bookContainer}>
                    <AntDesign name="calendar" size={24} color="black" />
                    <AUIThemedText style={styles.blackBoldText}>
                        {GLOBAL_TEXT.book_your_seat}
                    </AUIThemedText>
                </AUIThemedView>

                <AUIThemedView style={styles.buyContainer}>
                    <Ionicons name="bag-outline" size={24} color="#fff" />
                    <AUIThemedText style={styles.whiteBoldText}>
                        {GLOBAL_TEXT.buy_now}
                    </AUIThemedText>
                </AUIThemedView>
            </AUIThemedView>

            <AUIThemedView>
                <AUIButton
                    title={GLOBAL_TEXT.enquire_now}
                    selected
                    style={styles.enquireButton}
                    onPress={() => setIsModalVisible(true)}
                />
            </AUIThemedView>

            <AUIThemedView style={{ marginTop: 25 }}>
                <AUIThemedView style={styles.borderBottom} />
            </AUIThemedView>

            <AUIThemedView style={styles.similarCourseContainer}>
                <AUIThemedView>
                    <AUIThemedText style={{ fontWeight: "bold" }}>
                        {GLOBAL_TEXT.similar_courses}
                    </AUIThemedText>
                </AUIThemedView>
                <AUIThemedView>
                    <SimilarCoursesList data={similarCourses} />
                </AUIThemedView>
            </AUIThemedView>

            <EnquireNowModal
                isVisible={isModalVisible}
                onClose={() => {
                    setIsModalVisible(false);
                }}
                content={<EnquiryForm control={control} />}
                onSave={handleSubmit(onSave)}
                onClear={() => reset()}
                isSaveDisabled={!formState.isValid}
            />
        </AUIThemedView>
    );
}

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
    phoneCode: { flex: 0.4 },
    phoneNumber: { flex: 1 },
});

const enquireNowStyles = StyleSheet.create({
    modalContent: {
        height: "100%",
        width: "100%",
        backgroundColor: "#fff",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    titleContainer: {
        backgroundColor: "#fff",
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
        borderColor: APP_THEME.primary.first,
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
        backgroundColor: APP_THEME.background,
    },
    blackBoldText: {
        fontWeight: "bold",
        color: "#000",
    },
    buyContainer: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        padding: 10,
        width: "50%",
        backgroundColor: APP_THEME.primary.first,
    },
    whiteBoldText: {
        fontWeight: "bold",
        color: "#fff",
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
