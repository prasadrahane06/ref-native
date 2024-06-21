import AUIImage from "@/components/common/AUIImage";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

export const AvailableCourses = ({
    image,
    courseTitle,
    courseDesciption,
    index,
}: any) => {
    const isEven = index % 2 === 0;

    return (
        <AUIThemedView style={styles.container} key={index}>
            <AUIThemedView
                style={[
                    styles.card,
                    { flexDirection: isEven ? "row" : "row-reverse" },
                ]}
            >
                <AUIThemedView style={styles.textContainer}>
                    <AUIThemedText style={styles.title}>
                        {courseTitle}
                    </AUIThemedText>
                    <AUIThemedText style={styles.description}>
                        {courseDesciption}
                    </AUIThemedText>
                    <AUIThemedText
                        style={{
                            fontSize: 13,
                            marginBottom: 10,
                            color: APP_THEME.gray,
                        }}
                    >
                        Starting from:{" "}
                        <AUIThemedText style={styles.date}>
                            20-06-2024
                        </AUIThemedText>
                    </AUIThemedText>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() =>
                            router.push({
                                pathname: `(home)/courseDetails/1`,
                            })
                        }
                    >
                        <AUIThemedText style={styles.buttonText}>
                            {GLOBAL_TEXT.explore_more}
                        </AUIThemedText>
                        <AntDesign name="arrowright" size={20} color="black" />
                    </TouchableOpacity>
                </AUIThemedView>
                <AUIImage path={image} style={styles.image} />
            </AUIThemedView>
        </AUIThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    card: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: APP_THEME.primary.first,
        backgroundColor: APP_THEME.background,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    textContainer: {
        flex: 3,
        padding: 10,
        borderRadius: 10,
    },
    title: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 5,
    },
    description: {
        fontSize: 13,
        fontWeight: "400",
        marginBottom: 10,
    },
    date: {
        color: "#000",
        fontWeight: "bold",
    },
    button: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 5,
    },
    buttonText: {
        color: APP_THEME.primary.first,
        fontSize: 14,
    },
    image: {
        flex: 2,
        height: "100%",
    },
});
