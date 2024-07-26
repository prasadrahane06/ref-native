import { APP_THEME, BACKGROUND_THEME, TEXT_THEME } from "@/constants/Colors";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useCallback, useEffect } from "react";
import { Dimensions } from "react-native";
import { useSelector } from "react-redux";
import PurchaseCoursesList from "../home/courseDetails/PurchaseCourses";
import { useFocusEffect } from "expo-router";
import { useTranslation } from "react-i18next";

const Tab = createMaterialTopTabNavigator();

export default function MyCourses() {
    const { t } = useTranslation();
    const { requestFn } = useApiRequest();

    const MyCourse = useLangTransformSelector((state: RootState) => state.api.myCourse);
    const theme = useSelector((state: RootState) => state.global.theme);

    const docs = MyCourse?.docs;
    const bookMySeatData = docs ? docs.filter((item: any) => item.type === "bookYourSeat") : [];
    const buyData = docs ? docs.filter((item: any) => item.type === "buy") : [];

    useFocusEffect(
        useCallback(() => {
            requestFn(API_URL.purchaseCourse, "myCourse", { user: true });
        }, [])
    );

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: APP_THEME[theme].ternary.first,
                tabBarScrollEnabled: true,
                tabBarItemStyle: { width: Dimensions.get("window").width / 2.3 },
                tabBarLabelStyle: {
                    textAlign: "center",
                    textTransform: "none",
                    flexWrap: "nowrap",
                    fontSize: 14,
                    fontWeight: "bold",
                    color: TEXT_THEME[theme].primary,
                },
                tabBarIndicatorStyle: {
                    backgroundColor: APP_THEME[theme].primary.first,
                    borderRadius: 5,
                    height: 5,
                },
                tabBarStyle: {
                    backgroundColor: BACKGROUND_THEME[theme].background,
                    borderBottomWidth: 1,
                    borderColor: APP_THEME[theme].primary.first,
                },
            }}
        >
            <Tab.Screen
                name={t("purchased_courses")}
                component={() => <PurchaseCoursesList data={buyData} />}
            />
            <Tab.Screen
                name={t("seat_booking")}
                component={() => <PurchaseCoursesList data={bookMySeatData} seatBooking />}
            />
            <Tab.Screen
                name={t("completed_courses")}
                component={() => <PurchaseCoursesList data={[]} completedCourse />}
            />
        </Tab.Navigator>
    );
}
