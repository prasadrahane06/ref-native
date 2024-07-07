import { AUIThemedView } from "@/components/common/AUIThemedView";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import AllSchoolsList from "../list/AllSchoolsList";
import useAxios from "@/app/services/axiosClient";
import { AUILinearGradient } from "@/components/common/AUILinearGradient";
import { LinearGradient } from "expo-linear-gradient";
import { APP_THEME } from "@/constants/Colors";

interface SchoolListProps {
    data: any[];
}
const AllSchoolsScreen: React.FC<SchoolListProps> = ({ data }) => {
    const { get } = useAxios();
    const { requestFn } = useApiRequest();
    const schoolsResponse = useSelector((state: RootState) => state.api.moreSchool || {});

    useEffect(() => {
        requestFn(API_URL.popularSchool, "moreSchool", { limit: 6 });
    }, []);

    return (
        <AUILinearGradient
            colors={[`${APP_THEME.primary.first}80`, "#ffffff"]}
            start={{ x: 1, y: 0 }} // Gradient start point
            end={{ x: 0, y: 1 }} // Gradient end point
            style={styles.container}
        >
            <AUIThemedView style={styles.wrapper}>
                <AllSchoolsList
                    data={schoolsResponse?.docs?.map((school: any) => ({
                        id: school._id,
                        name: school.name,
                        image: school.banner,
                        caption: school.description,
                        favorite: false,
                    }))}
                />
            </AUIThemedView>
        </AUILinearGradient>
    );
};

export default AllSchoolsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    wrapper: {
        marginTop: 80,
        backgroundColor: "transparent",
    },
    column: {
        justifyContent: "space-between",
    },
});
