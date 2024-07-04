import AUIDrawerContent from "@/components/common/AUIDrawerContent";
import { AUILinearGradient } from "@/components/common/AUILinearGradient";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import PurchaseCoursesList from "@/components/home/courseDetails/PurchaseCourses";
import Profile from "@/components/screenComponents/Profile";
import { APP_THEME } from "@/constants/Colors";
import { GLOBAL_TRANSLATION_LABEL } from "@/constants/Properties";
import { purchaseCoursesData } from "@/constants/dummy data/similarCoursesData";
import { RootState } from "@/redux/store";
import {
    AntDesign,
    EvilIcons,
    FontAwesome5,
    FontAwesome6,
    Ionicons,
    MaterialIcons,
} from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, Platform, TouchableOpacity, View } from "react-native";
import "react-native-gesture-handler";
import { useSelector } from "react-redux";

const Tab = createMaterialTopTabNavigator();

const ProfileScreen = () => <Profile />;
const CoursesScreen = () => (
    <Tab.Navigator
        screenOptions={{
            tabBarActiveTintColor: APP_THEME.ternary.first,
            tabBarScrollEnabled: true, // Enable scrolling for the tab bar
            tabBarItemStyle: { flex: 1, width: Dimensions.get("window").width / 2.3 }, // Adjust width as needed
            tabBarLabelStyle: {
                textAlign: "center",
                textTransform: "none", // Prevent text from transforming to uppercase
                flexWrap: "nowrap",
                fontSize: 14,
                fontWeight: "bold",
            },
            tabBarIndicatorStyle: {
                backgroundColor: APP_THEME.primary.first,
                borderRadius: 5,
                height: 5,
            },
            tabBarStyle: {
                backgroundColor: "white",
                borderBottomWidth: 1,
                borderColor: APP_THEME.primary.first,
            },
        }}
    >
        <Tab.Screen
            name="Purchase Courses"
            component={() => <PurchaseCoursesList data={purchaseCoursesData} />}
        />
        <Tab.Screen
            name="Seat Booking"
            component={() => <PurchaseCoursesList data={purchaseCoursesData} seatBooking />}
        />
        <Tab.Screen
            name="Completed Courses"
            component={() => <PurchaseCoursesList data={purchaseCoursesData} completedCourse />}
        />
    </Tab.Navigator>
);

const TermsPolicyScreen = () => (
    <AUIThemedView>
        <AUIThemedText>Terms and Policy Screen</AUIThemedText>
    </AUIThemedView>
);

const Drawer = createDrawerNavigator();

const MenuButton = ({ navigation }: any) => (
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons
            name="menu"
            size={25}
            style={{ marginLeft: 15 }}
            color={APP_THEME.primary.first}
        />
    </TouchableOpacity>
);

const HeaderIcons = () => (
    <View style={{ flexDirection: "row", marginRight: 15 }}>
        <TouchableOpacity onPress={() => alert("Search")}>
            <Ionicons
                name="search"
                size={25}
                style={{ marginRight: 20 }}
                color={APP_THEME.primary.first}
            />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("Notifications")}>
            <Ionicons name="notifications" size={25} color={APP_THEME.primary.first} />
        </TouchableOpacity>
    </View>
);

const screenOptions = (navigation: any, isRTL: boolean) => ({
    headerBackground: () => (
        <AUILinearGradient
            colors={["#ffffff", "#ffffff"]} //["rgba(118, 250,178, 1)", "rgba(91, 216,148, 1)"]}
            style={{ flex: 1 }}
        />
    ),
    headerLeft: () => <MenuButton navigation={navigation} />,
    headerRight: () => <HeaderIcons />,
    headerTitle: "",
    drawerLabelStyle: { marginLeft: -20, fontSize: 15 },
    drawerActiveBackgroundColor: APP_THEME.primary.first,
    drawerActiveTintColor: "#ffffff",
    drawerPosition: isRTL ? "right" : "left",
    // drawerItemStyle: { flexDirection: "row-reverse" },

    // drawerLabelStyle: { textAlign: "right" },
});

//creating Drawer
export default function AUIDrawer() {
    const { t, i18n } = useTranslation();
    const isRTL = useSelector((state: RootState) => state.global.isRTL);
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={({ navigation }) => screenOptions(navigation, isRTL)}
            drawerContent={(props) => <AUIDrawerContent {...props} />}
        >
            <Drawer.Screen
                name="Home"
                component={TabLayout}
                options={{
                    title: t(GLOBAL_TRANSLATION_LABEL.home),

                    // drawerItemStyle: { alignItems: "flex-end", flexDirection: "row-reverse" },
                    drawerIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
                }}
            />
            <Drawer.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                    title: t(GLOBAL_TRANSLATION_LABEL.profile),
                    drawerIcon: ({ color }) => (
                        <FontAwesome6 name="user-circle" size={24} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Courses"
                component={CoursesScreen}
                options={{
                    title: t(GLOBAL_TRANSLATION_LABEL.courses),

                    drawerIcon: ({ color }) => (
                        <FontAwesome5 name="book-reader" size={24} color={color} />
                    ),
                }}
            />
            {/* <Drawer.Screen
                name="Accommodation"
                component={AccommodationScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <FontAwesome6 name="house-chimney-window" size={20} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="ChangePassword"
                component={ChangePasswordScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <MaterialIcons name="password" size={24} color={color} />
                    ),
                }}
            /> */}
            <Drawer.Screen
                name="TermsPolicy"
                component={TermsPolicyScreen}
                options={{
                    title: t(GLOBAL_TRANSLATION_LABEL.termsPolicy),

                    drawerIcon: ({ color }) => (
                        <MaterialIcons name="policy" size={24} color={color} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}

export function TabLayout() {
    const { t, i18n } = useTranslation();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarBackground: () => (
                    <AUILinearGradient
                        colors={["rgba(118, 250,178, 1)", "rgba(91, 216,148, 1)"]}
                        style={{ flex: 1 }}
                    />
                ),
                tabBarStyle: { height: Platform.OS === "ios" ? 80 : 60 },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: t(GLOBAL_TRANSLATION_LABEL.home),
                    tabBarInactiveTintColor: "#0A152F",
                    tabBarActiveTintColor: "white",
                    tabBarLabelStyle: { fontSize: 13 },
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcons
                            name={"home"}
                            color={focused ? "white" : "#0A152F"}
                            size={27}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="favourite"
                options={{
                    headerShown: false,
                    title: t(GLOBAL_TRANSLATION_LABEL.favourite),
                    tabBarInactiveTintColor: "#0A152F",
                    tabBarActiveTintColor: "white",
                    tabBarLabelStyle: { fontSize: 13 },
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={"heart-sharp"}
                            color={focused ? "white" : "#0A152F"}
                            size={24}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="compare"
                options={{
                    title: t(GLOBAL_TRANSLATION_LABEL.compare),
                    tabBarInactiveTintColor: "#0A152F",
                    tabBarActiveTintColor: "white",
                    tabBarLabelStyle: { fontSize: 13 },
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={"swap-horizontal-outline"}
                            color={focused ? "white" : "#0A152F"}
                            size={24}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: t(GLOBAL_TRANSLATION_LABEL.cart),
                    tabBarInactiveTintColor: "#0A152F",
                    tabBarActiveTintColor: "white",
                    tabBarLabelStyle: { fontSize: 13 },
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome6
                            name={"cart-shopping"}
                            color={focused ? "white" : "#0A152F"}
                            size={20}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
