import Course from "@/components/Course";
import Destination from "@/components/Destination";
import School from "@/components/School";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import SectionTitle from "@/components/home/common/SectionTitle";
import { APP_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { destinationData } from "@/constants/dummy data/destinationData";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { RootState } from "@/redux/store";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, ListRenderItem, ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { carouselData } from "@/constants/dummy data/carouselData";
import CarouselSlide from "@/components/home/common/CarouselSlide";

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
    const { requestFn } = useApiRequest();
    const [showAllCourses, setShowAllCourses] = useState(false);
    const [showAllSchools, setShowAllSchools] = useState(false);
    const [showAllCountries, setShowAllCountries] = useState(false);
    const width = Dimensions.get("window").width;
    const progress = useSharedValue<number>(0);
    const ref = useRef<ICarouselInstance>(null);
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
    const fav = getfavorite?.docs?.[0] || { courses: [], clients: [] }; // Providing default values

    useEffect(() => {
        console.log("getfavorite", fav);
    }, [getfavorite]);

    useEffect(() => {
        requestFn(API_URL.favorite, "favorite", { user: true });
    }, []);
    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
            count: index - progress.value,
            animated: true,
        });
    };
    const renderCourseItem: ListRenderItem<CourseData> = ({ item }: any) => (
        <AUIThemedView style={styles.courseItem}>
            <Course
                courseId={item?._id}
                title={item?.courseName}
                image={item?.image}
                favorite={item?.favorite}
                startingDate={item?.startingDate}
            />
        </AUIThemedView>
    );

    const renderSchoolItem: ListRenderItem<SchoolData> = ({ item }: any) => (
        <AUIThemedView style={styles.schoolItem}>
            <School
                id={item?._id}
                title={item?.name}
                caption={item?.discription}
                image={item?.banner}
                favorite={item.favorite}
                schoolWidth={160}
                schoolHeight={145}
            />
        </AUIThemedView>
    );

    const renderCountryItem: ListRenderItem<CountryData> = ({ item }: any) => (
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
        <ScrollView style={styles.container}>
            <AUIThemedView>
                <Carousel
                    ref={ref}
                    loop
                    width={width}
                    height={width / 2}
                    autoPlay={true}
                    autoPlayInterval={5000}
                    onProgressChange={progress}
                    scrollAnimationDuration={1000}
                    data={carouselData}
                    renderItem={({ item }) => (
                        <CarouselSlide
                            key={item.id}
                            imageSource={item.imageSource}
                            text={item.text}
                        />
                    )}
                />
                <Pagination.Basic
                    progress={progress}
                    data={carouselData}
                    containerStyle={styles.dotsContainer}
                    dotStyle={styles.dot}
                    activeDotStyle={styles.activeDot}
                    onPress={onPressPagination}
                />
            </AUIThemedView>
            <AUIThemedView>
                {fav?.courses && fav?.courses.length > 0 && (
                    <AUIThemedView style={styles.coursesContainer}>
                        <SectionTitle
                            // @ts-ignore
                            onViewAllClick={
                                fav?.courses.length > 5 ? handleViewAllCoursesClick : false
                            }
                            style={{ paddingHorizontal: 5 }}
                            titleStyle={styles.title}
                        >
                            {GLOBAL_TEXT.My_Favorite_Courses}
                        </SectionTitle>
                        <FlatList
                            data={showAllCourses ? fav?.courses : fav?.courses?.slice(0, 6)}
                            renderItem={renderCourseItem}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={2}
                            columnWrapperStyle={styles.courseColumnWrapper}
                            scrollEnabled={false}
                        />
                    </AUIThemedView>
                )}

                {fav?.clients && fav?.clients.length > 0 && (
                    <AUIThemedView style={styles.schoolContainer}>
                        <SectionTitle
                            // @ts-ignore
                            onViewAllClick={
                                fav?.clients.length > 5 ? handleViewAllSchoolsClick : false
                            }
                            style={{ paddingBottom: 10, paddingHorizontal: 5 }}
                            titleStyle={styles.title}
                        >
                            {GLOBAL_TEXT.My_Favorite_Schools}
                        </SectionTitle>
                        <FlatList
                            data={showAllSchools ? fav?.clients : fav?.clients?.slice(0, 6)}
                            renderItem={renderSchoolItem}
                            keyExtractor={(item: any) => item._id}
                            numColumns={2}
                            columnWrapperStyle={styles.schoolColumnWrapper}
                            scrollEnabled={false}
                        />
                    </AUIThemedView>
                )}
                {fav?.country && fav?.country.length > 0 && (
                    <AUIThemedView style={styles.destinationContainer}>
                        <SectionTitle
                            // @ts-ignore
                            onViewAllClick={
                                fav?.country.length > 5 ? handleViewAllCountrySchoolsClick : false
                            }
                            style={{ paddingHorizontal: 5 }}
                            titleStyle={styles.title}
                        >
                            {GLOBAL_TEXT.My_Favorite_Cities}
                        </SectionTitle>
                        <FlatList
                            data={showAllCountries ? fav?.country : fav?.country?.slice(0, 6)}
                            renderItem={renderCountryItem}
                            keyExtractor={(item) => item.id}
                            numColumns={2}
                            columnWrapperStyle={styles.destinationColumnWrapper}
                            scrollEnabled={false}
                        />
                    </AUIThemedView>
                )}
            </AUIThemedView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        // paddingHorizontal: 12,
        backgroundColor: APP_THEME.background,
        flex: 1,
    },
    coursesContainer: {
        // borderBottomWidth: 1,
        borderColor: "#5BD894",
        paddingBottom: 10,
        paddingLeft: 10,

        backgroundColor: APP_THEME.background,
    },
    schoolContainer: {
        // borderBottomWidth: 1,
        borderColor: "#5BD894",
        paddingBottom: 3,
        paddingLeft: 10,
        backgroundColor: APP_THEME.background,
    },
    title: {
        letterSpacing: 0,
        fontFamily: "GilroyLight",
        fontWeight: "700",
    },
    destinationContainer: {
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
    },
    dotsContainer: {
        position: "absolute",
        bottom: "5%",
        gap: 10,
    },
    dot: { backgroundColor: "#fff", borderRadius: 100, width: 20, height: 3 },
    activeDot: { backgroundColor: APP_THEME.primary.first },
});

export default TabTwoScreen;
