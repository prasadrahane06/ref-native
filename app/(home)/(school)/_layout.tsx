import { Tabs } from "expo-router";
import React, { useState } from "react";
import AUIDrawerContent from "@/components/common/AUIDrawerContent";
import { AUILinearGradient } from "@/components/common/AUILinearGradient";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import HeaderIcons from "@/components/icons/HeaderIcon";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { APP_THEME, BACKGROUND_THEME, TEXT_THEME, ThemeType } from "@/constants/Colors";
import { RootState } from "@/redux/store";
import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Asset } from "expo-asset";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import NotificationDrawer from "../notification/notification";

const Drawer = createDrawerNavigator();

const EventsScreen = () => (
    <AUIThemedView>
        <AUIThemedText>Events Screen</AUIThemedText>
    </AUIThemedView>
);

const NotificationsScreen = ({ onClose }: { onClose: () => void }) => (
    <NotificationDrawer onClose={onClose} />
);

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

export default function AUIDrawer() {
    const theme = useSelector((state: RootState) => state.global.theme);
    const isRTL = useSelector((state: RootState) => state.global.isRTL);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const handleNotificationPress = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            <Drawer.Navigator
                initialRouteName="Home"
                screenOptions={({ navigation }) => screenOptions(navigation, isRTL, theme) as any}
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
                <Drawer.Screen
                    name="Home"
                    component={TabLayout}
                    options={{
                        drawerIcon: () => (
                            <FontAwesome name="home" size={24} color={TEXT_THEME[theme].gray} />
                        ),
                    }}
                />
                {/* <Drawer.Screen name="SchoolProfile" component={SchoolProfileScreen} />
            <Drawer.Screen name="SchoolCourses" component={SchoolCoursesScreen} />
            <Drawer.Screen name="Facilities" component={FacilitiesScreen} />
            <Drawer.Screen name="Admission" component={AdmissionScreen} />
            <Drawer.Screen name="Contact" component={ContactScreen} /> */}
                <Drawer.Screen
                    name="Events"
                    component={EventsScreen}
                    options={{
                        drawerIcon: () => (
                            <MaterialIcons
                                name="emoji-events"
                                size={24}
                                color={TEXT_THEME[theme].gray}
                            />
                        ),
                    }}
                />
            </Drawer.Navigator>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color={TEXT_THEME[theme].primary} />
                    </TouchableOpacity>
                    <NotificationDrawer onClose={closeModal} />
                </View>
            </Modal>
        </>
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
                name="studentTab"
                options={{
                    title: "Student",
                    headerTitle: "",
                    tabBarInactiveTintColor: "#0A152F",
                    tabBarActiveTintColor: "white",
                    tabBarLabelStyle: { fontSize: 13 },
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name={"person"} color={focused ? "white" : "#0A152F"} size={24} />
                    ),
                }}
            />
            <Tabs.Screen
                name="courses"
                options={{
                    title: "Courses",
                    tabBarInactiveTintColor: "#0A152F",
                    tabBarActiveTintColor: "white",
                    tabBarLabelStyle: { fontSize: 13 },
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons
                            name={"book-education"}
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
                    tabBarInactiveTintColor: "#0A152F",
                    tabBarActiveTintColor: "white",
                    tabBarLabelStyle: { fontSize: 13 },
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={"business-sharp"} color={focused ? "white" : "#0A152F"} />
                    ),
                }}
            />
        </Tabs>
    );
}

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

const screenOptions = (navigation: any, isRTL: boolean, theme: ThemeType) => ({
    headerBackground: () => (
        <AUILinearGradient
            colors={[BACKGROUND_THEME[theme].background, BACKGROUND_THEME[theme].background]} //["rgba(118, 250,178, 1)", "rgba(91, 216,148, 1)"]}
            style={{ flex: 1 }}
        />
    ),
    headerTitle: "",

    headerLeft: () => <MenuButton navigation={navigation} />,
    headerRight: () => (
        <HeaderIcons onNotificationPress={() => navigation.navigate("Notifications")} />
    ),
    drawerLabelStyle: { marginLeft: -20, fontSize: 15, color: TEXT_THEME[theme].gray },
    drawerActiveBackgroundColor: APP_THEME[theme].primary.first,
    drawerActiveTintColor: "#ffffff",
    drawerPosition: isRTL ? "right" : "left",
});

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        paddingTop: 50,
    },
    closeButton: {
        alignSelf: "flex-end",
        padding: 16,
    },
});
