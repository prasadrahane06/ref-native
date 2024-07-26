import Course from "@/components/Course";
import Destination from "@/components/Destination";
import School from "@/components/School";
import AUIImage from "@/components/common/AUIImage";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import CarouselSlide from "@/components/home/common/CarouselSlide";
import SectionTitle from "@/components/home/common/SectionTitle";
import { APP_THEME, BACKGROUND_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { carouselData } from "@/constants/dummy data/carouselData";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { addToFavorite } from "@/redux/favoriteSlice";
import { RootState } from "@/redux/store";
import { useFocusEffect } from "@react-navigation/native";
import { Asset } from "expo-asset";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, FlatList, ListRenderItem, ScrollView, StyleSheet } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { useDispatch, useSelector } from "react-redux";

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
    const { t } = useTranslation();
    const [showAllCourses, setShowAllCourses] = useState(false);
    const [showAllSchools, setShowAllSchools] = useState(false);
    const [showAllCountries, setShowAllCountries] = useState(false);
    const dispatch = useDispatch();

    const width = Dimensions.get("window").width;
    // const progress = useSharedValue<number>(0);
    const ref = useRef<ICarouselInstance>(null);

    useFocusEffect(
        useCallback(() => {
            requestFn(API_URL.favorite, "favorite", { user: true });
        }, [])
    );

    const favorite = useLangTransformSelector((state: RootState) => state.api.favorite);

    const isRTL = useSelector((state: RootState) => state.global.isRTL || {});
    const theme = useSelector((state: RootState) => state.global.theme);

    useEffect(() => {
        if (favorite && favorite.docs && favorite.docs.length > 0) {
            const favoriteItems = favorite.docs[0];

            const clients = favoriteItems.clients || [];
            const courses = favoriteItems.courses || [];
            const countries = favoriteItems.country || [];

            dispatch(addToFavorite({ clients, courses, countries }));
        }
    }, [favorite, dispatch]);

    const fav = useSelector((state: RootState) => state.favorite.items);

    if (fav.clients.length === 0 && fav.courses.length === 0 && fav.countries.length === 0) {
        return (
            <AUIThemedView
                style={[
                    styles.emptyContainer,
                    { backgroundColor: BACKGROUND_THEME[theme].background },
                ]}
            >
                <AUIThemedText style={styles.emptyText}>
                    {t(GLOBAL_TEXT.your_favourite_is_empty)}
                </AUIThemedText>

                <AUIThemedView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <AUIImage
                        path={Asset.fromModule(require("@/assets/images/common/fav_image.png")).uri}
                        style={{ width: 200, height: 200 }}
                    />
                </AUIThemedView>
            </AUIThemedView>
        );
    }

    const handleViewAllCoursesClick = () => {
        setShowAllCourses(true);
    };
    const handleViewAllSchoolsClick = () => {
        setShowAllSchools(true);
    };
    const handleViewAllCountrySchoolsClick = () => {
        setShowAllCountries(true);
    };

    // const onPressPagination = (index: number) => {
    //     ref.current?.scrollTo({
    //         count: index - progress.value,
    //         animated: true,
    //     });
    // };
    const renderCourseItem: ListRenderItem<CourseData> = ({ item }: any) => (
        <AUIThemedView
            style={[styles.courseItem, { backgroundColor: APP_THEME[theme].background }]}
        >
            <Course
                courseId={item?._id}
                title={item?.courseName}
                image={item?.image}
                favorite={true}
                startingDate={item?.startDate}
            />
        </AUIThemedView>
    );

    const renderSchoolItem: ListRenderItem<SchoolData> = ({ item }: any) => (
        <AUIThemedView
            style={[styles.schoolItem, { backgroundColor: APP_THEME[theme].background }]}
        >
            <School
                id={item?._id}
                title={item?.name}
                caption={item?.discription}
                image={item?.banner}
                favorite={true}
                style={{ width: 165, height: 160 }}
            />
        </AUIThemedView>
    );

    const renderCountryItem: ListRenderItem<CountryData> = ({ item }: any) => (
        <AUIThemedView style={styles.destinationItem}>
            <Destination
                title={isRTL ? item.name?.en : item.name?.ar}
                image={item.images[0]}
                id={item._id}
                favorite={true}
                countryWidth={160}
                countryHeight={145}
            />
        </AUIThemedView>
    );

    return (
        <ScrollView style={[styles.container, { backgroundColor: APP_THEME[theme].background }]}>
            <AUIThemedView>
                <Carousel
                    ref={ref}
                    loop
                    width={width}
                    height={width / 2}
                    autoPlay={true}
                    autoPlayInterval={5000}
                    // onProgressChange={progress}
                    scrollAnimationDuration={1000}
                    data={carouselData}
                    renderItem={({ item }) => (
                        <CarouselSlide
                            key={item.id}
                            imageSource={item.imageSource}
                            text={t(item.key)}
                        />
                    )}
                />
                {/* <Pagination.Basic
                    progress={progress}
                    data={carouselData}
                    containerStyle={styles.dotsContainer}
                    dotStyle={styles.dot}
                    activeDotStyle={{ backgroundColor: APP_THEME[theme].primary.first }}
                    onPress={onPressPagination}
                /> */}
            </AUIThemedView>

            <AUIThemedView>
                {fav?.courses && fav?.courses.length > 0 && (
                    <AUIThemedView
                        style={[
                            styles.coursesContainer,
                            { backgroundColor: APP_THEME[theme].background },
                        ]}
                    >
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
                            columnWrapperStyle={[
                                styles.courseColumnWrapper,
                                { backgroundColor: APP_THEME[theme].background },
                            ]}
                            scrollEnabled={false}
                        />
                    </AUIThemedView>
                )}

                {fav?.clients && fav?.clients.length > 0 && (
                    <AUIThemedView
                        style={[
                            styles.schoolContainer,
                            { backgroundColor: APP_THEME[theme].background },
                        ]}
                    >
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
                            columnWrapperStyle={[
                                styles.schoolColumnWrapper,
                                { backgroundColor: APP_THEME[theme].background },
                            ]}
                            scrollEnabled={false}
                        />
                    </AUIThemedView>
                )}

                {fav?.countries && fav?.countries.length > 0 && (
                    <AUIThemedView style={styles.destinationContainer}>
                        <SectionTitle
                            // @ts-ignore
                            onViewAllClick={
                                fav?.countries.length > 5 ? handleViewAllCountrySchoolsClick : false
                            }
                            style={{ paddingHorizontal: 5 }}
                            titleStyle={styles.title}
                        >
                            {GLOBAL_TEXT.My_Favorite_Cities}
                        </SectionTitle>
                        <FlatList
                            data={showAllCountries ? fav?.countries : fav?.countries?.slice(0, 6)}
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

const height = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    emptyText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
    },
    emptyContainer: {
        padding: 20,
        flex: 1,
        height: height,
    },
    container: {
        // paddingHorizontal: 12,
        // backgroundColor: APP_THEME.background,
        flex: 1,
    },
    coursesContainer: {
        // borderBottomWidth: 1,
        borderColor: "#5BD894",
        paddingBottom: 10,
        paddingLeft: 10,

        // backgroundColor: APP_THEME.background,
    },
    schoolContainer: {
        // borderBottomWidth: 1,
        borderColor: "#5BD894",
        paddingBottom: 3,
        paddingLeft: 10,
        // backgroundColor: APP_THEME.background,
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
        // backgroundColor: APP_THEME.background,
    },
    schoolItem: {
        width: "48%",
        marginBottom: 10,
        marginTop: -10,
        paddingHorizontal: 1,
        // backgroundColor: APP_THEME.background,
    },
    destinationItem: {
        width: "48%",
        top: 6,
        marginVertical: -6,
    },
    courseColumnWrapper: {
        // justifyContent: "space-between",
        // backgroundColor: APP_THEME.background,
        marginTop: 10,
        marginBottom: -8,
        justifyContent: windowWidth > 600 ? "center" : "space-between",
    },
    schoolColumnWrapper: {
        // justifyContent: "space-between",
        // backgroundColor: APP_THEME.background,
        marginHorizontal: 10,
        marginTop: 10,
        // padding: 10,
        justifyContent: windowWidth > 600 ? "center" : "space-between",
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
});

export default TabTwoScreen;
