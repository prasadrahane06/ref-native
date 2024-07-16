import AUIDrawerContent from "@/components/common/AUIDrawerContent";
import { AUILinearGradient } from "@/components/common/AUILinearGradient";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import HeaderIcons from "@/components/icons/HeaderIcon";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { BACKGROUND_THEME, TEXT_THEME, ThemeType } from "@/constants/Colors";
import { GLOBAL_TRANSLATION_LABEL } from "@/constants/Properties";
import { RootState } from "@/redux/store";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Asset } from "expo-asset";
import { Tabs } from "expo-router";
import React, { useState } from "react";
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
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const theme = useSelector((state: RootState) => state.global.theme);
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
                screenOptions={({ navigation }) => screenOptions(navigation, theme)}
                drawerContent={(props) => (
                    <AUIDrawerContent
                        {...props}
                        isLoggedIn={true}
                        user={user}
                        items={items}
                        onLogout={() => {}}
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
                <Drawer.Screen
                    name="Notifications"
                    component={() => <NotificationsScreen onClose={closeModal} />}
                    options={{
                        headerShown: false,
                        title: GLOBAL_TRANSLATION_LABEL.notifications,
                        drawerIcon: ({ color }) => (
                            <MaterialIcons name="notifications" size={24} color={color} />
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

const screenOptions = (navigation: any, theme: ThemeType) => ({
    headerBackground: () => (
        <AUILinearGradient
            colors={[BACKGROUND_THEME[theme].background, BACKGROUND_THEME[theme].background]}
            style={{ flex: 1 }}
        />
    ),
    headerTitle: "",

    headerLeft: () => <MenuButton navigation={navigation} />,
    headerRight: () => (
        <HeaderIcons onNotificationPress={() => navigation.navigate("Notifications")} />
    ),
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
