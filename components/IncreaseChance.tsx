import { APP_THEME, STUDENT_GRADIENT } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet, Text } from "react-native";
import { AUIThemedText } from "./common/AUIThemedText";
import { AUIThemedView } from "./common/AUIThemedView";
import AUIImage from "./common/AUIImage";

interface IncreaseChanceItem {
    image: string;
    courseName: string;
    schoolName: string;
    daysRemaining: string;
}

const IncreaseChance = ({ courseName, schoolName, daysRemaining, image }: IncreaseChanceItem) => (
    <AUIThemedView style={styles.increaseChanceContainer}>
        <AUIThemedView style={styles.increaseChanceItem}>
            <AUIImage path={image} style={{ width: 60, height: 60 }} />

            <AUIThemedView style={{ backgroundColor: APP_THEME.primary.first }}>
                <Text style={styles.courseName}>{courseName}</Text>
                <Text style={styles.schoolName}>{schoolName}</Text>
                <Text style={styles.daysRemaining}>Last {daysRemaining} Days remaining</Text>
            </AUIThemedView>
        </AUIThemedView>
    </AUIThemedView>
);

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
    increaseChanceContainer: { paddingVertical: 10, marginRight: 18 },
    increaseChanceItem: {
        flexDirection: "row",
        alignItems: "center",
        width: width / 1.3,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: APP_THEME.primary.first,
        padding: 10,
        gap: 10,
    },
    courseName: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#000",
    },
    schoolName: {
        fontSize: 12,
        fontWeight: "500",
        color: "#000",
        paddingVertical: 5,
    },
    daysRemaining: {
        fontSize: 12,
        color: "#000",
    },
    gradient: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: "100%",
        borderRadius: 7,
    },
});

export default IncreaseChance;
