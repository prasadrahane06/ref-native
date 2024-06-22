import { APP_THEME, COLOR_THEME, TEXT_THEME } from "@/constants/Colors";
import { RootState, store } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Link, Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import AUILoader from "@/components/common/AUILoader";
import { getUserData, storeUserDeviceData } from "@/constants/RNAsyncStore";
import { AUIThemedView } from "@/components/common/AUIThemedView";

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
    // Inter: require("../assets/fonts/Inter/static/Inter-Regular.ttf"),
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

  const theme = useSelector((state: RootState) => state.global.theme);

  useEffect(() => {
    storeUserDeviceData();

    getUserData().then((data) => {
      if (data && Object.keys(data).length > 0) {
        if (data?.profile === "student") {
          router.replace("/(home)/(student)");
        }
        if (data?.profile === "school") {
          router.replace("/(home)/(school)");
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
        name="(home)/school/AllSchoolsScreen"
        options={{
          headerShown: true,
          title: "Schools",
          headerTitle: "Popular schools",
          headerTransparent: false,
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={"white"} />
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
          headerTransparent: false,
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={"white"} />
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
          headerTransparent: false,
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={"white"} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="(home)/courseDetails/[id]"
        options={{
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="(home)/courseDetails/purchase/index"
        options={{
          headerTitle: "",
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={"#000"} />
            </TouchableOpacity>
          ),
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
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={"white"} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={router.back}>
              <AUIThemedView style={{ backgroundColor: "transparent" }}>
                <Ionicons name="notifications" size={24} color={"white"} />
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
