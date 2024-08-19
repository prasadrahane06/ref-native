import useAxios from "@/app/services/axiosClient";
import AUIAccordion from "@/components/common/AUIAccordion";
import AUIButton from "@/components/common/AUIButton";
import DropdownComponent from "@/components/common/AUIDropdown";
import AUIInputField from "@/components/common/AUIInputField";
import AUIModal from "@/components/common/AUIModal";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { ApiErrorToast, ApiSuccessToast } from "@/components/common/AUIToast";
import CustomTooltip from "@/components/common/AUIToolTip";
import { APP_THEME, BACKGROUND_THEME, TEXT_THEME } from "@/constants/Colors";
import { inputFieldStyle } from "@/constants/Styles";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
// import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { setLoader } from "@/redux/globalSlice";

const durationUnits = [
    {
        unit: "Hours",
    },
    {
        unit: "Days",
    },
    {
        unit: "Weeks",
    },
    {
        unit: "Months",
    },
    {
        unit: "Years",
    },
];

type Course = {
    title: string;
    subtitle: string;
};

type FormValues = {
    planName: string;
    durationInNumber: string;
    durationInUnit: string;
    schedule: string;
    price: string;
    bookYourSeat: string;
    courses: Course[];
    [key: `facility_${string}`]: boolean;
};

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
    // lessonsHour: any | { en: string; ar?: string };
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
    const { t } = useTranslation();
    const { post, patch, del } = useAxios();
    const { requestFn } = useApiRequest();
    const dispatch = useDispatch();

    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [initialValues, setInitialValues] = useState<any>({});
    const [newFacility, setNewFacility] = useState<string[]>([]);

    // const facilitySchema = facilities.reduce((acc: any, _id: any) => {
    //     acc[`facility_${_id}`] = Yup.boolean().optional();
    //     return acc;
    // }, {});

    const schema = Yup.object().shape({
        planName: Yup.string().required(`${t("name_is_required")}`),
        durationInNumber: Yup.string().required(`${t("duration_is_required")}`),
        durationInUnit: Yup.string().required(`${t("duration_is_required")}`),
        schedule: Yup.string().required(`${t("schedule_is_required")}`),
        price: Yup.string().required(`${t("price_is_required")}`),
        bookYourSeat: Yup.string().required(`${t("price_is_required")}`),
        // courses: Yup.array()
        //     .of(
        //         Yup.object().shape({
        //             title: Yup.string().required(),
        //             subtitle: Yup.string().required(),
        //         })
        //     )
        //     .optional(),
        // ...facilitySchema,
        // [`facility_${}`]: Yup.boolean().optional(),
    });

    const { control, handleSubmit, reset, setValue, getValues } = useForm<FormValues>({
        // @ts-ignore
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            planName: "",
            durationInNumber: "",
            durationInUnit: "",
            schedule: "",
            price: "",
            bookYourSeat: "",
            courses: [{ title: "", subtitle: "" }],
        },
    });

    const theme = useSelector((state: RootState) => state.global.theme);
    const user = useSelector((state: RootState) => state.global.user);
    const facility = useLangTransformSelector((state: RootState) => state.api.myFacilitys || {});

    useEffect(() => {
        requestFn(API_URL.facility, "myFacilitys", { client: true });
    }, []);

    useEffect(() => {
        if (plan && plan.facilities && plan.facilities.length > 0) {
            const facilityIds = plan.facilities.map((item: any) => item._id);
            setNewFacility(facilityIds);
        }
    }, [plan]);

    useEffect(() => {
        setSelectedFacilities(newFacility);
    }, [newFacility]);

    useEffect(() => {
        if (facility?.docs?.length > 0) {
            setFacilities(facility?.docs);
        }
    }, [facility?.docs]);

    useEffect(() => {
        if (plan) {
            // const durationInNumber = plan?.duration.split(" ")[0];
            // const durationInUnit = plan?.duration.split(" ")[1];

            const durationArray = plan?.duration.split(" ");

            // const initialPlanValues = {
            //     name: plan.name,
            //     duration: plan.duration,
            //     price: plan.price,
            //     bookYourSeat: plan.bookYourSeat,
            //     // lessonsHour: plan.lessonsHour,
            //     schedule: plan.schedule,
            //     facilities: plan.facilities,
            //     courses: plan.courseDetails,
            // };

            // setInitialValues(initialPlanValues);

            setSelectedFacilities(plan?.facilities);

            setValue("planName", plan?.name);
            setValue("durationInNumber", durationArray[0]);
            setValue("durationInUnit", durationArray[1]);
            setValue("price", plan?.price.toString());
            setValue("bookYourSeat", plan?.bookYourSeat.toString());
            setValue("schedule", plan?.schedule);
            setValue("courses", plan?.courseDetails);
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
        dispatch(setLoader(true));

        const duration = `${data.durationInNumber} ${data.durationInUnit}`.trim();

        const payload = {
            client: user?.client,
            name: data.planName,
            duration: duration,
            schedule: data.schedule,
            price: data.price,
            bookYourSeat: data.bookYourSeat,
            courseDetails: data.courses,
            facilities: selectedFacilities,
            lessonsHour: duration, //  change in backend
        };

        post(API_URL.plan, payload)
            .then((res) => {
                dispatch(setLoader(true));

                ApiSuccessToast(res.message);
                reset();
                onClose();
            })
            .catch((error) => {
                dispatch(setLoader(true));
                ApiErrorToast(error.message);
                console.log("error in add plan", error);
            });
    };

    const handleEdit = (data: any) => {
        dispatch(setLoader(true));
        onClose();
        reset();

        // const payload: any = { id: plan?._id };

        // Object.keys(values).forEach((key) => {
        //     if (values[key] !== initialValues[key]) {
        //         payload[key] = values[key];
        //     }
        // });

        // if (selectedFacilities !== initialValues.facilities) {
        //     payload.facilities = selectedFacilities;
        // }

        const duration = `${data.durationInNumber} ${data.durationInUnit}`.trim();

        const payload = {
            id: plan?._id,
            name: data.planName,
            duration: duration,
            schedule: data.schedule,
            price: data.price,
            bookYourSeat: data.bookYourSeat,
            courseDetails: data.courses,
            facilities: selectedFacilities,
            lessonsHour: duration, //  change in backend
        };

        patch(API_URL.plan, payload)
            .then((res) => {
                refreshPlans();
                ApiSuccessToast(`${t("plan_updated_successfully")}`);
                dispatch(setLoader(false));
            })
            .catch((error) => {
                refreshPlans();
                dispatch(setLoader(false));
                ApiErrorToast(`${t("failed_to_update_plan")}`);
                console.log("error in edit plan", error);
            });
    };

    const handleDelete = () => {
        if (!plan?._id) return;
        del(API_URL.plan, {}, { id: plan?._id })
            .then((res) => {
                ApiSuccessToast(`${t("plan_deleted_successfully")}`);
                onClose();
                setShowConfirmation(false);
                refreshPlans();
            })
            .catch((error) => {
                ApiErrorToast(`${t("failed_to_delete_plan")}`);
                console.log("error in delete plan", error);
            });
    };

    const { fields, append, remove } = useFieldArray({
        control: control,
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
                onClose={() => {
                    onClose();
                    reset();
                    setSelectedFacilities([]);
                }}
                title={plan ? "Edit Plan" : `${t("add_your_plan")}`}
                style={styles.modalContainerStyle}
            >
                {/* <ScrollView> */}
                <Controller
                    control={control}
                    name="planName"
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <AUIThemedView>
                            <AUIInputField
                                label={t("plan_name")}
                                placeholder={t("name")}
                                value={value}
                                onChangeText={onChange}
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

                <AUIThemedView style={{ marginVertical: 25 }}>
                    <AUIThemedView style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <AUIThemedText style={inputFieldStyle.label}>
                            {t("enter_total_duration")}
                        </AUIThemedText>

                        <CustomTooltip
                            text="Total Duration is duration of your whole course for that plan"
                            tooltipStyle={{ padding: 15 }}
                        >
                            <Ionicons
                                name="information-circle-outline"
                                size={20}
                                color={APP_THEME.light.primary.first}
                            />
                        </CustomTooltip>
                    </AUIThemedView>

                    <AUIThemedView style={styles.durationContainer}>
                        <Controller
                            name="durationInNumber"
                            control={control}
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                                <AUIThemedView style={{ flex: 1 }}>
                                    <AUIThemedView
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            borderWidth: 2,
                                            borderColor: "#ccc",
                                            borderRadius: 6,
                                        }}
                                    >
                                        <TextInput
                                            style={{
                                                flex: 1,
                                                paddingVertical: 10,
                                                color: TEXT_THEME[theme].primary,
                                                padding: 20,
                                            }}
                                            value={value}
                                            onChangeText={onChange}
                                            keyboardType="numeric"
                                            placeholder="Enter in numbers"
                                        />
                                    </AUIThemedView>
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
                            name="durationInUnit"
                            control={control}
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                                <AUIThemedView style={{ flex: 1 }}>
                                    <AUIThemedView>
                                        <DropdownComponent
                                            //@ts-ignore
                                            list={durationUnits}
                                            value={value}
                                            setValue={({ unit }: { unit: string }) =>
                                                onChange(unit)
                                            }
                                            labelField="unit"
                                            // label="Select your unit"
                                            labelStyles={{
                                                marginTop: 10,
                                                marginBottom: 5,
                                                fontSize: 13,
                                                fontWeight: "bold",
                                                fontStyle: "normal",
                                                color: "#333",
                                            }}
                                            valueField="unit"
                                            placeholder={"Select Duration"}
                                            listWithIcon
                                            isSearchable={false}
                                        />

                                        <AUIThemedView>
                                            {error && (
                                                <AUIThemedText style={styles.fieldError}>
                                                    {error.message}
                                                </AUIThemedText>
                                            )}
                                        </AUIThemedView>
                                    </AUIThemedView>
                                </AUIThemedView>
                            )}
                        />
                    </AUIThemedView>
                </AUIThemedView>

                <Controller
                    control={control}
                    name="schedule"
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <AUIThemedView>
                            <AUIThemedView
                                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
                            >
                                <AUIThemedText style={inputFieldStyle.label}>
                                    {t("total_schedule")}
                                </AUIThemedText>

                                <CustomTooltip
                                    text={`You can add multiple schedules for a plan \n\nFor Example:\n10:00 AM to 11:00 AM\n11:00 AM to 12:00 PM\n`}
                                    tooltipStyle={{ padding: 15 }}
                                >
                                    <Ionicons
                                        name="information-circle-outline"
                                        size={20}
                                        color={APP_THEME.light.primary.first}
                                    />
                                </CustomTooltip>
                            </AUIThemedView>

                            <AUIInputField
                                placeholder={t("schedule")}
                                value={value}
                                onChangeText={onChange}
                                style={styles.input}
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
                    control={control}
                    name="price"
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <AUIThemedView style={{ marginVertical: 25 }}>
                            <AUIInputField
                                label={`${t("plan_fee")} (in SAR only)`}
                                placeholder={t("enter_SAR_only")}
                                value={value}
                                onChangeText={onChange}
                                style={styles.input}
                                keyboardType="numeric"
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
                    control={control}
                    name="bookYourSeat"
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <AUIThemedView>
                            <AUIInputField
                                label={`${t("seat_booking_amount")} (in SAR only)`}
                                placeholder={t("enter_SAR_only")}
                                value={value}
                                onChangeText={onChange}
                                style={styles.input}
                                keyboardType="numeric"
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
                <AUIThemedView style={styles.courseDetailsContainer}>
                    <AUIThemedView style={styles.courseDetails}>
                        <AUIThemedText>{`${t("plan_info")} (${t("optional")})`}</AUIThemedText>

                        <CustomTooltip
                            text={`You can add maximum 5 most important topics for you plan\n\nFor Example:\nTopic 1\nTopic 1 Description\n\nTopic 2\nTopic 2 Description`}
                            tooltipStyle={{ padding: 15 }}
                        >
                            <Ionicons
                                name="information-circle-outline"
                                size={20}
                                color={APP_THEME.light.primary.first}
                            />
                        </CustomTooltip>
                    </AUIThemedView>

                    <AUIThemedView style={styles.courseDetailsItems}>
                        <AUIThemedView style={{ paddingTop: 10 }}>
                            {fields.map((item, index) => (
                                <AUIThemedView key={item.id} style={styles.courseDetailsItem}>
                                    <Controller
                                        control={control}
                                        name={`courses.${index}.title` as const}
                                        render={({ field: { onChange, value } }) => (
                                            <AUIThemedView>
                                                <AUIThemedView style={{ flexDirection: "row" }}>
                                                    <AUIThemedText style={styles.label}>
                                                        {t("title")}
                                                    </AUIThemedText>
                                                    <TouchableOpacity onPress={() => remove(index)}>
                                                        <Ionicons
                                                            name="trash-outline"
                                                            size={20}
                                                            color={"red"}
                                                        />
                                                    </TouchableOpacity>
                                                </AUIThemedView>
                                                <AUIInputField
                                                    placeholder={t("title")}
                                                    value={value}
                                                    onChangeText={onChange}
                                                    style={styles.input}
                                                />
                                            </AUIThemedView>
                                        )}
                                    />
                                    <Controller
                                        control={control}
                                        name={`courses.${index}.subtitle` as const}
                                        render={({ field: { onChange, value } }) => (
                                            <AUIThemedView>
                                                <AUIInputField
                                                    label={t("subTitle")}
                                                    placeholder={t("subTitle")}
                                                    value={value}
                                                    onChangeText={onChange}
                                                    style={styles.input}
                                                />
                                            </AUIThemedView>
                                        )}
                                    />
                                </AUIThemedView>
                            ))}
                            {fields.length < 5 && (
                                <TouchableOpacity style={buttonStyle.container} onPress={addFields}>
                                    <AUIThemedView style={[buttonStyle.buttonInner]}>
                                        <Ionicons
                                            name="add-circle"
                                            size={24}
                                            color={APP_THEME.light.primary.first}
                                        />
                                        <AUIThemedText style={[buttonStyle.buttonText]}>
                                            {t("add_information")}
                                        </AUIThemedText>
                                    </AUIThemedView>
                                </TouchableOpacity>
                            )}
                        </AUIThemedView>
                    </AUIThemedView>
                </AUIThemedView>

                <AUIThemedView>
                    <AUIThemedView
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <AUIThemedText style={styles.createYourPlanTitle}>
                            {t("select_facilities")} ({t("optional")})
                        </AUIThemedText>

                        <CustomTooltip
                            text={`Facilities are optional. You have to first add facilities in the facilities tab before you select them. You can select already added facilities for your plans here\n\n For Example:\n Hostel, Library, etc.`}
                            tooltipStyle={{ padding: 15 }}
                        >
                            <Ionicons
                                name="information-circle-outline"
                                size={20}
                                color={APP_THEME.light.primary.first}
                            />
                        </CustomTooltip>
                    </AUIThemedView>

                    <AUIAccordion
                        style={styles.AUIAccordion}
                        innerStyle={styles.AUIAccordionInnerStyle}
                        title={t("add_facilities_for_your_plan")}
                    >
                        {facilities?.length === 0 && (
                            <AUIThemedText>{t("no_facilities_found")}</AUIThemedText>
                        )}
                        {facilities?.map((facility: Facility) => (
                            <AUIThemedView key={facility?._id} style={styles.facilitiesRow}>
                                <AUIThemedView style={styles.CheckboxContainer}>
                                    <Controller
                                        control={control}
                                        name={`facility_${facility?._id}`}
                                        defaultValue={selectedFacilities.includes(facility._id)}
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
                                background={"#ff7e57"}
                                style={{
                                    width: "100%",
                                    borderColor: TEXT_THEME.light.danger,
                                    borderWidth: 1,
                                }}
                                onPress={() => {
                                    setShowConfirmation(true);
                                }}
                            />
                        </AUIThemedView>
                    ) : (
                        <AUIThemedView style={styles.buttonContainer}>
                            <AUIButton
                                title={t("clear")}
                                onPress={() => {
                                    reset();
                                }}
                                style={{ width: "48%" }}
                            />
                            <AUIButton
                                title={t("save")}
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
                    <AUIThemedText>Are you sure you want to delete this facility?</AUIThemedText>
                    <AUIThemedView style={styles.buttonContainer}>
                        <AUIButton
                            title="Cancel"
                            onPress={() => setShowConfirmation(false)}
                            style={{ width: "48%" }}
                        />
                        <AUIButton
                            title="Delete"
                            selected
                            background={"#ff7e57"}
                            style={{
                                width: "48%",
                                borderColor: TEXT_THEME.light.danger,
                                borderWidth: 1,
                            }}
                            onPress={handleDelete}
                        />
                    </AUIThemedView>
                </AUIModal>
                {/* </ScrollView> */}
            </AUIModal>
        </>
    );
};

export default AddPlan;

const styles = StyleSheet.create({
    fieldError: {
        position: "absolute",
        color: "red",
        fontSize: 13,
    },
    courseDetailsItem: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: APP_THEME.light.primary.first,
        marginVertical: 5,
    },
    courseDetailsItems: {
        paddingTop: 5,
    },
    courseDetails: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderColor: APP_THEME.light.primary.first,
    },
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
    input: {},
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
        alignItems: "center",
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
    durationContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    dateInput: { width: 160 },
    courseDetailsContainer: { marginTop: 25 },
    planContainer: {},
    createYourPlanTitle: { marginBottom: 5 },
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
const buttonStyle = StyleSheet.create({
    container: {
        marginVertical: 20,
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
