import AUIInfoCard from "@/components/AUIInfoCard";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import CourseList from "@/components/home/common/CourseList";
import ChartComponent from "@/components/home/common/LinearChart";
import SectionTitle from "@/components/home/common/SectionTitle";
import { APP_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { getUserData } from "@/constants/RNAsyncStore";
import { coursesData } from "@/constants/dummy data/coursesData";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function HomeScreen() {
    const { requestFn } = useApiRequest();
    const school = useLangTransformSelector((state: RootState) => state.api.individualSchool || {});
    const theme = useSelector((state: RootState) => state.global.theme);
    const MySchoolDetails = useLangTransformSelector((state: RootState) => state.api.MySchoolDetails || {});

    const courseInfoData = [
        {
            id: "1",
            title: "2+",
            subtitle: "Total Numbers of student",
        },
        {
            id: "2",
            title: "4+",
            subtitle: "Total Number of Courses",
        },
        {
            id: "3",
            title: "103+",
            subtitle: "Total Pending Admission",
        },
        {
            id: "4",
            title: "$10024",
            subtitle: "Total Revenue of School",
        },
    ];

  

    useEffect(()=>{
        requestFn(API_URL.schoolOverview , "MySchoolDetails" , {client : true })
    },[])

    return (
        <ScrollView>
            <AUIThemedView style={styles.section}>
                <SectionTitle>{`${MySchoolDetails[0]?.name}`}</SectionTitle>
                <AUIThemedView style={{ alignItems: "center", marginTop: 15 }}>
                    <FlatList
                        scrollEnabled={false}
                        data={MySchoolDetails[0]?.schoolInfo}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <AUIInfoCard
                                titleStyle={{ fontSize: 21 }}
                                subtitleStyle={{
                                    fontSize: 14,
                                    color: APP_THEME[theme].gray,
                                }}
                                title={item.title}
                                subtitle={item.subtitle}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </AUIThemedView>

                <ChartComponent
                    title="Earnings"
                    labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
                    pendingData={[
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                    ]}
                    doneData={[
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                    ]}
                    yAxisLabel="$"
                    yAxisSuffix="k"
                    yAxisInterval={1}
                />

                <AUIThemedView style={styles.section}>
                    <SectionTitle style={{ paddingBottom: 10 }}>
                        {GLOBAL_TEXT.ongoing_courses}
                    </SectionTitle>
                    <CourseList data={MySchoolDetails[0]?.courses?.slice(0,4)} />
                </AUIThemedView>
            </AUIThemedView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    infoCardRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    section: {
        marginBottom: 16,
    },
});
