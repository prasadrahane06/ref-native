import { APP_THEME } from "@/constants/Colors";
import { planOne } from "@/constants/dummy data/planOne";
import { planThree } from "@/constants/dummy data/planThree";
import { planTwo } from "@/constants/dummy data/planTwo";
import { similarCoursesData } from "@/constants/dummy data/similarCoursesData";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import PlanComponent from "./PlanComponent";

const Tab = createMaterialTopTabNavigator();

export default function CoursePlanTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarAndroidRipple: {
                    color: APP_THEME.background,
                    borderless: true,
                },
                tabBarLabelStyle: {
                    fontSize: 16,
                    fontWeight: "bold",
                    textTransform: "none",
                },
                tabBarItemStyle: {
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: "#0A152F",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginHorizontal: 5,
                },
                tabBarIndicatorStyle: {
                    backgroundColor: "#0A152F",
                    borderRadius: 10,
                    marginHorizontal: "auto",
                    height: "100%",
                },
                tabBarStyle: {
                    shadowColor: "transparent",
                    elevation: 0,
                    marginHorizontal: 12,
                },
                tabBarActiveTintColor: "#fff",
                tabBarInactiveTintColor: "#000",
            }}
            style={{ height: 1050, marginVertical: 10 }}
            sceneContainerStyle={{
                backgroundColor: APP_THEME.background,
            }}
        >
            <Tab.Screen
                name="Plan 1"
                component={PlanComponentWrapper(
                    planOne,
                    "All courses are Monday to Friday, with morning and afternoon classes",
                    "45-minute lessons",
                    similarCoursesData
                )}
            />
            <Tab.Screen
                name="Plan 2"
                component={PlanComponentWrapper(
                    planTwo,
                    "All courses are Monday to Friday, with morning and afternoon classes",
                    "45-minute lessons",
                    similarCoursesData
                )}
            />
            <Tab.Screen
                name="Plan 3"
                component={PlanComponentWrapper(
                    planThree,
                    "All courses are Monday to Friday, with morning and afternoon classes",
                    "45-minute lessons",
                    similarCoursesData
                )}
            />
        </Tab.Navigator>
    );
}

function PlanComponentWrapper(
    plan: any,
    scheduleDescription: string,
    lessonDescription: string,
    similarCourses: any
) {
    return function WrappedComponent() {
        return (
            <PlanComponent
                plan={plan}
                scheduleDescription={scheduleDescription}
                lessonDescription={lessonDescription}
                similarCourses={similarCourses}
            />
        );
    };
}
