import { View, Text, Dimensions } from "react-native";
import React, { useEffect } from "react";
import useApiRequest from "@/customHooks/useApiRequest";
import { APP_THEME } from "@/constants/Colors";
import { API_URL } from "@/constants/urlProperties";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import PurchaseCoursesList from "../home/courseDetails/PurchaseCourses";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export default function MyCourses() {
    const { requestFn } = useApiRequest();
    const MyCourse = useSelector((state: RootState) => state.api.myCourse || {});
    const theme = useSelector((state: RootState) => state.global.theme);

    console.log("myCourse", JSON.stringify(MyCourse));
    const docs = MyCourse?.docs;
    const bookMySeatData = docs ? docs.filter((item: any) => item.type === "bookYourSeat") : [];
    const buyData = docs ? docs.filter((item: any) => item.type === "buy") : [];

    useEffect(() => {
        requestFn(API_URL.purchaseCourse, "myCourse");
    }, []);

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
                },
                tabBarIndicatorStyle: {
                    backgroundColor: APP_THEME[theme].primary.first,
                    borderRadius: 5,
                    height: 5,
                },
                tabBarStyle: {
                    backgroundColor: "white",
                    borderBottomWidth: 1,
                    borderColor: APP_THEME[theme].primary.first,
                },
            }}
        >
            <Tab.Screen
                name="Purchased Courses"
                component={() => <PurchaseCoursesList data={buyData} />}
            />
            <Tab.Screen
                name="Seat Booking"
                component={() => <PurchaseCoursesList data={bookMySeatData} seatBooking />}
            />
            <Tab.Screen
                name="Completed Courses"
                component={() => <PurchaseCoursesList data={[]} completedCourse />}
            />
        </Tab.Navigator>
    );
}
