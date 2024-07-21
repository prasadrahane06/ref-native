import { AUILinearGradient } from "@/components/common/AUILinearGradient";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME, BACKGROUND_THEME } from "@/constants/Colors";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import AllSchoolsList from "../list/AllSchoolsList";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { ScrollView } from "react-native-gesture-handler";
import useApiRequest from "@/customHooks/useApiRequest";
import { API_URL } from "@/constants/urlProperties";


interface SchoolListProps {
    data: any[];
}

const AllSchoolsScreen: React.FC<SchoolListProps> = ({ data }) => {
    const [page, setPage] = useState(1);
    const schoolsResponse = useLangTransformSelector((state: RootState) => state.api.AllSchool || {});
    const { requestFn } = useApiRequest();
    const theme = useSelector((state: RootState) => state.global.theme);

    useEffect(() => {
        requestFn(API_URL.school, "AllSchool", { page: `${page}` });
    }, [page]);

    return (
        <AUILinearGradient
            colors={[APP_THEME[theme].primary.first, BACKGROUND_THEME[theme].background]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.wrapper}>
                <AllSchoolsList
                    data={schoolsResponse?.docs?.map((school: any) => ({
                        id: school._id,
                        name: school.name,
                        image: school.banner,
                        caption: school.description,
                        favorite: false,
                    }))}
                />
                <TouchableOpacity
                    style={styles.loadMoreButton}
                    disabled={page === schoolsResponse.totalPages}
                    onPress={() => setPage(page + 1)}
                >
                    <AUIThemedText>
                        {page === schoolsResponse.totalPages ? "You are Caught Up" : "Load More"}
                    </AUIThemedText>
                </TouchableOpacity>
            </ScrollView>
        </AUILinearGradient>
    );
};

export default AllSchoolsScreen;

const styles = StyleSheet.create({

    scrollContainer: {
        flexGrow: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 80,
        backgroundColor: "transparent",
    },
    loadMoreButton: {
        padding: 10,
    },
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
