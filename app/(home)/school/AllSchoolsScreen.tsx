import { AUILinearGradient } from "@/components/common/AUILinearGradient";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME, BACKGROUND_THEME } from "@/constants/Colors";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import React from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import AllSchoolsList from "../list/AllSchoolsList";

interface SchoolListProps {
    data: any[];
}
const AllSchoolsScreen: React.FC<SchoolListProps> = ({ data }) => {
    const schoolsResponse = useLangTransformSelector((state: RootState) => state.api.school || {});
    const theme = useSelector((state: RootState) => state.global.theme);
    return (
        <AUILinearGradient
            colors={[`${APP_THEME[theme].primary.first}`, BACKGROUND_THEME[theme].background]}
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
