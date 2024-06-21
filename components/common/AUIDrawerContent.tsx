import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { APP_THEME } from "@/constants/Colors";
import AUIImage from "./AUIImage";
import { Asset } from "expo-asset";
import { AUIThemedView } from "./AUIThemedView";
import { GLOBAL_TEXT } from "@/constants/Properties";

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

const AUIDrawerContent: React.FC<DrawerProps & DrawerContentComponentProps> = ({
    isLoggedIn,
    user,
    items,
    onLogout,
    navigation,
    school,
}) => {
    return (
        <AUIThemedView style={styles.drawerContent}>
            <TouchableOpacity
                style={styles.closeButton}
                onPress={() => navigation.closeDrawer()}
            >
                <Ionicons name="close" size={30} color="black" />
            </TouchableOpacity>
            <AUIThemedView style={styles.menuItemMainContainer}>
                <AUIThemedView style={styles.header}>
                    <Image
                        source={{ uri: user.avatarUrl }}
                        style={styles.avatar}
                    />
                    <AUIThemedText style={styles.name}>
                        {user.name}
                    </AUIThemedText>
                    {school && (
                        <AUIThemedView>
                            <AUIThemedView style={styles.separator} />
                            <AUIThemedText style={styles.schoolName}>
                                Gunnersbury House , 1 Chapel Hill, London, A11
                                B12
                            </AUIThemedText>
                        </AUIThemedView>
                    )}
                </AUIThemedView>
                <AUIThemedView style={styles.menuItemContainer}>
                    {items.map((item, index) => (
                        <React.Fragment key={index}>
                            {school && (
                                <AUIThemedView style={styles.separator} />
                            )}
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={() =>
                                    navigation.navigate(item.navigateTo)
                                }
                            >
                                <AUIImage
                                    path={item.iconPath}
                                    style={{ width: 26, height: 30 }}
                                />

                                <AUIThemedText style={styles.menuText}>
                                    {item.label}
                                </AUIThemedText>
                            </TouchableOpacity>
                            <AUIThemedView style={styles.separator} />
                        </React.Fragment>
                    ))}
                </AUIThemedView>
            </AUIThemedView>
            <AUIThemedView style={styles.buttonsMainContainer}>
                {isLoggedIn ? (
                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={onLogout}
                    >
                        <FontAwesome
                            name="sign-out"
                            style={styles.logOutIcon}
                        />
                        <AUIThemedText style={styles.logoutText}>
                            {GLOBAL_TEXT.logout}
                        </AUIThemedText>
                    </TouchableOpacity>
                ) : (
                    <AUIThemedView style={styles.signUpLiginButtonContainer}>
                        <TouchableOpacity
                            style={styles.signUplogInButton}
                            onPress={() => {}}
                        >
                            <AUIThemedText style={styles.signUpText}>
                                {GLOBAL_TEXT.singup}
                            </AUIThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.signUplogInButton}
                            onPress={() => {}}
                        >
                            <AUIThemedText style={styles.signUpText}>
                                {GLOBAL_TEXT.login}
                            </AUIThemedText>
                        </TouchableOpacity>
                    </AUIThemedView>
                )}
            </AUIThemedView>
        </AUIThemedView>
    );
};

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        paddingTop: 20,
    },
    closeButton: {
        alignSelf: "flex-end",
        marginRight: 20,
    },
    menuItemMainContainer: {
        justifyContent: "center",
    },
    header: {
        alignItems: "center",
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: "500",
        color: APP_THEME.primary.first,
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
        paddingTop: 10,
        fontSize: 12,
        color: "#9DA1AC",
        width: 200,
    },
});

export default AUIDrawerContent;
