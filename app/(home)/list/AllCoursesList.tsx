import React from "react";
import { StyleSheet, FlatList, View, ListRenderItem } from "react-native";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import Course from "@/components/Course";

interface CourseData {
  title: string;
  startDate: string;
  image: any;
  favorite?: boolean;
}

interface CourseListProps {
  data: CourseData[];
}

const AllCoursesList: React.FC<CourseListProps> = ({ data }) => {
  const renderItem: ListRenderItem<CourseData> = ({ item }) => (
    <View style={styles.courseItem}>
      <Course title={item.title} image={item.image} favorite={item.favorite} />
    </View>
  );

  return (
    <AUIThemedView style={styles.courseContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.courseContainer}
      />
    </AUIThemedView>
  );
};

export default AllCoursesList;

const styles = StyleSheet.create({
  courseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    marginTop: 5,
  },
  courseItem: {
    width: "48%",
    marginBottom: 10,
  },
});
