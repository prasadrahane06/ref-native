import useAxios from "@/app/services/axiosClient";
import Course from "@/components/Course";
import { AUILinearGradient } from "@/components/common/AUILinearGradient";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME, BACKGOUND_THEME } from "@/constants/Colors";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const AllCoursesScreen = () => {
    const courseResponse = useSelector(
        (state: RootState) => state.api.selectedLanguagecourse || {}
    );
    const theme = useSelector((state: RootState) => state.global.theme);

    // useEffect(() => {
    //     requestFn(API_URL.course, "popularCourse");
    // }, []);

    return (
        <AUILinearGradient
            colors={[`${APP_THEME[theme].primary.first}`, BACKGOUND_THEME[theme].backgound]}
            start={{ x: 1, y: 0 }} // Gradient start point
            end={{ x: 0, y: 1 }} // Gradient end point
            style={styles.container}
        >
            <AUIThemedView style={styles.wrapper}>
                <FlatList
                    data={courseResponse.docs}
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
            </AUIThemedView>
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
});
