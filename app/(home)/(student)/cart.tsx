import Course from "@/components/Course";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { RootState } from "@/redux/store";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { setResponse } from "@/redux/apiSlice";
import { addItemToCart } from "@/redux/cartSlice";

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

    useEffect(() => {
        if (cart && cart.docs && cart.docs.length > 0) {
            const cartItems = cart.docs[0].items;
            console.log("cartItems in cart =>", JSON.stringify(cartItems));

            dispatch(addItemToCart(cartItems));
            // setCartItems(cartItems);
        }
    }, [cart]);

    const cartItems = useSelector((state: RootState) => state.cart.items);
    console.log("cartItems from selector =>", JSON.stringify(cartItems));

    if (cartItems.length === 0) {
        return (
            <AUIThemedView style={styles.container}>
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
                        data={cartItems}
                        renderItem={({ item, index }) => (
                            <AUIThemedView style={styles.courseItem}>
                                <Course
                                    courseId={item?.course?._id}
                                    title={item?.course?.courseName}
                                    image={item?.course?.image}
                                    startingDate={item?.course?.startDate}
                                    cart
                                />
                            </AUIThemedView>
                        )}
                        keyExtractor={(item) => item.courseId}
                        numColumns={2}
                        columnWrapperStyle={styles.courseColumnWrapper}
                        scrollEnabled={false}
                    />
                </AUIThemedView>
            </AUIThemedView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: "#ffffff",
        height: "100%",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
    },

    coursesContainer: {
        flex: 1,
        backgroundColor: "#ffffff",
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
