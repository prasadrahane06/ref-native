import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME, TEXT_THEME } from "@/constants/Colors";
import { RootState } from "@/redux/store";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
    FlatList,
    ListRenderItem,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";
import { useSelector } from "react-redux";

interface NotificationItem {
    id: string;
    icon: "check-circle" | "event-seat";
    title: string;
    description: string;
    time: string;
    read: boolean;
}

interface NotificationDrawerProps {
    onClose: () => void;
}

const notifications: NotificationItem[] = [
    {
        id: "1",
        icon: "check-circle",
        title: "Your course successfully purchased",
        description:
            "Congratulation you have been successfully purchased this course waiting for confirmation from school, Thanks.",
        time: "2 Hours ago",
        read: false,
    },
    {
        id: "2",
        icon: "event-seat",
        title: "Seat booked!",
        description: "Congratulation your seat has been confirm by school.",
        time: "2 Hours ago",
        read: true,
    },
    {
        id: "3",
        icon: "event-seat",
        title: "Your course Confirm!",
        description: "Congratulation your purchased course has been confirm by school.",
        time: "2 Hours ago",
        read: true,
    },
];

const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ onClose }) => {
    const theme = useSelector((state: RootState) => state.global.theme);
    const renderItem: ListRenderItem<NotificationItem> = ({ item }) => (
        <AUIThemedView
            style={[styles.notificationItem, !item.read && styles.unreadNotificationItem]}
        >
            <TouchableOpacity style={styles.iconContainer}>
                <MaterialIcons name={item.icon} size={28} color="#fff" style={styles.icon} />
            </TouchableOpacity>
            <View style={styles.notificationText}>
                <View style={styles.titleContainer}>
                    <AUIThemedText style={styles.title}>{item.title}</AUIThemedText>
                    {!item.read && <AUIThemedView style={styles.unreadDot}></AUIThemedView>}
                </View>
                <AUIThemedText style={styles.description}>{item.description}</AUIThemedText>
                <AUIThemedText style={styles.time}>{item.time}</AUIThemedText>
            </View>
        </AUIThemedView>
    );

    return (
        <AUIThemedView style={styles.container}>
            <AUIThemedView style={styles.headerRow}>
                <AUIThemedText style={styles.header}>Notification</AUIThemedText>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <MaterialIcons name="close" size={28} color={TEXT_THEME[theme].primary} />
                </TouchableOpacity>
            </AUIThemedView>
            <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
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
