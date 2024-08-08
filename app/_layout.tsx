import AUILoader from "@/components/common/AUILoader";
import "@/components/i18n/i18n.config";
import { BACKGROUND_THEME, TEXT_THEME } from "@/constants/Colors";
import { getUserData, storeUserDeviceData } from "@/constants/RNAsyncStore";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { setResponse } from "@/redux/apiSlice";
import { setTheme } from "@/redux/globalSlice";
import { RootState, store } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useFonts } from "expo-font";
import { Link, router, Stack, useNavigation } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Pressable, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { Provider, useDispatch, useSelector } from "react-redux";
import { baseURL } from "./services/axiosClient";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
// @ts-ignore
const _XHR = global.originalXMLHttpRequest
    ? // @ts-ignore

      global.originalXMLHttpRequest
    : // @ts-ignore

      global.XMLHttpRequest;

XMLHttpRequest = _XHR;

const InitialLayout = () => {
    const { requestFn } = useApiRequest();
    const { t } = useTranslation();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.global.theme);
    const token = useSelector((state: RootState) => state.global.token);
    const deviceToken = useSelector((state: RootState) => state.global.deviceToken);

    // comment requestUserPermission and useEffect when in development to avoid firbase error
    // and uncomment when building for production

    // const requestUserPermission = async () => {
    //     const authStatus = await messaging().requestPermission();
    //     const enabled =
    //         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //         authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    //     if (enabled) {
    //         console.log("Authorization status:", authStatus);
    //     }
    // };

    // useEffect(() => {
    //     //@ts-ignore
    //     if (requestUserPermission()) {
    //         messaging()
    //             .getToken()
    //             .then((token) => {
    //                 dispatch(setDeviceToken(token));
    //                 console.log("fcm token", token);
    //                 Alert.alert("fcm token", token);
    //             });
    //     } else {
    //         console.log("Permission not granted");
    //     }

    //     // Check if an initial notification is available
    //     messaging()
    //         .getInitialNotification()
    //         .then(async (remoteMessage) => {
    //             if (remoteMessage) {
    //                 console.log("Notification caused app to open from quit state:", remoteMessage);
    //             }
    //         });

    //     // Assume a message-notification contains a "type" property in the data payload of the screen
    //     messaging().onNotificationOpenedApp(async (remoteMessage) => {
    //         console.log("Notification caused app to open from background state:", remoteMessage);
    //     });

    //     // Register background handler
    //     messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    //         console.log("Notification caused app to open from background state:", remoteMessage);
    //     });

    //     const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    //         Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    //     });

    //     return unsubscribe;
    // }, []);

    useEffect(() => {
        // send token to server
        if (token && deviceToken) {
            axios
                .patch(
                    `${baseURL}${API_URL.deviceToken}`,
                    {
                        deviceToken: deviceToken,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((res) => {
                    console.log("API_URL.deviceToken res", res.data);
                    Alert.alert("fcm token send to server", JSON.stringify(res.data));
                })
                .catch((error) => {
                    console.log("Error in sending FCM token to server", error);
                    Alert.alert(
                        "Error in sending FCM token to server",
                        JSON.stringify(error?.response?.data)
                    );
                });
        }
    }, [token, deviceToken]);

    const [loaded, error] = useFonts({
        "Inter-Black": require("../assets/fonts/Inter/static/Inter-Regular.ttf"),
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    useEffect(() => {
        storeUserDeviceData();
        getUserData("@theme").then((data) => {
            //setting theme
            if (data && Object.keys(data).length > 0) {
                if (data?.darkMode === true) {
                    dispatch(setTheme("dark"));
                } else {
                    dispatch(setTheme("light"));
                }
            }
        });
    }, []);

    if (!loaded) {
        return null;
    }

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />

            <Stack.Screen
                name="(home)/(school)"
                options={{
                    headerShown: false,
                    title: "Home",
                    headerTitle: "Home",
                }}
            />
            <Stack.Screen
                name="(home)/(student)"
                options={{
                    headerShown: false,
                    title: "Home",
                    headerTitle: "Home",
                }}
            />

            <Stack.Screen
                name="signup"
                options={{
                    headerTitle: "",
                    headerLeft: () => (
                        <Pressable onPress={router.back}>
                            <Ionicons
                                name="arrow-back"
                                size={34}
                                color={TEXT_THEME[theme].primary}
                            />
                        </Pressable>
                    ),
                    headerStyle: {
                        backgroundColor: BACKGROUND_THEME[theme].background,
                    },
                }}
            />
            <Stack.Screen
                name="login"
                options={{
                    headerTitle: "",
                    headerLeft: () => (
                        <Pressable onPress={router.back}>
                            <Ionicons
                                name="arrow-back"
                                size={34}
                                color={TEXT_THEME[theme].primary}
                            />
                        </Pressable>
                    ),
                    headerRight: () => (
                        <Link href={"/help"} asChild>
                            <TouchableOpacity>
                                <Ionicons
                                    name="help-circle-outline"
                                    size={34}
                                    color={TEXT_THEME[theme].primary}
                                />
                            </TouchableOpacity>
                        </Link>
                    ),
                    headerStyle: {
                        backgroundColor: BACKGROUND_THEME[theme].background,
                    },
                }}
            />
            <Stack.Screen
                name="payment"
                options={{
                    headerTitle: `${t("Payment")}`,
                    headerLeft: () => <TouchableOpacity></TouchableOpacity>,
                    headerTitleStyle: { color: TEXT_THEME[theme].primary },
                    headerStyle: { backgroundColor: BACKGROUND_THEME[theme].background },
                }}
            />
            <Stack.Screen
                name="details"
                options={{
                    headerTitle: "",
                    headerLeft: () => (
                        <Pressable onPress={router.back}>
                            <Ionicons
                                name="arrow-back"
                                size={34}
                                color={TEXT_THEME[theme].primary}
                            />
                        </Pressable>
                    ),
                    headerRight: () => (
                        <Link href={"/help"} asChild>
                            <TouchableOpacity>
                                <Ionicons
                                    name="help-circle-outline"
                                    size={34}
                                    color={TEXT_THEME[theme].primary}
                                />
                            </TouchableOpacity>
                        </Link>
                    ),
                }}
            />

            <Stack.Screen
                name="schooldetails"
                options={{
                    headerTitle: "",
                    headerLeft: () => (
                        <Pressable onPress={router.back}>
                            <Ionicons
                                name="arrow-back"
                                size={34}
                                color={TEXT_THEME[theme].primary}
                            />
                        </Pressable>
                    ),
                    headerRight: () => (
                        <Link href={"/help"} asChild>
                            <TouchableOpacity>
                                <Ionicons
                                    name="help-circle-outline"
                                    size={34}
                                    color={TEXT_THEME[theme].primary}
                                />
                            </TouchableOpacity>
                        </Link>
                    ),
                }}
            />

            <Stack.Screen
                name="help"
                options={{
                    title: "Help",
                    headerTitle: `${t("help")}`,
                    headerTitleStyle: { color: TEXT_THEME[theme].primary, fontWeight: "bold" },
                    headerStyle: { backgroundColor: BACKGROUND_THEME[theme].background },
                    headerLeft: () => (
                        <Ionicons
                            name="arrow-back"
                            size={27}
                            color={TEXT_THEME[theme].primary}
                            style={{ marginRight: 20 }}
                            onPress={() => router.back()}
                        />
                    ),
                }}
            />

            <Stack.Screen
                name="transactions"
                options={{
                    title: "Transactions",
                    headerTitle: `${t("transactions")}`,
                    headerTitleStyle: { color: TEXT_THEME[theme].primary, fontWeight: "bold" },
                    headerStyle: { backgroundColor: BACKGROUND_THEME[theme].background },
                    headerLeft: () => (
                        <Ionicons
                            name="arrow-back"
                            size={27}
                            color={TEXT_THEME[theme].primary}
                            style={{ marginRight: 20 }}
                            onPress={() => router.back()}
                        />
                    ),
                }}
            />

            <Stack.Screen
                name="(home)/compare/searchSchool"
                options={{
                    headerShown: true,
                    title: "search_school",
                    headerTitle: `${t("add_to_compare")}`,
                    headerTitleStyle: { color: TEXT_THEME[theme].primary, fontWeight: "bold" },
                    headerStyle: { backgroundColor: BACKGROUND_THEME[theme].background },
                    headerLeft: () => (
                        <TouchableOpacity onPress={router.back}>
                            <Ionicons
                                name="arrow-back"
                                size={27}
                                color={TEXT_THEME[theme].primary}
                                style={{ marginRight: 20 }}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name="(home)/compare/compareSchools"
                options={{
                    headerShown: true,
                    title: "compare school",
                    headerTitle: `${t("compare_schools")}`,
                    headerTitleStyle: { color: TEXT_THEME[theme].primary, fontWeight: "bold" },
                    headerStyle: { backgroundColor: BACKGROUND_THEME[theme].background },
                    headerLeft: () => (
                        <Ionicons
                            name="arrow-back"
                            size={27}
                            color={TEXT_THEME[theme].primary}
                            style={{ marginRight: 20 }}
                            onPress={() => {
                                dispatch(setResponse({ storeName: "compareSchool1", data: null }));
                                dispatch(setResponse({ storeName: "compareSchool2", data: null }));
                                //@ts-ignore
                                navigation.navigate("compare");
                            }}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="(home)/school/AllSchoolsScreen"
                options={{
                    headerShown: true,
                    title: "Schools",
                    headerTitle: `${t("popular_schools")}`,
                    headerTitleStyle: { color: "#fff", fontWeight: "bold" },
                    headerTransparent: true,
                    headerLeft: () => (
                        <TouchableOpacity onPress={router.back}>
                            <Ionicons
                                name="arrow-back"
                                size={27}
                                color="#fff"
                                style={{ marginRight: 20 }}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />

            <Stack.Screen
                name="(home)/course/AllCoursesScreen"
                options={{
                    headerShown: true,
                    title: "Courses",
                    headerTitle: `${t("popular_course")}`,
                    headerTitleStyle: { color: "#ffffff", fontWeight: "bold" },
                    headerTransparent: true,
                    headerLeft: () => (
                        <TouchableOpacity onPress={router.back}>
                            <Ionicons
                                name="arrow-back"
                                size={27}
                                color="#fff"
                                style={{ marginRight: 20 }}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name="(home)/courseDetails/purchase/[id]"
                options={{
                    headerTitle: "Purchase Course",
                    headerShown: true,
                    headerLeft: () => (
                        <TouchableOpacity onPress={router.back}>
                            <Ionicons
                                name="arrow-back"
                                size={34}
                                color={TEXT_THEME[theme].primary}
                            />
                        </TouchableOpacity>
                    ),
                    headerTitleStyle: { color: TEXT_THEME[theme].primary, fontWeight: "bold" },
                    headerStyle: { backgroundColor: BACKGROUND_THEME[theme].background },
                }}
            />
            <Stack.Screen
                name="(home)/schoolDetails/[id]"
                options={{
                    headerTitle: "",
                    headerLeft: () => (
                        <Ionicons
                            name="arrow-back"
                            size={27}
                            color={"#fff"}
                            style={{ marginRight: 10 }}
                            onPress={() => {
                                dispatch(
                                    setResponse({ storeName: "individualSchool", data: null })
                                );
                                router.back();
                            }}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="(home)/cityDetails/[id]"
                options={{
                    headerTitle: "",
                    headerLeft: () => (
                        <Ionicons
                            name="arrow-back"
                            size={27}
                            color={"#fff"}
                            style={{ marginRight: 10 }}
                            onPress={() => {
                                dispatch(
                                    setResponse({ storeName: "individualCountry", data: null })
                                );
                                dispatch(setResponse({ storeName: "countrySchool", data: null }));
                                router.back();
                            }}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="(home)/courseDetails/[id]"
                options={{
                    headerTitle: "",
                    headerLeft: () => (
                        <Ionicons
                            name="arrow-back"
                            size={27}
                            color={"#fff"}
                            style={{ marginRight: 10 }}
                            onPress={() => {
                                dispatch(
                                    setResponse({ storeName: "individualCourse", data: null })
                                );
                                router.back();
                            }}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="profile"
                options={{
                    headerTitle: `${t("profile")}`,
                    headerTitleStyle: { color: TEXT_THEME[theme].primary, fontWeight: "bold" },
                    headerStyle: { backgroundColor: BACKGROUND_THEME[theme].background },
                    headerLeft: () => (
                        <TouchableOpacity onPress={router.back}>
                            <Ionicons
                                name="arrow-back"
                                size={27}
                                color={TEXT_THEME[theme].primary}
                                style={{ marginRight: 20 }}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />

            <Stack.Screen
                name="changeNumberEmail"
                options={{
                    headerTitle: "",
                    headerTitleStyle: { color: TEXT_THEME[theme].primary, fontWeight: "bold" },
                    headerStyle: { backgroundColor: BACKGROUND_THEME[theme].background },

                    headerLeft: () => (
                        <TouchableOpacity onPress={router.back}>
                            <Ionicons
                                name="arrow-back"
                                size={27}
                                color={TEXT_THEME[theme].primary}
                                style={{ marginRight: 20 }}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />

            <Stack.Screen
                name="schoolProfile"
                options={{
                    headerTitle: `${t("school_profile")}`,
                    headerTitleStyle: { color: TEXT_THEME[theme].primary, fontWeight: "bold" },
                    headerStyle: { backgroundColor: BACKGROUND_THEME[theme].background },
                    headerBackVisible: false,
                    headerLeft: () => (
                        <TouchableOpacity onPress={router.back}>
                            <Ionicons
                                name="arrow-back"
                                size={25}
                                color={TEXT_THEME[theme].primary}
                                style={{ marginRight: 20 }}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name="(home)/ratingsAndReview/AUIRatingsAndReview"
                options={{
                    headerShown: true,
                    title: "",
                    headerTitle: "Ratings and review",
                    headerTitleStyle: { color: "black", fontWeight: "bold" },
                    headerTransparent: false,
                    headerLeft: () => (
                        <TouchableOpacity onPress={router.back}>
                            <Ionicons name="arrow-back" size={34} color={"black"} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name="(home)/studentInfo/[id]"
                options={{
                    headerShown: true,
                    title: "",
                    headerTitle: `${t("student_information")}`,
                    headerTitleStyle: { color: TEXT_THEME[theme].primary, fontWeight: "bold" },
                    headerStyle: {
                        backgroundColor: BACKGROUND_THEME[theme].background,
                    },
                    headerBackVisible: false,
                    headerLeft: () => (
                        <TouchableOpacity onPress={router.back}>
                            <Ionicons
                                name="arrow-back"
                                size={25}
                                color={TEXT_THEME[theme].primary}
                                style={{ marginRight: 20 }}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name="(home)/AddNewCourse/AddCourse"
                options={{
                    headerShown: true,
                    headerLeft: () => (
                        <TouchableOpacity onPress={router.back}>
                            <Ionicons
                                name="arrow-back"
                                size={25}
                                color={TEXT_THEME[theme].primary}
                                style={{ marginRight: 20 }}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Stack>
    );
};

const RootLayoutNav = () => {
    return (
        <Provider store={store}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <StatusBar style="light" />
                <InitialLayout />
                <Toast />
                <AUILoader />
            </GestureHandlerRootView>
        </Provider>
    );
};
export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary
} from "expo-router";
export default RootLayoutNav;
