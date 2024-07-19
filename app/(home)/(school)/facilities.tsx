import useAxios from "@/app/services/axiosClient";
import AUIButton from "@/components/common/AUIButton";
import AUIInputField from "@/components/common/AUIInputField";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { ApiErrorToast, ApiSuccessToast } from "@/components/common/AUIToast";
import { APP_THEME, TEXT_THEME } from "@/constants/Colors";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

interface AddFacilities {
    visible: boolean;
    onClose: () => void;
    onFacilityAdded: () => void;
}
interface Facility {
    _id: string;
    description: string | { [key: string]: string };
    image: string;
    name: string | { [key: string]: string };
    status: number;
}

const AddNewFacilities: React.FC<AddFacilities> = ({ visible, onClose, onFacilityAdded }) => {
    const user = useSelector((state: RootState) => state.global.user);
    const { post } = useAxios();
    const { control, handleSubmit, reset, getValues } = useForm();
    const [image, setImage] = useState<string | null>(null);

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
                ApiSuccessToast("New Plan added successfully.");
                reset();
                onFacilityAdded();
            })
            .catch((e) => {
                ApiErrorToast("Failed to add facilities")
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
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <AUIThemedView style={styles.modalContainer}>
                <AUIThemedView style={styles.modalContent}>
                    <AUIThemedView style={styles.headerRow}>
                        <AUIThemedText style={styles.header}>Add your Facilities</AUIThemedText>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <MaterialIcons name="close" size={28} />
                        </TouchableOpacity>
                    </AUIThemedView>

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
                            <AUIThemedText style={styles.uploadButtonText}>
                                Upload File
                            </AUIThemedText>
                        </TouchableOpacity>
                        <AUIThemedText style={styles.fileName}>
                            {image
                                ? truncateFileName(image.split("/").pop()!, 18)
                                : "No file chosen"}
                        </AUIThemedText>
                    </AUIThemedView>

                    {image && <Image source={{ uri: image }} style={styles.image} />}

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
                            onPress={handleSubmit(handleSave)}
                            style={{ width: "48%" }}
                        />
                    </AUIThemedView>
                </AUIThemedView>
            </AUIThemedView>
        </Modal>
    );
};

export default function TabFourScreen() {
    const school = useLangTransformSelector((state: RootState) => state.api.myFacilitys || {});
    const { requestFn } = useApiRequest();
    const isRTL = useSelector((state: RootState) => state.global.isRTL || {});
    const [isAddFacilityVisible, setAddFacilityVisible] = useState(false);

    const [facilities, setFacilities] = useState<Facility[]>([]);

    useEffect(() => {
        requestFn(API_URL.facility, "myFacilitys", { client: true });
    }, []);

    useEffect(() => {
        if (school?.docs?.length > 0) {
            setFacilities(school?.docs);
        }
    }, [school?.docs?.length]);

    const handleFacilityAdded = () => {
        setAddFacilityVisible(false);
    };

    const renderItem = ({ item }: { item: Facility }) => (
        <AUIThemedView style={styles.facility}> 
            <Image source={{ uri: item.image }} style={styles.image} />
            <AUIThemedText style={styles.name}>
                {typeof item.name === "string"
                    ? item.name
                    : isRTL
                    ? item.name.ar
                    : item.name.en}
            </AUIThemedText>
        </AUIThemedView>
    );

    return (
        <AUIThemedView style={styles.root}>
            <AUIThemedText style={styles.title}>Facilities</AUIThemedText>
            <AUIButton
                title="Add New Facilities"
                selected
                style={styles.button}
                onPress={() => setAddFacilityVisible(true)}
            />
            <FlatList
                data={facilities}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                numColumns={3} 
                columnWrapperStyle={styles.row} 
                contentContainerStyle={styles.container} 
            />
            <AddNewFacilities
                visible={isAddFacilityVisible}
                onClose={() => setAddFacilityVisible(false)}
                onFacilityAdded={handleFacilityAdded}
            />
        </AUIThemedView>
    );
}

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
    },

    name: {
        fontSize: 16,
    },
    noData: {
        fontSize: 16,
        color: TEXT_THEME.light.danger,
    },
    input: { marginBottom: 10 },
    buttonContainer: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "90%",
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
