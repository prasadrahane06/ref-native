import AUIButton from "@/components/common/AUIButton";
import AUISearchBar from "@/components/common/AUISearchBar";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import CourseList from "@/components/home/common/CourseList";
import SectionTitle from "@/components/home/common/SectionTitle";
import { BACKGROUND_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import useDebounce from "@/customHooks/useDebounce";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { setResponse } from "@/redux/apiSlice";
import { RootState } from "@/redux/store";
import { router, useFocusEffect } from "expo-router";
import { t } from "i18next";
import { default as React, useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function TabThreeScreen() {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.global.theme);
    const myCourse = useLangTransformSelector((state: RootState) => state.api.myCourse || {});
    const searchResult = useLangTransformSelector(
        (state: RootState) => state.api.searchResult || {}
    );

    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [showMessage, setShowMessage] = useState(true); // State to show/hide message
    const debouncedSearchPhrase = useDebounce(searchPhrase, 500);
    const { requestFn } = useApiRequest();

    const fetchCourses = async () => {
        if (debouncedSearchPhrase) {
            requestFn(API_URL.schoolSearch, "searchResult", {
                client: true,
                courseName: debouncedSearchPhrase,
                page: `${page}`,
            });
        } else {
            requestFn(API_URL.course, "myCourse", { client: true, page: `1` });
            dispatch(setResponse({ storeName: "searchResult", data: [] }));
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchCourses();
        }, [debouncedSearchPhrase])
    );

    const handleEditCourse = (courseId: string) => {
        const selectedCourse = myCourse?.docs.find(
            (course: { _id: string }) => course?._id === courseId
        );
        router.push({
            pathname: "/(home)/AddNewCourse/AddCourse",
            params: { id: selectedCourse?._id, edit: "true" },
        });
    };

    useEffect(() => {
        if (page === myCourse.totalPages) {
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 5000);
            return () => clearTimeout(timer);
        } else {
            setShowMessage(true);
        }
    }, [page, myCourse.totalPages]);

    return (
        <AUIThemedView style={{ flex: 1 }}>
            {/* Fixed Search Bar */}
            <AUIThemedView style={styles.searchBarContainer}>
                <AUISearchBar
                    clicked={clicked}
                    searchPhrase={searchPhrase}
                    setSearchPhrase={setSearchPhrase}
                    setClicked={setClicked}
                    containerStyle={{ width: "100%" }}
                />
            </AUIThemedView>

            {/* Scrollable Content */}
            <ScrollView style={{ backgroundColor: BACKGROUND_THEME[theme].background }}>
                <AUIThemedView style={styles.root}>
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
                                        pathname: "/(home)/AddNewCourse/AddCourse",
                                    })
                                }
                                disabled={false}
                            />
                        </AUIThemedView>
                        <CourseList
                            data={searchResult.length > 0 ? searchResult : myCourse?.docs}
                            showEditIcons={true}
                            onEdit={handleEditCourse}
                        />
                    </AUIThemedView>
                </AUIThemedView>
            </ScrollView>
            <TouchableOpacity
                style={{ padding: 10, alignItems: "center" }}
                disabled={page === myCourse.totalPages}
                onPress={() => setPage((prevPage) => prevPage + 1)}
            >
                {page === myCourse.totalPages ? (
                    showMessage && <AUIThemedText>{`${t("you_are_caught_up")}`}</AUIThemedText>
                ) : (
                    <AUIThemedText>{`${t("load_more")}`}</AUIThemedText>
                )}
            </TouchableOpacity>
        </AUIThemedView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginHorizontal: 20,
    },
    searchBarContainer: {
        marginHorizontal: 20,
    },
    scrollViewContent: {
        marginTop: 70,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 20,
    },
    AddNewCourseButton: {
        width: "40%",
        marginHorizontal: 15,
        padding: 10,
    },
});
