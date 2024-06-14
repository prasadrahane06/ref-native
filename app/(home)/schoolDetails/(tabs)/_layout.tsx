import { APP_THEME } from "@/constants/Colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CoursesTab from "./courses";
import OverviewTab from "./overview";

const Tab = createMaterialTopTabNavigator();

export default function StudentDetailsTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarAndroidRipple: {
                    color: APP_THEME.background,
                    borderless: true,
                },
                tabBarIndicatorStyle: {
                    borderBottomWidth: 3,
                    borderColor: APP_THEME.primary.first,
                },
                tabBarStyle: {
                    shadowColor: APP_THEME.background,
                    borderBottomWidth: 1,
                    borderColor: APP_THEME.primary.first,
                },
            }}
            style={{ height: 400 }}
        >
            <Tab.Screen
                name="overview"
                component={OverviewTab}
                options={{
                    tabBarLabel: "Overview",
                    tabBarLabelStyle: {
                        fontSize: 16,
                        fontWeight: "bold",
                    },
                }}
            />

            <Tab.Screen
                name="courses"
                component={CoursesTab}
                options={{
                    tabBarLabel: "Courses",
                    tabBarLabelStyle: {
                        fontSize: 16,
                        fontWeight: "bold",
                    },
                }}
            />
        </Tab.Navigator>
    );
}
