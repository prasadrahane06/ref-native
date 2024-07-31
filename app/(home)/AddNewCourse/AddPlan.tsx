import useAxios from "@/app/services/axiosClient";
import AUIAccordion from "@/components/common/AUIAccordion";
import AUIButton from "@/components/common/AUIButton";
import AUIInputField from "@/components/common/AUIInputField";
import AUIModal from "@/components/common/AUIModal";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { ApiErrorToast, ApiSuccessToast } from "@/components/common/AUIToast";
import { TEXT_THEME } from "@/constants/Colors";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import Checkbox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

interface AddPlanProps {
    visible: boolean;
    onClose: () => void;
    plan?: Plan;
    isEditMode: boolean;
    refreshPlans: () => void;
}
interface Plan {
    _id: string;
    name: any | { en: string; ar?: string };
    duration: any | { en: string; ar?: string };
    price: any | { en: string; ar?: string };
    bookYourSeat: any | { en: string; ar?: string };
    rating: any | { en: string; ar?: string };
    lessonsHour: any | { en: string; ar?: string };
    schedule: any | { en: string; ar?: string };
    facilities: string[];
    courseDetails: any;
}

interface Facility {
    _id: string;
    description: string | { [key: string]: string };
    image: string;
    name: string;
    status: number;
}
const AddPlan: React.FC<AddPlanProps> = ({ visible, onClose, plan, refreshPlans }) => {
    const user = useSelector((state: RootState) => state.global.user);
    const { control, handleSubmit, reset, setValue, getValues } = useForm();
    const { post, patch, del } = useAxios();
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const { requestFn } = useApiRequest();
    const facility = useLangTransformSelector((state: RootState) => state.api.myFacilitys || {});
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [initialValues, setInitialValues] = useState<any>({});

    useEffect(() => {
        requestFn(API_URL.facility, "myFacilitys", { client: true });
    }, []);

    useEffect(() => {
        requestFn(API_URL.plan, "coursePlans", { client: true });
    }, []);

    useEffect(() => {
        if (facility?.docs?.length > 0) {
            setFacilities(facility?.docs);
        }
    }, [facility?.docs]);

    useEffect(() => {
        if (plan) {
            const initialPlanValues = {
                name: plan.name,
                duration: plan.duration,
                price: plan.price,
                bookYourSeat: plan.bookYourSeat,
                lessonsHour: plan.lessonsHour,
                schedule: plan.schedule,
                facilities: plan.facilities,
                courses: plan.courseDetails,
            };
            setInitialValues(initialPlanValues);
            setValue("name", plan.name);
            setValue("duration", plan.duration);
            setValue("price", plan.price);
            setValue("bookYourSeat", plan.bookYourSeat);
            setValue("lessonsHour", plan.lessonsHour);
            setValue("schedule", plan.schedule);
            setSelectedFacilities(plan.facilities);
            setValue("courses", plan.courseDetails);
        } else {
            reset();
        }
    }, [plan, setValue, reset]);

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
                ApiSuccessToast("New Plan added successfully.");
                reset();
                onClose();
            })
            .catch((e) => {
                console.log(e);
            });

        // requestFn()
    };

    const handleEdit = (data: any) => {
        const values = getValues();
        const payload: any = { id: plan?._id };
        Object.keys(values).forEach((key) => {
            if (values[key] !== initialValues[key]) {
                payload[key] = values[key];
            }
        });
        if (selectedFacilities !== initialValues.facilities) {
            payload.facilities = selectedFacilities;
        }
        patch(API_URL.plan, payload)
            .then((res) => {
                ApiSuccessToast("Plan updated successfully.");
                onClose();
                refreshPlans();
                reset();
            })
            .catch((e) => {
                ApiErrorToast("Failed to update plan");
                console.log(e);
            });
    };

    const handleDelete = () => {
        if (!plan?._id) return;
        del(`${API_URL.plan}?id=${plan?._id}`)
            .then((res) => {
                ApiSuccessToast("Plan deleted successfully.");
                onClose();
                setShowConfirmation(false);
                refreshPlans();
            })
            .catch((e) => {
                ApiErrorToast("Failed to delete plan.");
                console.log(e);
            });
    };

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

    return (
        <>
            <AUIModal
                visible={visible}
                onClose={onClose}
                title={plan ? "Edit Plan" : "Add Your Plan"}
                style={styles.modalContainerStyle}
            >
                <ScrollView>
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
                                <AUIThemedView key={facility?._id} style={styles.facilitiesRow}>
                                    <AUIThemedView style={styles.CheckboxContainer}>
                                        <Controller
                                            control={control}
                                            name={`facility_${facility?._id}`}
                                            defaultValue={false}
                                            render={({ field: { onChange, value } }) => (
                                                <>
                                                    <Checkbox
                                                        style={styles.checkbox}
                                                        value={value}
                                                        onValueChange={(checked) => {
                                                            onChange(checked);
                                                            handleCheckboxChange(
                                                                facility?._id,
                                                                checked
                                                            );
                                                        }}
                                                        color={value ? "#5BD894" : undefined}
                                                    />
                                                    <AUIThemedText style={styles.facilitiesLabel}>
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
                        {plan ? (
                            <AUIThemedView style={styles.buttonMainContainer}>
                                <AUIThemedView style={styles.buttonContainer}>
                                    <AUIButton
                                        title="Clear"
                                        onPress={() => {
                                            reset();
                                        }}
                                        style={{ width: "48%" }}
                                    />
                                    <AUIButton
                                        title="Update"
                                        selected
                                        style={{ width: "48%" }}
                                        onPress={handleSubmit(handleEdit)}
                                    />
                                </AUIThemedView>
                                <AUIButton
                                    title="Delete"
                                    selected
                                    background={TEXT_THEME.light.danger}
                                    style={{ width: "100%" }}
                                    onPress={() => {
                                        setShowConfirmation(true);
                                    }}
                                />
                            </AUIThemedView>
                        ) : (
                            <AUIThemedView style={styles.buttonContainer}>
                                <AUIButton
                                    title="Clear"
                                    onPress={() => {
                                        reset();
                                    }}
                                    style={{ width: "48%" }}
                                />
                                <AUIButton
                                    title="Save"
                                    selected
                                    style={{ width: "48%" }}
                                    onPress={handleSubmit(onSave)}
                                />
                            </AUIThemedView>
                        )}
                    </AUIThemedView>
                    <AUIModal
                        visible={showConfirmation}
                        onClose={() => setShowConfirmation(false)}
                        title="Confirm Delete"
                    >
                        <AUIThemedText>
                            Are you sure you want to delete this facility?
                        </AUIThemedText>
                        <AUIThemedView style={styles.buttonContainer}>
                            <AUIButton
                                title="Cancel"
                                onPress={() => setShowConfirmation(false)}
                                style={{ width: "48%" }}
                            />
                            <AUIButton
                                title="Delete"
                                selected
                                background={TEXT_THEME.light.danger}
                                style={{ width: "48%" }}
                                onPress={handleDelete}
                            />
                        </AUIThemedView>
                    </AUIModal>
                </ScrollView>
            </AUIModal>
        </>
    );
};
export default AddPlan;

const styles = StyleSheet.create({
    modalContainerStyle: { width: "100%", height: "100%" },
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
    buttonMainContainer: { gap: 5 },
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
