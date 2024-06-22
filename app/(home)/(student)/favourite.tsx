import Course from "@/components/Course";
import Destination from "@/components/Destination";
import School from "@/components/School";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import SectionTitle from "@/components/home/common/SectionTitle";
import { APP_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { FavoriteCourseData } from "@/constants/dummy data/FavoriteCourseData";
import { FavoriteSchoolData } from "@/constants/dummy data/FavoriteSchoolData";
import { destinationData } from "@/constants/dummy data/destinationData";
import React, { useState } from "react";
import { FlatList, ListRenderItem, ScrollView, StyleSheet } from "react-native";

interface CourseData {
  title: string;
  startingDate: string;
  image: any;
  favorite?: boolean;
}

interface SchoolData {
  id: string;
  name: string;
  image: any;
  caption?: string;
  favorite?: boolean;
}

interface CountryData {
  id: string;
  country: string;
  image: any;
  favorite?: boolean;
}

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

  const renderCourseItem: ListRenderItem<CourseData> = ({ item }) => (
    <AUIThemedView style={styles.courseItem}>
      <Course
        title={item.title}
        image={item.image}
        favorite={item.favorite}
        // startingDate={item.startingDate}
      />
    </AUIThemedView>
  );

  const renderSchoolItem: ListRenderItem<SchoolData> = ({ item }) => (
    <AUIThemedView style={styles.schoolItem}>
      <School
        id={item.id}
        title={item.name}
        caption={item.caption}
        image={item.image}
        favorite={item.favorite}
        schoolWidth={160}
        schoolHeight={145}
      />
    </AUIThemedView>
  );

  const renderCountryItem: ListRenderItem<CountryData> = ({ item }) => (
    <AUIThemedView style={styles.destinationItem}>
      <Destination
        title={item.country}
        image={item.image}
        favorite={item.favorite}
        countryWidth={160}
        countryHeight={145}
        countryTopPosition={110}
      />
    </AUIThemedView>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AUIThemedView style={styles.coursesContainer}>
        <SectionTitle
          onViewAllClick={handleViewAllCoursesClick}
          style={{ paddingHorizontal: 5 }}
        >
          {GLOBAL_TEXT.My_Favorite_Courses}
        </SectionTitle>
        <FlatList
          data={
            showAllCourses ? FavoriteCourseData : FavoriteCourseData.slice(0, 6)
          }
          renderItem={renderCourseItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={styles.courseColumnWrapper}
          scrollEnabled={false}
        />
      </AUIThemedView>

      <AUIThemedView style={styles.schoolContainer}>
        <SectionTitle
          onViewAllClick={handleViewAllSchoolsClick}
          style={{ paddingBottom: 10, paddingHorizontal: 5 }}
        >
          {GLOBAL_TEXT.My_Favorite_Schools}
        </SectionTitle>
        <FlatList
          data={
            showAllSchools ? FavoriteSchoolData : FavoriteSchoolData.slice(0, 6)
          }
          renderItem={renderSchoolItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.schoolColumnWrapper}
          scrollEnabled={false}
        />
      </AUIThemedView>

      <AUIThemedView style={styles.destinationContainer}>
        <SectionTitle
          onViewAllClick={handleViewAllCountrySchoolsClick}
          style={{ paddingHorizontal: 5 }}
        >
          {GLOBAL_TEXT.My_Favorite_Cities}
        </SectionTitle>
        <FlatList
          data={
            showAllCountries ? destinationData : destinationData.slice(0, 6)
          }
          renderItem={renderCountryItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.destinationColumnWrapper}
          scrollEnabled={false}
        />
      </AUIThemedView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: APP_THEME.background,
  },
  coursesContainer: {
    borderBottomWidth: 1,
    borderColor: "#5BD894",
    paddingBottom: 10,
    backgroundColor: APP_THEME.background,
  },
  schoolContainer: {
    borderBottomWidth: 1,
    borderColor: "#5BD894",
    backgroundColor: APP_THEME.background,
  },
  destinationContainer: {
    backgroundColor: APP_THEME.background,
    marginBottom: 10,
  },
  courseItem: {
    width: "48%",
    marginBottom: 10,
    backgroundColor: APP_THEME.background,
  },
  schoolItem: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: "55%",
    // marginHorizontal: 7,
    backgroundColor: APP_THEME.background,
  },
  destinationItem: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: "55%",
    marginLeft: 7,
    backgroundColor: APP_THEME.background,
  },
  courseColumnWrapper: {
    justifyContent: "space-between",
    backgroundColor: APP_THEME.background,
    marginTop: 10,
    marginBottom: -8,
  },
  schoolColumnWrapper: {
    marginHorizontal: 9,
    justifyContent: "center",
    backgroundColor: APP_THEME.background,
  },
  destinationColumnWrapper: {
    marginBottom: -20,
    backgroundColor: APP_THEME.background,
    marginHorizontal: 9,
    justifyContent: "center",
  },
});

export default TabTwoScreen;
