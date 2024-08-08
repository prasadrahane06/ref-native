import useAxios from "@/app/services/axiosClient";
import AUIAccordion from "@/components/common/AUIAccordion";
import AUIButton from "@/components/common/AUIButton";
import DropdownComponent from "@/components/common/AUIDropdown";
import AUIInputField from "@/components/common/AUIInputField";
import AUIModal from "@/components/common/AUIModal";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { ApiErrorToast, ApiSuccessToast } from "@/components/common/AUIToast";
import { APP_THEME, BACKGROUND_THEME, TEXT_THEME } from "@/constants/Colors";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import useIsomorphicLayoutEffect from "@/customHooks/useIsomorphicLayoutEffect";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import { Image } from "expo-image";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Platform, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import AddPlan from "./AddPlan";
import { useTranslation } from "react-i18next";
// import { t } from "i18next";

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
interface FormValues {
    courseName: any;
    description: any;
    language: any;
    totalSeats: any;
    scheduleFrom: Date;
    scheduleTo: Date;
    currentType: any;
    category: any;
    image: any;
    plans: any;
    numberOfSeats: any;
    startDate: any;
    endDate: any;
    currencyType: any;
}

const AUIAddNewCourse = () => {
    const { t } = useTranslation();
    const params = useLocalSearchParams();
    const id = params.id;
    const edit = params.edit;
    const EditCourseResponse = useLangTransformSelector((state: RootState) => state.api.editCourse);
    const user = useSelector((state: RootState) => state.global.user);
    const theme = useSelector((state: RootState) => state.global.theme);
    const plans = useLangTransformSelector((state: RootState) => state.api.coursePlans)?.docs || [];
    const [showFromDatePicker, setShowFromDatePicker] = useState(false);
    const [showToDatePicker, setShowToDatePicker] = useState(false);
    const [isAddPlanVisible, setAddPlanVisible] = useState(false);

    const [editCourse, setEditCourse] = useState<any>(() => {
        if (edit && EditCourseResponse?.docs[0]) {
            return EditCourseResponse?.docs[0];
        }
    });
    const [selectedPlan, setSelectedPlan] = useState<string[]>(() => {
        if (edit && editCourse && editCourse.plan && editCourse.plan.length > 0) {
            return editCourse?.plan.map((item: any) => {
                return item._id;
            });
        }
        return [];
    });
    const [renderSelectedPlan, setRenderSelectedPlan] = useState<Plan[]>(() => {
        if (edit && editCourse && editCourse.plan && editCourse.plan.length > 0) {
            return editCourse.plan;
        }
        return [];
    });

    const [currentPlan, setCurrentPlan] = useState<Plan | undefined>(undefined);
    const [isImageEdited, setIsImageEdited] = useState(false);
    const [image, setImage] = useState<string | any>(() => {
        if (edit && editCourse && editCourse.image) {
            return editCourse.image;
        }
        return "";
    });
    const [showImage, setShowImage] = useState<any>("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const { post, patch, del } = useAxios();
    const { requestFn } = useApiRequest();
    const navigation = useNavigation();
    const effect = useIsomorphicLayoutEffect();
    const hasMounted = useRef(false);
    const { control, handleSubmit, reset, setValue, watch } = useForm<FormValues>({
        mode: "onChange",
        defaultValues: editCourse
            ? {
                  courseName: editCourse.courseName,
                  description: editCourse.description,
                  language: editCourse.language,
                  totalSeats: editCourse.numberOfSeats,
                  scheduleFrom: new Date(editCourse.startDate),
                  scheduleTo: new Date(editCourse.endDate),
                  currentType: editCourse.currencyType,
                  category: editCourse.category,
                  image: editCourse.image,
                  plans: [],
              }
            : {
                  courseName: "",
                  description: "",
                  language: "",
                  totalSeats: "",
                  scheduleFrom: new Date(),
                  scheduleTo: new Date(),
                  currentType: "",
                  category: "",
                  image: "",
                  plans: [],
              },
    });

    useEffect(() => {
        if (id) {
            requestFn(API_URL.course, "editCourse", { id: id });
        }
    }, [id]);

    effect(() => {
        navigation.setOptions({
            headerTransparent: false,
            headerBackVisible: false,
            headerTitle: () => (
                <AUIThemedText style={styles.screenTitle}>
                    {edit === "true" ? `${t("edit_course")}` : `${t("add_new_course")}`}
                </AUIThemedText>
            ),
            headerTitleStyle: { color: TEXT_THEME[theme].primary, fontWeight: "bold" },
            headerStyle: { backgroundColor: BACKGROUND_THEME[theme].background },
        });
    }, [edit, navigation]);

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

    const refreshPlans = async () => {
        await requestFn(API_URL.plan, "coursePlans", { client: true });
    };
    useFocusEffect(
        useCallback(() => {
            refreshPlans();
        }, [isAddPlanVisible])
    );
    const { fields, append } = useFieldArray({
        control,
        name: "courses",
    });

    useEffect(() => {
        if (fields.length === 0) {
            append({ title: "", subtitle: "" });
        }
    }, [fields.length, append]);

    const scheduleFrom = watch("scheduleFrom");
    const onChangeFrom = (event: any, selectedDate?: Date) => {
        setShowFromDatePicker(Platform.OS === "ios");
        setValue("scheduleFrom", selectedDate || new Date());
        if (selectedDate) {
            // Ensure scheduleTo is not earlier than scheduleFrom
            const scheduleTo = watch("scheduleTo");
            if (scheduleTo && selectedDate > scheduleTo) {
                setValue("scheduleTo", selectedDate);
            }
        }
    };

    const onChangeTo = (event: any, selectedDate?: Date) => {
        setShowToDatePicker(Platform.OS === "ios");
        if (selectedDate && selectedDate < scheduleFrom) {
            // Optionally show an error message
            alert("End date cannot be before the start date.");
            setShowToDatePicker(true);
            return;
        }
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
                image: `data:image/png;base64,${image}`,
                status: 1,
                plan: selectedPlan,
            };
            post(API_URL.course, payload);
            ApiSuccessToast(`${t("new_course_added_successfully")}`);
            navigation.goBack();
            reset();
        } catch (error) {
            ApiErrorToast(`${t("new_course_added_successfully")}`);
        }
    };

    const handleEdit = (data: any) => {
        const payload: any = {
            ...data,
            id: editCourse?._id,
            plan: selectedPlan,
        };
        console.log("image", image);
        if (isImageEdited) {
            payload.image = `data:image/png;base64,${image}`;
        } else {
            delete payload.image;
        }
        patch(API_URL.course, payload)
            .then((res) => {
                ApiSuccessToast(res.message);
                navigation.goBack();
                reset();
            })
            .catch((e) => {
                ApiErrorToast(`${t("failed_to_update_plan")}`);
                console.log(e);
            });
    };
    const handleDelete = () => {
        if (!editCourse?._id) return;
        del(API_URL.course, {}, { id: editCourse?._id })
            .then((res) => {
                ApiSuccessToast(`${t("course_deleted_successfully")}`);
                navigation.goBack();
                setShowConfirmation(false);
                refreshPlans();
            })
            .catch((e) => {
                ApiErrorToast(`${t("failed_to_delete_course")}`);
                console.log(e);
            });
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].base64);
            setShowImage(result.assets[0].uri);
            setIsImageEdited(true);
        } else {
            alert("You did not select any image.");
        }
    };
    const handleCheckboxChange = (planId: string, isChecked: boolean, plan: Plan) => {
        setSelectedPlan((prev) => {
            const updatedSelectedPlan = isChecked
                ? [...prev, planId]
                : prev.filter((item) => item !== planId);
            setRenderSelectedPlan((prevRenderSelectedPlan) => {
                return isChecked
                    ? [...prevRenderSelectedPlan, plan]
                    : prevRenderSelectedPlan.filter((item) => item?._id !== planId);
            });
            return updatedSelectedPlan;
        });
    };
    const handleEditPlan = (plan: Plan) => {
        setSelectedPlan([plan?._id]);
        setAddPlanVisible(true);
        setCurrentPlan(plan);
    };
    const handleAddPlanClick = () => {
        setSelectedPlan([]);
        setAddPlanVisible(true);
        setCurrentPlan(undefined);
    };
    const truncateFileName = (fileName: string, maxLength: number) => {
        if (fileName.length <= maxLength) return fileName;
        return fileName.substring(0, maxLength - 3) + "...";
    };

    return (
        <ScrollView
            contentContainerStyle={[
                styles.container,
                { backgroundColor: BACKGROUND_THEME[theme].background },
            ]}
        >
            <Controller
                control={control}
                name="courseName"
                render={({ field: { onChange, value } }) => (
                    <AUIInputField
                        label={t("enter_your_course_name")}
                        placeholder={t("course_name")}
                        value={value}
                        onChangeText={onChange}
                        style={styles.input}
                    />
                )}
            />
            <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                    <AUIInputField
                        label={t("enter_course_description")}
                        placeholder={t("description")}
                        value={value}
                        onChangeText={onChange}
                        style={styles.input}
                    />
                )}
            />
            <Controller
                control={control}
                name="totalSeats"
                render={({ field: { onChange, value } }) => (
                    <AUIInputField
                        label={t("total_number_of_seats")}
                        placeholder={t("seats")}
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
                        label={t("select_language")}
                        list={languageList}
                        value={value}
                        setValue={onChange}
                        placeholder={t("select_language")}
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
                        label={t("select_category")}
                        list={categoryList}
                        value={value}
                        setValue={onChange}
                        placeholder={t("select_category")}
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
                        label={t("enter_currency_type")}
                        placeholder={t("currency_type")}
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
                                label={t("from")}
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
                                label={t("to")}
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
            <AUIThemedText style={styles.selectBannerLabel}>{t("select_banner")}</AUIThemedText>
            <AUIThemedView style={styles.imagePickerContainer}>
                <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
                    <MaterialIcons name="cloud-upload" size={24} color="#5BD894" />
                    <AUIThemedText style={styles.uploadButtonText}>
                        {t("upload_file")}
                    </AUIThemedText>
                </TouchableOpacity>
                <AUIThemedText style={styles.fileName}>
                    {image
                        ? truncateFileName(image.split("/").pop()!, 18)
                        : ` ${t("no_file_chosen")}`}
                </AUIThemedText>
            </AUIThemedView>
            {showImage ? (
                <Image source={{ uri: showImage }} style={styles.image} />
            ) : (
                image && <Image source={{ uri: image }} style={styles.image} />
            )}

            <AUIThemedView>
                <AUIThemedView style={styles.planContainer}>
                    <AUIThemedText style={styles.createYourPlanTitle}>
                        {t("select_plan")}
                    </AUIThemedText>
                    <AUIAccordion
                        style={styles.AUIAccordion}
                        innerStyle={styles.AUIAccordionInnerStyle}
                        title={t("select_plans")}
                    >
                        {plans?.map((plan: Plan, index: number) => (
                            <AUIThemedView
                                key={plan?._id}
                                style={[
                                    styles.facilitiesRow,
                                    index === plans.length - 1 && styles.lastFacilitiesRow,
                                ]}
                            >
                                <AUIThemedView style={styles.CheckboxContainer}>
                                    <Controller
                                        control={control}
                                        name={`plans.${plan?._id}`}
                                        defaultValue={selectedPlan.includes(plan?._id)}
                                        render={({ field: { onChange, value } }) => (
                                            <>
                                                <Checkbox
                                                    style={styles.checkbox}
                                                    value={value}
                                                    onValueChange={(checked) => {
                                                        onChange(checked);
                                                        handleCheckboxChange(
                                                            plan?._id,
                                                            checked,
                                                            plan
                                                        );
                                                    }}
                                                    color={value ? "#5BD894" : undefined}
                                                />
                                                <AUIThemedText style={styles.facilitiesLabel}>
                                                    {plan?.name}
                                                </AUIThemedText>
                                            </>
                                        )}
                                    />
                                </AUIThemedView>
                            </AUIThemedView>
                        ))}
                    </AUIAccordion>
                    {renderSelectedPlan?.map((plan: Plan, index: number) => {
                        return (
                            <AUIAccordion
                                key={plan?._id}
                                style={styles.AUIAccordion}
                                innerStyle={styles.AUIAccordionInnerStyle}
                                title={`Plan ${plan.name}`}
                                showEditIcon={true}
                                onEditClick={() => handleEditPlan(plan)}
                            >
                                <AUIThemedView style={styles.row}>
                                    <AUIThemedView style={styles.rowContainer}>
                                        <AUIThemedText style={styles.label}>
                                            Total Duration
                                        </AUIThemedText>
                                        <AUIThemedText style={styles.label2}>
                                            {plan?.duration} Days
                                        </AUIThemedText>
                                    </AUIThemedView>
                                </AUIThemedView>
                                <AUIThemedView style={styles.row}>
                                    <AUIThemedView style={styles.rowContainer}>
                                        <AUIThemedText style={styles.label}>
                                            Total fee
                                        </AUIThemedText>
                                        <AUIThemedText style={styles.label2}>
                                            {plan?.price}
                                        </AUIThemedText>
                                    </AUIThemedView>
                                </AUIThemedView>
                                <AUIThemedView style={styles.row2}>
                                    <AUIThemedView style={styles.rowContainer}>
                                        <AUIThemedText style={styles.label}>
                                            Book your seat
                                        </AUIThemedText>
                                        <AUIThemedText style={styles.label2}>
                                            {plan?.bookYourSeat}
                                        </AUIThemedText>
                                    </AUIThemedView>
                                </AUIThemedView>
                            </AUIAccordion>
                        );
                    })}
                </AUIThemedView>
                <AUIThemedText style={styles.createYourPlanTitle}>
                    {t("create_your_plan_for_fees")}
                </AUIThemedText>
            </AUIThemedView>
            <AUIThemedView style={styles.buttonContainer}>
                <AUIButton
                    title={t("add_plan")}
                    selected
                    onPress={handleAddPlanClick}
                    style={{ width: "100%" }}
                    // disabled={plans.length > 2}
                />
            </AUIThemedView>
            <AUIThemedView style={styles.buttonContainer}>
                {editCourse ? (
                    <AUIThemedView style={styles.buttonMainContainer}>
                        <AUIThemedView style={styles.buttonContainer}>
                            <AUIButton
                                title={t("clear")}
                                onPress={() => {
                                    reset();
                                }}
                                style={{ width: "48%" }}
                            />
                            <AUIButton
                                title={t("update")}
                                selected
                                style={{ width: "48%" }}
                                onPress={handleSubmit(handleEdit)}
                            />
                        </AUIThemedView>
                        <AUIButton
                            title={t("delete")}
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
                title={t("confirm_delete")}
            >
                <AUIThemedText>{t("confirm_message")}</AUIThemedText>
                <AUIThemedView style={styles.buttonContainer}>
                    <AUIButton
                        title={t("cancel")}
                        onPress={() => setShowConfirmation(false)}
                        style={{ width: "48%" }}
                    />
                    <AUIButton
                        title={t("delete")}
                        selected
                        background={TEXT_THEME.light.danger}
                        style={{ width: "48%" }}
                        onPress={handleDelete}
                    />
                </AUIThemedView>
            </AUIModal>
            <AddPlan
                visible={isAddPlanVisible}
                onClose={() => setAddPlanVisible(false)}
                plan={currentPlan}
                isEditMode={currentPlan !== undefined}
                refreshPlans={refreshPlans}
            />
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
    lastFacilitiesRow: {
        borderBottomWidth: 0,
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
    dateInput: { width: 160 },
    courseDetailsContainer: { marginTop: 12 },
    planContainer: {},
    createYourPlanTitle: { marginTop: 10, marginBottom: 5 },
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
    selectBannerLabel: { marginTop: 8 },
    imagePickerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        borderWidth: 2,
        borderColor: APP_THEME.light.lightGray,
        borderRadius: 5,
        padding: 10,
    },
    uploadButton: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 10,
    },
    uploadButtonText: {
        marginLeft: 5,
        color: APP_THEME.light.primary.first,
    },
    fileName: {},
    image: {
        width: 60,
        height: 60,
        marginTop: 10,
    },
    screenTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
});
