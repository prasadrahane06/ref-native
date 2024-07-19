import AUIButton from "@/components/common/AUIButton";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import CourseList from "@/components/home/common/CourseList";
import SectionTitle from "@/components/home/common/SectionTitle";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function TabThreeScreen() {
    const school = useLangTransformSelector((state: RootState) => state.api.MySchoolDetails || {});

    return (
        <AUIThemedView style={styles.root}>
            <ScrollView>
                <AUIThemedView style={styles.section}>
                    <AUIThemedView style={styles.headerContainer}>
                        <SectionTitle style={{ paddingBottom: 10 }}>
                            {GLOBAL_TEXT.recent_courses}
                        </SectionTitle>
                        <AUIButton
                            style={styles.AddNewCourseButton}
                            title={"Add new course"}
                            selected
                            onPress={() =>
                                router.push({
                                    pathname: "(home)/AddNewCourse/AddCourse",
                                })
                            }
                            disabled={false}
                        />
                    </AUIThemedView>
                    <CourseList data={school[0]?.courses} />
                </AUIThemedView>
                {/* <AUIThemedView style={styles.section}>
                    <SectionTitle style={{ paddingBottom: 10 }}>
                        {GLOBAL_TEXT.ongoing_courses}
                    </SectionTitle>
                    <CourseList data={coursesData} />
                </AUIThemedView>
                <AUIThemedView style={styles.section}>
                    <SectionTitle style={{ paddingBottom: 10 }}>
                        {GLOBAL_TEXT.upcoming_courses}
                    </SectionTitle>
                    <CourseList data={coursesData} />
                </AUIThemedView> */}
            </ScrollView>
        </AUIThemedView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    headerImage: {
        bottom: -90,
        left: -35,
        position: "absolute",
    },
    titleContainer: {
        flexDirection: "row",
        gap: 8,
    },
    section: {},
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    AddNewCourseButton: { width: "35%", marginHorizontal: 15 },
});
