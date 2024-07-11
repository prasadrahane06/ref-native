import AUIDrawerContent from "@/components/common/AUIDrawerContent";
import { AUILinearGradient } from "@/components/common/AUILinearGradient";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import PurchaseCoursesList from "@/components/home/courseDetails/PurchaseCourses";
import Profile from "@/components/screenComponents/Profile";
import { APP_THEME, BACKGOUND_THEME, TEXT_THEME, ThemeType } from "@/constants/Colors";
import { GLOBAL_TRANSLATION_LABEL } from "@/constants/Properties";
import { purchaseCoursesData } from "@/constants/dummy data/similarCoursesData";
import { RootState } from "@/redux/store";
import {
    AntDesign,
    EvilIcons,
    FontAwesome,
    FontAwesome5,
    FontAwesome6,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
} from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, Linking, Platform, Text, TouchableOpacity, View } from "react-native";
import "react-native-gesture-handler";
import { useSelector } from "react-redux";
import useApiRequest from "@/customHooks/useApiRequest";
import { API_URL } from "@/constants/urlProperties";
import MyCourses from "@/components/screenComponents/MyCourses";
import TermsAndPolicy from "@/components/screenComponents/TermsAndPolicy";

const ProfileScreen = () => <Profile />;
const CoursesScreen = () => <MyCourses />;
const TermsPolicyScreen = () => <TermsAndPolicy />;

const Drawer = createDrawerNavigator();

const MenuButton = ({ navigation }: any) => (
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons
            name="menu"
            size={25}
            style={{ marginLeft: 15 }}
            color={APP_THEME.light.primary.first}
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
                color={APP_THEME.light.primary.first}
            />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("Notifications")}>
            <Ionicons name="notifications" size={25} color={APP_THEME.light.primary.first} />
        </TouchableOpacity>
    </View>
);

const screenOptions = (navigation: any, isRTL: boolean, theme: ThemeType) => ({
    headerBackground: () => (
        <AUILinearGradient
            colors={[BACKGOUND_THEME[theme].backgound, BACKGOUND_THEME[theme].backgound]} //["rgba(118, 250,178, 1)", "rgba(91, 216,148, 1)"]}
            style={{ flex: 1 }}
        />
    ),
    headerLeft: () => <MenuButton navigation={navigation} />,
    headerRight: () => <HeaderIcons />,
    headerTitle: "",
    drawerLabelStyle: { marginLeft: -20, fontSize: 15, color: TEXT_THEME[theme].gray },
    drawerActiveBackgroundColor: APP_THEME[theme].primary.first,
    drawerActiveTintColor: "#ffffff",
    drawerPosition: isRTL ? "right" : "left",
    // drawerItemStyle: { flexDirection: "row-reverse" },

    // drawerLabelStyle: { textAlign: "right" },
});

//creating Drawer
export default function AUIDrawer() {
    const { t, i18n } = useTranslation();
    const isRTL = useSelector((state: RootState) => state.global.isRTL);
    const theme = useSelector((state: RootState) => state.global.theme);

    return (
        <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={({ navigation }) => screenOptions(navigation, isRTL, theme)}
            drawerContent={(props) => <AUIDrawerContent {...props} />}
        >
            <Drawer.Screen
                name="Home"
                component={TabLayout}
                options={{
                    title: t(GLOBAL_TRANSLATION_LABEL.home),

                    // drawerItemStyle: { alignItems: "flex-end", flexDirection: "row-reverse" },
                    drawerIcon: ({ color }) => (
                        <FontAwesome name="home" size={24} color={TEXT_THEME[theme].gray} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                    title: t(GLOBAL_TRANSLATION_LABEL.account),
                    drawerIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="account"
                            size={24}
                            color={TEXT_THEME[theme].gray}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="Courses"
                component={CoursesScreen}
                options={{
                    title: t(GLOBAL_TRANSLATION_LABEL.courses),

                    drawerIcon: ({ color }) => (
                        <FontAwesome5 name="book-reader" size={24} color={TEXT_THEME[theme].gray} />
                    ),
                }}
            />
            {/* <Drawer.Screen
                name="Accommodation"
                component={AccommodationScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <FontAwesome6 name="house-chimney-window" size={20} color={TEXT_THEME[theme].gray} />
                    ),
                }}
            />
            <Drawer.Screen
                name="ChangePassword"
                component={ChangePasswordScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <MaterialIcons name="password" size={24} color={TEXT_THEME[theme].gray} />
                    ),
                }}
            /> */}
            <Drawer.Screen
                name="TermsPolicy"
                component={TermsPolicyScreen}
                options={{
                    title: t(GLOBAL_TRANSLATION_LABEL.termsPolicy),

                    drawerIcon: ({ color }) => (
                        <MaterialIcons name="policy" size={24} color={TEXT_THEME[theme].gray} />
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
