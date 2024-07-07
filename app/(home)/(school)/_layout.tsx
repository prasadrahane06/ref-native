import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AUILinearGradient } from "@/components/common/AUILinearGradient";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import AUIDrawerContent from "@/components/common/AUIDrawerContent";
import { Asset } from "expo-asset";

//declearation
const Drawer = createDrawerNavigator();

//dummy Screens

const EventsScreen = () => (
    <AUIThemedView>
        <AUIThemedText>Events Screen</AUIThemedText>
    </AUIThemedView>
);

//user Data and School Screen
const user = {
    name: "Manchester School",
    avatarUrl:
        "https://b2bsalesconnections.com/wp-content/uploads/2023/01/college-grads-vasily-koloda-8CqDvPuo_kI-unsplash-300x200.jpg",
};

const items = [
    {
        label: "Facilities",
        iconPath: Asset.fromModule(require("@/assets/images/drawerIcons/courses-icon.png")).uri,
        navigateTo: "Facilities",
    },
    {
        label: "Terms and Policy",
        iconPath: Asset.fromModule(require("@/assets/images/drawerIcons/terms-and-policy-icon.png"))
            .uri,
        navigateTo: "Contact",
    },
    {
        label: "Share the app",
        iconPath: Asset.fromModule(require("@/assets/images/drawerIcons/share-icon.png")).uri,
        navigateTo: "#",
    },
];

//creating Drawer
export default function AUIDrawer() {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={({ navigation }) => screenOptions(navigation)}
            drawerContent={(props) => (
                <AUIDrawerContent
                    {...props}
                    isLoggedIn={true}
                    user={user}
                    items={items}
                    onLogout={() => {
                        // Implement logout logic here
                    }}
                    school
                />
            )}
        >
            <Drawer.Screen name="Home" component={TabLayout} />
            {/* <Drawer.Screen name="SchoolProfile" component={SchoolProfileScreen} />
            <Drawer.Screen name="SchoolCourses" component={SchoolCoursesScreen} />
            <Drawer.Screen name="Facilities" component={FacilitiesScreen} />
            <Drawer.Screen name="Admission" component={AdmissionScreen} />
            <Drawer.Screen name="Contact" component={ContactScreen} /> */}
            <Drawer.Screen name="Events" component={EventsScreen} />
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
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    headerTitle: "",
                    title: "Home",
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
                name="studentTab"
                options={{
                    title: "Student",
                    headerTitle: "",

                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? "person" : "person-outline"}
                            color={focused ? "white" : "#0A152F"}
                            size={24}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="courses"
                options={{
                    title: "Courses",
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons
                            name={focused ? "book-education" : "book-education-outline"}
                            size={24}
                            color={focused ? "white" : "#0A152F"}
                        />
                        // <TabBarIcon
                        //     name={focused ? "home" : "home-outline"}
                        //     color={focused ? "white" : "#0A152F"}
                        // />
                    ),
                }}
            />
            <Tabs.Screen
                name="facilities"
                options={{
                    title: "Facilities",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "business-sharp" : "business-sharp"}
                            color={focused ? "white" : "#0A152F"}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}

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
            colors={["#ffffff", "#ffffff"]} //["rgba(118, 250,178, 1)", "rgba(91, 216,148, 1)"]}
            style={{ flex: 1 }}
        />
    ),
    headerTitle: "",

    headerLeft: () => <MenuButton navigation={navigation} />,
    headerRight: () => <HeaderIcons />,
});
