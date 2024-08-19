import useAxios from "@/app/services/axiosClient";
import { APP_THEME, TEXT_THEME } from "@/constants/Colors";
import { GLOBAL_TRANSLATION_LABEL } from "@/constants/Properties";
import { API_URL } from "@/constants/urlProperties";
import useDebouncedNavigate from "@/customHooks/useDebouncedNavigate";
import { removeItemFromCart } from "@/redux/cartSlice";
import { removeFromFavorite } from "@/redux/favoriteSlice";
import { setLoader } from "@/redux/globalSlice";
import { RootState } from "@/redux/store";
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AUIImage from "./common/AUIImage";
import { AUIThemedText } from "./common/AUIThemedText";
import { AUIThemedView } from "./common/AUIThemedView";
import { ApiErrorToast, ApiSuccessToast } from "./common/AUIToast";
import { TouchableOpacityProps } from "react-native-gesture-handler";
import { router } from "expo-router";

interface CourseProps {
    title: string;
    image: any;
    favorite?: boolean;
    edit?: boolean;
    startingDate?: string;
    cart?: boolean;
    courseId: any;
    style?: ViewStyle;
    numberOfLines?: number;
    ellipsizeMode?: "head" | "middle" | "tail" | "clip";
    onEdit?: (courseId: string) => void;
}

const Course: React.FC<CourseProps> = ({
    title,
    image,
    favorite,
    edit,
    startingDate,
    cart,
    courseId,
    style,
    numberOfLines,
    ellipsizeMode,
    onEdit,
}) => {
    const { del } = useAxios();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const handlePress = useDebouncedNavigate((pathname: any) => router.push(pathname), 300);

    const theme = useSelector((state: RootState) => state.global.theme);

    const handleRemoveFromCart = (id: string) => {
        del(API_URL.cart, { course: id })
            .then((res: any) => {
                dispatch(removeItemFromCart({ id: id }));

                ApiSuccessToast(res.message);
                dispatch(setLoader(false));
            })
            .catch((error: any) => {
                ApiErrorToast(error.response?.data?.message);
                console.log("error in remove from cart", error);
            });
    };
    // @ts-ignore
    const startDate: string = new Date(startingDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    });

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
                        del(API_URL.favorite, { id, type })
                            .then((res: any) => {
                                ApiSuccessToast(res.message);
                                dispatch(removeFromFavorite({ id, type: "courses" }));
                            })
                            .catch((error: any) => {
                                ApiErrorToast(error.response?.data?.message);
                                console.log("error in remove favorite", error);
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
        <TouchableOpacity
            style={[styles.courseContainer, style]}
            onPress={() => handlePress(`(home)/courseDetails/${courseId}`)}
        >
            <AUIThemedView style={styles.layout}>
                <AUIImage style={styles.courseImage} path={image} />
                <AUIThemedView
                    style={[
                        styles.courseItemContainer,
                        {
                            borderColor: APP_THEME[theme].primary.first,
                            shadowColor: APP_THEME[theme].primary.first,
                        },
                    ]}
                >
                    <Text
                        style={[styles.courseTitle, { color: TEXT_THEME[theme].primary }]}
                        numberOfLines={numberOfLines}
                        ellipsizeMode={ellipsizeMode}
                    >
                        {title}
                    </Text>
                    <AUIThemedText style={styles.dateStyle}>
                        <AUIThemedText style={styles.courseCaption}>
                            {t(GLOBAL_TRANSLATION_LABEL.starting_from)}:{" "}
                        </AUIThemedText>
                        {startDate}
                    </AUIThemedText>
                </AUIThemedView>
                {favorite && (
                    <TouchableOpacity
                        onPress={() => handleRemoveFav(courseId, "course")}
                        style={styles.iconContainer}
                    >
                        <MaterialCommunityIcons name="delete-forever" size={24} color="red" />
                    </TouchableOpacity>
                )}
                {edit && onEdit && (
                    <TouchableOpacity
                        style={styles.editiConContainer}
                        onPress={() => onEdit(courseId)}
                    >
                        <FontAwesome
                            name="pencil"
                            size={23}
                            color={APP_THEME.light.primary.first}
                        />
                    </TouchableOpacity>
                )}
                {cart && (
                    <TouchableOpacity
                        onPress={() => handleRemoveFromCart(courseId)}
                        style={[
                            styles.cartIconContainer,
                            { backgroundColor: APP_THEME[theme].primary.first },
                        ]}
                    >
                        <MaterialIcons
                            name="shopping-cart"
                            size={18}
                            color="#fff"
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                )}
            </AUIThemedView>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    dateStyle: { fontSize: 11, marginHorizontal: 6 },
    courseContainer: {},
    layout: {
        backgroundColor: "transparent",
    },
    courseItemContainer: {
        paddingLeft: 10,
        width: "100%",
        paddingVertical: 4,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    courseImage: {
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        width: "100%",
        height: 70,
    },
    courseTitle: {
        fontSize: 13,
        fontWeight: "700",
        marginHorizontal: 6,
    },
    courseCaption: {
        fontSize: 11,
        fontWeight: "bold",
    },
    iconContainer: {
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        borderRadius: 20,
        padding: 5,
    },
    editiConContainer: {
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "white", //"rgba(149, 207, 156, 0.4)",
        borderRadius: 5,
        padding: 3,
    },
    cartIconContainer: {
        position: "absolute",
        top: 10,
        right: 10,
        borderRadius: 20,
        padding: 5,
    },
    icon: {
        alignSelf: "center",
    },
});

export default Course;
