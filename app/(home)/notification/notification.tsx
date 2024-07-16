import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ListRenderItem,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { APP_THEME, TEXT_THEME } from "@/constants/Colors";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { AUIThemedText } from "@/components/common/AUIThemedText";

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
                    <MaterialIcons name="close" size={28} color="#000" />
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
        color:"#9DA1AC"
    },
    time: {
        fontSize: 12,
        color:"#9DA1AC",
        alignSelf: "flex-end",
        marginRight: 15,
    },
});
