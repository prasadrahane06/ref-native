import { APP_THEME, TEXT_THEME } from "@/constants/Colors";
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
    daysRemaining: string; // Assuming this is a date string
}

const IncreaseChance = ({ courseName, schoolName, daysRemaining, image }: IncreaseChanceItem) => {
    const theme = useSelector((state: RootState) => state.global.theme);

    // Get the current date and the target date from props
    const currentDate = new Date();
    const targetDate = new Date(daysRemaining); 

    // Calculate the difference in days
    const timeDiff = targetDate.getTime() - currentDate.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

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
                        {daysLeft} Days remaining
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
        padding: 10,
        gap: 10,
    },
    courseName: {
        fontSize: 15,
        fontWeight: "bold",
    },
    schoolName: {
        fontSize: 12,
        fontWeight: "500",
        paddingVertical: 5,
    },
    daysRemaining: {
        fontSize: 12,
    },
});

export default IncreaseChance;
