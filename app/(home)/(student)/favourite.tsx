import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { GLOBAL_TEXT } from "@/constants/Properties";
import AllCoursesList from "../list/AllCoursesList";
import { FavoriteCourseData } from "@/constants/dummy data/FavoriteCourseData";
import { FavoriteSchoolData } from "@/constants/dummy data/FavoriteSchoolData";
import AllSchoolsList from "../list/AllSchoolsList";
import AllCountrySchoolsList from "../list/AllCountrySchoolsList";
import { FavoriteCountrySchoolData } from "@/constants/dummy data/FavoriteCountrySchoolData";
import SectionTitle from "@/components/home/common/SectionTitle";

const TabTwoScreen: React.FC = () => {
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [showAllSchools, setShowAllSchools] = useState(false);
  const [showAllCountrySchools, setShowAllCountrySchools] = useState(false);

  const showViewAllCourses = FavoriteCourseData.length > 6;
  const showViewAllSchools = FavoriteSchoolData.length > 6;
  const showViewAllCountrySchools = FavoriteCountrySchoolData.length > 6;

  const handleViewAllCoursesClick = () => {
    setShowAllCourses(true);
  };
  const handleViewAllSchoolsClick = () => {
    setShowAllSchools(true);
  };
  const handleViewAllCountrySchoolsClick = () => {
    setShowAllCountrySchools(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AUIThemedView style={styles.courseContainer}>
        <SectionTitle
          viewAll={showViewAllCourses && !showAllCourses ? "#" : undefined}
          onViewAllClick={handleViewAllCoursesClick}
        >
          {GLOBAL_TEXT.My_Favorite_Course}
        </SectionTitle>
        <AllCoursesList
          data={
            showAllCourses ? FavoriteCourseData : FavoriteCourseData.slice(0, 6)
          }
        />
      </AUIThemedView>

      <AUIThemedView style={styles.schoolContainer}>
        <SectionTitle
          viewAll={showViewAllSchools && !showAllSchools ? "#" : undefined}
          onViewAllClick={handleViewAllSchoolsClick}
        >
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
        <SectionTitle
          viewAll={
            showViewAllCountrySchools && !showAllCountrySchools
              ? "#"
              : undefined
          }
          onViewAllClick={handleViewAllCountrySchoolsClick}
        >
          {GLOBAL_TEXT.My_Favorite_School}
        </SectionTitle>
        <AllCountrySchoolsList
          data={
            showAllCountrySchools
              ? FavoriteCountrySchoolData
              : FavoriteCountrySchoolData.slice(0, 6)
          }
          schoolWidth={165}
          schoolHeight={150}
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
