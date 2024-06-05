import { STUDENT_GRADIENT } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { AUIThemedText } from "./common/AUIThemedText";
import { AUIThemedView } from "./common/AUIThemedView";

const LastChance = ({ title, subTitle }: any) => (
    <AUIThemedView style={styles.lastChanceContainer}>
        <AUIThemedView style={styles.lastChanceItem}>
            <LinearGradient
                colors={[STUDENT_GRADIENT.ternary, STUDENT_GRADIENT.secondary]}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            />
            <AUIThemedText style={styles.lastChanceTitle}>
                {title}
            </AUIThemedText>
            <AUIThemedText style={styles.lastChanceSubTitle}>
                {subTitle}
            </AUIThemedText>
        </AUIThemedView>
    </AUIThemedView>
);

const styles = StyleSheet.create({
    lastChanceContainer: { paddingVertical: 10, marginRight: 18 },
    lastChanceItem: {
        width: 270,
        height: 90,
        borderRadius: 10,
        overflow: "hidden",
    },
    lastChanceTitle: {
        fontSize: 12,
        color: "white",
        paddingTop: 25,
        paddingLeft: 10,
    },
    lastChanceSubTitle: {
        fontSize: 15,
        fontWeight: "500",
        color: "white",
        paddingLeft: 10,
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

export default LastChance;
