import useAxios from "@/app/services/axiosClient";
import AUIButton from "@/components/common/AUIButton";
import AUIInputField from "@/components/common/AUIInputField";
import AUIModal from "@/components/common/AUIModal";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { ApiErrorToast, ApiSuccessToast } from "@/components/common/AUIToast";
import { APP_THEME, TEXT_THEME } from "@/constants/Colors";
import { API_URL } from "@/constants/urlProperties";
import { RootState } from "@/redux/store";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Image } from "expo-image";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { default as React, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Dimensions, Platform, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

interface AddEvent {
    visible: boolean;
    onClose: () => void;
    event: event | undefined;
    refreshEvents: () => void;
}
interface event {
    _id: string;
    eventName: {
        en: string;
        ar: string;
    };
    description: string;
    date: string;
    location: string;
    eventImage: string;
}

const AddNewEvent: React.FC<AddEvent> = ({ visible, onClose, event, refreshEvents }) => {
    const [image, setImage] = useState<string | null>(null);
    const user = useSelector((state: RootState) => state.global.user);
    const { post, patch, del } = useAxios();
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
                ApiSuccessToast("New Event added successfully.");
                reset();
                onClose();
                refreshEvents();
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const handleEdit = () => {
        const values = getValues();
        const payload: any = { id: event?._id };

        if (values.eventName !== event?.eventName) payload.eventName = values.eventName;
        if (values.description !== event?.description) payload.description = values.description;
        if (selectedDate?.toISOString() !== event?.date) payload.date = selectedDate?.toISOString();
        if (values.location !== event?.location) payload.location = values.location;
        if (image !== event?.eventImage) payload.eventImage = image;

        patch(API_URL.event, payload)
            .then((res) => {
                ApiSuccessToast("Event updated successfully.");
                reset();
                onClose();
                refreshEvents();
            })
            .catch((e) => {
                ApiErrorToast("Failed to update Event");
                console.log(e);
            });
    };

    const handleDelete = () => {
        if (event?._id) {
            del(`${API_URL.event}`, { id: event._id })
                .then((res) => {
                    ApiSuccessToast("Event deleted successfully.");
                    onClose();
                    setShowConfirmation(false);
                    refreshEvents();
                })
                .catch((e) => {
                    ApiErrorToast("Failed to delete event.");
                    console.log(e);
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
            const assetUri = result.assets[0].uri;
            const manipResult = await ImageManipulator.manipulateAsync(
                assetUri,
                [{ resize: { width: 500 } }],
                { compress: 0.2, format: ImageManipulator.SaveFormat.JPEG }
            );
            const base64Image = await convertImageToBase64(manipResult.uri);
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

    return (
        <>
            <AUIModal
                visible={visible}
                onClose={onClose}
                title={event ? "Edit Event" : "Add your Events"}
            >
                <Controller
                    control={control}
                    name="eventName"
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <AUIInputField
                            label="Enter Event name"
                            placeholder="Event Name"
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
                            label="Enter Event Description"
                            placeholder="Description"
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
                            <Pressable onPress={() => setDatePickerVisible(true)}>
                                <AUIInputField
                                    label="Event Date"
                                    placeholder="Select Date"
                                    value={selectedDate ? selectedDate.toDateString() : ""}
                                    style={styles.input}
                                    editable={false}
                                />
                            </Pressable>
                        )}
                    />
                    {datePickerVisible && (
                        <DateTimePicker
                            value={selectedDate || new Date()}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}
                </AUIThemedView>
                <Controller
                    control={control}
                    name="location"
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <AUIInputField
                            label="Enter Event Location"
                            placeholder="Event Location"
                            value={value}
                            onChangeText={onChange}
                            style={styles.input}
                        />
                    )}
                />
                <AUIThemedText>Select image</AUIThemedText>
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

const windowHeight = Dimensions.get("window").height;
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
});
