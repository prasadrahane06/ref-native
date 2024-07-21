import useAxios from "@/app/services/axiosClient";
import { APP_THEME, TEXT_THEME } from "@/constants/Colors";
import { GLOBAL_TRANSLATION_LABEL } from "@/constants/Properties";
import { API_URL } from "@/constants/urlProperties";
import { removeItemFromCart } from "@/redux/cartSlice";
import { removeFromFavorite } from "@/redux/favoriteSlice";
import { setLoader } from "@/redux/globalSlice";
import { RootState } from "@/redux/store";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AUIImage from "./common/AUIImage";
import { AUIThemedText } from "./common/AUIThemedText";
import { AUIThemedView } from "./common/AUIThemedView";
import { ApiErrorToast, ApiSuccessToast } from "./common/AUIToast";

interface CourseProps {
    title: string;
    image: any;
    favorite?: boolean;
    startingDate?: string;
    cart?: boolean;
    courseId: any;
    style?: ViewStyle;
    numberOfLines?: number;
    ellipsizeMode?: "head" | "middle" | "tail" | "clip";
}

const Course: React.FC<CourseProps> = ({
    title,
    image,
    favorite,
    startingDate,
    cart,
    courseId,
    style,
    numberOfLines,
    ellipsizeMode,
}) => {
    const { del } = useAxios();
    const dispatch = useDispatch();
    const router = useRouter();
    const { t } = useTranslation();

    const theme = useSelector((state: RootState) => state.global.theme);

    const handleRemoveFromCart = (id: string) => {
        del(API_URL.cart, { course: id })
            .then((res: any) => {
                dispatch(removeItemFromCart({ id: id }));

                ApiSuccessToast(res.message);
                dispatch(setLoader(false));
            })
            .catch((e: any) => {
                ApiErrorToast(e.response?.data?.message);
                console.log(e);
            });
    };
    // @ts-ignore
    const startDate: string = new Date(startingDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    });

    const handleRemoveFav = (id: string, type: string) => {
        del(API_URL.favorite, { id: id, type: type })
            .then((res: any) => {
                ApiSuccessToast(res.message);
                dispatch(removeFromFavorite({ id, type: "courses" }));
                dispatch(setLoader(false));
            })
            .catch((e: any) => {
                ApiErrorToast(e.response?.data?.message);
                console.log(e);
            });
    };

    return (
        <TouchableOpacity
            style={[styles.courseContainer, style]}
            onPress={() =>
                router.push({
                    pathname: `(home)/courseDetails/${courseId}`,
                })
            }
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
                        <MaterialIcons name="favorite" size={18} color="red" style={styles.icon} />
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
    dateStyle: { fontSize: 11 },
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
