import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import CoursePlanTabs from "./(tabs)/_layout";

export default function CourseDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    console.log(id);

    // const { requestFn } = useApiRequest();

    // requestFn(
    //     get("http://localhost:4000/dev/school?id=666846b7b1340aee251deff5"),
    //     "courseDetails"
    // );

    // const courseDetails = useSelector(
    //     (state: RootState) => state.api.courseDetails
    // );

    // console.log("courseDetails", courseDetails);

    return (
        <AUIThemedView>
            <ScrollView>
                <AUIThemedView style={styles.container}>
                    <Image
                        source={require("@/assets/images/studentHomePage/popularSchools/school-1.png")}
                        style={styles.image}
                    />

                    <AUIThemedView style={styles.infoContainer}>
                        <AUIThemedView style={styles.headerContainer}>
                            <AUIThemedView style={styles.header}>
                                <Image
                                    source={require("@/assets/icons/course.png")}
                                />
                                <AUIThemedView style={styles.courseInfo}>
                                    <AUIThemedText style={styles.title}>
                                        Exam preparation course
                                    </AUIThemedText>
                                    <AUIThemedText style={styles.startingDate}>
                                        Starting from: 20-06-2024
                                    </AUIThemedText>
                                </AUIThemedView>
                            </AUIThemedView>

                            <AUIThemedView style={styles.cartIconContainer}>
                                <Image
                                    source={require("@/assets/icons/cart.png")}
                                />
                            </AUIThemedView>
                        </AUIThemedView>
                    </AUIThemedView>

                    <AUIThemedView style={styles.planContainer}>
                        <AUIThemedText style={styles.planText}>
                            {GLOBAL_TEXT.select_your_plan}
                        </AUIThemedText>

                        <CoursePlanTabs />
                    </AUIThemedView>
                </AUIThemedView>
            </ScrollView>
        </AUIThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        height: 200,
        width: "auto",
    },
    infoContainer: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: APP_THEME.background,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 15,
        backgroundColor: APP_THEME.background,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
    },
    courseInfo: {
        backgroundColor: APP_THEME.background,
    },
    cartIconContainer: {
        backgroundColor: APP_THEME.primary.first,
        borderRadius: 50,
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    startingDate: {
        fontSize: 14,
        color: "#6c757d",
    },
    planContainer: {
        backgroundColor: APP_THEME.background,
    },
    planText: {
        fontWeight: "bold",
        marginHorizontal: 12,
    },
});
