import AUIButton from "@/components/common/AUIButton";
import AUIImage from "@/components/common/AUIImage";
import { AUILinearGradient } from "@/components/common/AUILinearGradient";
import { AUISafeAreaView } from "@/components/common/AUISafeAreaView";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME, BACKGROUND_THEME, TEXT_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { getUserData } from "@/constants/RNAsyncStore";
import { initialPageStyles } from "@/constants/Styles";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { setProfile, setSignInType, setToken, setUser } from "@/redux/globalSlice";
import { RootState } from "@/redux/store";
import { Asset } from "expo-asset";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Platform, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const InitialPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const profile = useLangTransformSelector((state: RootState) => state.global.profile);
    const theme = useSelector((state: RootState) => state.global.theme);

    useEffect(() => {
        getUserData("@user-data").then((data) => {
            if (data && Object.keys(data).length > 0) {
                if (data?.type === "student") {
                    // saving token in redux
                    dispatch(setToken(data?.accessToken));

                    // saving user in redux
                    dispatch(setUser(data));

                    router.replace("/(home)/(student)");
                }
                if (data?.profile === "school") {
                    dispatch(setToken(data?.accessToken));

                    // saving user in redux
                    dispatch(setUser(data));

                    router.replace("/(home)/(school)");
                }
            }
        });
    }, []);
    const navigateToLogin = () => {
        dispatch(setSignInType("exist"));
        router.navigate("/login");
    };
    const navigateToSignup = () => {
        dispatch(setSignInType("new"));
        router.navigate("/signup");
    };
    return (
        <AUISafeAreaView
        // edges={["bottom"]}
        >
            <AUIThemedView style={initialPageStyles.container}>
                <AUILinearGradient
                    style={
                        Platform.OS === "ios"
                            ? initialPageStyles.iosIndexHeader
                            : initialPageStyles.indexHeader
                    }
                >
                    <AUIThemedText
                        style={
                            Platform.OS === "ios"
                                ? [initialPageStyles.iosTitle, { color: "#fff" }]
                                : [initialPageStyles.title, { color: "#fff" }]
                        }
                    >
                        {GLOBAL_TEXT.create_your_profile}
                    </AUIThemedText>
                </AUILinearGradient>

                <AUIThemedView style={initialPageStyles.optionContainer}>
                    <TouchableOpacity onPress={() => dispatch(setProfile("student"))}>
                        <AUILinearGradient
                            style={[
                                initialPageStyles.circularViewPosition,
                                {
                                    borderColor: APP_THEME[theme].primary.first,
                                    borderWidth: 5,
                                },
                            ]}
                            locations={[0, 1]}
                            colors={
                                profile === "student"
                                    ? [
                                          APP_THEME[theme].primary.first,
                                          APP_THEME[theme].primary.first,
                                      ]
                                    : [
                                          BACKGROUND_THEME[theme].background,
                                          BACKGROUND_THEME[theme].background,
                                      ]
                            }
                        >
                            <AUIImage
                                icon
                                path={
                                    profile === "student"
                                        ? Asset.fromModule(
                                              require("@/assets/images/initialPage/fi_3135773.png")
                                          ).uri
                                        : Asset.fromModule(
                                              require("@/assets/images/initialPage/student.png")
                                          ).uri
                                }
                            />

                            <AUIThemedText
                                style={[
                                    initialPageStyles.optionLabel,
                                    {
                                        color:
                                            profile === "student"
                                                ? "#fff"
                                                : APP_THEME[theme].primary.first,
                                    },
                                ]}
                            >
                                {GLOBAL_TEXT.student}
                            </AUIThemedText>
                        </AUILinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => dispatch(setProfile("school"))}>
                        <AUILinearGradient
                            style={[
                                initialPageStyles.circularViewPosition,
                                {
                                    borderColor: APP_THEME[theme].primary.first,
                                    borderWidth: 5,
                                },
                            ]}
                            locations={[0, 1]}
                            colors={
                                profile === "school"
                                    ? [
                                          APP_THEME[theme].primary.first,
                                          APP_THEME[theme].primary.first,
                                      ]
                                    : [
                                          BACKGROUND_THEME[theme].background,
                                          BACKGROUND_THEME[theme].background,
                                      ]
                            }
                        >
                            <AUIImage
                                icon
                                path={
                                    profile === "school"
                                        ? Asset.fromModule(
                                              require("@/assets/images/initialPage/school_white.png")
                                          ).uri
                                        : Asset.fromModule(
                                              require("@/assets/images/initialPage/school.png")
                                          ).uri
                                }
                            />

                            <AUIThemedText
                                style={[
                                    initialPageStyles.optionLabel,
                                    {
                                        color:
                                            profile === "school"
                                                ? "#fff"
                                                : APP_THEME[theme].primary.first,
                                    },
                                ]}
                            >
                                {GLOBAL_TEXT.school}
                            </AUIThemedText>
                        </AUILinearGradient>
                    </TouchableOpacity>
                </AUIThemedView>

                <AUIThemedView style={[initialPageStyles.button, { opacity: profile ? 1 : 0 }]}>
                    <AUIButton
                        style={{ width: "45%" }}
                        title="Sign in"
                        selected
                        onPress={profile ? navigateToLogin : () => null}
                    />

                    <Pressable
                        style={buttonStyle.container}
                        onPress={profile ? navigateToSignup : () => null}
                    >
                        <AUIThemedView style={[buttonStyle.buttonInner]}>
                            <AUIThemedText
                                style={[
                                    buttonStyle.buttonText,
                                    { color: TEXT_THEME[theme].primary },
                                ]}
                            >
                                Create Account
                            </AUIThemedText>
                        </AUIThemedView>
                    </Pressable>
                </AUIThemedView>

                <AUIThemedView style={initialPageStyles.imageContainer}>
                    {theme === "dark" ? (
                        <AUIImage
                            path={
                                Asset.fromModule(
                                    require("@/assets/images/initialPage/home_dark.png")
                                ).uri
                            }
                        />
                    ) : (
                        <AUIImage
                            path={
                                Asset.fromModule(
                                    require("@/assets/images/initialPage/home_light.png")
                                ).uri
                            }
                        />
                    )}
                </AUIThemedView>
                <AUIThemedView style={initialPageStyles.bottomLayout} />
            </AUIThemedView>
        </AUISafeAreaView>
    );
};

export default InitialPage;

const buttonStyle = StyleSheet.create({
    container: {
        width: "45%",
    },
    button: {
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    buttonInner: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        borderRadius: 5,
        height: 40,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: APP_THEME.light.primary.first,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
    },
});
