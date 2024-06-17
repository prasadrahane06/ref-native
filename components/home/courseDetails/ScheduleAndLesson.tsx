import AUIInfoCard from "@/components/AUIInfoCard";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import React from "react";
import { StyleSheet } from "react-native";

interface ScheduleAndLessonProps {
    scheduleDescription: string;
    lessonDescription: string;
}

export default function ScheduleAndLesson({
    scheduleDescription,
    lessonDescription,
}: ScheduleAndLessonProps) {
    return (
        <AUIThemedView>
            <AUIThemedView style={styles.container}>
                <AUIInfoCard
                    title="Schedule"
                    subtitle={scheduleDescription}
                    cardStyle={styles.card}
                    titleStyle={styles.cardTitle}
                    subtitleStyle={styles.cardSubtitle}
                />
                <AUIInfoCard
                    title="Lesson Hours"
                    subtitle={lessonDescription}
                    cardStyle={styles.card}
                    titleStyle={styles.cardTitle}
                    subtitleStyle={styles.cardSubtitle}
                />
            </AUIThemedView>
        </AUIThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 20,
        marginHorizontal: 12,
    },
    card: {
        backgroundColor: "#D3FFE7",
        margin: 0,
        padding: 15,
        minHeight: 130,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        paddingBottom: 7,
    },
    cardSubtitle: {
        fontSize: 12,
        fontWeight: "400",
        lineHeight: 15,
    },
});
