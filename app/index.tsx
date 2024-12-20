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
import useApiRequest from "@/customHooks/useApiRequest";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { setProfile, setSignInType, setToken, setUser } from "@/redux/globalSlice";
import { RootState } from "@/redux/store";
import { Asset } from "expo-asset";
import { router } from "expo-router";
import { useEffect } from "react";
import { I18nManager, Platform, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "@/constants/urlProperties";

const InitialPage = () => {
    const dispatch = useDispatch();
    const profile = useLangTransformSelector((state: RootState) => state.global.profile);
    const userData = useLangTransformSelector((state: RootState) => state.global.user);
    const theme = useSelector((state: RootState) => state.global.theme);
    const isRTL = useSelector((state: RootState) => state.global.isRTL);

    const { requestFn } = useApiRequest();

    useEffect(() => {
        // This is to update transactions details on my courses
        if (profile === "student" && userData && userData?._id) {
            requestFn(API_URL.paymentDetails, "paymentDetails", { user: userData?._id });
        }
    }, [userData, profile]);

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
    if (isRTL) {
        I18nManager.forceRTL(true);
    } else {
        I18nManager.forceRTL(false);
    }
    const navigateToLogin = () => {
        dispatch(setSignInType("exist"));
        router.push("/login");
    };
    const navigateToSignup = () => {
        dispatch(setSignInType("new"));
        router.push("/signup");
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
                                              require("@/assets/images/local/fi_3135773.png")
                                          )
                                        : Asset.fromModule(
                                              require("@/assets/images/local/student.png")
                                          )
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
                                              require("@/assets/images/local/school_white.png")
                                          )
                                        : Asset.fromModule(
                                              require("@/assets/images/local/school.png")
                                          )
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
                            path={Asset.fromModule(require("@/assets/images/local/home_dark.png"))}
                        />
                    ) : (
                        <AUIImage
                            path={Asset.fromModule(require("@/assets/images/local/home_light.png"))}
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
