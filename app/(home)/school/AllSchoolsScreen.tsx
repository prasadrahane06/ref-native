import React, { useEffect } from "react";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import AllSchoolsList from "../list/AllSchoolsList";
import { StyleSheet } from "react-native";
import { get } from "@/app/services/axiosClient";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const AllSchoolsScreen = () => {
  const { requestFn } = useApiRequest();
  const schoolsResponse = useSelector(
    (state: RootState) => state.api.popularSchools || {}
  );
  const schoolsData = schoolsResponse.docs || [];

  useEffect(() => {
    requestFn(get(API_URL.popularSchool), "popularSchools");
  }, [requestFn]);

  return (
    <AUIThemedView style={styles.container}>
      <AllSchoolsList
        data={schoolsData.map((school) => ({
          id: school._id,
          name: school.name,
          image: school.logo,
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
  },
});
