import useAxios from "@/app/services/axiosClient";
import { API_URL } from "@/constants/urlProperties";
import { removeFromFavorite } from "@/redux/favoriteSlice";
import { setLoader } from "@/redux/globalSlice";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useRouter } from "expo-router";
import React, { useRef } from "react";
import { Alert, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import AUIBackgroundImage from "./common/AUIBackgroundImage";
import { AUIThemedText } from "./common/AUIThemedText";
import { AUIThemedView } from "./common/AUIThemedView";
import { ApiErrorToast, ApiSuccessToast } from "./common/AUIToast";
import useDebouncedNavigate from "@/customHooks/useDebouncedNavigate";
import { useTranslation } from "react-i18next";

interface SchoolProps {
    id: string;
    title: string;
    image: any;
    caption?: string;
    favorite?: boolean;
    style?: ViewStyle;
}

const School: React.FC<SchoolProps> = ({ id, title, image, caption, favorite, style }) => {
    const lastClickTime = useRef(0);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { del } = useAxios();
    const handlePress = useDebouncedNavigate((pathname: any) => router.push(pathname), 300);

    const handleRemoveFav = (id: string, type: string) => {
        Alert.alert(
            `${t("remove_favorite")}`,
            `${t("remove_fav_description")}`,
            [
                {
                    text: `${t("cancel")}`,
                    onPress: () => console.log("Remove cancelled"),
                    style: "cancel",
                },
                {
                    text: `${t("remove")}`,
                    onPress: () => {
                        dispatch(setLoader(true));
                        del(API_URL.favorite, { id: id, type: type })
                            .then((res: any) => {
                                ApiSuccessToast(res.message);
                                dispatch(removeFromFavorite({ id, type: "clients" }));
                            })
                            .catch((error: any) => {
                                ApiErrorToast(error.response?.data?.message);
                                console.log("error in delete favorite", error);
                            })
                            .finally(() => dispatch(setLoader(false)));
                    },
                    style: "destructive",
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <TouchableOpacity onPress={() => handlePress(`(home)/schoolDetails/${id}`)}>
            <AUIThemedView style={[styles.schoolContainer, style]}>
                <AUIThemedView style={styles.schoolItem}>
                    <AUIBackgroundImage style={[styles.image]} path={image}>
                        <LinearGradient
                            colors={[
                                "rgba(10, 21, 47, 0.9)",
                                "rgba(10, 21, 47, 0.6)",
                                "rgba(91, 216, 148, 0.3)",
                                "transparent",
                            ]}
                            style={styles.gradient}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 0, y: 0 }}
                        />
                        <AUIThemedText
                            style={styles.schoolTitle}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                        >
                            {title}
                        </AUIThemedText>
                        {caption && (
                            <AUIThemedText
                                style={styles.schoolCaption}
                                numberOfLines={2}
                                ellipsizeMode="tail"
                            >
                                {caption}
                            </AUIThemedText>
                        )}
                        {favorite && (
                            <TouchableOpacity
                                onPress={() => handleRemoveFav(id, "client")}
                                style={styles.iconContainer}
                            >
                                <MaterialCommunityIcons
                                    name="delete-forever"
                                    size={24}
                                    color="red"
                                />
                            </TouchableOpacity>
                        )}
                    </AUIBackgroundImage>
                </AUIThemedView>
            </AUIThemedView>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    schoolContainer: {
        borderRadius: 10,
        // marginHorizontal: 6,
    },
    schoolItem: {
        borderRadius: 10,

        overflow: "hidden",
    },
    schoolTitle: {
        top: 90,
        textAlign: "center",
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        letterSpacing: 1,
        lineHeight: 15,
        paddingHorizontal: 10,
    },
    schoolCaption: {
        top: 95,
        textAlign: "center",
        color: "white",
        fontSize: 12,
        lineHeight: 13,
        opacity: 0.8,
        paddingHorizontal: 10,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 7,
    },
    gradient: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: "100%",
        borderRadius: 7,
    },
    iconContainer: {
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        borderRadius: 20,
        padding: 5,
    },
    icon: {
        alignSelf: "center",
    },
});

export default School;
