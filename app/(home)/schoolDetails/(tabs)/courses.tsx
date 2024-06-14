import AUIFilter from "@/components/common/AUIFilter";
import AUISearchBar from "@/components/common/AUISearchBar";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { AvailableCoursesList } from "@/components/home/studentDetails/AvailableCoursesList";
import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

export const data = [
    {
        id: "1",
        image: require("@/assets/images/studentDetailsPage/courses/image-1.png"),
        courseTitle: "Exam preparation course",
        courseDesciption:
            "20-Focus on test-taking skills and tips to increase your test scores.",
    },
    {
        id: "2",
        image: require("@/assets/images/studentDetailsPage/courses/image-1.png"),
        courseTitle: "Long term English courses",
        courseDesciption:
            "Immerse yourself in an English-speaking culture for up to a full year.",
    },
    {
        id: "3",
        image: require("@/assets/images/studentDetailsPage/courses/image-1.png"),
        courseTitle: "English courses of flexible length",
        courseDesciption:
            "Choose your cycle length, start date, and intensity level.",
    },
    {
        id: "4",
        image: require("@/assets/images/studentDetailsPage/courses/image-1.png"),
        courseTitle: "Online English course",
        courseDesciption: "Learn a language no matter where you are",
    },
    {
        image: require("@/assets/images/studentDetailsPage/courses/image-1.png"),
        courseTitle: "Online English course",
        courseDesciption: "Learn a language no matter where you are",
    },
];

export default function CoursesTab() {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);

    return (
        <ScrollView nestedScrollEnabled>
            <AUIThemedView>
                <AUIThemedView style={styles.container}>
                    <AUISearchBar
                        searchPhrase={searchPhrase}
                        setSearchPhrase={setSearchPhrase}
                        clicked={clicked}
                        setClicked={setClicked}
                    />

                    <AUIFilter />
                </AUIThemedView>

                <AUIThemedView>
                    <AvailableCoursesList data={data} />
                </AUIThemedView>
            </AUIThemedView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 15,
    },
});
