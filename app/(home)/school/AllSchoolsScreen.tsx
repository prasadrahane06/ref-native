import React, { useEffect } from "react";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { StyleSheet } from "react-native";
import AllSchoolsList from "../list/AllSchoolsList";
import useApiRequest from "@/customHooks/useApiRequest";
import { get } from "@/app/services/axiosClient";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { API_URL } from "@/constants/urlProperties";

interface SchoolListProps {
  data: any[];
}
const AllSchoolsScreen: React.FC<SchoolListProps> = ({ data }) => {
  const { requestFn } = useApiRequest();
  const schoolsResponse = useSelector(
    (state: RootState) => state.api.moreSchool || {}
  );

  useEffect(() => {
    requestFn(get(API_URL.popularSchool, { limit: 6 }), "moreSchool");
  }, []);

  return (
    <AUIThemedView style={styles.container}>
      <AllSchoolsList
        data={schoolsResponse?.docs?.map((school: any) => ({
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
    // justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  column: {
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
