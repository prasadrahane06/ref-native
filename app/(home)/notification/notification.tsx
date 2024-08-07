import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME, TEXT_THEME } from "@/constants/Colors";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { RootState } from "@/redux/store";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, ListRenderItem, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

interface NotificationItem {
    _id: string;
    recipient: string;
    title: string;
    message: string;
    notificationType: string;
    isView: boolean;
    status: number;
    createdAt: string;
    updatedAt: string;
}

interface NotificationDrawerProps {
    onClose: () => void;
}

const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ onClose }) => {
    const { t } = useTranslation();

    const theme = useSelector((state: RootState) => state.global.theme);
    const notificationData = useSelector((state: RootState) => state.api.notification);

    const renderItem: ListRenderItem<NotificationItem> = ({ item }) => {
        const timestamp = new Date(item?.createdAt).getTime();
        const now = new Date().getTime();
        const difference = now - timestamp;
        let time = "";

        if (difference < 1000) {
            time = "just now";
        } else if (difference < 60000) {
            time = Math.floor(difference / 1000) + " seconds ago";
        } else if (difference < 3600000) {
            time = Math.floor(difference / 60000) + " minutes ago";
        } else if (difference < 86400000) {
            time = Math.floor(difference / 3600000) + " hours ago";
        } else if (difference < 172800000) {
            time = "yesterday";
        } else {
            time = Math.floor(difference / 86400000) + " days ago";
        }

        return (
            <AUIThemedView
                style={[styles.notificationItem, !item?.isView && styles.unreadNotificationItem]}
            >
                <TouchableOpacity style={styles.iconContainer}>
                    <MaterialIcons name="check" size={28} color="#fff" style={styles.icon} />
                </TouchableOpacity>
                <View style={styles.notificationText}>
                    <View style={styles.titleContainer}>
                        <AUIThemedText style={styles.title}>{item?.title}</AUIThemedText>
                        {!item?.isView && <AUIThemedView style={styles.unreadDot}></AUIThemedView>}
                    </View>
                    <AUIThemedText style={styles.description}>{item?.message}</AUIThemedText>
                    <AUIThemedText style={styles.time}>{time}</AUIThemedText>
                </View>
            </AUIThemedView>
        );
    };

    return (
        <AUIThemedView style={styles.container}>
            <AUIThemedView style={styles.headerRow}>
                <AUIThemedText style={styles.header}>{t("notification")}</AUIThemedText>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <MaterialIcons name="close" size={28} color={TEXT_THEME[theme].primary} />
                </TouchableOpacity>
            </AUIThemedView>
            <FlatList
                data={notificationData}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
            />
        </AUIThemedView>
    );
};

export default NotificationDrawer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        marginTop: 20,
    },
    closeButton: {
        // padding: 8,
    },
    header: {
        fontSize: 18,
        fontWeight: "bold",
    },
    notificationItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderTopColor: APP_THEME.light.primary.first,
        borderBottomColor: APP_THEME.light.primary.first,
    },
    unreadNotificationItem: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
        backgroundColor: "rgba(91, 216, 148, 0.2)",
        borderTopColor: APP_THEME.light.primary.first,
        borderBottomColor: APP_THEME.light.primary.first,
        borderWidth: 1,
    },
    iconContainer: {
        alignSelf: "flex-start",
        borderRadius: 50,
        padding: 5,
        marginRight: 10,
        backgroundColor: APP_THEME.light.primary.first,
    },
    icon: {
        alignSelf: "flex-start",
    },
    notificationText: {
        flex: 1,
    },
    titleContainer: { flexDirection: "row", justifyContent: "space-between" },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    unreadDot: {
        width: 6,
        height: 6,
        marginTop: 5,
        borderRadius: 4,
        marginRight: 15,
        backgroundColor: APP_THEME.light.primary.first,
    },
    description: {
        fontSize: 13,
        marginVertical: 4,
        color: "#9DA1AC",
    },
    time: {
        fontSize: 12,
        color: "#9DA1AC",
        alignSelf: "flex-end",
        marginRight: 15,
    },
});

// keep this code

// import { useState, useEffect, useRef } from "react";
// import { Text, View, Button, Platform } from "react-native";
// import * as Device from "expo-device";
// import * as Notifications from "expo-notifications";
// import Constants from "expo-constants";

// Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//         shouldShowAlert: true,
//         shouldPlaySound: false,
//         shouldSetBadge: false,
//     }),
// });

// export default function App() {
//     const [expoPushToken, setExpoPushToken] = useState("");
//     const [channels, setChannels] = useState<Notifications.NotificationChannel[]>([]);
//     const [notification, setNotification] = useState<Notifications.Notification | undefined>(
//         undefined
//     );
//     const notificationListener = useRef<Notifications.Subscription>();
//     const responseListener = useRef<Notifications.Subscription>();

//     useEffect(() => {
//         registerForPushNotificationsAsync().then((token) => token && setExpoPushToken(token));

//         if (Platform.OS === "android") {
//             Notifications.getNotificationChannelsAsync().then((value) => setChannels(value ?? []));
//         }
//         notificationListener.current = Notifications.addNotificationReceivedListener(
//             (notification) => {
//                 setNotification(notification);
//             }
//         );

//         responseListener.current = Notifications.addNotificationResponseReceivedListener(
//             (response) => {
//                 console.log(response);
//             }
//         );

//         return () => {
//             notificationListener.current &&
//                 Notifications.removeNotificationSubscription(notificationListener.current);
//             responseListener.current &&
//                 Notifications.removeNotificationSubscription(responseListener.current);
//         };
//     }, []);

//     return (
//         <View
//             style={{
//                 flex: 1,
//                 alignItems: "center",
//                 justifyContent: "space-around",
//             }}
//         >
//             <Text>Your expo push token: {expoPushToken}</Text>
//             <Text>{`Channels: ${JSON.stringify(
//                 channels.map((c) => c.id),
//                 null,
//                 2
//             )}`}</Text>
//             <View style={{ alignItems: "center", justifyContent: "center" }}>
//                 <Text>Title: {notification && notification.request.content.title} </Text>
//                 <Text>Body: {notification && notification.request.content.body}</Text>
//                 <Text>
//                     Data: {notification && JSON.stringify(notification.request.content.data)}
//                 </Text>
//             </View>
//             <Button
//                 title="Press to schedule a notification"
//                 onPress={async () => {
//                     await schedulePushNotification();
//                 }}
//             />
//         </View>
//     );
// }

// async function schedulePushNotification() {
//     await Notifications.scheduleNotificationAsync({
//         content: {
//             title: "You've got mail! 📬",
//             body: "Here is the notification body",
//             data: { data: "goes here", test: { test1: "more data" } },
//         },
//         trigger: { seconds: 2 },
//     });
// }
