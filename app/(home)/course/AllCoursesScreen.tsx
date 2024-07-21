import Course from "@/components/Course";
import { AUILinearGradient } from "@/components/common/AUILinearGradient";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME, BACKGROUND_THEME } from "@/constants/Colors";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

const AllCoursesScreen = () => {
    //state
    const [page, setPage] = useState(1);
    const theme = useSelector((state: RootState) => state.global.theme);
    const selectedLanguage = useLangTransformSelector(
        (state: RootState) => state.global.selectedLanguage
    );
    const courseResponse = useLangTransformSelector(
        (state: RootState) => state.api.selectedLanguageCourse
    );

    const { requestFn } = useApiRequest();

    useEffect(() => {
        if (selectedLanguage) {
            requestFn(API_URL.course, "selectedLanguageCourse", { similar: selectedLanguage });
        }
    }, [page]);

    return (
        <AUILinearGradient
            colors={[`${APP_THEME[theme].primary.first}`, BACKGROUND_THEME[theme].background]}
            start={{ x: 1, y: 0 }} // Gradient start point
            end={{ x: 0, y: 1 }} // Gradient end point
            style={styles.container}
        >
            <ScrollView style={styles.wrapper}>
                <FlatList
                    data={courseResponse?.docs}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                        <Course
                            title={item.courseName}
                            image={item.image}
                            style={styles.course}
                            courseId={item._id}
                            startingDate={item?.startDate}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        />
                    )}
                    keyExtractor={(item) => item._id}
                    numColumns={2}
                    columnWrapperStyle={styles.column}
                />
                <TouchableOpacity
                    style={styles.loadMoreButton}
                    disabled={page === courseResponse?.totalPages}
                    onPress={() => setPage(page + 1)}
                >
                    <AUIThemedText>
                        {page === courseResponse.totalPages ? "You are Caught Up" : "Load More"}
                    </AUIThemedText>
                </TouchableOpacity>
            </ScrollView>
        </AUILinearGradient>
    );
};

export default AllCoursesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 5,
    },
    wrapper: {
        marginTop: 100,
        backgroundColor: "transparent",
    },
    column: {
        justifyContent: "space-between",
        // marginBottom: 10,
    },
    course: {
        marginVertical: 5,
        width: "48%",
    },
    loadMoreButton: {
        padding: 10,
    },
});
