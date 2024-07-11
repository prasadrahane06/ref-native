import AUILoader from "@/components/common/AUILoader";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME, BACKGOUND_THEME, TEXT_THEME } from "@/constants/Colors";
import { getUserData, removeUserData, storeUserDeviceData } from "@/constants/RNAsyncStore";
import { setToken, setUser } from "@/redux/globalSlice";
import { RootState, store } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Link, Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { Provider, useDispatch, useSelector } from "react-redux";
import "@/components/i18n/i18n.config";
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

    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.global.theme);

    useEffect(() => {
        storeUserDeviceData();
        getUserData().then((data) => console.log(data));
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
                        <TouchableOpacity onPress={router.back}>
                            <Ionicons
                                name="arrow-back"
                                size={34}
                                color={TEXT_THEME[theme].primary}
                            />
                        </TouchableOpacity>
                    ),
                    headerStyle: {
                        backgroundColor: BACKGOUND_THEME[theme].backgound,
                    },
                }}
            />
            <Stack.Screen
                name="login"
                options={{
                    headerTitle: "",
                    headerLeft: () => (
                        <TouchableOpacity onPress={router.back}>
                            <Ionicons
                                name="arrow-back"
                                size={34}
                                color={theme === "light" ? "#000" : "#fff"}
                            />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <Link href={"/help"} asChild>
                            <TouchableOpacity>
                                <Ionicons
                                    name="help-circle-outline"
                                    size={34}
                                    color={theme === "light" ? "#000" : "#fff"}
                                />
                            </TouchableOpacity>
                        </Link>
                    ),
                    headerStyle: {
                        backgroundColor: BACKGOUND_THEME[theme].backgound,
                    },
                }}
            />
            <Stack.Screen
                name="details"
                options={{
                    headerTitle: "",
                    headerLeft: () => (
                        <TouchableOpacity onPress={router.back}>
                            <Ionicons
                                name="arrow-back"
                                size={34}
                                color={APP_THEME.light.ternary.first}
                            />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <Link href={"/help"} asChild>
                            <TouchableOpacity>
                                <Ionicons
                                    name="help-circle-outline"
                                    size={34}
                                    color={APP_THEME.light.ternary.first}
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
                    headerStyle: { backgroundColor: BACKGOUND_THEME[theme].backgound },
                }}
            />
            <Stack.Screen
                name="(home)/compare/compareSchools"
                options={{
                    headerShown: true,
                    title: "compare school",
                    headerTitle: "Compare Schools",
                    headerTitleStyle: { color: TEXT_THEME[theme].primary },
                    headerStyle: { backgroundColor: BACKGOUND_THEME[theme].backgound },
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
                            <Ionicons name="arrow-back" size={34} color={"#fff"} />
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
                            <Ionicons name="arrow-back" size={34} color={"white"} />
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
                            <Ionicons name="arrow-back" size={34} color={"#000"} />
                        </TouchableOpacity>
                    ),
                    headerTitleStyle: { color: TEXT_THEME[theme].primary },
                    headerStyle: { backgroundColor: BACKGOUND_THEME[theme].backgound },
                }}
            />
            <Stack.Screen
                name="(home)/schoolDetails/[id]"
                options={{
                    headerTitle: "",
                }}
            />
            <Stack.Screen
                name="(home)/cityDetails/[id]"
                options={{
                    headerTitle: "",
                }}
            />
            <Stack.Screen
                name="(home)/courseDetails/[id]"
                options={{
                    headerTitle: "",
                }}
            />
            <Stack.Screen
                name="profile"
                options={{
                    headerTitle: "My Profile",
                    headerTitleStyle: { color: TEXT_THEME[theme].primary },
                    headerStyle: { backgroundColor: BACKGOUND_THEME[theme].backgound },
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
