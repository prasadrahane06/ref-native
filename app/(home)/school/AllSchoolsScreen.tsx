import { get } from "@/app/services/axiosClient";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import AllSchoolsList from "../list/AllSchoolsList";

interface SchoolListProps {
    data: any[];
}
const AllSchoolsScreen: React.FC<SchoolListProps> = ({ data }) => {
    const { requestFn } = useApiRequest();
    const schoolsResponse = useSelector((state: RootState) => state.api.moreSchool || {});

    useEffect(() => {
        requestFn(get(API_URL.popularSchool, { limit: 6 }), "moreSchool");
    }, []);

    return (
        <AUIThemedView style={styles.container}>
            <AllSchoolsList
                data={schoolsResponse?.docs?.map((school: any) => ({
                    id: school._id,
                    name: school.name,
                    image: school.banner,
                    caption: school.description,
                    favorite: false,
                }))}
                schoolWidth={165}
                schoolHeight={150}
            />
        </AUIThemedView>
    );
};

export default AllSchoolsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    column: {
        justifyContent: "space-between",
        marginBottom: 10,
    },
});
