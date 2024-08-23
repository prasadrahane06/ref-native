import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    Modal,
    View,
    Text,
    Pressable,
    FlatList,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import AUIFilter from "@/components/common/AUIFilter";
import AUISearchBar from "@/components/common/AUISearchBar";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { AvailableCoursesList } from "./AvailableCoursesList";
import useApiRequest from "@/customHooks/useApiRequest";
import { API_URL } from "@/constants/urlProperties";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import useDebounce from "@/customHooks/useDebounce";
import { useTranslation } from "react-i18next";
import { BACKGROUND_THEME } from "@/constants/Colors";
import { useSelector } from "react-redux";
// import { t } from "i18next";

export default function CoursesTab({ schoolCourses }: { schoolCourses: any }) {
    const { t } = useTranslation();
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);

    const theme = useSelector((state: RootState) => state.global.theme);
    const schoolCourse = useLangTransformSelector(
        (state: RootState) => state.api.schoolCourse || {}
    );
    const [page, setPage] = useState<number>(1);
    const [isFilterModalVisible, setIsFilterModalVisible] = useState<boolean>(false);
    const [selectedFilters, setSelectedFilters] = useState({
        view: false
    });

    const { requestFn } = useApiRequest();
    const debouncedSearchPhrase = useDebounce(searchPhrase, 1000);

    useEffect(() => {
        if (debouncedSearchPhrase) {
            requestFn(API_URL.schoolSearch, "schoolCourse", {
                client: schoolCourses?._id,
                courseName: debouncedSearchPhrase,
            });
        } else {
            requestFn(API_URL.course, "schoolCourse", {
                client: schoolCourses?._id,
                page: `${page}`,
            });
        }
    }, [debouncedSearchPhrase, page]);

    

    // Function to handle filter application
    const applyFilters = () => {
        setIsFilterModalVisible(false);
    };

    // const resetFilters = () => {
    //     setSelectedFilters({
    //         view: false
            
    //     });
    //     setIsFilterModalVisible(false);
    // };

    const toggleFilter = (filterName: string) => {
        setSelectedFilters((prevState: any) => {
            // Check for the "view" filter and if it's true, make the request
            if (filterName === "view" && prevState[filterName] === true) {
                requestFn(API_URL.course, "schoolCourse", {
                    client: schoolCourses?._id,
                    page: `${page}`,
                });
            }
            if(filterName === "view" && prevState[filterName] === false){
                requestFn(API_URL.courseSortByView, "schoolCourse", {
                    client: schoolCourses?._id
                });
            }
    
            // Return the updated state with the toggled filter
            return {
                ...prevState,
                [filterName]: !prevState[filterName],
            };
        });
    };
    

    const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: BACKGROUND_THEME[theme].background }}
            behavior="padding"
            // keyboardVerticalOffset={keyboardVerticalOffset}
        >
            <AUIThemedView>
                <AUIThemedView style={styles.container}>
                    <AUISearchBar
                        searchPhrase={searchPhrase}
                        setSearchPhrase={setSearchPhrase}
                        clicked={clicked}
                        setClicked={setClicked}
                        containerStyle={{ width: "100%" }}
                    />

                    {/* Filter Button */}
                    <TouchableOpacity onPress={() => setIsFilterModalVisible(true)}>
                    <AUIFilter />
                </TouchableOpacity>
                </AUIThemedView>

                {/* Filter Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isFilterModalVisible}
                    onRequestClose={() => setIsFilterModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Filter Options</Text>

                            {/* Filter Options */}
                            <TouchableOpacity
                                style={styles.filterOption}
                                onPress={() => toggleFilter("view")}
                            >
                                <Text style={styles.filterText}>Sort by View</Text>
                                <Text style={styles.filterCheckbox}>
                                    {selectedFilters.view ? "✓" : ""}
                                </Text>
                            </TouchableOpacity>



                            {/* Apply and Reset Buttons */}
                            <View style={styles.buttonContainer}>
                                <Pressable
                                    style={[styles.button, styles.resetButton]}
                                    onPress={applyFilters}
                                >
                                    <Text style={styles.buttonText}>Close</Text>
                                </Pressable>
                                {/* <Pressable
                                    style={[styles.button, styles.resetButton]}
                                    onPress={resetFilters}
                                >
                                    <Text style={styles.buttonText}>Reset</Text>
                                </Pressable> */}
                            </View>
                        </View>
                    </View>
                </Modal>

                {schoolCourses && (
                    <AUIThemedView>
                        <AvailableCoursesList courses={schoolCourse?.docs || schoolCourse} />
                    </AUIThemedView>
                )}

                <TouchableOpacity
                    style={styles.loadMoreButton}
                    disabled={page === schoolCourse?.totalPages}
                    onPress={() => setPage(page + 1)}
                >
                    <AUIThemedText>
                        {page === schoolCourse?.totalPages
                            ? `${t("you_are_caught_up")}`
                            : `${t("load_more")}`}
                    </AUIThemedText>
                </TouchableOpacity>
            </AUIThemedView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 15,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: 300,
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 20,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
    },
    filterOption: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    filterText: {
        fontSize: 16,
    },
    filterCheckbox: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#007AFF",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    button: {
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 5,
    },
    applyButton: {
        backgroundColor: "#007AFF",
    },
    resetButton: {
        backgroundColor: "#FF3B30",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    loadMoreButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
        padding: 10,
    },
});
