import AUIInfoCard from "@/components/AUIInfoCard";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import CourseList from "@/components/home/common/CourseList";
import ChartComponent from "@/components/home/common/LinearChart";
import SectionTitle from "@/components/home/common/SectionTitle";
import { APP_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { coursesData } from "@/constants/dummy data/coursesData";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function HomeScreen() {
    const data = {
        students: {
            title: "1500+",
            subtitle: "Total number of students",
            navigation: "studentTab",
        },
        courses: {
            title: "150+",
            subtitle: "Total number of courses",
            navigation: "courses",
        },
        admissions: {
            title: "1200+",
            subtitle: "Total number of admissions",
            navigation: "studentTab",
        },
        revenue: {
            title: "$1200000",
            subtitle: "Total revenue",
            navigation: "facilities",
        },
    };

    const pairs = Object.keys(data).reduce((result, key, index, array) => {
        if (index % 2 === 0) {
            result.push(array.slice(index, index + 2));
        }
        return result;
    }, [] as string[][]);

    return (
        <ScrollView>
            <AUIThemedView style={styles.section}>
                <SectionTitle>{GLOBAL_TEXT.welcome_to_my_school}</SectionTitle>
                {pairs.map((pair, index) => (
                    <AUIThemedView key={index} style={styles.infoCardRow}>
                        {pair.map((key, index) => {
                            const { title, subtitle, navigation } = data[key];
                            return (
                                <AUIInfoCard
                                    key={index}
                                    title={title}
                                    subtitle={subtitle}
                                    navigation={navigation}
                                />
                            );
                        })}
                    </AUIThemedView>
                ))}

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
                    <SectionTitle viewAll="#" style={{ paddingBottom: 10 }}>
                        {GLOBAL_TEXT.ongoing_courses}
                    </SectionTitle>
                    <CourseList data={coursesData} />
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
