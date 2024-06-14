import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME, COLOR_THEME, TEXT_THEME } from "@/constants/Colors";
import { RootState, store } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Link, Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider, useSelector } from "react-redux";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
    const [loaded, error] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        ...FontAwesome.font,
    });
    const router = useRouter();
    const segments = useSegments();
    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    const theme = useSelector((state: RootState) => state.global.theme);

    // useEffect(() => {
    //   if (!isLoaded) return;

    //   const inAuthGroup = segments[0] === "(authenticated)";

    //   if (isSignedIn && !inAuthGroup) {
    //     router.replace("/(authenticated)/(tabs)/home");
    //   } else if (!isSignedIn) {
    //     router.replace("/");
    //   }
    // }, [isSignedIn]);

    // if (!loaded || !isLoaded) {
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
                        backgroundColor: COLOR_THEME[theme].backgound,
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
                                color={APP_THEME.ternary.first}
                            />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <Link href={"/help"} asChild>
                            <TouchableOpacity>
                                <Ionicons
                                    name="help-circle-outline"
                                    size={34}
                                    color={APP_THEME.ternary.first}
                                />
                            </TouchableOpacity>
                        </Link>
                    ),
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
                                color={APP_THEME.ternary.first}
                            />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <Link href={"/help"} asChild>
                            <TouchableOpacity>
                                <Ionicons
                                    name="help-circle-outline"
                                    size={34}
                                    color={APP_THEME.ternary.first}
                                />
                            </TouchableOpacity>
                        </Link>
                    ),
                }}
            />
            <Stack.Screen
                name="help"
                options={{ title: "Help", presentation: "modal" }}
            />
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
                name="(home)/schoolDetails/[id]"
                options={{
                    headerTransparent: true,
                    headerTitle: "",
                    headerLeft: () => (
                        <TouchableOpacity onPress={router.back}>
                            <Ionicons
                                name="arrow-back"
                                size={34}
                                color={"white"}
                            />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={router.back}>
                            <AUIThemedView
                                style={{
                                    backgroundColor: "rgba(91, 216, 148, 0.3)",
                                    borderRadius: 50,
                                    padding: 10,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Ionicons
                                    name="heart"
                                    size={24}
                                    color={APP_THEME.secondary.first}
                                />
                            </AUIThemedView>
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
            </GestureHandlerRootView>
        </Provider>
    );
};
export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";
export default RootLayoutNav;
