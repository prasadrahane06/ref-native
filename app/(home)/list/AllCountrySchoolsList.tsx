import React from "react";
import { StyleSheet, FlatList, View, ListRenderItem } from "react-native";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import School from "@/components/School";

interface CountrySchoolData {
  id: string;
  name: string;
  image: any;
  favorite?: boolean;
}

interface CountrySchoolListProps {
  data: CountrySchoolData[];
  schoolWidth: number;
  schoolHeight: number;
}

const AllCountrySchoolsList: React.FC<CountrySchoolListProps> = ({
  data,
  schoolWidth,
  schoolHeight,
}) => {
  const renderItem: ListRenderItem<CountrySchoolData> = ({ item }) => (
    <View style={styles.courseItem}>
      <School
        title={item.name}
        image={item.image}
        favorite={item.favorite}
        schoolWidth={schoolWidth}
        schoolHeight={schoolHeight}
      />
    </View>
  );

  return (
    <AUIThemedView style={styles.courseContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.courseContainer}
      />
    </AUIThemedView>
  );
};

export default AllCountrySchoolsList;

const styles = StyleSheet.create({
  courseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  courseItem: {
    width: "48%",
    marginVertical: 5,
  },
});
