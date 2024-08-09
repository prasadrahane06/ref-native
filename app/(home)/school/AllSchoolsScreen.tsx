import { AUILinearGradient } from "@/components/common/AUILinearGradient";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { APP_THEME, BACKGROUND_THEME } from "@/constants/Colors";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
// import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import AllSchoolsList from "../list/AllSchoolsList";
import { useTranslation } from "react-i18next";

import { ApiSuccessToast } from "@/components/common/AUIToast";

interface SchoolListProps {
    data: any[];
}

const AllSchoolsScreen: React.FC<SchoolListProps> = ({ data }) => {
    const { t } = useTranslation();
    const { requestFn } = useApiRequest();

    const [page, setPage] = useState(1);

    const schoolsResponse = useLangTransformSelector(
        (state: RootState) => state.api.AllSchool || {}
    );

    const theme = useSelector((state: RootState) => state.global.theme);

    useEffect(() => {
        requestFn(API_URL.school, "AllSchool", { page: `${page}`, status: 2 });
    }, [page]);

    return (
        <AUILinearGradient
            colors={[APP_THEME[theme].primary.first, BACKGROUND_THEME[theme].background]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <ScrollView style={styles.wrapper}>
                <AllSchoolsList
                    data={schoolsResponse?.docs?.map((school: any) => ({
                        id: school?._id,
                        name: school?.name,
                        image: school?.banner,
                        caption: school?.description,
                        favorite: false,
                    }))}
                />
                {page !== schoolsResponse.totalPages && (
                    <TouchableOpacity
                        style={styles.loadMoreButton}
                        disabled={page === schoolsResponse.totalPages}
                        onPress={() => setPage(page + 1)}
                    >
                        <AUIThemedText
                            style={{ textAlign: "center", textDecorationLine: "underline" }}
                        >
                            {t("load_more")}
                        </AUIThemedText>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </AUILinearGradient>
    );
};

export default AllSchoolsScreen;

const width = Dimensions.get("window").width;

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
        marginVertical: 10,
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
        // justifyContent: "space-between",
        // marginBottom: 10,
    },
    course: {
        marginVertical: 5,
        // width: "48%",
        width: width / 2 - 20,
    },
});
