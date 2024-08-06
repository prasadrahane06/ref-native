import Course from "@/components/Course";
import AUIImage from "@/components/common/AUIImage";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { BACKGROUND_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { addItemToCart } from "@/redux/cartSlice";
import { RootState } from "@/redux/store";
import { useFocusEffect } from "@react-navigation/native";
import { Asset } from "expo-asset";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, FlatList, ScrollView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function TabFourScreen() {
    const { t } = useTranslation();
    const { requestFn } = useApiRequest();
    const dispatch = useDispatch();

    useFocusEffect(
        useCallback(() => {
            requestFn(API_URL.cart, "cart");
        }, [])
    );

    const cart = useLangTransformSelector((state: RootState) => state.api.cart);
    const theme = useSelector((state: RootState) => state.global.theme);

    useEffect(() => {
        if (cart && cart.docs && cart.docs.length > 0) {
            const cartItems = cart.docs[0].items;

            dispatch(addItemToCart({ courses: cartItems }));
        }
    }, [cart, dispatch]);

    const cartItems = useLangTransformSelector((state: RootState) => state.cart.items);

    if (cartItems?.courses?.length === 0) {
        return (
            <AUIThemedView
                style={[styles.container, { backgroundColor: BACKGROUND_THEME[theme].background }]}
            >
                <AUIThemedText style={styles.title}>
                    {t(GLOBAL_TEXT.your_cart_is_empty)}
                </AUIThemedText>

                <AUIThemedView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <AUIImage
                        path={Asset.fromModule(require("@/assets/images/local/cart_image.png"))}
                        style={{ width: 200, height: 200 }}
                    />
                </AUIThemedView>
            </AUIThemedView>
        );
    }

    return (
        <ScrollView>
            <AUIThemedView style={styles.container}>
                <AUIThemedText style={styles.title}>
                   {t("my_added_courses_in_cart")}
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
                                    onEdit={function (courseId: string): void {
                                        throw new Error("Function not implemented.");
                                    }}
                                />
                            </AUIThemedView>
                        )}
                        keyExtractor={(item) => item?._id}
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
