import { APP_THEME } from "@/constants/Colors";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import {
    Feather,
    FontAwesome6,
    Fontisto,
    Ionicons,
    MaterialIcons
} from "@expo/vector-icons";
import { Asset } from "expo-asset";
import { router, useNavigation } from "expo-router";
import React from "react";
import { Alert, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import AUIImage from "../common/AUIImage";
import { AUIThemedText } from "../common/AUIThemedText";
import { AUIThemedView } from "../common/AUIThemedView";
import { ApiSuccessToast } from "../common/AUIToast";

const array = [
    {
        id: 1,
        icon: <FontAwesome6 name="user-circle" size={24} color={APP_THEME.light.primary.first} />,
        label: "Profile",
        pathname: "/profile",
    },
    {
        id: 2,
        icon: <Feather name="help-circle" size={24} color={APP_THEME.light.primary.first} />,
        label: "Help",
        pathname: "/help",
    },
    {
        id: 3,
        icon: <Fontisto name="wallet" size={24} color={APP_THEME.light.primary.first} />,
        label: "Transaction history",
        pathname: "/transactions",
    },
];
function Profile() {
    const userProfileData = useLangTransformSelector((state: RootState) => state.api.userProfileData);
    const theme = useSelector((state: RootState) => state.global.theme);
    const navigation = useNavigation();

    return (
        <AUIThemedView style={styles.root}>
            <AUIThemedView
                style={[
                    styles.banner,
                    {
                        backgroundColor: APP_THEME[theme].primary.first,
                        shadowColor: APP_THEME[theme].ternary.first,
                    },
                ]}
            >
                <View style={styles.header}>
                    <Pressable
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <Ionicons
                            name="arrow-back-circle-outline"
                            size={30}
                            color={APP_THEME[theme].ternary.first}
                        />
                    </Pressable>
                </View>
                <View style={styles.avatarContainer}>
                    <AUIImage
                        path={
                            Asset.fromModule(
                                require("@/assets/images/user.png")
                                // "https://linguest-assets-dev.s3.ap-south-1.amazonaws.com/1718884990288-6296.jpeg"
                            ).uri
                        }
                        style={styles.avatar}
                    />
                    <AUIThemedText style={styles.name}>{userProfileData?.name}</AUIThemedText>
                    <AUIThemedText style={styles.email}>{userProfileData?.email}</AUIThemedText>
                </View>
            </AUIThemedView>

            <AUIThemedView style={styles.container}>
                {array.map((item: any) => (
                    <TouchableOpacity
                        style={styles.layout}
                        key={item.id}
                        onPress={() => router.push({ pathname: item.pathname })}
                    >
                        <View style={styles.labelContainer}>
                            {item.icon}
                            <AUIThemedText>{item.label}</AUIThemedText>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                    </TouchableOpacity>
                ))}

                {/* Delete Account */}
                <TouchableOpacity
                    style={styles.deleteLayout}
                    onPress={() => {
                        Alert.alert(
                            "Delete Account",
                            "Are you sure you want to delete your account? This action cannot be undone.",
                            [
                                { text: "Cancel" },
                                {
                                    text: "Confirm",
                                    onPress: () => {
                                        ApiSuccessToast("Account deleted successfully");
                                        router.push({ pathname: "/login" });
                                    },
                                    style: "destructive",
                                },
                            ],
                            { cancelable: false }
                        );
                    }}
                >
                    <View style={styles.deleteContainer}>
                        <MaterialIcons name="delete" size={24} color="white" />
                        <AUIThemedText style={{ color: "white" }}>Delete Account</AUIThemedText>
                    </View>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="white" />
                </TouchableOpacity>
            </AUIThemedView>
        </AUIThemedView>
    );
}

export default Profile;

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    header: {
        marginTop: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    banner: {
        height: 150,
        // backgroundColor: "rgba(91, 216, 148, 0.5)",
        // backgroundColor: APP_THEME.primary.first,
        elevation: 20,
        // shadowColor: APP_THEME.ternary.first,
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        position: "relative",
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        // marginBottom: 10,
    },
    avatarContainer: {
        justifyContent: "center",
        alignItems: "center",
        // position: "absolute",
        // top: 100,
        // left: 130,
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        paddingTop: 5,
    },
    email: {
        paddingTop: 5,
    },
    container: {
        marginTop: 130,
        padding: 10,
    },
    labelContainer: {
        flexDirection: "row",
        gap: 10,
    },
    deleteContainer: {
        flexDirection: "row",
        gap: 10,
    },
    layout: {
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "#ccc",
        marginBottom: 10,
    },
    deleteLayout: {
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#ff4a4a",
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        marginBottom: 10,
    },
});
