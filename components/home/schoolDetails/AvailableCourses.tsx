import AUIImage from "@/components/common/AUIImage";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";

interface AvailableCoursesProps {
    index: number;
    _id: string;
    courseName: string;
    courseDesciption: string;
    image: string;
    startDate: string;
}

export const AvailableCourses: React.FC<AvailableCoursesProps> = ({
    index,
    _id,
    courseName,
    courseDesciption,
    image,
    startDate,
}) => {
    const isEven = index % 2 === 0;

    return (
        <AUIThemedView style={styles.container} key={_id}>
            <AUIThemedView style={[styles.card, { flexDirection: isEven ? "row" : "row-reverse" }]}>
                <AUIThemedView style={styles.textContainer}>
                    <AUIThemedText style={styles.title}>{courseName}</AUIThemedText>
                    <AUIThemedText style={styles.description}>{courseDesciption}</AUIThemedText>
                    <AUIThemedText
                        style={{
                            fontSize: 13,
                            marginBottom: 10,
                            color: APP_THEME.gray,
                        }}
                    >
                        Starting from:{" "}
                        <AUIThemedText style={styles.date}>
                            {new Date(startDate).toLocaleDateString("en-US", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })}
                        </AUIThemedText>
                    </AUIThemedText>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() =>
                            router.push({
                                pathname: `(home)/courseDetails/${_id}`,
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
        marginBottom: 10,
        lineHeight: 17,
    },
    description: {
        fontSize: 13,
        fontWeight: "400",
        marginBottom: 10,
        lineHeight: 15,
    },
    date: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 12,
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
