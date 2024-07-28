import AUIButton from "@/components/common/AUIButton";
import AUISearchBar from "@/components/common/AUISearchBar";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import CourseList from "@/components/home/common/CourseList";
import SectionTitle from "@/components/home/common/SectionTitle";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import useDebounce from "@/customHooks/useDebounce";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import { router, useFocusEffect } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

export default function TabThreeScreen() {
    const theme = useSelector((state: RootState) => state.global.theme);
    const myCourse = useLangTransformSelector((state: RootState) => state.api.myCourse || {});
    const [courses, setCourses] = useState<any>([]);
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const debouncedSearchPhrase = useDebounce(searchPhrase, 500);
    const { requestFn } = useApiRequest();

    const fetchCourses = () => {
        if (debouncedSearchPhrase) {
            requestFn(API_URL.schoolSearch, "myCourse", {
                client: true,
                courseName: debouncedSearchPhrase,
                page: `${page}`,
            });
        } else {
            requestFn(API_URL.course, "myCourse", { client: true, page: `${page}` });
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchCourses();
        }, [])
    );

    useEffect(() => {
        setCourses(myCourse?.docs || []);
        setTotalPages(myCourse?.totalPages || 1);
    }, [myCourse?.docs?.length, myCourse?.totalPages]);

    const handleEditCourse = (courseId: string) => {
        const selectedCourse = courses.find((course: { _id: string }) => course?._id === courseId);
        router.push({
            pathname: "(home)/AddNewCourse/AddCourse",
            params: { course: JSON.stringify(selectedCourse), edit: "true" },
        });
    };

    return (
        <AUIThemedView style={styles.root}>
            <AUIThemedView style={{ paddingBottom: 20 }}>
                <AUISearchBar
                    clicked={clicked}
                    searchPhrase={searchPhrase}
                    setSearchPhrase={setSearchPhrase}
                    setClicked={setClicked}
                    containerStyle={{ width: "100%", marginVertical: 0 }}
                />
            </AUIThemedView>
            <ScrollView>
                <AUIThemedView>
                    <AUIThemedView style={styles.headerContainer}>
                        <SectionTitle style={{ paddingBottom: 10 }}>
                            {GLOBAL_TEXT.recent_courses}
                        </SectionTitle>
                        <AUIButton
                            style={styles.AddNewCourseButton}
                            title={"Add course"}
                            selected
                            onPress={() =>
                                router.push({
                                    pathname: "(home)/AddNewCourse/AddCourse",
                                })
                            }
                            disabled={false}
                        />
                    </AUIThemedView>
                    <CourseList data={courses} showEditIcons={true} onEdit={handleEditCourse} />
                    <TouchableOpacity
                        style={{ padding: 10, alignItems: "center" }}
                        disabled={page === totalPages}
                        onPress={() => {
                            setPage((prevPage) => prevPage + 1);
                        }}
                    >
                        <AUIThemedText>
                            {page === totalPages ? "You are Cought Up" : "Load More"}
                        </AUIThemedText>
                    </TouchableOpacity>
                </AUIThemedView>
            </ScrollView>
        </AUIThemedView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 20,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    AddNewCourseButton: {
        width: "35%",
        marginHorizontal: 15,
        padding: 10,
    },
    centeredContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
    },
});
