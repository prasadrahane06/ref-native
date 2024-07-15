import Course from "@/components/Course";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { RootState } from "@/redux/store";
import React, { useCallback, useEffect, useState } from "react";
import { Dimensions, FlatList, ScrollView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { setResponse } from "@/redux/apiSlice";
import { addItemToCart } from "@/redux/cartSlice";
import { BACKGOUND_THEME } from "@/constants/Colors";

export default function TabFourScreen() {
    // const [cartItems, setCartItems] = useState<any>([]);
    const { requestFn } = useApiRequest();
    const dispatch = useDispatch();

    useFocusEffect(
        useCallback(() => {
            requestFn(API_URL.cart, "cart");
        }, [])
    );

    const cart = useSelector((state: RootState) => state.api.cart);
    const theme = useSelector((state: RootState) => state.global.theme);

    useEffect(() => {
        if (cart && cart.docs && cart.docs.length > 0) {
            const cartItems = cart.docs[0].items;

            dispatch(addItemToCart({ courses: cartItems }));
        }
    }, [cart]);

    const cartItems = useSelector((state: RootState) => state.cart.items);

    if (cartItems?.courses?.length === 0) {
        return (
            <AUIThemedView
                style={[styles.container, { backgroundColor: BACKGOUND_THEME[theme].backgound }]}
            >
                <AUIThemedText style={styles.title}>{GLOBAL_TEXT.your_cart_is_empty}</AUIThemedText>
            </AUIThemedView>
        );
    }

    return (
        <ScrollView>
            <AUIThemedView style={styles.container}>
                <AUIThemedText style={styles.title}>
                    {GLOBAL_TEXT.my_added_courses_in_cart}
                </AUIThemedText>

                <AUIThemedView style={styles.coursesContainer}>
                    <FlatList
                        data={cartItems?.courses}
                        renderItem={({ item, index }) => (
                            <AUIThemedView style={styles.courseItem}>
                                <Course
                                    courseId={item?.course?._id}
                                    title={item?.course?.courseName}
                                    image={item?.course?.image}
                                    startingDate={item?.course?.startDate}
                                    ellipsizeMode="tail"
                                    numberOfLines={1}
                                    cart
                                />
                            </AUIThemedView>
                        )}
                        keyExtractor={(item) => item._id}
                        numColumns={2}
                        columnWrapperStyle={styles.courseColumnWrapper}
                        scrollEnabled={false}
                    />
                </AUIThemedView>
            </AUIThemedView>
        </ScrollView>
    );
}

const { height: windowHeight } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        // backgroundColor: "#ffffff",
        height: windowHeight,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
    },

    coursesContainer: {
        flex: 1,
        // backgroundColor: "#ffffff",
        paddingBottom: 10,
        height: "100%",
    },
    courseItem: {
        width: "48%",
        marginBottom: 10,
    },
    courseColumnWrapper: {
        justifyContent: "space-between",
        marginTop: 10,
    },
});
