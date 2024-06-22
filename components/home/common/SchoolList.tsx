import School from "@/components/School";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

interface SchoolListProps {
  data: any[];
  dummyData: any[];
}
const SchoolList: React.FC<SchoolListProps> = ({ data, dummyData }) => {
  return (
    <AUIThemedView style={styles.container}>
      <FlatList
        horizontal
        data={data}
        renderItem={({ item, index }) => (
          <AUIThemedView key={item._id}>
            <School
              id={item._id}
              title={item.name}
              image={item.banner ? item.banner : dummyData[index].image}
              caption={dummyData[index].caption}
              schoolWidth={270}
              schoolHeight={160}
            />
          </AUIThemedView>
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
