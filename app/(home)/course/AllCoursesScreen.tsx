import useAxios from "@/app/services/axiosClient";
import Course from "@/components/Course";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const AllCoursesScreen = () => {
    const { requestFn } = useApiRequest();
    const { get } = useAxios();

    const courseResponse = useSelector((state: RootState) => state.api.popularCourse || {});

    useEffect(() => {
        requestFn(API_URL.course, "popularCourse");
    }, []);

    return (
        <AUIThemedView style={styles.container}>
            <FlatList
                data={courseResponse.docs}
                renderItem={({ item }) => (
                    <Course title={item.courseName} image={item.image} style={styles.course} id={item._id} />
                )}
                keyExtractor={(item) => item._id}
                numColumns={2}
                columnWrapperStyle={styles.column}
            />
        </AUIThemedView>
    );
};

export default AllCoursesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
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
