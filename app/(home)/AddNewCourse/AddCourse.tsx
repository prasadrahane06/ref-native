import useAxios from "@/app/services/axiosClient";
import AUIAccordion from "@/components/common/AUIAccordion";
import AUIButton from "@/components/common/AUIButton";
import DropdownComponent from "@/components/common/AUIDropdown";
import AUIInputField from "@/components/common/AUIInputField";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { ApiErrorToast, ApiSuccessToast } from "@/components/common/AUIToast";
import { BACKGROUND_THEME } from "@/constants/Colors";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Modal, Platform, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

interface Plan {
    _id: string;
    duration: string | { en: string; ar?: string };
    price: string | { en: string; ar?: string };
    bookYourSeat: string | { en: string; ar?: string };
    rating: string | { en: string; ar?: string };
}
interface AddPlanProps {
    visible: boolean;
    onClose: () => void;
}

const AUIAddNewCourse = () => {
    const user = useSelector((state: RootState) => state.global.user);
    const theme = useSelector((state: RootState) => state.global.theme);
    const { control, handleSubmit, reset, setValue } = useForm();
    const [showFromDatePicker, setShowFromDatePicker] = useState(false);
    const [showToDatePicker, setShowToDatePicker] = useState(false);
    const [isAddPlanVisible, setAddPlanVisible] = useState(false);
    const { post } = useAxios();
    const navigation = useNavigation();

    const languageList = [
        { label: "English (Default)", value: "english" },
        { label: "Spanish", value: "spanish" },
        { label: "French", value: "french" },
    ];
    const categoryList = [
        { label: "Science", value: "science" },
        { label: "Arts", value: "arts" },
        { label: "Commerce", value: "commerce" },
    ];

    const { fields, append } = useFieldArray({
        control,
        name: "courses",
    });

    useEffect(() => {
        if (fields.length === 0) {
            append({ title: "", subtitle: "" });
        }
    }, []);

    const addFields = () => {
        append({ title: "", subtitle: "" });
    };

    const onChangeFrom = (event: any, selectedDate?: Date) => {
        setShowFromDatePicker(Platform.OS === "ios");
        setValue("scheduleFrom", selectedDate || new Date());
    };

    const onChangeTo = (event: any, selectedDate?: Date) => {
        setShowToDatePicker(Platform.OS === "ios");
        setValue("scheduleTo", selectedDate || new Date());
    };

    const onSave = async (data: any) => {
        try {
            const payload = {
                client: user?.client,
                courseName: data.courseName,
                description: data.description,
                language: data.language.value,
                numberOfSeats: data.totalSeats,
                startDate: data.scheduleFrom.toISOString(),
                endDate: data.scheduleTo.toISOString(),
                currencyType: data.currentType,
                category: data.category.value,
                courses: data.courses,
                status: 1,
            };
            post(API_URL.course, payload);
            ApiSuccessToast("New Course added successfully.");
            reset();
            navigation.goBack();
        } catch (error) {
            console.log("error in add new course", error);
            ApiErrorToast("Failed to Add New Course");
        }
    };

    const { requestFn } = useApiRequest();
    const plans = useLangTransformSelector((state: RootState) => state.api.coursePlans)?.docs || [];

    useEffect(() => {
        requestFn(API_URL.plan, "coursePlans", { client: true });
    }, []);

    interface Facility {
        _id: string;
        description: string | { [key: string]: string };
        image: string;
        name: string;
        status: number;
    }
    const AddPlan: React.FC<AddPlanProps> = ({ visible, onClose }) => {
        const { control, handleSubmit, reset } = useForm();
        const { post } = useAxios();
        const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
        const facility = useLangTransformSelector(
            (state: RootState) => state.api.myFacilitys || {}
        );

        const [facilities, setFacilities] = useState<Facility[]>([]);

        useEffect(() => {
            requestFn(API_URL.facility, "myFacilitys", { client: true });
        }, []);

        useEffect(() => {
            if (facility?.docs?.length > 0) {
                setFacilities(facility?.docs);
            }
        }, [facility?.docs?.length]);

        const handleCheckboxChange = (facilityId: string, isChecked: boolean) => {
            setSelectedFacilities((prev) =>
                isChecked ? [...prev, facilityId] : prev.filter((item) => item !== facilityId)
            );
        };

        const onSave = (data: any) => {
            const payload = {
                client: user?.client,
                lessonsHour: data.lessonsHour,
                duration: data.duration,
                bookYourSeat: data.bookingAmount,
                schedule: data.schedule,
                price: data.price,
                name: data.name,
                facilities: selectedFacilities,
                courseDetails: data.courses,
            };
            post(API_URL.plan, payload)
                .then((res) => {
                    ApiSuccessToast("New Plan added successfully.");
                    reset();
                    setAddPlanVisible(false);
                })
                .catch((e) => {
                    console.log(e);
                });
        };

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}
            >
                <ScrollView>
                    <AUIThemedView style={styles.modalContainer}>
                        <AUIThemedView style={styles.modalContent}>
                            <AUIThemedView style={styles.headerRow}>
                                <AUIThemedText style={styles.header}>Add your plan</AUIThemedText>
                                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                    <MaterialIcons name="close" size={28} color="#000" />
                                </TouchableOpacity>
                            </AUIThemedView>

                            <Controller
                                control={control}
                                name="name"
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <AUIInputField
                                        label="Enter Plan Name"
                                        placeholder="Name"
                                        value={value}
                                        onChangeText={onChange}
                                        style={styles.input}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="lessonsHour"
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <AUIInputField
                                        label="Enter Lessons Hour"
                                        placeholder="Lessons Hour"
                                        value={value}
                                        onChangeText={onChange}
                                        style={styles.input}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="duration"
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <AUIInputField
                                        label="Enter Total Duration"
                                        placeholder="Duration"
                                        value={value}
                                        onChangeText={onChange}
                                        style={styles.input}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="schedule"
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <AUIInputField
                                        label="Enter Total schedule"
                                        placeholder="schedule"
                                        value={value}
                                        onChangeText={onChange}
                                        style={styles.input}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="price"
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <AUIInputField
                                        label="Enter Total Fee"
                                        placeholder="totalFee"
                                        value={value}
                                        onChangeText={onChange}
                                        style={styles.input}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="bookingAmount"
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <AUIInputField
                                        label="Seat Booking Amount"
                                        placeholder="£"
                                        value={value}
                                        onChangeText={onChange}
                                        style={styles.input}
                                    />
                                )}
                            />

                            <AUIThemedView style={styles.courseDetailsContainer}>
                                <AUIThemedText>Course Details</AUIThemedText>
                                {fields.map((item, index) => (
                                    <AUIThemedView key={item.id}>
                                        <Controller
                                            control={control}
                                            name={`courses[${index}].title`}
                                            defaultValue=""
                                            render={({ field: { onChange, value } }) => (
                                                <AUIInputField
                                                    label="Title"
                                                    placeholder="Title"
                                                    value={value}
                                                    onChangeText={onChange}
                                                    style={styles.input}
                                                />
                                            )}
                                        />
                                        <Controller
                                            control={control}
                                            name={`courses[${index}].subtitle`}
                                            defaultValue=""
                                            render={({ field: { onChange, value } }) => (
                                                <AUIInputField
                                                    label="SubTitle"
                                                    placeholder="SubTitle"
                                                    value={value}
                                                    onChangeText={onChange}
                                                    style={styles.input}
                                                />
                                            )}
                                        />
                                    </AUIThemedView>
                                ))}
                                {fields.length < 5 && (
                                    <AUIButton
                                        title="Add more course detailss"
                                        selected
                                        onPress={addFields}
                                    />
                                )}
                            </AUIThemedView>

                            <AUIThemedView style={styles.planContainer}>
                                <AUIThemedText style={styles.createYourPlanTitle}>
                                    Select Facilities
                                </AUIThemedText>
                                <AUIAccordion
                                    style={styles.AUIAccordion}
                                    innerStyle={styles.AUIAccordionInnerStyle}
                                    title="Select Facilities"
                                >
                                    {facilities?.map((facility: Facility) => (
                                        <AUIThemedView
                                            key={facility?._id}
                                            style={styles.facilitiesRow}
                                        >
                                            <AUIThemedView style={styles.CheckboxContainer}>
                                                <Controller
                                                    control={control}
                                                    name={`facility_${facility._id}`}
                                                    defaultValue={false}
                                                    render={({ field: { onChange, value } }) => (
                                                        <>
                                                            <Checkbox
                                                                style={styles.checkbox}
                                                                value={value}
                                                                onValueChange={(checked) => {
                                                                    onChange(checked);
                                                                    handleCheckboxChange(
                                                                        facility._id,
                                                                        checked
                                                                    );
                                                                }}
                                                                color={
                                                                    value ? "#5BD894" : undefined
                                                                }
                                                            />
                                                            <AUIThemedText
                                                                style={styles.facilitiesLabel}
                                                            >
                                                                {facility.name}
                                                            </AUIThemedText>
                                                        </>
                                                    )}
                                                />
                                            </AUIThemedView>
                                        </AUIThemedView>
                                    ))}
                                </AUIAccordion>
                            </AUIThemedView>

                            <AUIThemedView style={styles.buttonContainer}>
                                <AUIButton
                                    title="Clear"
                                    onPress={() => reset()}
                                    style={{ width: "48%" }}
                                />
                                <AUIButton
                                    title="Save"
                                    selected
                                    onPress={handleSubmit(onSave)}
                                    style={{ width: "48%" }}
                                />
                            </AUIThemedView>
                        </AUIThemedView>
                    </AUIThemedView>
                </ScrollView>
            </Modal>
        );
    };

    return (
        <ScrollView
            contentContainerStyle={[
                styles.container,
                { backgroundColor: BACKGROUND_THEME[theme].background },
            ]}
        >
            <AUIThemedText style={styles.title}>Add new course</AUIThemedText>

            <Controller
                control={control}
                name="courseName"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                    <AUIInputField
                        label="Enter your Course Name"
                        placeholder="Course Name"
                        value={value}
                        onChangeText={onChange}
                        style={styles.input}
                    />
                )}
            />

            <Controller
                control={control}
                name="description"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                    <AUIInputField
                        label="Enter Course Description"
                        placeholder="Description"
                        value={value}
                        onChangeText={onChange}
                        style={styles.input}
                    />
                )}
            />

            <Controller
                control={control}
                name="totalSeats"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                    <AUIInputField
                        label="Total Number of Seats"
                        placeholder="Seats"
                        value={value}
                        onChangeText={onChange}
                        keyboardType="numeric"
                        style={styles.input}
                    />
                )}
            />

            <Controller
                control={control}
                name="language"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                    <DropdownComponent
                        label="Select Language"
                        list={languageList}
                        value={value}
                        setValue={onChange}
                        placeholder="Select Language"
                        style={styles.input}
                    />
                )}
            />

            <Controller
                control={control}
                name="category"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                    <DropdownComponent
                        label="Select Category"
                        list={categoryList}
                        value={value}
                        setValue={onChange}
                        placeholder="Select Category"
                        style={styles.input}
                    />
                )}
            />

            <Controller
                control={control}
                name="currentType"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                    <AUIInputField
                        label="Enter Current Type"
                        placeholder="Current Type"
                        value={value}
                        onChangeText={onChange}
                        style={styles.input}
                    />
                )}
            />

            <AUIThemedView style={styles.dateContainer}>
                <Controller
                    control={control}
                    name="scheduleFrom"
                    defaultValue={new Date()}
                    render={({ field: { onChange, value } }) => (
                        <>
                            <AUIInputField
                                label="From"
                                placeholder="DD/MM/YY"
                                value={value.toLocaleDateString()}
                                onFocus={() => setShowFromDatePicker(true)}
                                style={styles.dateInput}
                            />
                            {showFromDatePicker && (
                                <DateTimePicker
                                    value={value}
                                    mode="date"
                                    display="default"
                                    onChange={(e, date) => {
                                        onChangeFrom(e, date);
                                        onChange(date);
                                    }}
                                />
                            )}
                        </>
                    )}
                />

                <Controller
                    control={control}
                    name="scheduleTo"
                    defaultValue={new Date()}
                    render={({ field: { onChange, value } }) => (
                        <>
                            <AUIInputField
                                label="To"
                                placeholder="DD/MM/YY"
                                value={value.toLocaleDateString()}
                                onFocus={() => setShowToDatePicker(true)}
                                style={styles.dateInput}
                            />
                            {showToDatePicker && (
                                <DateTimePicker
                                    value={value}
                                    mode="date"
                                    display="default"
                                    onChange={(e, date) => {
                                        onChangeTo(e, date);
                                        onChange(date);
                                    }}
                                />
                            )}
                        </>
                    )}
                />
            </AUIThemedView>

            <AUIThemedView style={styles.planContainer}>
                <AUIThemedText style={styles.createYourPlanTitle}>
                    Create your plan for fees
                </AUIThemedText>
                {plans.map((plan: Plan, index: number) => {
                    return (
                        <AUIAccordion
                            key={plan._id}
                            style={styles.AUIAccordion}
                            innerStyle={styles.AUIAccordionInnerStyle}
                            title={`Plan ${index + 1}`}
                        >
                            <AUIThemedView style={styles.row}>
                                <AUIThemedView style={styles.rowContainer}>
                                    <AUIThemedText style={styles.label}>
                                        Total Duration
                                    </AUIThemedText>
                                    <AUIThemedText style={styles.label2}>
                                        {plan.duration}
                                    </AUIThemedText>
                                </AUIThemedView>
                            </AUIThemedView>
                            <AUIThemedView style={styles.row}>
                                <AUIThemedView style={styles.rowContainer}>
                                    <AUIThemedText style={styles.label}>Total fee</AUIThemedText>
                                    <AUIThemedText style={styles.label2}>
                                        {plan.price}
                                    </AUIThemedText>
                                </AUIThemedView>
                            </AUIThemedView>
                            <AUIThemedView style={styles.row2}>
                                <AUIThemedView style={styles.rowContainer}>
                                    <AUIThemedText style={styles.label}>
                                        Book your seat
                                    </AUIThemedText>
                                    <AUIThemedText style={styles.label2}>
                                        {plan.bookYourSeat}
                                    </AUIThemedText>
                                </AUIThemedView>
                            </AUIThemedView>
                        </AUIAccordion>
                    );
                })}
            </AUIThemedView>

            <AUIThemedView style={styles.buttonContainer}>
                <AUIButton
                    title={"Add Plan"}
                    selected
                    onPress={() => setAddPlanVisible(true)}
                    style={{ width: "100%" }}
                />
            </AUIThemedView>

            <AUIThemedView style={styles.buttonContainer}>
                <AUIButton title="Clear form" onPress={() => reset()} style={{ width: "48%" }} />
                <AUIButton
                    title="Add Course"
                    selected
                    onPress={handleSubmit(onSave)}
                    style={{ width: "48%" }}
                />
            </AUIThemedView>

            <AddPlan visible={isAddPlanVisible} onClose={() => setAddPlanVisible(false)} />
        </ScrollView>
    );
};

export default AUIAddNewCourse;

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: { fontSize: 20, marginBottom: 10 },
    scheduleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    input: { marginBottom: 10 },
    commentInput: {
        height: 100,
    },
    datePicker: {
        flex: 1,
        marginHorizontal: 5,
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    accordionContainer: { marginTop: 15 },
    facilitiesRow: {
        flexDirection: "column",
        justifyContent: "space-between",
        borderBottomWidth: 2,
        borderBottomColor: "#ddd",
        padding: 10,
    },
    facilitiesRow2: {
        flexDirection: "column",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    CheckboxContainer: {
        flexDirection: "row",
        gap: 10,
        paddingLeft: 10,
    },
    CheckboxContainer1: {
        flexDirection: "column",
        gap: 10,
        paddingLeft: 10,
    },
    CheckboxInnerContainer: {
        flexDirection: "row",
        gap: 10,
    },
    checkbox: {},
    row: {
        flexDirection: "column",
        justifyContent: "space-between",
        borderBottomWidth: 2,
        borderBottomColor: "#ddd",
        padding: 5,
    },
    row2: {
        flexDirection: "column",
        justifyContent: "space-between",
    },
    value: {
        textAlign: "center",
        fontWeight: "400",
        fontSize: 14,
    },
    rowContainer: {
        flexDirection: "row",
        padding: 5,
    },
    label: {
        flex: 1,
        textAlign: "left",
        fontWeight: "500",
        fontSize: 14,
        marginRight: 50,
        paddingVertical: 3,
    },
    facilitiesLabel: {
        flex: 1,
        textAlign: "left",
        fontWeight: "500",
        fontSize: 16,
        marginRight: 50,
        paddingVertical: 3,
    },
    label2: {
        flex: 1,
        textAlign: "right",
        fontWeight: "500",
        fontSize: 14,
        marginLeft: 50,
        paddingVertical: 3,
    },
    dateContainer: { flexDirection: "row", justifyContent: "space-between" },
    dateInput: { width: 160 },
    courseDetailsContainer: { marginTop: 12 },
    planContainer: {},
    createYourPlanTitle: { marginTop: 20, marginBottom: 5 },
    AUIAccordion: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
    },
    AUIAccordionInnerStyle: {
        padding: 10,
    },
    commentContainer: { marginTop: 15 },
    modalContainer: {
        width: "100%",
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    closeButton: {},
    header: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
