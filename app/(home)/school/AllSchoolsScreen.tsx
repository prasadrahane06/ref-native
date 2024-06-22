import React, { useEffect } from "react";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { FlatList, StyleSheet } from "react-native";
import { FavoriteSchoolData } from "@/constants/dummy data/FavoriteSchoolData";
import School from "@/components/School";
import { schoolsData } from "@/constants/dummy data/schoolsData";
import { API_URL } from "@/constants/urlProperties";
import AllSchoolsList from "../list/AllSchoolsList";
import useApiRequest from "@/customHooks/useApiRequest";
import { get } from "@/app/services/axiosClient";

interface SchoolListProps {
  data: any[];
}
const AllSchoolsScreen: React.FC<SchoolListProps> = ({ data }) => {
  const { requestFn } = useApiRequest();

  useEffect(() => {
    requestFn(get(API_URL.popularSchool, { limit: 6 }), "popularSchools");
  }, [requestFn]);

  return (
    <AUIThemedView style={styles.container}>
      <AllSchoolsList
        data={schoolsData.map((school) => ({
          id: school._id,
          name: school.name,
          image: school.banner,
          caption: school.description,
          favorite: false,
        }))}
        schoolWidth={165}
        schoolHeight={150}
      />
    </AUIThemedView>
  );
};

export default AllSchoolsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  column: {
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
