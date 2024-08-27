import AUIDrawerContent from "@/components/common/AUIDrawerContent";
import { AUILinearGradient } from "@/components/common/AUILinearGradient";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import HeaderIcons from "@/components/icons/HeaderIcon";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import SchoolProfile from "@/components/screenComponents/schoolProfile";
import { APP_THEME, BACKGROUND_THEME, TEXT_THEME, ThemeType } from "@/constants/Colors";
import { GLOBAL_TRANSLATION_LABEL } from "@/constants/Properties";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ChatBot } from "at-chatbot-native";
import { Tabs, useFocusEffect } from "expo-router";
import { default as React, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import EventsScreen from "../events/events";
import NotificationDrawer from "../notification/notification";

const Drawer = createDrawerNavigator();

export default function AUIDrawer() {
    const theme = useSelector((state: RootState) => state.global.theme);
    const isRTL = useSelector((state: RootState) => state.global.isRTL);
    const { t } = useTranslation();
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            <Drawer.Navigator
                initialRouteName="Home"
                screenOptions={({ navigation }) =>
                    screenOptions(navigation, isRTL, theme, setModalVisible) as any
                }
                drawerContent={(props) => <AUIDrawerContent {...props} />}
            >
                <Drawer.Screen
                    name="Home"
                    component={TabLayout}
                    options={{
                        title: t(GLOBAL_TRANSLATION_LABEL.home),
                        drawerIcon: () => (
                            <FontAwesome name="home" size={24} color={TEXT_THEME[theme].gray} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Events"
                    component={EventsScreen}
                    options={{
                        title: t(GLOBAL_TRANSLATION_LABEL.events),
                        drawerIcon: () => (
                            <MaterialIcons
                                name="emoji-events"
                                size={24}
                                color={TEXT_THEME[theme].gray}
                            />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Profile"
                    component={SchoolProfile}
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
            </Drawer.Navigator>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <AUIThemedView style={styles.modalContainer}>
                    <NotificationDrawer onClose={closeModal} />
                </AUIThemedView>
            </Modal>
        </>
    );
}

export function TabLayout() {
    const { requestFn } = useApiRequest();

    const [config, setConfig] = useState({
        config: {
            color: "green",
            language: "english",
        },
    });

    const user = useLangTransformSelector((state: RootState) => state.global.user);

    useFocusEffect(
        useCallback(() => {
            requestFn(API_URL.notification, "notification");
        }, [])
    );

    return (
        <AUIThemedView style={{ flex: 1 }}>
            <ChatBot
                consumerId={user?.client}
                config={config}
                user={user}
                widgetStyle={{ bottom: "10%" }}
            />

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
                            <Ionicons
                                name={"person"}
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
                        tabBarInactiveTintColor: "#0A152F",
                        tabBarActiveTintColor: "white",
                        tabBarLabelStyle: { fontSize: 13 },
                        tabBarIcon: ({ color, focused }) => (
                            <MaterialCommunityIcons
                                name={"book-education"}
                                size={24}
                                color={focused ? "white" : "#0A152F"}
                            />
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
                            <TabBarIcon
                                name={"business-sharp"}
                                color={focused ? "white" : "#0A152F"}
                            />
                        ),
                    }}
                />
            </Tabs>
        </AUIThemedView>
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

const screenOptions = (
    navigation: any,
    isRTL: boolean,
    theme: ThemeType,
    setModalVisible: any
) => ({
    headerBackground: () => (
        <AUILinearGradient
            colors={[BACKGROUND_THEME[theme].background, BACKGROUND_THEME[theme].background]}
            style={{ flex: 1 }}
        />
    ),
    headerTitle: "",

    headerLeft: () => <MenuButton navigation={navigation} />,
    headerRight: () => <HeaderIcons onNotificationPress={() => setModalVisible(true)} />,
    drawerLabelStyle: { marginLeft: -20, fontSize: 15, color: TEXT_THEME[theme].gray },
    drawerActiveBackgroundColor: APP_THEME[theme].primary.first,
    drawerActiveTintColor: "#ffffff",
    drawerPosition: isRTL ? "right" : "left",
});

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
    },
});
