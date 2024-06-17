import AUIButton from "@/components/common/AUIButton";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import SectionTitle from "@/components/home/common/SectionTitle";
import CourseDetailsComponent from "@/components/home/courseDetails/CourseDetailsComponent";
import ScheduleAndLesson from "@/components/home/courseDetails/ScheduleAndLesson";
import SimilarCoursesList from "@/components/home/courseDetails/SimilarCourses";
import { FacilitiesList } from "@/components/home/studentDetails/FacilitiesList";
import { APP_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";

interface PlanComponentProps {
    plan: any;
    scheduleDescription: string;
    lessonDescription: string;
    similarCourses: any;
}

export default function PlanComponent({
    plan,
    scheduleDescription,
    lessonDescription,
    similarCourses,
}: PlanComponentProps) {
    return (
        <AUIThemedView>
            <AUIThemedView style={styles.marginTop20}>
                <AUIThemedText style={styles.boldText}>
                    {GLOBAL_TEXT.course_details}
                </AUIThemedText>

                <CourseDetailsComponent data={plan} />
            </AUIThemedView>

            <AUIThemedView>
                <ScheduleAndLesson
                    scheduleDescription={scheduleDescription}
                    lessonDescription={lessonDescription}
                />
            </AUIThemedView>

            <AUIThemedView>
                <SectionTitle>{GLOBAL_TEXT.facilities}</SectionTitle>
                <FacilitiesList data={plan.facilities} />
            </AUIThemedView>

            <AUIThemedView style={styles.btnContainer}>
                <AUIThemedView style={styles.bookContainer}>
                    <AntDesign name="calendar" size={24} color="black" />
                    <AUIThemedText style={styles.blackBoldText}>
                        {GLOBAL_TEXT.book_your_seat}
                    </AUIThemedText>
                </AUIThemedView>

                <AUIThemedView style={styles.buyContainer}>
                    <Ionicons name="bag-outline" size={24} color="#fff" />
                    <AUIThemedText style={styles.whiteBoldText}>
                        {GLOBAL_TEXT.buy_now}
                    </AUIThemedText>
                </AUIThemedView>
            </AUIThemedView>

            <AUIThemedView>
                <AUIButton
                    title={GLOBAL_TEXT.enquire_now}
                    selected
                    style={styles.enquireButton}
                />
            </AUIThemedView>

            <AUIThemedView style={styles.marginTop25}>
                <AUIThemedView style={styles.borderBottom} />
            </AUIThemedView>

            <AUIThemedView style={styles.margin10}>
                <AUIThemedView>
                    <AUIThemedText style={{ fontWeight: "bold" }}>
                        {GLOBAL_TEXT.similar_courses}
                    </AUIThemedText>
                </AUIThemedView>

                <AUIThemedView>
                    <SimilarCoursesList data={similarCourses} />
                </AUIThemedView>
            </AUIThemedView>
        </AUIThemedView>
    );
}

const styles = StyleSheet.create({
    marginTop20: {
        marginTop: 20,
    },
    boldText: {
        fontWeight: "bold",
        marginHorizontal: 12,
    },

    borderBottom: {
        width: "100%",
        position: "absolute",
        bottom: 0,
        borderWidth: 0.6,
        borderColor: APP_THEME.primary.first,
    },

    btnContainer: {
        flexDirection: "row",
        gap: 10,
        marginHorizontal: 22,
        marginVertical: 15,
        justifyContent: "center",
    },
    bookContainer: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        width: "50%",
        backgroundColor: APP_THEME.background,
    },
    blackBoldText: {
        fontWeight: "bold",
        color: "#000",
    },
    buyContainer: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        padding: 10,
        width: "50%",
        backgroundColor: APP_THEME.primary.first,
    },
    whiteBoldText: {
        fontWeight: "bold",
        color: "#fff",
    },
    enquireButton: {
        paddingHorizontal: 15,
    },
    marginTop25: {
        marginTop: 25,
    },
    margin10: {
        marginVertical: 10,
        marginHorizontal: 15,
    },
});
