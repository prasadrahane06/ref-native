import { AUIThemedView } from "@/components/common/AUIThemedView";
import React from "react";
import { FlatList } from "react-native";
import { AvailableCourses } from "./AvailableCourses";

interface AvailableCoursesProps {
    courses: {
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
    }[];
}

export const AvailableCoursesList: React.FC<AvailableCoursesProps> = ({ courses }) => {
    return (
        <AUIThemedView>
            <FlatList
                scrollEnabled={false}
                data={courses}
                renderItem={({ item, index }) => {
                    return (
                        <AvailableCourses
                            index={index}
                            courseDesciption={item.description}
                            _id={item._id}
                            courseName={item.courseName}
                            startDate={item.startDate}
                            numberOfLines={3}
                            image={item.image}
                            ellipsizeMode={"tail"}
                        />
                    );
                }}
                keyExtractor={(item) => item._id}
            />
        </AUIThemedView>
    );
};
