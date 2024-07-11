import { AUIThemedView } from "@/components/common/AUIThemedView";
import React from "react";
import { FlatList } from "react-native";
import { AvailableCourses } from "./AvailableCourses";

interface AvailableCoursesProps {
    courses: Array<{
        _id: string;
        courseName: string;
        description: string;
        language: string;
        numberOfSeats: number;
        image: string;
        startDate: string;
        endDate: string;
        price: number;
        currencyType: string;
        category: string;
        status: number;
    }>;
}

export const AvailableCoursesList: React.FC<AvailableCoursesProps> = ({ courses }) => {
    return (
        <AUIThemedView>
            <FlatList
                scrollEnabled={false}
                data={courses}
                renderItem={({ item, index }) => (
                    <AvailableCourses
                        index={index}
                        _id={item._id}
                        courseName={item.courseName}
                        courseDesciption={item.description}
                        image={item.image}
                        startDate={item.startDate}
                        numberOfLines={3}
                        ellipsizeMode={"tail"}
                        
                    />
                )}
                keyExtractor={(item) => item.courseName}
            />
        </AUIThemedView>
    );
};
