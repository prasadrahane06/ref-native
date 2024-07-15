import Course from "@/components/Course";
import { AUILinearGradient } from "@/components/common/AUILinearGradient";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME, BACKGROUND_THEME } from "@/constants/Colors";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const AllCoursesScreen = () => {
    const theme = useSelector((state: RootState) => state.global.theme);
    const courseResponse = useLangTransformSelector(
        (state: RootState) => state.api.selectedLanguagecourse || {}
    );
    return (
        <AUILinearGradient
            colors={[`${APP_THEME[theme].primary.first}`, BACKGROUND_THEME[theme].background]}
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
