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
    const user = useSelector((state: RootState) => state.global.user);
    const theme = useSelector((state: RootState) => state.global.theme);
    const plans = useLangTransformSelector((state: RootState) => state.api.coursePlans)?.docs || [];
    const [showFromDatePicker, setShowFromDatePicker] = useState(false);
    const [showToDatePicker, setShowToDatePicker] = useState(false);
    const [isAddPlanVisible, setAddPlanVisible] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<string[]>([]);
    const [renderSelectedPlan, setRenderSelectedPlan] = useState<Plan[]>([]);
    const [currentPlan, setCurrentPlan] = useState<Plan | undefined>(undefined);
    const [isImageEdited, setIsImageEdited] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const { post, patch, del } = useAxios();
    const { requestFn } = useApiRequest();
    const navigation = useNavigation();
    const effect = useIsomorphicLayoutEffect();
    const params = useLocalSearchParams();
    const course = params.course
        ? JSON.parse(Array.isArray(params.course) ? params.course[0] : params.course)
        : null;
    const edit = params.edit;
    const hasMounted = useRef(false);
    const { control, handleSubmit, reset, setValue } = useForm<FormValues>({
        mode: "onChange",
        defaultValues: course
            ? {
                  courseName: course.courseName,
                  description: course.description,
                  language: course.language,
                  totalSeats: course.numberOfSeats,
                  scheduleFrom: new Date(course.startDate),
                  scheduleTo: new Date(course.endDate),
                  currentType: course.currencyType,
                  category: course.category,
                  image: course.image,
                  plans: plans.reduce(
                      (acc: any, plan: { _id: any }) => ({ ...acc, [plan?._id]: false }),
                      {}
                  ),
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
                  plans: plans.reduce(
                      (acc: any, plan: { _id: any }) => ({ ...acc, [plan?._id]: false }),
                      {}
                  ),
              },
    });
    useEffect(() => {
        if (course && !hasMounted.current) {
            setImage(course.image);
            hasMounted.current = true;
        }
    }, [course]);

    effect(() => {
        navigation.setOptions({
            headerTransparent: false,
            headerBackVisible: false,
            headerTitle: () => (
                <AUIThemedText style={styles.screenTitle}>
                    {edit === "true" ? "Edit Course" : "Add New Course"}
                </AUIThemedText>
            ),
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

    const filteredPlans = useMemo(() => {
        return renderSelectedPlan.filter((plan) =>
            plans.some((p: { _id: string }) => p?._id === plan?._id)
        );
    }, [plans, renderSelectedPlan]);
    const { fields, append } = useFieldArray({
        control,
        name: "courses",
    });

    useEffect(() => {
        if (fields.length === 0) {
            append({ title: "", subtitle: "" });
        }
    }, [fields.length, append]);

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
                image: image,
                status: 1,
                plan: selectedPlan,
            };
            post(API_URL.course, payload);
            ApiSuccessToast("New Course added successfully.");
            navigation.goBack();
            reset();
        } catch (error) {
            console.log("error in add new course", error);
            ApiErrorToast("Failed to Add New Course");
        }
    };

    const handleEdit = (data: any) => {
        const payload: any = {
            ...data,
            id: course?._id,
            plan: selectedPlan,
        };
        if (isImageEdited) {
            payload.image = image;
        } else {
            delete payload.image;
        }
        patch(API_URL.course, payload)
            .then((res) => {
                ApiSuccessToast("Plan updated successfully.");
                navigation.goBack();
                reset();
            })
            .catch((e) => {
                ApiErrorToast("Failed to update plan");
                console.log(e);
            });
    };
    const handleDelete = () => {
        if (!course?._id) return;
        del(`${API_URL.course}?id=${course?._id}`)
            .then((res) => {
                ApiSuccessToast("course deleted successfully.");
                navigation.goBack();
                setShowConfirmation(false);
                refreshPlans();
            })
            .catch((e) => {
                ApiErrorToast("Failed to delete course.");
                console.log(e);
            });
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const assetUri = result.assets[0]?.uri;
            const manipResult = await ImageManipulator.manipulateAsync(
                assetUri,
                [{ resize: { width: 500 } }],
                { compress: 0.2, format: ImageManipulator.SaveFormat.JPEG }
            );
            const base64Image = await convertImageToBase64(manipResult?.uri);
            setImage(base64Image);
            setIsImageEdited(true);
            setValue("image", base64Image);
        }
    };
    const convertImageToBase64 = (uri: string) => {
        return new Promise<string>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                const reader = new FileReader();
                reader.onloadend = function () {
                    resolve(reader.result as string);
                };
                reader.readAsDataURL(xhr.response);
            };
            xhr.onerror = function () {
                reject(new Error("Failed to convert image to Base64"));
            };
            xhr.open("GET", uri);
            xhr.responseType = "blob";
            xhr.send();
        });
    };
    const truncateFileName = (fileName: string, maxLength: number) => {
        if (fileName.length <= maxLength) return fileName;
        return fileName.substring(0, maxLength - 3) + "...";
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
                        label="Enter Currency Type"
                        placeholder="Currency Type"
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
            <AUIThemedText style={styles.selectBannerLabel}>Select banner</AUIThemedText>
            <AUIThemedView style={styles.imagePickerContainer}>
                <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
                    <MaterialIcons name="cloud-upload" size={24} color="#5BD894" />
                    <AUIThemedText style={styles.uploadButtonText}>Upload File</AUIThemedText>
                </TouchableOpacity>
                <AUIThemedText style={styles.fileName}>
                    {image ? truncateFileName(image.split("/").pop()!, 18) : "No file chosen"}
                </AUIThemedText>
            </AUIThemedView>
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <AUIThemedView>
                <AUIThemedView style={styles.planContainer}>
                    <AUIThemedText style={styles.createYourPlanTitle}>Select Plan</AUIThemedText>
                    <AUIAccordion
                        style={styles.AUIAccordion}
                        innerStyle={styles.AUIAccordionInnerStyle}
                        title="Select Plans"
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
                                        defaultValue={false}
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
                                                    {plan.name}
                                                </AUIThemedText>
                                            </>
                                        )}
                                    />
                                </AUIThemedView>
                            </AUIThemedView>
                        ))}
                    </AUIAccordion>
                    {filteredPlans?.map((plan: Plan, index: number) => {
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
                                            {plan.duration}
                                        </AUIThemedText>
                                    </AUIThemedView>
                                </AUIThemedView>
                                <AUIThemedView style={styles.row}>
                                    <AUIThemedView style={styles.rowContainer}>
                                        <AUIThemedText style={styles.label}>
                                            Total fee
                                        </AUIThemedText>
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
                <AUIThemedText style={styles.createYourPlanTitle}>
                    Create your plan for fees
                </AUIThemedText>
            </AUIThemedView>
            <AUIThemedView style={styles.buttonContainer}>
                <AUIButton
                    title={"Add Plan"}
                    selected
                    onPress={handleAddPlanClick}
                    style={{ width: "100%" }}
                    // disabled={plans.length > 2}
                />
            </AUIThemedView>
            <AUIThemedView style={styles.buttonContainer}>
                {course ? (
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
                <AUIThemedText>Are you sure you want to delete this course?</AUIThemedText>
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
