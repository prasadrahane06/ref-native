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
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItem, ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

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
    const {requestFn} = useApiRequest()
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

    const getfavorite = useSelector((state: RootState) => state.api.favorite || {});
    const fav = getfavorite?.docs[0]

    useEffect(()=>{
        console.log("getfavorite", JSON.stringify(getfavorite.docs[0]))
    },[getfavorite])
    

    useEffect(()=>{
        requestFn(API_URL.favorite , "favorite" , {user : true})
    },[])

    const renderCourseItem: ListRenderItem<CourseData> = ({ item }) => (
        <AUIThemedView style={styles.courseItem}>
            <Course
                courseId={item._id}

                title={item.courseName}
                image={item.image}
                favorite={item.favorite}
                startingDate={item.startingDate}
            />
        </AUIThemedView>
    );

    const renderSchoolItem: ListRenderItem<SchoolData> = ({ item }) => (
        <AUIThemedView style={styles.schoolItem}>
            <School
                id={item._id}
                title={item.name}
                caption={item.discription}
                image={item.banner}
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
                    data={showAllCourses ? fav.courses : fav.courses.slice(0, 6)}
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
                    data={showAllSchools ? fav.clients : fav.clients.slice(0, 6)}
                    renderItem={renderSchoolItem}
                    keyExtractor={(item) => item._id}
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
                    data={showAllCountries ? destinationData : destinationData.slice(0, 6)}
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
        paddingHorizontal: 12,
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
        paddingBottom: 3,
        backgroundColor: APP_THEME.background,
    },
    destinationContainer: {
        // backgroundColor: "red",
        bottom: 10,
    },

    courseItem: {
        width: "48%",
        marginBottom: 10,
        backgroundColor: APP_THEME.background,
    },
    schoolItem: {
        width: "48%",
        marginBottom: 10,
        marginTop: -10,
        paddingHorizontal: 1,
        backgroundColor: APP_THEME.background,
    },
    destinationItem: {
        width: "48%",
        // backgroundColor: APP_THEME.background,
        // backgroundColor: "blue",
        top: 6,
        marginVertical: -6,
    },

    courseColumnWrapper: {
        justifyContent: "space-between",
        backgroundColor: APP_THEME.background,
        marginTop: 10,
        marginBottom: -8,
    },
    schoolColumnWrapper: {
        justifyContent: "space-between",
        backgroundColor: APP_THEME.background,
        marginTop: 10,
    },
    destinationColumnWrapper: {
        justifyContent: "space-between",
        // backgroundColor: APP_THEME.background,
    },
});

export default TabTwoScreen;
