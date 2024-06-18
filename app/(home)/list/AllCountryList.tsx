import React from "react";
import { StyleSheet, FlatList, View, ListRenderItem } from "react-native";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import Destination from "@/components/Destination";

interface CountryData {
  id: string;
  country: string;
  image: any;
  favorite?: boolean;
}

interface CountryListProps {
  data: CountryData[];
  countryWidth: number;
  countryHeight: number;
  countryTopPosition: number;
}

const AllCountryList: React.FC<CountryListProps> = ({
  data,
  countryWidth,
  countryHeight,
  countryTopPosition,
}) => {
  const renderItem: ListRenderItem<CountryData> = ({ item }) => (
    <View style={styles.courseItem}>
      <Destination
        title={item.country}
        image={item.image}
        favorite={item.favorite}
        countryWidth={countryWidth}
        countryHeight={countryHeight}
        countryTopPosition={countryTopPosition}
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

export default AllCountryList;

const styles = StyleSheet.create({
  courseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  courseItem: {
    width: "48%",
    marginVertical: -3,
  },
});
