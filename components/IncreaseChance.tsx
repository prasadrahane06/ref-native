import { APP_THEME, STUDENT_GRADIENT, TEXT_THEME } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet, Text } from "react-native";
import { AUIThemedText } from "./common/AUIThemedText";
import { AUIThemedView } from "./common/AUIThemedView";
import AUIImage from "./common/AUIImage";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface IncreaseChanceItem {
    image: string;
    courseName: string;
    schoolName: string;
    daysRemaining: string;
}

const IncreaseChance = ({ courseName, schoolName, daysRemaining, image }: IncreaseChanceItem) => {
    const theme = useSelector((state: RootState) => state.global.theme);

    return (
        <AUIThemedView style={styles.increaseChanceContainer}>
            <AUIThemedView
                style={[
                    styles.increaseChanceItem,
                    { backgroundColor: APP_THEME[theme].primary.first },
                ]}
            >
                <AUIImage path={image} style={{ width: 60, height: 60 }} />

                <AUIThemedView style={{ backgroundColor: APP_THEME[theme].primary.first }}>
                    <Text style={[styles.courseName, { color: TEXT_THEME[theme].primary }]}>
                        {courseName}
                    </Text>
                    <Text style={[styles.schoolName, { color: TEXT_THEME[theme].primary }]}>
                        {schoolName}
                    </Text>
                    <Text style={[styles.daysRemaining, { color: TEXT_THEME[theme].primary }]}>
                        Last {daysRemaining} Days remaining
                    </Text>
                </AUIThemedView>
            </AUIThemedView>
        </AUIThemedView>
    );
};

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
    increaseChanceContainer: { paddingVertical: 10, marginRight: 18 },
    increaseChanceItem: {
        flexDirection: "row",
        alignItems: "center",
        width: width / 1.3,
        borderRadius: 10,
        overflow: "hidden",
        // backgroundColor: APP_THEME.primary.first,
        padding: 10,
        gap: 10,
    },
    courseName: {
        fontSize: 15,
        fontWeight: "bold",
        // color: "#000",
    },
    schoolName: {
        fontSize: 12,
        fontWeight: "500",
        // color: "#000",
        paddingVertical: 5,
    },
    daysRemaining: {
        fontSize: 12,
        // color: "#000",
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
