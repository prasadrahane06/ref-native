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
            {data?.map((item) => (
                <AUIThemedView key={item._id} style={styles.courseItem}>
                    <Course
                        title={item?.courseName}
                        image={item?.image}
                        // @ts-ignore
                        startingDate={item?.startDate}
                        courseId={item._id}
                        numberOfLines={1}
                        ellipsizeMode="tail"
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
