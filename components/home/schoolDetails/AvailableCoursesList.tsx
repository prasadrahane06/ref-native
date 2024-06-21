import { AUIThemedView } from "@/components/common/AUIThemedView";
import React from "react";
import { FlatList } from "react-native";
import { AvailableCourses } from "./AvailableCourses";

interface AvailableCoursesProps {
    data: any[];
}

export const AvailableCoursesList: React.FC<AvailableCoursesProps> = ({
    data,
}) => {
    return (
        <AUIThemedView>
            <FlatList
                scrollEnabled={false}
                data={data}
                renderItem={({ item, index }) => (
                    <AvailableCourses
                        courseTitle={item.courseTitle}
                        courseDesciption={item.courseDesciption}
                        image={item.image}
                        index={index}
                    />
                )}
                keyExtractor={(item) => item.id}
            />
        </AUIThemedView>
    );
};
