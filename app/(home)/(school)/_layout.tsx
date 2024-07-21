import useAxios from "@/app/services/axiosClient";
import AUIButton from "@/components/common/AUIButton";
import AUIDrawerContent from "@/components/common/AUIDrawerContent";
import AUIInputField from "@/components/common/AUIInputField";
import { AUILinearGradient } from "@/components/common/AUILinearGradient";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { ApiSuccessToast } from "@/components/common/AUIToast";
import HeaderIcons from "@/components/icons/HeaderIcon";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { APP_THEME, BACKGROUND_THEME, TEXT_THEME, ThemeType } from "@/constants/Colors";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Asset } from "expo-asset";
import { Image } from "expo-image";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { Tabs } from "expo-router";
import { default as React, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import schoolProfile from "@/components/screenComponents/schoolProfile";
import {
    Dimensions,
    FlatList,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { useSelector } from "react-redux";
import NotificationDrawer from "../notification/notification";
import { GLOBAL_TRANSLATION_LABEL } from "@/constants/Properties";
import { useTranslation } from "react-i18next";

interface AddEvent {
    visible: boolean;
    onClose: () => void;
}

const Drawer = createDrawerNavigator();

const AddNewEvent: React.FC<AddEvent> = ({ visible, onClose }) => {
    const [image, setImage] = useState<string | null>(null);
    const user = useSelector((state: RootState) => state.global.user);
    const { post } = useAxios();
    const { control, handleSubmit, reset, getValues } = useForm({
        defaultValues: {
            eventName: "",
            description: "",
            eventDate: "",
            location: "",
            eventImage: null,
        },
    });
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

    const handleSave = () => {
        const values = getValues();
        const payload = {
            client: user?.client,
            eventName: values.eventName,
            description: values.description,
            date: selectedDate?.toISOString(),
            location: values.location,
            eventImage: image,
        };
        post(API_URL.event, payload)
            .then((res) => {
                ApiSuccessToast("New Event added successfully.");
                reset();
                onClose();
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const clearFields = () => {
        reset({
            eventName: "",
            description: "",
            eventDate: "",
            location: "",
            eventImage: null,
        });
        setSelectedDate(undefined);
    };

    const handleDateChange = (event: any, date?: Date) => {
        setDatePickerVisible(Platform.OS === "ios");
        if (date) {
            setSelectedDate(date);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const assetUri = result.assets[0].uri;
            const manipResult = await ImageManipulator.manipulateAsync(
                assetUri,
                [{ resize: { width: 500 } }],
                { compress: 0.2, format: ImageManipulator.SaveFormat.JPEG }
            );
            const base64Image = await convertImageToBase64(manipResult.uri);
            setImage(base64Image);
        }
    };

    const convertImageToBase64 = (uri: string) => {
        return new Promise<string>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                const reader = new FileReader();
                reader.onloadend = function () {
                    resolve(reader.result as string);
                };
                reader.readAsDataURL(xhr.response);
            };
            xhr.onerror = function () {
                reject(new Error("Failed to convert image to Base64"));
            };
            xhr.open("GET", uri);
            xhr.responseType = "blob";
            xhr.send();
        });
    };

    const truncateFileName = (fileName: string, maxLength: number) => {
        if (fileName.length <= maxLength) return fileName;
        return fileName.substring(0, maxLength - 3) + "...";
    };

    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <AUIThemedView style={styles.eventModalContainer}>
                <AUIThemedView style={styles.eventModalContent}>
                    <AUIThemedView style={styles.headerRow}>
                        <AUIThemedText style={styles.header}>Add your Event</AUIThemedText>
                        <TouchableOpacity onPress={onClose} style={styles.eventCloseButton}>
                            <MaterialIcons name="close" size={28} />
                        </TouchableOpacity>
                    </AUIThemedView>

                    <Controller
                        control={control}
                        name="eventName"
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <AUIInputField
                                label="Enter Event name"
                                placeholder="Event Name"
                                value={value}
                                onChangeText={onChange}
                                style={styles.input}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="description"
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <AUIInputField
                                label="Enter Event Description"
                                placeholder="Description"
                                value={value}
                                onChangeText={onChange}
                                style={styles.input}
                            />
                        )}
                    />
                    <AUIThemedView>
                        <Controller
                            control={control}
                            name="eventDate"
                            defaultValue=""
                            render={({ field: { onChange, value } }) => (
                                <Pressable onPress={() => setDatePickerVisible(true)}>
                                    <AUIInputField
                                        label="Event Date"
                                        placeholder="Select Date"
                                        value={selectedDate ? selectedDate.toDateString() : ""}
                                        style={styles.input}
                                        editable={false}
                                    />
                                </Pressable>
                            )}
                        />
                        {datePickerVisible && (
                            <DateTimePicker
                                value={selectedDate || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}
                    </AUIThemedView>

                    <Controller
                        control={control}
                        name="location"
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <AUIInputField
                                label="Enter Event Location"
                                placeholder="Event Location"
                                value={value}
                                onChangeText={onChange}
                                style={styles.input}
                            />
                        )}
                    />
                    <AUIThemedText>Select image</AUIThemedText>
                    <AUIThemedView style={styles.imagePickerContainer}>
                        <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
                            <MaterialIcons name="cloud-upload" size={24} color="#5BD894" />
                            <AUIThemedText style={styles.uploadButtonText}>
                                Upload File
                            </AUIThemedText>
                        </TouchableOpacity>
                        <AUIThemedText style={styles.fileName}>
                            {image
                                ? truncateFileName(image.split("/").pop()!, 18)
                                : "No file chosen"}
                        </AUIThemedText>
                    </AUIThemedView>

                    {image && <Image source={{ uri: image }} style={styles.image} />}

                    <AUIThemedView style={styles.buttonContainer}>
                        <AUIButton title="Clear" onPress={clearFields} style={{ width: "48%" }} />
                        <AUIButton
                            title="Save"
                            selected
                            onPress={handleSubmit(handleSave)}
                            style={{ width: "48%" }}
                        />
                    </AUIThemedView>
                </AUIThemedView>
            </AUIThemedView>
        </Modal>
    );
};

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

const EventsScreen = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const eventData = useLangTransformSelector((state: RootState) => state.api.myEvent || {});
    const isRTL = useSelector((state: RootState) => state.global.isRTL || {});
    const [event, setEvent] = useState<event[]>([]);
    const { requestFn } = useApiRequest();

    useEffect(() => {
        requestFn(API_URL.event, "myEvent", { client: true });
    }, []);

    useEffect(() => {
        if (eventData?.docs?.length > 0) {
            setEvent(eventData?.docs);
        }
    }, [eventData?.docs?.length]);

    const handleAddNewEvent = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    // const handleEventAdded = () => {
    //     setModalVisible(false);
    // };
    const renderItem = ({ item }: { item: event }) => (
        <AUIThemedView style={styles.facility}>
            <Image source={{ uri: item.eventImage }} style={styles.image} />
            <AUIThemedText style={styles.name}>
                {typeof item.eventName === "string"
                    ? item?.eventName
                    : isRTL
                    ? item?.eventName?.ar
                    : item?.eventName?.en}
            </AUIThemedText>
        </AUIThemedView>
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
            <AddNewEvent visible={isModalVisible} onClose={handleCloseModal} />
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
    input: { marginBottom: 10 },
    buttonContainer: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    AddEventButton: {
        marginHorizontal: 15,
    },
    eventModalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    eventModalContent: {
        width: "90%",
        borderRadius: 10,
        padding: 20,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    eventCloseButton: {},
    header: {
        fontSize: 20,
        fontWeight: "bold",
    },
    imagePickerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        borderWidth: 2,
        borderColor: APP_THEME.light.lightGray,
        borderRadius: 5,
        padding: 10,
    },
    uploadButton: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 10,
    },
    uploadButtonText: {
        marginLeft: 5,
        color: APP_THEME.light.primary.first,
    },
    fileName: {},
    image: {
        width: 60,
        height: 60,
        marginTop: 10,
    },
    facility: {
        flex: 1,
        alignItems: "center",
        marginHorizontal: 5,
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
