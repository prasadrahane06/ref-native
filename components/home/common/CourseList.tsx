import Course from "@/components/Course";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import React from "react";
import { StyleSheet } from "react-native";

interface CourseListProps {
    data: any[];
    showEditIcons?: boolean;
    onEdit: (courseId: string) => void;
}

const CourseList: React.FC<CourseListProps> = ({ data, showEditIcons, onEdit }) => {
    return (
        <AUIThemedView style={styles.courseContainer}>
            {data?.map((item) => (
                <AUIThemedView key={item._id} style={styles.courseItem}>
                    <Course
                        title={item?.courseName}
                        image={item?.image}
                        startingDate={item?.startDate}
                        courseId={item._id}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        edit={showEditIcons}
                        onEdit={onEdit}
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
