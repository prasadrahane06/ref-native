import useAxios from "@/app/services/axiosClient";
import AUIButton from "@/components/common/AUIButton";
import AUIInputField from "@/components/common/AUIInputField";
import AUIModal from "@/components/common/AUIModal";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { ApiErrorToast, ApiSuccessToast } from "@/components/common/AUIToast";
import ImageViewer from "@/components/ImageViewer";
import { APP_THEME, TEXT_THEME } from "@/constants/Colors";
import { API_URL } from "@/constants/urlProperties";
import { setLoader } from "@/redux/globalSlice";
import { RootState } from "@/redux/store";
import { MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { default as React, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Modal, Platform, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

interface AddEvent {
    visible: boolean;
    onClose: () => void;
    event: event | undefined;
    refreshEvents: () => void;
}
interface event {
    _id: string;
    eventName: string;
    description: string;
    date: string;
    location: string;
    eventImage: string;
}

const AddNewEvent: React.FC<AddEvent> = ({ visible, onClose, event, refreshEvents }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.global.user);
    const { post, patch, del } = useAxios();
    const [eventDate, setEventDate] = useState(event?.date ? new Date(event?.date) : new Date());

    const schema = Yup.object().shape({
        eventName: Yup.string().required("Event name is required"),
        description: Yup.string().required("Description is required"),
        eventDate: Yup.string().required("EventDate is required"),
        location: Yup.string().required("Location is required"),
        eventImage: Yup.string().required("Image is required"),
    });
    const { control, handleSubmit, reset, setValue, clearErrors } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            eventName: "",
            description: "",
            eventDate: eventDate && eventDate?.toISOString(),
            location: "",
            eventImage: "",
        },
    });

    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [imageBase64, setImageBase64] = useState<string | any>("");
    const [showImage, setShowImage] = useState<any>("");
    const [imageName, setImageName] = useState<any>("");

    useEffect(() => {
        if (event) {
            const editEvent = event;
            setValue("eventName", editEvent?.eventName);
            setValue("description", editEvent?.description);
            setValue("eventDate", editEvent?.date);
            setValue("location", editEvent?.location);
            setValue("eventImage", editEvent?.eventImage);
            setShowImage(editEvent?.eventImage);
            setImageBase64("");
        } else {
            reset();
            setShowImage("");
        }
    }, [event, setValue, reset]);

    const onChangeFrom = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || eventDate;
        setDatePickerVisible(Platform.OS === "ios");
        setEventDate(currentDate);
        setValue("eventDate", currentDate.toISOString());
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString().slice(-2);

        return `${day}/${month}/${year}`;
    };

    const onSave = (data: any) => {
        dispatch(setLoader(true));
        onClose();

        const payload = {
            client: user?.client,
            eventName: data.eventName,
            description: data.description,
            date: data.eventDate,
            location: data.location,
            eventImage: `data:image/png;base64,${imageBase64}`,
        };

        post(API_URL.event, payload)
            .then((res) => {
                ApiSuccessToast(res.message);
                refreshEvents();
                reset();
                setShowImage("");
                setImageName("");
            })
            .catch((error) => {
                if (error.response?.status === 413) {
                    ApiErrorToast(t("image_too_large"));
                    return;
                }

                console.error("error in add event", error);
                ApiErrorToast(error.message.response.data.message);
            })
            .finally(() => dispatch(setLoader(false)));
    };

    const handleEdit = (data: any) => {
        dispatch(setLoader(true));
        onClose();

        const payload: any = {
            id: event?._id,
            eventName: data.eventName,
            description: data.description,
            date: data.eventDate,
            location: data.location,
        };
        if (imageBase64) {
            payload.eventImage = `data:image/png;base64,${imageBase64}`;
        }

        patch(API_URL.event, payload)
            .then((res) => {
                ApiSuccessToast(res.message);
                reset();
                refreshEvents();
            })
            .catch((error) => {
                if (error.response?.status === 413) {
                    ApiErrorToast(t("image_too_large"));
                    return;
                }

                console.error("error in update event", error);
                ApiErrorToast(error.message.response.data.message);
            })
            .finally(() => dispatch(setLoader(false)));
    };

    const handleDelete = () => {
        if (event?._id) {
            del(`${API_URL.event}`, { id: event?._id })
                .then((res) => {
                    ApiSuccessToast(res.message);
                    onClose();
                    setShowConfirmation(false);
                    refreshEvents();
                })
                .catch((error) => {
                    ApiErrorToast(error.message.response.data.message);
                    console.error("error in delete event", error);
                });
        }
    };

    const clearFields = () => {
        reset({
            eventName: "",
            description: "",
            eventDate: new Date().toISOString(),
            location: "",
            eventImage: "",
        });
        setShowImage("");
        setSelectedDate(undefined);
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
            setValue("eventImage", result.assets[0].base64);
            setImageName(result.assets[0].fileName);
        } else {
            alert("You did not select any image.");
        }
    };

    const generateRandomId = (): string => {
        return Math.floor(1000 + Math.random() * 9000).toString();
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

    const modalClose = () => {
        clearErrors();
        onClose();
    };

    return (
        <>
            <AUIModal
                visible={visible}
                onClose={modalClose}
                title={event ? "Edit Event" : `${t("add_your_events")}`}
                style={styles.modalContainerStyle}
            >
                <Controller
                    control={control}
                    name="eventName"
                    defaultValue=""
                    rules={{ required: "Event name is required" }}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <>
                            <AUIInputField
                                label={t("enter_event_name")}
                                placeholder={t("event_name")}
                                value={value}
                                onChangeText={onChange}
                                style={styles.input}
                            />
                            {error && (
                                <AUIThemedText style={styles.errorMessage}>
                                    {error.message}
                                </AUIThemedText>
                            )}
                        </>
                    )}
                />
                <Controller
                    control={control}
                    name="description"
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <>
                            <AUIInputField
                                label={t("enter_event_description")}
                                placeholder={t("description")}
                                value={value}
                                onChangeText={onChange}
                                style={styles.input}
                            />
                            {error && (
                                <AUIThemedText style={styles.errorMessage}>
                                    {error.message}
                                </AUIThemedText>
                            )}
                        </>
                    )}
                />
                <AUIThemedView>
                    <Controller
                        control={control}
                        name="eventDate"
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <>
                                {Platform.OS === "ios" ? (
                                    <>
                                        <AUIButton
                                            title={`Select Date`}
                                            style={{ borderWidth: 0, width: "48%" }}
                                            onPress={() => setDatePickerVisible(!datePickerVisible)}
                                            borderColor={APP_THEME.light.primary.first}
                                        />

                                        {datePickerVisible && (
                                            <Modal
                                                animationType="slide"
                                                transparent={true}
                                                visible={datePickerVisible}
                                                onRequestClose={() => {
                                                    setDatePickerVisible(false);
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
                                                        value={selectedDate || new Date()}
                                                        mode="date"
                                                        display={
                                                            Platform.OS === "ios"
                                                                ? "spinner"
                                                                : "default"
                                                        }
                                                        onChange={(e, date) => {
                                                            onChangeFrom(e, date);
                                                            onChange(date);
                                                        }}
                                                        minimumDate={new Date()}
                                                    />
                                                    {error && (
                                                        <AUIThemedText style={styles.errorMessage}>
                                                            {error.message}
                                                        </AUIThemedText>
                                                    )}
                                                    <AUIThemedView style={styles.dateBtnContainer}>
                                                        <AUIButton
                                                            title={`Cancel`}
                                                            style={{ borderWidth: 0, width: "48%" }}
                                                            onPress={() =>
                                                                setDatePickerVisible(false)
                                                            }
                                                            borderColor="#5BD894"
                                                        />
                                                        <AUIButton
                                                            title={`Select`}
                                                            style={{ borderWidth: 0, width: "48%" }}
                                                            onPress={() =>
                                                                setDatePickerVisible(false)
                                                            }
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
                                        <Pressable onPress={() => setDatePickerVisible(true)}>
                                            <AUIInputField
                                                label={t("event_date")}
                                                placeholder={t("select_date")}
                                                value={formatDate(value)}
                                                style={styles.input}
                                                editable={false}
                                                onChangeText={onChange}
                                            />
                                            {error && (
                                                <AUIThemedText style={styles.errorMessage}>
                                                    {error.message}
                                                </AUIThemedText>
                                            )}
                                            {datePickerVisible && (
                                                <DateTimePicker
                                                    value={selectedDate || new Date()}
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
                </AUIThemedView>
                <Controller
                    control={control}
                    name="location"
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <>
                            <AUIInputField
                                label={t("enter_event_location")}
                                placeholder={t("event_location")}
                                value={value}
                                onChangeText={onChange}
                                style={styles.input}
                            />
                            {error && (
                                <AUIThemedText style={styles.errorMessage}>
                                    {error.message}
                                </AUIThemedText>
                            )}
                        </>
                    )}
                />

                <Controller
                    name="eventImage"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <AUIThemedView>
                            <AUIThemedText>{t("select_image")}</AUIThemedText>
                            <AUIThemedView style={styles.imagePickerContainer}>
                                <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
                                    <MaterialIcons name="cloud-upload" size={24} color="#5BD894" />
                                    <AUIThemedText style={styles.uploadButtonText}>
                                        {event ? t("change_banner") : t("upload_file")}
                                    </AUIThemedText>
                                </TouchableOpacity>
                                <AUIThemedText style={styles.fileName}>
                                    {imageBase64
                                        ? truncateFileName(imageName, 15)
                                        : ` ${t("no_file_chosen")}`}
                                </AUIThemedText>
                            </AUIThemedView>
                            {error && (
                                <AUIThemedText style={styles.errorMessage}>
                                    {error.message}
                                </AUIThemedText>
                            )}
                            {showImage && (
                                <AUIThemedView style={styles.imageContainer}>
                                    <ImageViewer selectedImage={showImage} style={styles.image} />
                                </AUIThemedView>
                            )}
                        </AUIThemedView>
                    )}
                />
                <AUIThemedView style={styles.buttonContainer}>
                    {event ? (
                        <AUIThemedView style={styles.buttonMainContainer}>
                            <AUIThemedView style={styles.buttonContainer}>
                                <AUIButton
                                    title="Clear"
                                    onPress={() => {
                                        reset();
                                        clearFields();
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
                                    clearFields();
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
            </AUIModal>
            <AUIModal
                visible={showConfirmation}
                onClose={() => setShowConfirmation(false)}
                title="Confirm Delete"
                style={styles.modalContainerStyle}
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
                        background={TEXT_THEME.light.danger}
                        style={{ width: "48%" }}
                        onPress={handleDelete}
                    />
                </AUIThemedView>
            </AUIModal>
        </>
    );
};
export default AddNewEvent;

const styles = StyleSheet.create({
    modalContainerStyle: { width: "100%" },
    input: { marginBottom: 10 },
    buttonMainContainer: { gap: 5 },
    buttonContainer: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
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
        width: 100,
        height: 80,
    },
    image: {
        width: 100,
        height: 80,
        marginTop: 10,
    },
    facility: {
        flex: 1,
        alignItems: "center",
        marginHorizontal: 5,
    },
    name: {
        fontSize: 16,
    },
    row: {
        flex: 1,
        justifyContent: "space-between",
        marginBottom: 20,
    },
    container: {
        marginTop: 20,
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
    errorMessage: { color: TEXT_THEME.light.danger, fontSize: 13, marginBottom: 5 },
});
