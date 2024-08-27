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
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { setLoader } from "@/redux/globalSlice";
import { RootState } from "@/redux/store";
import { MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

interface AddFacilities {
    visible: boolean;
    onClose: () => void;
    facility?: Facility;
    refreshFacilities: () => void;
}
interface Facility {
    _id: string;
    description: string;
    image: string;
    name: string;
    status: number;
}

const AddNewFacilities: React.FC<AddFacilities> = ({
    visible,
    onClose,
    facility,
    refreshFacilities,
}) => {
    const { t } = useTranslation();
    const { post, patch, del } = useAxios();
    const dispatch = useDispatch();

    const schema = Yup.object().shape({
        facilityName: Yup.string().required(`${t("facility_name_is_required")}`),
        description: Yup.string().required(`${t("description_is_required")}`),
        image: Yup.string().required("Image is required"),
    });

    const { control, handleSubmit, reset, setValue, clearErrors } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            facilityName: "",
            description: "",
            image: "",
        },
    });

    const mySchoolDetails = useLangTransformSelector(
        (state: RootState) => state.api.MySchoolDetails
    );
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [imageBase64, setImageBase64] = useState<string | any>("");
    const [showImage, setShowImage] = useState<any>("");
    const [imageName, setImageName] = useState<any>("");

    useEffect(() => {
        if (facility) {
            const editFacility = facility;

            setValue("facilityName", editFacility?.name);
            setValue("description", editFacility?.description);
            setValue("image", editFacility?.image);
            setShowImage(editFacility?.image);
            setImageBase64("");
        } else {
            reset();
            setShowImage("");
        }
    }, [facility, setValue, reset]);

    const handleSave = (data: any) => {
        dispatch(setLoader(true));
        onClose();

        const payload = {
            client: mySchoolDetails?._id,
            name: data.facilityName,
            description: data.description,
            image: `data:image/png;base64,${imageBase64}`,
        };

        post(API_URL.facility, payload)
            .then((res) => {
                ApiSuccessToast(res.message);
                refreshFacilities();
                reset();
                setShowImage("");
                setImageName("");
            })
            .catch((error) => {
                if (error.response?.status === 413) {
                    ApiErrorToast(t("image_too_large"));
                    return;
                }

                console.error("error in add facility", error);
                ApiErrorToast(error.message.response.data.message);
            })
            .finally(() => dispatch(setLoader(false)));
    };

    const handleEdit = (data: any) => {
        dispatch(setLoader(true));
        onClose();

        const payload: any = {
            id: facility?._id,
            name: data.facilityName,
            description: data.description,
        };
        if (imageBase64) {
            payload.image = `data:image/png;base64,${imageBase64}`;
        }

        patch(API_URL.facility, payload)
            .then((res) => {
                ApiSuccessToast(res.message);
                refreshFacilities();
                reset();
            })
            .catch((error) => {
                if (error.response?.status === 413) {
                    ApiErrorToast(t("image_too_large"));
                    return;
                }

                console.error("error in edit facility", error);
                ApiErrorToast(error.message.response.data.message);
            })
            .finally(() => dispatch(setLoader(false)));
    };

    const handleDelete = () => {
        if (!facility?._id) return;
        del(API_URL.facility, {}, { id: facility?._id })
            .then((res) => {
                setShowConfirmation(false);
                ApiSuccessToast(res.message);
                refreshFacilities();
            })
            .catch((error) => {
                console.error("error in delete facility", error);
                ApiErrorToast(error.message.response.data.message);
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
                title={facility ? "Edit Facility" : `${t("add_your_facilities")}`}
                style={styles.modalContainerStyle}
            >
                <Controller
                    control={control}
                    name="facilityName"
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <>
                            <AUIInputField
                                label="Enter Facility name"
                                placeholder="Facility Name"
                                value={value}
                                onChangeText={onChange}
                                style={[styles.input, error && { borderColor: "red" }]}
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
                                label={t("enter_description")}
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

                <Controller
                    name="image"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <AUIThemedView>
                            <AUIThemedText>{t("select_image")}</AUIThemedText>
                            <AUIThemedView style={styles.imagePickerContainer}>
                                <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
                                    <MaterialIcons name="cloud-upload" size={24} color="#5BD894" />
                                    <AUIThemedText style={styles.uploadButtonText}>
                                        {facility ? t("change_banner") : t("upload_file")}
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
                    {facility ? (
                        <AUIThemedView style={styles.buttonMainContainer}>
                            <AUIThemedView style={styles.buttonContainer}>
                                <AUIButton
                                    title="Clear"
                                    onPress={() => {
                                        reset();
                                        setShowImage(null);
                                        setImageName("");
                                        setImageBase64("");
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
                                    setShowImage(null);
                                    setImageName("");
                                    setImageBase64("");
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
export default AddNewFacilities;

const styles = StyleSheet.create({
    modalContainerStyle: { width: "100%" },
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
    errorMessage: { color: TEXT_THEME.light.danger, fontSize: 13, marginBottom: 5 },
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
});
