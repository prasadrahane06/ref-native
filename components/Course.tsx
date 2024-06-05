import { APP_THEME } from "@/constants/Colors";
import { Image, StyleSheet, Text } from "react-native";
import { AUIThemedText } from "./common/AUIThemedText";
import { AUIThemedView } from "./common/AUIThemedView";

const Course = ({ title, image }: any) => (
    <AUIThemedView>
        <Image style={styles.courseImage} source={image} />
        <AUIThemedView style={styles.courseItemContainer}>
            <Text style={styles.courseTitle}>{title}</Text>
            <AUIThemedText style={{ fontSize: 12 }}>
                <AUIThemedText style={styles.courseCaption}>
                    Starting from:{" "}
                </AUIThemedText>
                20-04-2024
            </AUIThemedText>
        </AUIThemedView>
    </AUIThemedView>
);

const styles = StyleSheet.create({
    courseItemContainer: {
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderColor: APP_THEME.primary.first,
    },
    courseImage: {
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        width: "100%",
        objectFit: "fill",
    },
    courseTitle: {
        fontSize: 13,
        fontWeight: "700",
    },
    courseCaption: {
        fontSize: 12,
        fontWeight: "bold",
    },
});

export default Course;
