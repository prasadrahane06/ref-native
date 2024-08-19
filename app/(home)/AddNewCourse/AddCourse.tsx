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
import ImageViewer from "@/components/ImageViewer";
import { APP_THEME, BACKGROUND_THEME, TEXT_THEME } from "@/constants/Colors";
import { languagesData } from "@/constants/dummy data/languagesData";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import useIsomorphicLayoutEffect from "@/customHooks/useIsomorphicLayoutEffect";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { setLoader } from "@/redux/globalSlice";
import { RootState } from "@/redux/store";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import * as ImagePicker from "expo-image-picker";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Modal, Platform, Pressable, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
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
    // currentType: any;
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
    const dispatch = useDispatch();
    const { post, patch, del } = useAxios();
    const { requestFn } = useApiRequest();
    const navigation = useNavigation();
    const effect = useIsomorphicLayoutEffect();

    const id = params.id;
    const edit = params.edit;

    const editCourseResponse = useLangTransformSelector((state: RootState) => state.api.editCourse);
    const user = useSelector((state: RootState) => state.global.user);
    const theme = useSelector((state: RootState) => state.global.theme);
    const plans = useLangTransformSelector((state: RootState) => state.api.coursePlans)?.docs || [];

    const [showImage, setShowImage] = useState<any>("");
    const [imageName, setImageName] = useState<any>("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showFromDatePicker, setShowFromDatePicker] = useState(false);
    const [showToDatePicker, setShowToDatePicker] = useState(false);
    const [isAddPlanVisible, setAddPlanVisible] = useState(false);
    const [editCourse, setEditCourse] = useState<any>({});
    const [currentPlan, setCurrentPlan] = useState<Plan | undefined>(undefined);
    const [imageBase64, setImageBase64] = useState<string | any>("");
    const [selectedPlan, setSelectedPlan] = useState<string[]>([]);
    const [renderSelectedPlan, setRenderSelectedPlan] = useState<Plan[]>([]);
    const [startDate, setStartDate] = useState(
        editCourse?.startDate ? new Date(editCourse?.startDate) : new Date()
    );
    const [endDate, setEndDate] = useState(
        editCourse?.endDate ? new Date(editCourse?.endDate) : new Date()
    );

    const schema = Yup.object().shape({
        courseName: Yup.string().required("Course name is required"),
        description: Yup.string().required("Description is required"),
        language: Yup.string().required("Language is required"),
        totalSeats: Yup.string().required("Total Seats is required"),
        scheduleFrom: Yup.string().required("Schedule from date is required"),
        scheduleTo: Yup.string().required("Schedule to date is required"),
        image: Yup.string().required("Image is required"),
        // plans: Yup.array()
        //     .min(1, "Select at least one plan")
        //     .max(3, "Select a maximum of 3 plans")
        //     .required("Plans are required"),
    });

    const { control, handleSubmit, reset, setValue } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            // courseName: editCourse?.courseName || "",
            // description: editCourse?.description || "",
            // language: editCourse?.language || "",
            // totalSeats: editCourse?.numberOfSeats || "",
            // scheduleFrom: startDate && startDate?.toISOString(),
            // scheduleTo: endDate && endDate?.toISOString(),
            // image: editCourse?.image || "",
            // plans: [],

            courseName: "",
            description: "",
            language: "",
            totalSeats: "",
            scheduleFrom: startDate && startDate?.toISOString(),
            scheduleTo: endDate && endDate?.toISOString(),
            image: "",
        },
    });

    useEffect(() => {
        if (id) {
            requestFn(API_URL.course, "editCourse", { id: id });
        }
    }, [id]);

    useEffect(() => {
        if (edit && editCourseResponse?.docs[0]) {
            const editCourse = editCourseResponse?.docs[0];
            setEditCourse(editCourse);

            setValue("courseName", editCourse?.courseName);
            setValue("description", editCourse?.description);
            setValue("language", editCourse?.language);
            setValue("totalSeats", editCourse?.numberOfSeats.toString());
            setValue("scheduleFrom", editCourse?.startDate);
            setValue("scheduleTo", editCourse?.endDate);
            setValue("image", editCourse?.image);
            setShowImage(editCourse?.image);
            setSelectedPlan(editCourse?.plan.map((item: any) => item._id));
            setRenderSelectedPlan(editCourse?.plan);
        } else {
            reset();
        }
    }, [editCourseResponse, edit, setValue, reset]);

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

    const refreshPlans = async () => {
        await requestFn(API_URL.plan, "coursePlans", { client: true });
    };

    useFocusEffect(
        useCallback(() => {
            refreshPlans();
        }, [isAddPlanVisible])
    );

    const onChangeFrom = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || startDate;
        setShowFromDatePicker(Platform.OS === "ios");
        setStartDate(currentDate);
        setValue("scheduleFrom", currentDate.toISOString());
    };

    const onChangeTo = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || endDate;
        setShowToDatePicker(Platform.OS === "ios");
        setEndDate(currentDate);
        setValue("scheduleTo", currentDate.toISOString());
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString().slice(-2);

        return `${day}/${month}/${year}`;
    };

    const onSave = async (data: any) => {
        dispatch(setLoader(true));

        const payload = {
            client: user?.client,
            courseName: data.courseName,
            description: data.description,
            language: data.language,
            numberOfSeats: data.totalSeats,
            startDate: data.scheduleFrom,
            endDate: data.scheduleTo,
            image: `data:image/png;base64,${imageBase64}`,
            status: 1,
            plan: selectedPlan,
        };

        post(API_URL.course, payload)
            .then((res) => {
                ApiSuccessToast(res.message);
                navigation.goBack();
                reset();

                dispatch(setLoader(false));
            })
            .catch((error) => {
                dispatch(setLoader(false));
                console.log("error in add course", error);

                if (error.response?.status === 413) {
                    ApiErrorToast(t("image_too_large"));
                    return;
                }

                ApiErrorToast(error.message);
            });
    };

    const handleEdit = (data: any) => {
        // dispatch(setLoader(true));

        const payload: any = {
            id: editCourse?._id,
            courseName: data.courseName,
            description: data.description,
            language: data.language,
            numberOfSeats: data.totalSeats,
            startDate: data.scheduleFrom,
            endDate: data.scheduleTo,
            plan: selectedPlan,
        };

        if (imageBase64) {
            payload.image = `data:image/png;base64,${imageBase64}`;
        }

        patch(API_URL.course, payload)
            .then((res) => {
                ApiSuccessToast(res.message);
                router.back();
                reset();
                dispatch(setLoader(false));
            })
            .catch((error) => {
                dispatch(setLoader(false));
                console.log("error in edit course", error);

                if (error.response?.status === 413) {
                    ApiErrorToast(t("image_too_large"));
                    return;
                }

                ApiErrorToast(error.message);
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
            .catch((error) => {
                ApiErrorToast(`${t("failed_to_delete_course")}`);
                console.log("error in delete course", error);
            });
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            allowsEditing: true,
            quality: 0.5,
        });

        if (!result.canceled) {
            setImageBase64(result.assets[0].base64);
            setShowImage(result.assets[0].uri);
            // @ts-ignore
            setValue("image", result.assets[0].base64);
            setImageName(result.assets[0].fileName);
            // setIsImageEdited(true);
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
    const generateRandomId = (): string => {
        return Math.floor(1000 + Math.random() * 9000).toString(); // Generate a random 4-digit number
    };

    const truncateFileName = (fileName: string | null, maxLength: number): string => {
        if (fileName === null) {
            return `Img${generateRandomId()}`;
        }

        if (fileName.length <= maxLength) {
            return fileName;
        }

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
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <AUIThemedView>
                        <AUIInputField
                            label={t("course_name")}
                            placeholder={t("course_name")}
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
                name="description"
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <AUIThemedView style={{ marginVertical: 20 }}>
                        <AUIInputField
                            label={t("course_description")}
                            placeholder={t("course_description")}
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
                name="totalSeats"
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <AUIThemedView>
                        <AUIInputField
                            label={t("total_number_of_seats")}
                            placeholder={t("seats")}
                            value={value}
                            onChangeText={onChange}
                            keyboardType="numeric"
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
                name="language"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <AUIThemedView style={{ marginVertical: 20 }}>
                        <DropdownComponent
                            label={t("select_language")}
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
                            placeholder={t("select_language")}
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

            <AUIThemedView style={styles.dateContainer}>
                <Controller
                    control={control}
                    name="scheduleFrom"
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <>
                            {Platform.OS === "ios" ? (
                                <>
                                    <AUIButton
                                        title={`From :  ${formatDate(startDate?.toISOString())}`}
                                        style={{ borderWidth: 0, width: "48%" }}
                                        onPress={() => setShowFromDatePicker(!showFromDatePicker)}
                                        borderColor={APP_THEME.light.primary.first}
                                    />

                                    {showFromDatePicker && (
                                        <Modal
                                            animationType="slide"
                                            transparent={true}
                                            visible={showFromDatePicker}
                                            onRequestClose={() => {
                                                setShowFromDatePicker(false);
                                            }}
                                        >
                                            <AUIThemedView
                                                style={
                                                    Platform.OS === "ios"
                                                        ? styles.iosModalContent
                                                        : styles.andoridModalContent
                                                }
                                            >
                                                <AUIThemedView style={styles.titleContainer}>
                                                    <AUIThemedText style={styles.dateTitle}>
                                                        {t("pickFromDate")}
                                                    </AUIThemedText>
                                                </AUIThemedView>
                                                <DateTimePicker
                                                    value={startDate}
                                                    mode="date"
                                                    display={
                                                        Platform.OS === "ios"
                                                            ? "spinner"
                                                            : "default"
                                                    }
                                                    onChange={(e, date) => {
                                                        console.log("date -->", date);
                                                        onChangeFrom(e, date);
                                                        onChange(date);
                                                    }}
                                                    minimumDate={new Date()}
                                                />
                                                <AUIThemedView style={styles.dateBtnContainer}>
                                                    <AUIButton
                                                        title={`Cancel`}
                                                        style={{ borderWidth: 0, width: "48%" }}
                                                        onPress={() => setShowFromDatePicker(false)}
                                                        borderColor="#5BD894"
                                                    />
                                                    <AUIButton
                                                        title={`Select`}
                                                        style={{ borderWidth: 0, width: "48%" }}
                                                        onPress={() => setShowFromDatePicker(false)}
                                                        borderColor="#5BD894"
                                                        selected
                                                    />
                                                </AUIThemedView>
                                            </AUIThemedView>
                                        </Modal>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Pressable onPress={() => setShowFromDatePicker(true)}>
                                        <AUIInputField
                                            label={t("from")}
                                            value={formatDate(value)}
                                            style={styles.dateInput}
                                            editable={false}
                                            onChangeText={onChange}
                                        />
                                        {showFromDatePicker && (
                                            <DateTimePicker
                                                value={startDate}
                                                mode="date"
                                                display="default"
                                                onChange={(e, date) => {
                                                    onChangeFrom(e, date);
                                                    onChange(date);
                                                }}
                                                minimumDate={new Date()}
                                            />
                                        )}
                                    </Pressable>
                                </>
                            )}
                        </>
                    )}
                />
                <Controller
                    control={control}
                    name="scheduleTo"
                    render={({ field: { onChange, value } }) => (
                        <>
                            {Platform.OS === "ios" ? (
                                <>
                                    <AUIButton
                                        title={`To :  ${formatDate(endDate?.toISOString())}`}
                                        style={{ borderWidth: 0, width: "48%" }}
                                        onPress={() => setShowToDatePicker(!showToDatePicker)}
                                        borderColor={APP_THEME.light.primary.first}
                                    />

                                    {showToDatePicker && (
                                        <Modal
                                            animationType="slide"
                                            transparent={true}
                                            visible={showToDatePicker}
                                            onRequestClose={() => {
                                                setShowToDatePicker(false);
                                            }}
                                        >
                                            <AUIThemedView
                                                style={
                                                    Platform.OS === "ios"
                                                        ? styles.iosModalContent
                                                        : styles.andoridModalContent
                                                }
                                            >
                                                <AUIThemedView style={styles.titleContainer}>
                                                    <AUIThemedText style={styles.dateTitle}>
                                                        {t("pickToDate")}
                                                    </AUIThemedText>
                                                </AUIThemedView>
                                                <DateTimePicker
                                                    value={endDate}
                                                    mode="date"
                                                    display={
                                                        Platform.OS === "ios"
                                                            ? "spinner"
                                                            : "default"
                                                    }
                                                    onChange={(e, date) => {
                                                        onChangeTo(e, date);
                                                        onChange(date);
                                                    }}
                                                    minimumDate={new Date()}
                                                />
                                                <AUIThemedView style={styles.dateBtnContainer}>
                                                    <AUIButton
                                                        title={`Cancel`}
                                                        style={{ borderWidth: 0, width: "48%" }}
                                                        onPress={() => setShowToDatePicker(false)}
                                                        borderColor="#5BD894"
                                                    />
                                                    <AUIButton
                                                        title={`Select`}
                                                        style={{ borderWidth: 0, width: "48%" }}
                                                        onPress={() => setShowToDatePicker(false)}
                                                        borderColor="#5BD894"
                                                        selected
                                                    />
                                                </AUIThemedView>
                                            </AUIThemedView>
                                        </Modal>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Pressable onPress={() => setShowToDatePicker(true)}>
                                        <AUIInputField
                                            label={t("to")}
                                            value={formatDate(value)}
                                            style={styles.dateInput}
                                            editable={false}
                                            onChangeText={onChange}
                                        />
                                        {showToDatePicker && (
                                            <DateTimePicker
                                                value={endDate}
                                                mode="date"
                                                display="default"
                                                onChange={(e, date) => {
                                                    onChangeTo(e, date);
                                                    onChange(date);
                                                }}
                                                minimumDate={new Date()}
                                            />
                                        )}
                                    </Pressable>
                                </>
                            )}
                        </>
                    )}
                />
            </AUIThemedView>

            <Controller
                name="image"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <AUIThemedView>
                        <AUIThemedText style={styles.selectBannerLabel}>
                            {t("select_banner")}
                        </AUIThemedText>
                        <AUIThemedView>
                            {error && (
                                <AUIThemedText
                                    style={{
                                        color: "red",
                                        fontSize: 12,
                                    }}
                                    type="subtitle"
                                >
                                    {error.message}
                                </AUIThemedText>
                            )}
                        </AUIThemedView>

                        <AUIThemedView style={styles.imagePickerContainer}>
                            <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
                                <MaterialIcons name="cloud-upload" size={24} color="#5BD894" />
                                <AUIThemedText style={styles.uploadButtonText}>
                                    {t("upload_file")}
                                </AUIThemedText>
                            </TouchableOpacity>
                            <AUIThemedText style={styles.fileName}>
                                {imageBase64
                                    ? truncateFileName(imageName, 20)
                                    : ` ${t("no_file_chosen")}`}
                            </AUIThemedText>
                        </AUIThemedView>

                        {showImage && (
                            <AUIThemedView style={styles.imageContainer}>
                                <ImageViewer selectedImage={showImage} style={styles.image} />
                                <TouchableOpacity
                                    style={styles.closeIcon}
                                    onPress={() => setShowImage(null)}
                                >
                                    <MaterialIcons
                                        name="close"
                                        size={24}
                                        color={TEXT_THEME.light.danger}
                                    />
                                </TouchableOpacity>
                            </AUIThemedView>
                        )}
                    </AUIThemedView>
                )}
            />

            <AUIThemedView>
                <AUIThemedView style={styles.planContainer}>
                    <AUIThemedView style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <AUIThemedText style={styles.createYourPlanTitle}>
                            {t("select_plan")}
                        </AUIThemedText>
                        <CustomTooltip
                            text={
                                "You can select maximum 3 plans for a course. However, you can add as much as plans as you want."
                            }
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
                        title={t("select_plans")}
                    >
                        {plans?.length === 0 && (
                            <AUIThemedText>{t("no_plans_found")}</AUIThemedText>
                        )}
                        {plans?.map((plan: Plan, index: number) => (
                            <AUIThemedView
                                key={plan?._id}
                                style={[
                                    styles.facilitiesRow,
                                    index === plans?.length - 1 && styles.lastFacilitiesRow,
                                ]}
                            >
                                <AUIThemedView style={styles.CheckboxContainer}>
                                    <Controller
                                        control={control}
                                        // @ts-ignore
                                        name={`plans.${index}`}
                                        // @ts-ignore
                                        defaultValue={selectedPlan.includes(plan?._id)}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <>
                                                <Checkbox
                                                    style={styles.checkbox}
                                                    // @ts-ignore
                                                    value={value}
                                                    onValueChange={(checked) => {
                                                        onChange(checked);
                                                        handleCheckboxChange(
                                                            plan?._id,
                                                            checked,
                                                            plan
                                                        );
                                                    }}
                                                    disabled={!value && selectedPlan.length > 2}
                                                    color={value ? "#5BD894" : "#9DA1AC"}
                                                />
                                                <AUIThemedText style={styles.facilitiesLabel}>
                                                    {plan?.name}
                                                </AUIThemedText>
                                                <AUIThemedView>
                                                    {error && (
                                                        <AUIThemedText style={styles.fieldError}>
                                                            {error.message}
                                                        </AUIThemedText>
                                                    )}
                                                </AUIThemedView>
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
                                title={`Plan ${index + 1} :  ${plan.name}`}
                                showEditIcon={true}
                                onEditClick={() => handleEditPlan(plan)}
                            >
                                <AUIThemedView style={styles.row}>
                                    <AUIThemedView style={styles.rowContainer}>
                                        <AUIThemedText style={styles.label}>
                                            Total Duration
                                        </AUIThemedText>
                                        <AUIThemedText style={styles.label2}>
                                            {plan?.duration}
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
                />
            </AUIThemedView>

            <AUIThemedView style={styles.buttonContainer}>
                {edit ? (
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
                                disabled={selectedPlan.length < 1 || selectedPlan.length > 3}
                            />
                        </AUIThemedView>
                        <AUIButton
                            title={t("delete")}
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
                            disabled={selectedPlan.length < 1 || selectedPlan.length > 3}
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

            <AddPlan
                visible={isAddPlanVisible}
                onClose={() => {
                    setAddPlanVisible(false);
                    setCurrentPlan(undefined);
                    setSelectedPlan([]);
                    setRenderSelectedPlan([]);
                    plans?.forEach((plan: any, index: any) => {
                        setValue(`plans.${index}` as any, false);
                    });
                }}
                plan={currentPlan}
                isEditMode={currentPlan !== undefined}
                refreshPlans={refreshPlans}
            />
        </ScrollView>
    );
};
export default AUIAddNewCourse;

const styles = StyleSheet.create({
    fieldError: {
        position: "absolute",
        color: "red",
        fontSize: 13,
    },
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
    imageContainer: {
        position: "relative",
        width: 250,
        height: 150,
        marginTop: 10,
    },
    image: {
        width: 250,
        height: 150,
        marginTop: 10,
        borderRadius: 0,
    },
    closeIcon: {
        position: "absolute",
        right: -10,
        backgroundColor: APP_THEME.light.lightGray,
        borderRadius: 20,
    },
    screenTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    pressableContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingBottom: 5,
        marginBottom: 5,
    },

    dateWrapper: {
        marginBottom: 20, // Adjust spacing between date pickers
    },

    andoridModalContent: {
        height: "100%",
        width: "100%",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    iosModalContent: {
        position: "absolute",
        bottom: 0,
        height: "50%",
        width: "100%",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    titleContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    dateTitle: {
        padding: 10,
        fontSize: 16,
        marginBottom: 10,
    },
    dateBtnContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
});
