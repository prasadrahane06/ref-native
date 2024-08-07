import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Modal, View, Text, Pressable, FlatList } from "react-native";
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
// import { t } from "i18next";

export default function CoursesTab({ schoolCourses }: { schoolCourses: any }) {
    const { t } = useTranslation();
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const schoolCourse = useLangTransformSelector((state: RootState) => state.api.schoolCourse || {});
    const [page, setPage] = useState<number>(1);
    const [isFilterModalVisible, setIsFilterModalVisible] = useState<boolean>(false);
    const [selectedFilters, setSelectedFilters] = useState({
        view: false,
        lastChance: false,
        rating: false,
    });

    console.log("schoolCourses ===", schoolCourse._id);

    const { requestFn } = useApiRequest();
    const debouncedSearchPhrase = useDebounce(searchPhrase, 1000);

    useEffect(() => {
        if (debouncedSearchPhrase) {
            requestFn(API_URL.schoolSearch, "schoolCourse", {
                client: schoolCourses?._id,
                courseName: debouncedSearchPhrase,
            });
        } else {
            requestFn(API_URL.course, "schoolCourse", { client: schoolCourses?._id, page: `${page}` });
        }
    }, [debouncedSearchPhrase, page]);

    // Function to handle filter application
    const applyFilters = () => {
        requestFn(API_URL.schoolSearch, "schoolCourse", {
            client: schoolCourses?._id,
            courseName: debouncedSearchPhrase,
            view : selectedFilters.view,
            rating : selectedFilters.rating,
            lastChance : selectedFilters.lastChance 
        })
        
        console.log('Filters applied:', selectedFilters);
        setIsFilterModalVisible(false); 
    };


    const resetFilters = () => {
        setSelectedFilters({
            view: false,
            lastChance: false,
            rating: false,
        });
        setIsFilterModalVisible(false); 
    };

    const toggleFilter = (filterName: string) => {
        setSelectedFilters((prevState : any ) => ({
            ...prevState,
            [filterName]: !prevState[filterName],
        }));
    };

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
                        <TouchableOpacity style={styles.filterOption} onPress={() => toggleFilter('view')}>
                            <Text style={styles.filterText}>Sort by View</Text>
                            <Text style={styles.filterCheckbox}>
                                {selectedFilters.view ? '✓' : ''}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.filterOption} onPress={() => toggleFilter('lastChance')}>
                            <Text style={styles.filterText}>Last Chance</Text>
                            <Text style={styles.filterCheckbox}>
                                {selectedFilters.lastChance ? '✓' : ''}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.filterOption} onPress={() => toggleFilter('rating')}>
                            <Text style={styles.filterText}>By Rating</Text>
                            <Text style={styles.filterCheckbox}>
                                {selectedFilters.rating ? '✓' : ''}
                            </Text>
                        </TouchableOpacity>

                        {/* Apply and Reset Buttons */}
                        <View style={styles.buttonContainer}>
                            <Pressable
                                style={[styles.button, styles.applyButton]}
                                onPress={applyFilters}
                            >
                                <Text style={styles.buttonText}>Apply</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.resetButton]}
                                onPress={resetFilters}
                            >
                                <Text style={styles.buttonText}>Reset</Text>
                            </Pressable>
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
                    {page === schoolCourse?.totalPages ? `${t("you_are_caught_up")}` :`${t("load_more")}`}
                </AUIThemedText>
            </TouchableOpacity>
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
        alignContent: "center",
        justifyContent: "center",
        marginVertical: 10,
        padding: 10,
    },
});
