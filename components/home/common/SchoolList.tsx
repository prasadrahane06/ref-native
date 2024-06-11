import School from "@/components/School";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

interface SchoolListProps {
  data: any[]; // Assuming the data is an array of schools
}

const SchoolList: React.FC<SchoolListProps> = ({ data }) => {
  return (
    <AUIThemedView style={styles.container}>
      <FlatList
        horizontal
        data={data}
        renderItem={({ item }) => (
          <School
            title={item.school}
            image={item.image}
            caption={item.caption}
            schoolWidth={270}
            schoolHeight={160}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </AUIThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 14,
  },
});

export default SchoolList;
