import { AUIThemedText } from "@/components/common/AUIThemedText";
import { APP_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT, GLOBAL_TRANSLATION_LABEL } from "@/constants/Properties";
import { removeUserData } from "@/constants/RNAsyncStore";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Asset } from "expo-asset";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Switch, TouchableOpacity, View } from "react-native";
import AUIImage from "./AUIImage";
import { AUIThemedView } from "./AUIThemedView";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

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
    const { t, i18n } = useTranslation();
    const isRTL = useSelector((state: RootState) => state.global.isRTL);
    const [isThemeEnabled, setIsEnabled] = useState(false);
    const router = useRouter();
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
    const { name } = useSelector((state: RootState) => state.global.user);

    const onLogout = () => {
        removeUserData();
        router.push({ pathname: "/" });
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
                        <AUIImage
                            path={
                                Asset.fromModule(
                                    require("@/assets/images/user.png")

                                    // "https://linguest-assets-dev.s3.ap-south-1.amazonaws.com/1718884990288-6296.jpeg"
                                ).uri
                            }
                            style={styles.avatar}
                        />
                        <View style={styles.nameContainer}>
                            <AUIThemedText style={styles.name}>{`${t(
                                GLOBAL_TRANSLATION_LABEL.hii
                            )} ${name}`}</AUIThemedText>
                            <AUIThemedText style={styles.welcome}>
                                {t(GLOBAL_TRANSLATION_LABEL.welcome_back)}
                            </AUIThemedText>
                        </View>
                    </View>
                </AUIThemedView>
                {/* </AUIBackgroundImage> */}
                <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View
                style={{
                    borderTopWidth: 1,
                    borderTopColor: "#ccc",
                    // backgroundColor: colors.cardbackground,
                }}
            >
                <AUIThemedView style={styles.switchTextContainer}>
                    <Switch
                        trackColor={{ false: "#767577", true: APP_THEME.primary.first }}
                        thumbColor={"#ffffff"}
                        ios_backgroundColor={APP_THEME.ternary.first}
                        onValueChange={toggleSwitch}
                        value={isThemeEnabled}
                        style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
                    />
                    <AUIThemedText
                        style={{
                            fontSize: 15,
                            marginLeft: 5,
                            fontFamily: "GilroyMedium",
                        }}
                    >
                        {t(GLOBAL_TRANSLATION_LABEL.darkMode)}
                    </AUIThemedText>
                </AUIThemedView>
            </View>
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
                <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
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
        // paddingTop: 18,
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
        // marginBottom: 10,
    },
    nameContainer: {
        paddingTop: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        flexWrap: "wrap",
        color: APP_THEME.primary.first,
        // color: APP_THEME.ternary.first,
    },
    welcome: {
        fontSize: 15,
        color: APP_THEME.gray,
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
    separator: {
        height: 1,
        backgroundColor: APP_THEME.primary.first,
        marginHorizontal: 20,
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
        backgroundColor: APP_THEME.primary.first,
        // marginHorizontal: 20,
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
    preferences: {
        fontSize: 16,
        color: APP_THEME.gray,
        paddingTop: 10,
        fontWeight: "500",
        paddingLeft: 12,
    },
    switchText: {
        fontSize: 17,
        color: "",
        paddingTop: 10,
        fontWeight: "bold",
    },
});

export default AUIDrawerContent;
