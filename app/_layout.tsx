import AUILoader from "@/components/common/AUILoader";
import "@/components/i18n/i18n.config";
import { APP_THEME, BACKGROUND_THEME, TEXT_THEME } from "@/constants/Colors";
import { getUserData, storeUserDeviceData } from "@/constants/RNAsyncStore";
import { setDeviceToken, setTheme } from "@/redux/globalSlice";
import { RootState, store } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import messaging from "@react-native-firebase/messaging";
import { useFonts } from "expo-font";
import { Link, Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Alert, Pressable, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { Provider, useDispatch, useSelector } from "react-redux";
import useAxios from "./services/axiosClient";
import { API_URL } from "@/constants/urlProperties";
import { setResponse } from "@/redux/apiSlice";

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
    const { post } = useAxios();
    const dispatch = useDispatch();

    const theme = useSelector((state: RootState) => state.global.theme);

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

    //                 // send token to server
    //                 // post(API_URL.login, {
    //                 //     fcmToken: token,
    //                 // })
    //                 //     .then((res) => {
    //                 //         Alert.alert("fcm token send to server", token);
    //                 //     })
    //                 //     .catch((error) => {
    //                 //         console.log("res", error);
    //                 //         Alert.alert("error in sending fcm token to server", token);
    //                 //     });
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

    const [loaded, error] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        Inter: require("../assets/fonts/Inter/static/Inter-Regular.ttf"),
        Gilroy: require("../assets/fonts/gilroy/Gilroy-Black.ttf"),
        GilroyMedium: require("../assets/fonts/gilroy/Gilroy-Medium.ttf"),
        GilroyLight: require("../assets/fonts/gilroy/Gilroy-Light.ttf"),
        ...FontAwesome.font,
    });
    const router = useRouter();
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

            <Stack.Screen name="help" options={{ title: "Help", presentation: "modal" }} />
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
                name="(home)/compare/searchSchool"
                options={{
                    headerShown: true,
                    title: "search_school",
                    headerTitle: "Add to compare",
                    headerTitleStyle: { color: TEXT_THEME[theme].primary },
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
                    headerTitle: "Compare Schools",
                    headerTitleStyle: { color: TEXT_THEME[theme].primary },
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
                name="(home)/school/AllSchoolsScreen"
                options={{
                    headerShown: true,
                    title: "Schools",
                    headerTitle: "Popular schools",
                    headerTitleStyle: { color: "#fff", fontFamily: "Gilroy" },
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
                    headerTitle: "Popular Courses",
                    headerTitleStyle: { color: "#ffffff", fontFamily: "Gilroy" },
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
                    headerTitleStyle: { color: TEXT_THEME[theme].primary },
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
                    headerTitle: "My Profile",
                    headerTitleStyle: { color: TEXT_THEME[theme].primary },
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
                    headerTitle: "School Profile",
                    headerTitleStyle: { color: TEXT_THEME[theme].primary },
                    headerStyle: { backgroundColor: BACKGROUND_THEME[theme].background },
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
                    headerTitleStyle: { color: "black", fontFamily: "Gilroy" },
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
                    headerTitle: "Student Information",
                    headerTitleStyle: { color: TEXT_THEME[theme].primary },
                    headerStyle: {
                        backgroundColor: BACKGROUND_THEME[theme].background,
                    },
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
    ErrorBoundary,
} from "expo-router";
export default RootLayoutNav;
