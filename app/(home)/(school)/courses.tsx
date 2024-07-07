import { AUIThemedView } from "@/components/common/AUIThemedView";
import CourseList from "@/components/home/common/CourseList";
import SectionTitle from "@/components/home/common/SectionTitle";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { coursesData } from "@/constants/dummy data/coursesData";
import { RootState } from "@/redux/store";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

export default function TabThreeScreen() {
    const school = useSelector((state: RootState) => state.api.MySchoolDetails || {});

    return (
        <AUIThemedView style={styles.root}>
            <ScrollView>
                <AUIThemedView style={styles.section}>
                    <SectionTitle style={{ paddingBottom: 10 }}>
                        {GLOBAL_TEXT.recent_courses}
                    </SectionTitle>
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
        backgroundColor: "#ffffff",
    },
    headerImage: {
        color: "#808080",
        bottom: -90,
        left: -35,
        position: "absolute",
    },
    titleContainer: {
        flexDirection: "row",
        gap: 8,
    },
    section: {},
});
