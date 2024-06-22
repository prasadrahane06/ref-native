import AUIInfoCard from "@/components/AUIInfoCard";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import CourseList from "@/components/home/common/CourseList";
import ChartComponent from "@/components/home/common/LinearChart";
import SectionTitle from "@/components/home/common/SectionTitle";
import { APP_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { coursesData } from "@/constants/dummy data/coursesData";
import React from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";

export default function HomeScreen() {
  const courseInfoData = [
    {
      id: "1",
      title: "3505+",
      subtitle: "Total Numbers of student",
    },
    {
      id: "2",
      title: "206+",
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

  return (
    <ScrollView>
      <AUIThemedView style={styles.section}>
        <SectionTitle>{GLOBAL_TEXT.welcome_to_my_school}</SectionTitle>
        <AUIThemedView style={{ alignItems: "center", marginTop: 15 }}>
          <FlatList
            scrollEnabled={false}
            data={courseInfoData}
            numColumns={2}
            renderItem={({ item }) => (
              <AUIInfoCard
                titleStyle={{ fontSize: 21 }}
                subtitleStyle={{
                  fontSize: 14,
                  color: APP_THEME.gray,
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
