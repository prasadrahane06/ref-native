import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { GLOBAL_TEXT } from "@/constants/Properties";
import AllCoursesList from "../list/AllCoursesList";
import { FavoriteCourseData } from "@/constants/dummy data/FavoriteCourseData";
import { FavoriteSchoolData } from "@/constants/dummy data/FavoriteSchoolData";
import AllSchoolsList from "../list/AllSchoolsList";
import AllCountryList from "../list/AllCountryList";
import SectionTitle from "@/components/home/common/SectionTitle";
import { destinationData } from "@/constants/dummy data/destinationData";

const TabTwoScreen: React.FC = () => {
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [showAllSchools, setShowAllSchools] = useState(false);
  const [showAllCountries, setShowAllCountries] = useState(false);

  const handleViewAllCoursesClick = () => {
    setShowAllCourses(true);
  };
  const handleViewAllSchoolsClick = () => {
    setShowAllSchools(true);
  };
  const handleViewAllCountrySchoolsClick = () => {
    setShowAllCountries(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AUIThemedView style={styles.courseContainer}>
        <SectionTitle onViewAllClick={handleViewAllCoursesClick}>
          {GLOBAL_TEXT.My_Favorite_Course}
        </SectionTitle>
        <AllCoursesList
          data={
            showAllCourses ? FavoriteCourseData : FavoriteCourseData.slice(0, 6)
          }
        />
      </AUIThemedView>

      <AUIThemedView style={styles.schoolContainer}>
        <SectionTitle onViewAllClick={handleViewAllSchoolsClick}>
          {GLOBAL_TEXT.My_Favorite_School}
        </SectionTitle>
        <AllSchoolsList
          data={
            showAllSchools ? FavoriteSchoolData : FavoriteSchoolData.slice(0, 6)
          }
          schoolWidth={165}
          schoolHeight={150}
        />
      </AUIThemedView>

      <AUIThemedView style={styles.countryschoolContainer}>
        <SectionTitle onViewAllClick={handleViewAllCountrySchoolsClick}>
          {GLOBAL_TEXT.My_Favorite_School}
        </SectionTitle>
        <AllCountryList
          data={
            showAllCountries ? destinationData : destinationData.slice(0, 6)
          }
          countryWidth={165}
          countryHeight={150}
          countryTopPosition={110}
        />
      </AUIThemedView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  courseContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#5BD894",
  },
  schoolContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#5BD894",
  },
  countryschoolContainer: {
    paddingBottom: 10,
  },
  header: {
    fontSize: 17,
    fontWeight: "bold",
    marginVertical: 5,
    marginHorizontal: 13,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridContainer: {
    width: "48%",
    marginHorizontal: "1%",
  },
});
export default TabTwoScreen;
