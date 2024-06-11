import React from "react";
import { StyleSheet, FlatList, View, ListRenderItem } from "react-native";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import School from "@/components/School";

interface SchoolData {
  id: string;
  name: string;
  image: any;
  caption?: string;
  favorite?: boolean;
}

interface SchoolListProps {
  data: SchoolData[];
  schoolWidth: number;
  schoolHeight: number;
}

const AllSchoolsList: React.FC<SchoolListProps> = ({
  data,
  schoolWidth,
  schoolHeight,
}) => {
  const renderItem: ListRenderItem<SchoolData> = ({ item }) => (
    <View style={styles.schoolItem}>
      <School
        title={item.name}
        caption={item.caption}
        image={item.image}
        favorite={item.favorite}
        schoolWidth={schoolWidth}
        schoolHeight={schoolHeight}
      />
    </View>
  );

  return (
    <AUIThemedView style={styles.schoolContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.schoolContainer}
      />
    </AUIThemedView>
  );
};

export default AllSchoolsList;

const styles = StyleSheet.create({
  schoolContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    paddingBottom: 3,
  },
  schoolItem: {
    width: "48%",
    marginVertical: 4,
  },
});
