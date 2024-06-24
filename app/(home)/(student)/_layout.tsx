import AUIDrawerContent from "@/components/common/AUIDrawerContent";
import { AUILinearGradient } from "@/components/common/AUILinearGradient";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import PurchaseCoursesList from "@/components/home/courseDetails/PurchaseCourses";
import Profile from "@/components/screenComponents/Profile";
import { APP_THEME } from "@/constants/Colors";
import { purchaseCoursesData } from "@/constants/dummy data/similarCoursesData";
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
import { Dimensions, Platform, TouchableOpacity, View } from "react-native";
import "react-native-gesture-handler";

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
const AccommodationScreen = () => (
    <AUIThemedView>
        <AUIThemedText>Accommodation Screen</AUIThemedText>
    </AUIThemedView>
);
const ChangePasswordScreen = () => (
    <AUIThemedView>
        <AUIThemedText>Change Password Screen</AUIThemedText>
    </AUIThemedView>
);
const TermsPolicyScreen = () => (
    <AUIThemedView>
        <AUIThemedText>Terms and Policy Screen</AUIThemedText>
    </AUIThemedView>
);
const ShareAppScreen = () => (
    <AUIThemedView>
        <AUIThemedText>Share App Screen</AUIThemedText>
    </AUIThemedView>
);

const Drawer = createDrawerNavigator();

const MenuButton = ({ navigation }: any) => (
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={25} style={{ marginLeft: 15 }} />
    </TouchableOpacity>
);

const HeaderIcons = () => (
    <View style={{ flexDirection: "row", marginRight: 15 }}>
        <TouchableOpacity onPress={() => alert("Search")}>
            <Ionicons name="search" size={25} style={{ marginRight: 20 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("Notifications")}>
            <Ionicons name="notifications" size={25} />
        </TouchableOpacity>
    </View>
);

const screenOptions = (navigation: any) => ({
    headerBackground: () => (
        <AUILinearGradient
            colors={["rgba(118, 250,178, 1)", "rgba(91, 216,148, 1)"]}
            style={{ flex: 1 }}
        />
    ),
    headerLeft: () => <MenuButton navigation={navigation} />,
    headerRight: () => <HeaderIcons />,
    headerTitle: "",
    drawerLabelStyle: { marginLeft: -20, fontSize: 15 },
    drawerActiveBackgroundColor: APP_THEME.primary.first,
    drawerActiveTintColor: "#ffffff",
});

//creating Drawer
export default function AUIDrawer() {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={({ navigation }) => screenOptions(navigation)}
            //   drawerContent={(props) => (
            //     <AUIDrawerContent
            //       {...props}
            //       isLoggedIn={true}
            //       user={user}
            //       items={items}
            //       onLogout={() => {
            //         // Implement logout logic here
            //       }}
            //     />
            //   )}
            drawerContent={(props) => <AUIDrawerContent {...props} />}
        >
            <Drawer.Screen
                name="Home"
                component={TabLayout}
                options={{
                    drawerIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
                }}
            />
            <Drawer.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                    drawerIcon: ({ color }) => (
                        <FontAwesome6 name="user-circle" size={24} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Courses"
                component={CoursesScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <FontAwesome5 name="book-reader" size={24} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Accommodation"
                component={AccommodationScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <FontAwesome6 name="house-chimney-window" size={24} color={color} />
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
            />
            <Drawer.Screen
                name="TermsPolicy"
                component={TermsPolicyScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <MaterialIcons name="policy" size={24} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="ShareApp"
                component={ShareAppScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <EvilIcons name="share-google" size={28} color={color} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}

export function TabLayout() {
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
                    title: "Home",
                    tabBarInactiveTintColor: "#0A152F",
                    tabBarActiveTintColor: "white",
                    tabBarLabelStyle: { fontSize: 13 },
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcons
                            name={"home"}
                            color={focused ? "white" : "#0A152F"}
                            size={24}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="favourite"
                options={{
                    title: "Favourite",
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
                    title: "Compare",
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
                    title: "Cart",
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
