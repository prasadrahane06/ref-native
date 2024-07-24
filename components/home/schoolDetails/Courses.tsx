import AUIFilter from "@/components/common/AUIFilter";
import AUISearchBar from "@/components/common/AUISearchBar";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { AvailableCoursesList } from "./AvailableCoursesList";

export default function CoursesTab({ schoolCourses }: { schoolCourses: any }) {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);

    const courses = schoolCourses?.courses;

    return (
        <AUIThemedView>
            <AUIThemedView style={styles.container}>
                <AUISearchBar
                    searchPhrase={searchPhrase}
                    setSearchPhrase={setSearchPhrase}
                    clicked={clicked}
                    setClicked={setClicked}
                    containerStyle={{ width: "100%" }}
                />

                {/* <AUIFilter /> */}
            </AUIThemedView>

            {courses && (
                <AUIThemedView>
                    <AvailableCoursesList courses={courses} />
                </AUIThemedView>
            )}
        </AUIThemedView>
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
