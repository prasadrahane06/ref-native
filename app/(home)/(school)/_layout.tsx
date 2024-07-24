import AUIButton from "@/components/common/AUIButton";
import AUIDrawerContent from "@/components/common/AUIDrawerContent";
import { AUILinearGradient } from "@/components/common/AUILinearGradient";
import { AUIThemedText } from "@/components/common/AUIThemedText";
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
import { Asset } from "expo-asset";
import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { default as React, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, FlatList, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import AddNewEvent from "../events/AddNewEvent";
import NotificationDrawer from "../notification/notification";
import schoolProfile from "@/components/screenComponents/schoolProfile";

interface event {
    _id: string;
    eventName: {
        en: string;
        ar: string;
    };
    description: string;
    date: string;
    location: string;
    eventImage: string;
}
const Drawer = createDrawerNavigator();

const EventsScreen = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<event | undefined>(undefined);
    const eventData = useLangTransformSelector((state: RootState) => state.api.myEvent || {});
    const isRTL = useSelector((state: RootState) => state.global.isRTL || {});
    const [event, setEvent] = useState<event[]>([]);
    const { requestFn } = useApiRequest();

    const refreshEvents = () => {
        requestFn(API_URL.event, "myEvent", { client: true });
    };

    useEffect(() => {
        refreshEvents();
    }, []);

    useEffect(() => {
        if (eventData?.docs?.length > 0) {
            setEvent(eventData?.docs);
        }
    }, [eventData?.docs?.length]);

    const handleAddNewEvent = () => {
        setSelectedEvent(undefined);
        setModalVisible(true);
    };
    const handleEditEvent = (event: event) => {
        setSelectedEvent(event);
        setModalVisible(true);
    };
    const handleCloseModal = () => {
        setModalVisible(false);
        refreshEvents();
    };

    const renderItem = ({ item }: { item: event }) => (
        <TouchableOpacity onPress={() => handleEditEvent(item)}>
            <AUIThemedView style={styles.event}>
                <Image source={{ uri: item.eventImage }} style={styles.image} />
                <AUIThemedText style={styles.name} numberOfLines={1}>
                    {typeof item.eventName === "string"
                        ? item?.eventName
                        : isRTL
                        ? item?.eventName?.ar
                        : item?.eventName?.en}
                </AUIThemedText>
            </AUIThemedView>
        </TouchableOpacity>
    );

    return (
        <AUIThemedView style={styles.mainContainer}>
            <AUIButton
                title="Add New Event"
                selected
                style={styles.AddEventButton}
                onPress={handleAddNewEvent}
            />
            <FlatList
                data={event}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                numColumns={3}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.container}
            />
            <AddNewEvent
                visible={isModalVisible}
                onClose={handleCloseModal}
                event={selectedEvent}
                refreshEvents={refreshEvents}
            />
        </AUIThemedView>
    );
};

// const NotificationsScreen = ({ onClose }: { onClose: () => void }) => (
//     <NotificationDrawer onClose={onClose} />
// );

const user = {
    name: "Manchester School",
    avatarUrl:
        "https://b2bsalesconnections.com/wp-content/uploads/2023/01/college-grads-vasily-koloda-8CqDvPuo_kI-unsplash-300x200.jpg",
};

const items = [
    {
        label: "Facilities",
        iconPath: Asset.fromModule(require("@/assets/images/drawerIcons/courses_icon.png")).uri,
        navigateTo: "Facilities",
    },
    {
        label: "Terms and Policy",
        iconPath: Asset.fromModule(require("@/assets/images/drawerIcons/terms_and_policy_icon.png"))
            .uri,
        navigateTo: "Contact",
    },
    {
        label: "Share the app",
        iconPath: Asset.fromModule(require("@/assets/images/drawerIcons/share_icon.png")).uri,
        navigateTo: "#",
    },
];

export default function AUIDrawer() {
    const theme = useSelector((state: RootState) => state.global.theme);
    const isRTL = useSelector((state: RootState) => state.global.isRTL);

    const { t, i18n } = useTranslation();

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    // const handleNotificationPress = () => {
    //     setModalVisible(true);
    // };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            <Drawer.Navigator
                initialRouteName="Home"
                screenOptions={({ navigation }) => screenOptions(navigation, isRTL, theme) as any}
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

                {/* <Drawer.Screen name="SchoolProfile" component={schoolProfile} /> */}
                {/* <Drawer.Screen name="SchoolCourses" component={SchoolCoursesScreen} />
            <Drawer.Screen name="Facilities" component={FacilitiesScreen} />
            <Drawer.Screen name="Admission" component={AdmissionScreen} />
            <Drawer.Screen name="Contact" component={ContactScreen} /> */}
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
                    component={schoolProfile}

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
    const [config, setConfig] = useState({});

    const user = useLangTransformSelector((state: RootState) => state.global.user);

    return (
        <View style={{ flex: 1 }}>
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
        </View>
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

const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
    mainContainer: {
        height: windowHeight,
    },
    modalContainer: {
        flex: 1,
        paddingTop: 50,
    },
    closeButton: {
        alignSelf: "flex-end",
        padding: 16,
    },
    AddEventButton: {
        marginHorizontal: 15,
    },
    image: {
        width: 60,
        height: 60,
        marginTop: 10,
    },
    event: {
        flex: 1,
        alignItems: "center",
        marginHorizontal: 20,
        height: 100,
        width: 80,
    },
    name: {
        fontSize: 16,
    },
    row: {
        flex: 1,
        justifyContent: "space-between",
        marginBottom: 20,
    },
    container: {
        marginTop: 20,
    },
});
