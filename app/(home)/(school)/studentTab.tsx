import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

export default function TabTwoScreen() {
    const array = [
        { studentId: "A1B2C", studentName: "Alice Johnson" },
        { studentId: "D3E4F", studentName: "Bob Smith" },
        { studentId: "G5H6I", studentName: "Charlie Davis" },
        { studentId: "J7K8L", studentName: "Diana Roberts" },
        { studentId: "M9N0O", studentName: "Ethan Brown" },
        { studentId: "P1Q2R", studentName: "Fiona Clark" },
        { studentId: "S3T4U", studentName: "George White" },
        { studentId: "V5W6X", studentName: "Hannah Lewis" },
        { studentId: "Y7Z8A", studentName: "Ian Walker" },
        { studentId: "B9C0D", studentName: "Jane Hall" },
    ];

    return (
        <AUIThemedView style={styles.root}>
            <AUIThemedText style={styles.title}>Students Admitted through app</AUIThemedText>
            <AUIThemedView>
                {array.map((item) => (
                    <AUIThemedView style={styles.layout}>
                        <AUIThemedText style={styles.name}>{item.studentName}</AUIThemedText>
                        <AUIThemedText style={styles.id}>ID: {item.studentId}</AUIThemedText>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                    </AUIThemedView>
                ))}
            </AUIThemedView>
        </AUIThemedView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    title: {
        padding: 10,
        fontSize: 18,
    },
    layout: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#D3FFE7", //APP_THEME.primary.first,
        padding: 10,
        margin: 8,
        borderRadius: 10,
    },
    name: {
        // borderWidth: 1,
        fontWeight: "bold",
        flex: 1,
    },
    id: {
        // textAlign: "center",
        // borderWidth: 1,
        flex: 1,
        fontWeight: "bold",
    },
});
