import AUIButton from "@/components/common/AUIButton";
import AUIDrawerContent from "@/components/common/AUIDrawerContent";
import { AUILinearGradient } from "@/components/common/AUILinearGradient";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import HeaderIcons from "@/components/icons/HeaderIcon";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { APP_THEME, BACKGROUND_THEME, TEXT_THEME, ThemeType } from "@/constants/Colors";
import { GLOBAL_TRANSLATION_LABEL } from "@/constants/Properties";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Image } from "expo-image";
import { Tabs, useFocusEffect } from "expo-router";
import { default as React, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import AddNewEvent from "../events/AddNewEvent";
import NotificationDrawer from "../notification/notification";
import SchoolProfile from "@/components/screenComponents/schoolProfile";

import { ChatBot } from "at-chatbot-native";
import { t } from "i18next";

interface event {
    _id: string;
    eventName: string;
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
    const [page, setPage] = useState<number>(0);
    const { requestFn } = useApiRequest();

    const refreshEvents = () => {
        requestFn(API_URL.event, "myEvent", { client: true, page: `${page}` });
    };

    useFocusEffect(
        useCallback(() => {
            refreshEvents();
        }, [page])
    );

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
                <Image source={{ uri: item?.eventImage }} style={styles.image} />
                <AUIThemedText style={styles.name} numberOfLines={1}>
                    {item?.eventName}
                </AUIThemedText>
            </AUIThemedView>
        </TouchableOpacity>
    );

    return (
        <AUIThemedView style={styles.mainContainer}>
            <AUIButton
                title={t("add_new_event")}
                selected
                style={styles.AddEventButton}
                onPress={handleAddNewEvent}
            />
            <FlatList
                data={eventData?.docs || []}
                renderItem={renderItem}
                keyExtractor={(item) => item?._id}
                numColumns={3}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.container}
            />

            <AUIThemedView>
                <TouchableOpacity
                    style={{ alignItems: "center", padding: 10 }}
                    disabled={page === eventData.totalPages}
                    onPress={() => {
                        setPage((prevPage) => prevPage + 1);
                    }}
                >
                    <AUIThemedText>
                        {page === eventData.totalPages ? `${t("you_are_caught_up")}` :`${t("load_more")}`}
                    </AUIThemedText>
                </TouchableOpacity>
            </AUIThemedView>
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

export default function AUIDrawer() {
    const theme = useSelector((state: RootState) => state.global.theme);
    const isRTL = useSelector((state: RootState) => state.global.isRTL);

    const { t } = useTranslation();

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

// const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
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
