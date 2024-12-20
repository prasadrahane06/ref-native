import { AUIThemedText } from "@/components/common/AUIThemedText";
import { APP_THEME, BACKGROUND_THEME, TEXT_THEME } from "@/constants/Colors";
import { GLOBAL_TRANSLATION_LABEL } from "@/constants/Properties";
import { clearAllData, storeUserData } from "@/constants/RNAsyncStore";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { logout, setTheme } from "@/redux/globalSlice";
import { RootState } from "@/redux/store";
import { FontAwesome } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Asset } from "expo-asset";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Switch, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AUIImage from "./AUIImage";
import AUILangToggle from "./AUILangToggle";
import { AUIThemedView } from "./AUIThemedView";
import appJson from "@/app.json";

//interface
export interface DrawerItem {
    label: string;
    iconPath: any;
    navigateTo: string;
}

export interface DrawerProps {
    isLoggedIn: boolean;
    user: {
        name: string;
        avatarUrl: string;
    };
    items: DrawerItem[];
    onLogout: () => void;
    school?: boolean;
}

const AUIDrawerContent = (props: any) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const globalState = useLangTransformSelector((state: RootState) => state.global);
    const theme = useSelector((state: RootState) => state.global.theme);
    const isDarkMode = useLangTransformSelector(
        (state: RootState) => state.global.theme === "dark"
    );
    const data = useLangTransformSelector((state: RootState) => state.global.user);
    const mySchoolDetails = useLangTransformSelector(
        (state: RootState) => state.api.MySchoolDetails
    );
    const userProfileData = useLangTransformSelector(
        (state: RootState) => state.api.userProfileData
    );

    const name = data?.name;
    const gender = data?.gender;
    const type = data?.type;
    const isRTL = globalState.isRTL;

    const toggleSwitch = async () => {
        const newDarkModeState = !isDarkMode;
        const newTheme = newDarkModeState ? "dark" : "light";
        dispatch(setTheme(newTheme));
        await storeUserData("@theme", { darkMode: newDarkModeState });
    };

    const onLogout = () => {
        clearAllData();
        dispatch(logout());
        router.replace({ pathname: "/" });
    };

    return (
        <AUIThemedView style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{
                    marginTop: -55,
                    zIndex: 10,
                }}
            >
                <AUIThemedView style={styles.header}>
                    <View
                        style={[styles.avatarContainer, isRTL && { flexDirection: "row-reverse" }]}
                    >
                        {type === "student" ? (
                            <AUIImage
                                path={
                                    userProfileData?.photo
                                        ? userProfileData?.photo
                                        : gender === "Male"
                                        ? Asset.fromModule(
                                              require("@/assets/images/local/user.png")
                                          )
                                        : Asset.fromModule(
                                              require("@/assets/images/local/female.png")
                                          )
                                }
                                style={styles.avatar}
                            />
                        ) : (
                            <AUIImage
                                path={
                                    mySchoolDetails?.logo
                                        ? mySchoolDetails?.logo
                                        : Asset.fromModule(
                                              require("@/assets/images/local/sclogo.png")
                                          )
                                }
                                style={styles.avatar}
                            />
                        )}

                        <View style={styles.nameContainer}>
                            <AUIThemedText
                                style={[styles.name, { color: APP_THEME[theme].primary.first }]}
                                numberOfLines={2}
                            >{`${t(GLOBAL_TRANSLATION_LABEL.hii)} ${name}`}</AUIThemedText>
                            <AUIThemedText
                                style={[styles.welcome, { color: TEXT_THEME[theme].primary }]}
                            >
                                {t(GLOBAL_TRANSLATION_LABEL.welcome_back)}
                            </AUIThemedText>
                        </View>
                    </View>
                </AUIThemedView>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: BACKGROUND_THEME[theme].background,
                        paddingTop: 10,
                    }}
                >
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <AUIThemedText
                style={[styles.versionText, { color: isDarkMode ? "#f4f3f4" : "black" }]}
            >
                v {appJson.expo.version}
            </AUIThemedText>
            <View
                style={{
                    borderTopWidth: 1,
                    borderTopColor: "#ccc",
                    // backgroundColor: colors.cardbackground,
                }}
            >
                <AUIThemedView style={styles.switchTextContainer}>
                    <Switch
                        trackColor={{ false: "#767577", true: APP_THEME.light.primary.first }}
                        thumbColor={isDarkMode ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor={APP_THEME.light.ternary.first}
                        onValueChange={toggleSwitch}
                        value={isDarkMode}
                        style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
                    />
                    <AUIThemedText
                        style={{
                            fontSize: 15,
                            marginLeft: 5,
                        }}
                    >
                        {t(GLOBAL_TRANSLATION_LABEL.darkMode)}
                    </AUIThemedText>
                </AUIThemedView>
            </View>

            <View
                style={{
                    borderTopWidth: 1,
                    borderTopColor: "#ccc",
                }}
            >
                {type === "student" && (
                    <AUIThemedView style={styles.switchTextContainer}>
                        <AUILangToggle />
                    </AUIThemedView>
                )}
            </View>
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
                <TouchableOpacity
                    style={[
                        styles.logoutButton,
                        { backgroundColor: APP_THEME[theme].primary.first },
                    ]}
                    onPress={onLogout}
                >
                    <FontAwesome name="sign-out" style={styles.logOutIcon} />

                    <AUIThemedText style={styles.logoutText}>
                        {t(GLOBAL_TRANSLATION_LABEL.logout)}
                    </AUIThemedText>
                </TouchableOpacity>
            </View>
        </AUIThemedView>
    );
};

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    closeButton: {
        alignSelf: "flex-end",
        marginRight: 20,
    },
    menuItemMainContainer: {
        justifyContent: "center",
    },
    header: {
        // alignItems: "center",
        justifyContent: "flex-end",
        height: 200,
        backgroundColor: "rgba(91, 216, 148, 0.2)",
        paddingBottom: 15,
        // borderRadius: 16,
        // boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    },
    avatarContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 20,
        paddingHorizontal: 10,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    nameContainer: {
        paddingTop: 10,
        width: "55%",
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        // color: APP_THEME.ternary.first,
    },
    welcome: {
        fontSize: 15,
        fontWeight: "bold",
        // color: APP_THEME.gray,
    },
    menuItemContainer: {
        marginTop: 20,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    menuIcon: {
        fontSize: 25,
        marginRight: 20,
    },
    menuText: {
        fontSize: 16,
        paddingLeft: 15,
    },
    buttonsMainContainer: {
        position: "absolute",
        bottom: 50,
        left: "10%",
        right: "10%",
    },
    logoutButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
    },
    logOutIcon: {
        fontSize: 20,
        marginRight: 10,
        color: "white",
    },
    logoutText: {
        fontSize: 16,
        color: "white",
    },
    versionText: {
        fontSize: 12,
        color: "black",
        padding: 20,
        textAlign: "right",
    },
    signUpLiginButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
    },
    signUplogInButton: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: "#3498DB",
        borderRadius: 5,
    },
    signUpText: {
        fontSize: 16,
        color: "white",
    },
    schoolName: {
        textAlign: "center",
        // paddingTop: 10,
        fontSize: 12,
        color: "#9DA1AC",
        width: 200,
    },
    userAvatar: {
        height: 67.5,
        width: 67.5,
        borderRadius: 40,
        marginBottom: 10,
        marginTop: 30,
    },
    switchTextContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 7,
        paddingVertical: 10,
    },
    switchText: {
        fontSize: 17,
        color: "",
        paddingTop: 10,
        fontWeight: "bold",
    },
});

export default AUIDrawerContent;
