import { APP_THEME } from "@/constants/Colors";
import { removeCourseFromCart } from "@/redux/cartSlice";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import AUIImage from "./common/AUIImage";
import { AUIThemedText } from "./common/AUIThemedText";
import { AUIThemedView } from "./common/AUIThemedView";
import { ApiSuccessToast } from "./common/AUIToast";

interface CourseProps {
    title: string;
    image: any;
    favorite?: boolean;
    startingDate: string;
    cart?: boolean;
    courseId?: string;
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

    const handleRemoveFromCart = () => {
        //@ts-ignore
        dispatch(removeCourseFromCart(courseId));
        console.log("Item removed from cart");
        ApiSuccessToast("🗑️ Removed from cart");
    };

    return (
        <TouchableOpacity
            style={[styles.courseContainer, style]}
            onPress={() =>
                router.push({
                    pathname: `(home)/courseDetails/1`,
                })
            }
        >
            <AUIThemedView>
                <AUIImage style={styles.courseImage} path={image} />
                <AUIThemedView style={styles.courseItemContainer}>
                    <Text style={styles.courseTitle}>{title}</Text>
                    <AUIThemedText style={{ fontSize: 12 }}>
                        <AUIThemedText style={styles.courseCaption}>Starting from: </AUIThemedText>
                        20-04-2024
                    </AUIThemedText>
                </AUIThemedView>
                {favorite && (
                    <AUIThemedView style={styles.iconContainer}>
                        <MaterialIcons name="favorite" size={18} color="red" style={styles.icon} />
                    </AUIThemedView>
                )}
                {cart && (
                    <TouchableOpacity
                        onPress={handleRemoveFromCart}
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
