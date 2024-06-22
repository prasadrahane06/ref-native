import React from "react";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { StyleSheet, FlatList } from "react-native";
import Course from "@/components/Course";
import { coursesData } from "@/constants/dummy data/coursesData";

const AllCoursesScreen = () => {
  const displayedCourses = coursesData.slice(0, 4);

  return (
    <AUIThemedView style={styles.container}>
      <FlatList
        data={displayedCourses}
        renderItem={({ item }) => (
          <Course title={item.name} image={item.image} style={styles.course} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.column}
      />
    </AUIThemedView>
  );
};

export default AllCoursesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  column: {
    justifyContent: "space-between",
    // marginBottom: 10,
  },
  course: {
    marginVertical: 5,
    width: "48%",
  },
});
