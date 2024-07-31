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
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

interface AddFacilities {
    visible: boolean;
    onClose: () => void;
    facility?: Facility;
    refreshFacilities: () => void;
}
interface Facility {
    _id: string;
    description: string | { [key: string]: string };
    image: string;
    name: string | { [key: string]: string };
    status: number;
}

const AddNewFacilities: React.FC<AddFacilities> = ({
    visible,
    onClose,
    facility,
    refreshFacilities,
}) => {
    const user = useSelector((state: RootState) => state.global.user);
    const { post, patch, del } = useAxios();
    const { control, handleSubmit, reset, setValue, getValues } = useForm();
    const [image, setImage] = useState<string | null>(facility?.image || null);
    const [initialValues, setInitialValues] = useState<any>({});
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        if (facility) {
            const initialFacilityValues = {
                facilityName: facility.name,
                description: facility.description,
                image: facility.image,
            };
            setInitialValues(initialFacilityValues);
            setValue("facilityName", facility.name);
            setValue("description", facility.description);
            setImage(facility.image);
        } else {
            resetFields();
        }
    }, [facility, setValue]);

    useEffect(() => {
        if (!facility && visible) {
            resetFields();
        }
    }, [visible]);

    const resetFields = () => {
        reset({
            facilityName: "",
            description: "",
        });
        setImage(null);
    };

    const handleSave = () => {
        const values = getValues();
        const payload = {
            client: user?.client,
            name: values.facilityName,
            description: values.description,
            image: image,
        };
        post(API_URL.facility, payload)
            .then((res) => {
                ApiSuccessToast("New Facility Added Successfully.");
                refreshFacilities();
                reset();
            })
            .catch((e) => {
                ApiErrorToast("Failed to add facility");
                console.log(e);
            });
    };

    const handleEdit = () => {
        const values = getValues();
        const payload: any = { id: facility?._id };

        if (values.facilityName !== initialValues.facilityName) {
            payload.name = values.facilityName;
        }
        if (values.description !== initialValues.description) {
            payload.description = values.description;
        }
        if (image !== initialValues.image) {
            payload.image = image;
        }

        patch(API_URL.facility, payload)
            .then((res) => {
                ApiSuccessToast("Facility updated successfully.");
                refreshFacilities();
                reset();
            })
            .catch((e) => {
                ApiErrorToast("Failed to update facility");
                console.log(e);
            });
    };

    const handleDelete = () => {
        if (!facility?._id) return;
        del(API_URL.facility ,{}, {id : facility?._id})
            .then((res) => {
                setShowConfirmation(false);
                ApiSuccessToast(res.message);
                refreshFacilities();
            })
            .catch((e) => {
                // ApiErrorToast(error.message);
                console.log(e);
            });
    };

    const clearFields = () => {
        setImage(null);
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
                title={facility ? "Edit Facility" : "Add your Facilities"}
            >
                <Controller
                    control={control}
                    name="facilityName"
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <AUIInputField
                            label="Enter Facility name"
                            placeholder="Facility Name"
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
                            label="Enter Description"
                            placeholder="Description"
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
                    {facility ? (
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
export default AddNewFacilities;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 17,
        letterSpacing: 2,
    },
    button: {
        marginTop: 20,
    },
    container: {
        marginTop: 20,
    },
    row: {
        flex: 1,
        justifyContent: "space-between",
        marginBottom: 20,
    },
    facility: {
        flex: 1,
        alignItems: "center",
        marginHorizontal: 5,
        height: 100,
        width: 80,
    },

    name: {
        fontSize: 16,
    },
    noData: {
        fontSize: 16,
        color: TEXT_THEME.light.danger,
    },
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
});
