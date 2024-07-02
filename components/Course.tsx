import { APP_THEME } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import AUIImage from "./common/AUIImage";
import { AUIThemedText } from "./common/AUIThemedText";
import { AUIThemedView } from "./common/AUIThemedView";
import { ApiErrorToast, ApiSuccessToast } from "./common/AUIToast";
import useAxios from "@/app/services/axiosClient";
import { API_URL } from "@/constants/urlProperties";
import { setResponse } from "@/redux/apiSlice";
import { addItemToCart, removeItemFromCart } from "@/redux/cartSlice";
import { setLoader } from "@/redux/globalSlice";

interface CourseProps {
    title: string;
    image: any;
    favorite?: boolean;
    startingDate: string;
    cart?: boolean;
    courseId: string;
    style?: object;
}

const Course: React.FC<CourseProps> = ({
    title,
    image,
    favorite,
    startingDate,
    cart,
    courseId,
    style,
}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { del } = useAxios();

    console.log("courseId", courseId);

    const handleRemoveFromCart = (id: string) => {
        del(API_URL.cart, { course: id })
            .then((res: any) => {
                ApiSuccessToast(res.message);
                dispatch(removeItemFromCart(id));
                console.log("item removed from cart res =>", res.data);
                dispatch(setLoader(false));
            })
            .catch((e: any) => {
                ApiErrorToast(e.response?.data?.message);
                console.log(e);
            });
    };

    const startDate: string = new Date(startingDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    });

    return (
        <TouchableOpacity
            style={[styles.courseContainer, style]}
            onPress={() =>
                router.push({
                    pathname: `(home)/courseDetails/${courseId}`,
                })
            }
        >
            <AUIThemedView>
                <AUIImage style={styles.courseImage} path={image} />
                <AUIThemedView style={styles.courseItemContainer}>
                    <Text style={styles.courseTitle}>{title}</Text>
                    <AUIThemedText style={{ fontSize: 12 }}>
                        <AUIThemedText style={styles.courseCaption}>Starting from: </AUIThemedText>
                        {startDate}
                    </AUIThemedText>
                </AUIThemedView>
                {favorite && (
                    <AUIThemedView style={styles.iconContainer}>
                        <MaterialIcons name="favorite" size={18} color="red" style={styles.icon} />
                    </AUIThemedView>
                )}
                {cart && (
                    <TouchableOpacity
                        onPress={() => handleRemoveFromCart(courseId)}
                        style={styles.cartIconContainer}
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
    courseContainer: {},
    courseItemContainer: {
        paddingLeft: 10,
        width: "100%",
        // height: 50,
        paddingVertical: 4,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderColor: APP_THEME.primary.first,
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
        fontSize: 12,
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
        backgroundColor: APP_THEME.primary.first,
        borderRadius: 20,
        padding: 5,
    },
    icon: {
        alignSelf: "center",
    },
});

export default Course;
