import Course from "@/components/Course";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import React from "react";
import { StyleSheet } from "react-native";

interface CourseListProps {
    data: any[];
}

const CourseList: React.FC<CourseListProps> = ({ data }) => {
    return (
        <AUIThemedView style={styles.courseContainer}>
            {data.map((item) => (
                <AUIThemedView key={item.id} style={styles.courseItem}>
                    <Course
                        title={item.name}
                        image={item.image}
                        // @ts-ignore
                        startingDate={item.startingDate}
                    />
                </AUIThemedView>
            ))}
        </AUIThemedView>
    );
};

const styles = StyleSheet.create({
    courseContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    courseItem: {
        width: "45%",
        margin: 5,
    },
});

export default CourseList;
