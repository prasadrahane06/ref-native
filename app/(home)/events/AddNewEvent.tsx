import useAxios from "@/app/services/axiosClient";
import AUIButton from "@/components/common/AUIButton";
import AUIInputField from "@/components/common/AUIInputField";
import AUIModal from "@/components/common/AUIModal";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { ApiErrorToast, ApiSuccessToast } from "@/components/common/AUIToast";
import { APP_THEME, TEXT_THEME } from "@/constants/Colors";
import { API_URL } from "@/constants/urlProperties";
import useLoading from "@/customHooks/useLoading";
import { RootState } from "@/redux/store";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Image } from "expo-image";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
// import { t } from "i18next";
import { default as React, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Dimensions, Modal, Platform, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

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
    const [image, setImage] = useState<string | null>(null);
    const user = useSelector((state: RootState) => state.global.user);
    const { post, patch, del } = useAxios();
    const { loading, setLoading } = useLoading();
    const { control, handleSubmit, reset, setValue, getValues } = useForm({
        defaultValues: {
            eventName: "",
            description: "",
            eventDate: "",
            location: "",
            eventImage: null,
        },
    });
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        if (event) {
            setValue("eventName", event.eventName);
            setValue("description", event.description);
            setValue("eventDate", event.date);
            setValue("location", event.location);
            setImage(event.eventImage);
            setSelectedDate(new Date(event.date));
        } else {
            reset({
                eventName: "",
                description: "",
                eventDate: "",
                location: "",
                eventImage: null,
            });
            setImage(null);
            setSelectedDate(undefined);
        }
    }, [event, visible, reset, setValue]);

    const handleSave = () => {
        setLoading(true);
        const values = getValues();
        const payload = {
            client: user?.client,
            eventName: values.eventName,
            description: values.description,
            date: selectedDate?.toISOString(),
            location: values.location,
            eventImage: image,
        };
        post(API_URL.event, payload)
            .then((res) => {
                ApiSuccessToast(`${t("new_event_added_successfully")}`);
                reset();
                onClose();
                refreshEvents();
            })
            .catch((error) => {
                ApiErrorToast(`${t("failed_to_add_event")}`);
                console.log("error in add event", error);
            })
            .finally(() => setLoading(false));
    };

    const handleEdit = () => {
        const values = getValues();
        const payload: any = { id: event?._id };

        if (values.eventName !== event?.eventName) payload.eventName = values.eventName;
        if (values.description !== event?.description) payload.description = values.description;
        if (selectedDate?.toISOString() !== event?.date) payload.date = selectedDate?.toISOString();
        if (values.location !== event?.location) payload.location = values.location;
        if (image !== event?.eventImage) payload.eventImage = image;

        setLoading(true);
        patch(API_URL.event, payload)
            .then((res) => {
                ApiSuccessToast(`${t("event_updated_successfully")}`);
                reset();
                onClose();
                refreshEvents();
            })
            .catch((error) => {
                ApiErrorToast(`${t("failed_to_update_event")}`);
                console.log("error in update event", error);
            })
            .finally(() => setLoading(false));
    };

    const handleDelete = () => {
        if (event?._id) {
            del(`${API_URL.event}`, { id: event?._id })
                .then((res) => {
                    ApiSuccessToast(`${t("event_deleted_successfully")}`);
                    onClose();
                    setShowConfirmation(false);
                    refreshEvents();
                })
                .catch((error) => {
                    ApiErrorToast(`${t("failed_to_delete_event")}`);
                    console.log("error in delete event", error);
                });
        }
    };

    const clearFields = () => {
        reset({
            eventName: "",
            description: "",
            eventDate: "",
            location: "",
            eventImage: null,
        });
        setImage(null);
        setSelectedDate(undefined);
    };

    const handleDateChange = (event: any, date?: Date) => {
        setDatePickerVisible(Platform.OS === "ios");
        if (date) {
            setSelectedDate(date);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const fileSize = result.assets[0].fileSize;

            if (fileSize && fileSize > 20000000) {
                alert("File size should be less than 20 MB.");
                return;
            }

            const assetUri = result.assets[0]?.uri;
            const manipResult = await ImageManipulator.manipulateAsync(
                assetUri,
                [{ resize: { width: 500 } }],
                { compress: 0.2, format: ImageManipulator.SaveFormat.JPEG }
            );
            const base64Image = await convertImageToBase64(manipResult?.uri);
            setImage(base64Image);
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
                reject(new Error(`${t("failed_to_convert_image_to_base")}`));
            };
            xhr.open("GET", uri);
            xhr.responseType = "blob";
            xhr.send();
        });
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

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString().slice(-2);

        return `${day}/${month}/${year}`;
    };

    return (
        <>
            <AUIModal
                visible={visible}
                onClose={onClose}
                title={event ? "Edit Event" : `${t("add_your_events")}`}
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
                                <AUIThemedText style={{ color: "red", fontSize: 10 }}>
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
                    render={({ field: { onChange, value } }) => (
                        <AUIInputField
                            label={t("enter_event_description")}
                            placeholder={t("description")}
                            value={value}
                            onChangeText={onChange}
                            style={styles.input}
                        />
                    )}
                />
                <AUIThemedView>
                    <Controller
                        control={control}
                        name="eventDate"
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <>
                                {Platform.OS === "ios" ? (
                                    <>
                                        <AUIButton
                                            // title={`From :  ${formatDate(
                                            //     startDate?.toISOString()
                                            // )}`}
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
                                                        // onChange={(e, date) => {
                                                        //     console.log("date -->", date);
                                                        //     onChangeFrom(e, date);
                                                        //     onChange(date);
                                                        // }}
                                                        onChange={handleDateChange}
                                                        minimumDate={new Date()}
                                                    />
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
                                                value={
                                                    selectedDate ? selectedDate.toDateString() : ""
                                                }
                                                style={styles.input}
                                                editable={false}
                                                onChangeText={onChange}
                                            />
                                            {datePickerVisible && (
                                                <DateTimePicker
                                                    value={selectedDate || new Date()}
                                                    mode="date"
                                                    display="default"
                                                    // onChange={(e, date) => {
                                                    //     onChangeFrom(e, date);
                                                    //     onChange(date);
                                                    // }}
                                                    onChange={handleDateChange}
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
                    render={({ field: { onChange, value } }) => (
                        <AUIInputField
                            label={t("enter_event_location")}
                            placeholder={t("event_location")}
                            value={value}
                            onChangeText={onChange}
                            style={styles.input}
                        />
                    )}
                />
                <AUIThemedText>{t("select_image")}</AUIThemedText>
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
                            : `${t("no_file_chosen")}`}
                    </AUIThemedText>
                </AUIThemedView>
                {image && <Image source={{ uri: image }} style={styles.image} />}
                <AUIThemedView style={styles.buttonContainer}>
                    {event ? (
                        <AUIThemedView style={styles.buttonMainContainer}>
                            <AUIThemedView style={styles.buttonContainer}>
                                <AUIButton
                                    title="Clear"
                                    disabled={loading ? true : false}
                                    onPress={() => {
                                        reset();
                                        clearFields();
                                    }}
                                    style={{ width: "48%" }}
                                />
                                <AUIButton
                                    title="Update"
                                    disabled={loading ? true : false}
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
                                disabled={loading ? true : false}
                                onPress={() => {
                                    reset();
                                    clearFields();
                                }}
                                style={{ width: "48%" }}
                            />
                            <AUIButton
                                title="Save"
                                disabled={loading ? true : false}
                                selected
                                style={{ width: "48%" }}
                                onPress={handleSubmit(handleSave)}
                            />
                        </AUIThemedView>
                    )}
                </AUIThemedView>
            </AUIModal>
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

// const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
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
    image: {
        width: 60,
        height: 60,
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
});
