import AUISearchBar from "@/components/common/AUISearchBar";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import CarouselSlide from "@/components/home/common/CarouselSlide";
import CourseList from "@/components/home/common/CourseList";
import DestinationList from "@/components/home/common/DestinationList";
import IncreaseChanceList from "@/components/home/common/IncreaseChanceList";
import LanguageList from "@/components/home/common/LanguageList";
import SchoolList from "@/components/home/common/SchoolList";
import SectionTitle from "@/components/home/common/SectionTitle";
import { GLOBAL_TRANSLATION_LABEL } from "@/constants/Properties";
import { carouselData } from "@/constants/dummy data/carouselData";
import { increaseChancesData } from "@/constants/dummy data/increaseChancesData";
import { languagesData } from "@/constants/dummy data/languagesData";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import useDebounce from "@/customHooks/useDebounce";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { addItemToCart } from "@/redux/cartSlice";
import { addToFavorite } from "@/redux/favoriteSlice";
import { setselectedLanguage } from "@/redux/globalSlice";
import { RootState } from "@/redux/store";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { useDispatch } from "react-redux";

export default function HomeScreen() {
    const dispatch = useDispatch();
    const { requestFn } = useApiRequest();
    const width = Dimensions.get("window").width;
    // const progress = useSharedValue<number>(0);
    const ref = useRef<ICarouselInstance>(null);

    // const [destinationData, setDestinationData] = useState([]);
    const { t } = useTranslation();
    // const navigation = useNavigation();
    const [selectedLanguage, setSelectedLanguage] = useState("English");
    // const displayedCourses = coursesData.slice(0, 4);
    // const theme = useSelector((state: RootState) => state.global.theme);
    const response = useLangTransformSelector((state: RootState) => state.api);
    const user = useLangTransformSelector((state: RootState) => state.global.user);
    const _id = user?._id;

    let schoolsResponse = response?.school;
    const courseResponse = response?.selectedLanguagecourse;
    const countryResponse = response?.country;
    let lastChanceResponse = response?.lastDateToApply;

    const fetchCourses = useCallback(() => {
        dispatch(setselectedLanguage(selectedLanguage));
        requestFn(API_URL.course, "selectedLanguagecourse", { similar: selectedLanguage });
    }, [selectedLanguage]);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    useEffect(() => {
        requestFn(API_URL.school, "school");
        requestFn(API_URL.country, "country");
        requestFn(API_URL.favorite, "favorite", { user: true });
        requestFn(API_URL.cart, "cart");
        requestFn(API_URL.user, "userProfileData", { id: _id });
        requestFn(API_URL.course, "lastDateToApply", { lastChance: true });
    }, []);

    const favorite = useLangTransformSelector((state: RootState) => state.api.favorite);
    useEffect(() => {
        if (favorite && favorite.docs && favorite.docs.length > 0) {
            const favoriteItems = favorite.docs[0];

            const clients = favoriteItems.clients || [];
            const courses = favoriteItems.courses || [];
            const countries = favoriteItems.country || [];

            dispatch(addToFavorite({ clients, courses, countries }));
        }
    }, [favorite]);

    const cart = useLangTransformSelector((state: RootState) => state.api.cart);
    useEffect(() => {
        if (cart && cart.docs && cart.docs.length > 0) {
            const cartItems = cart.docs[0].items;

            dispatch(addItemToCart({ courses: cartItems }));
        }
    }, [cart]);

    return (
        <ScrollView>
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
                <SectionTitle>{t(GLOBAL_TRANSLATION_LABEL.find_your_destination)}</SectionTitle>
                <DestinationList data={countryResponse?.docs} />
            </AUIThemedView>

            <AUIThemedView>
                <SectionTitle
                    viewAll="(home)/school/AllSchoolsScreen"
                    style={{ paddingBottom: 10 }}
                >
                    {t(GLOBAL_TRANSLATION_LABEL.popular_school)}
                </SectionTitle>
                <SchoolList data={schoolsResponse?.docs.slice(0, 4)} />
            </AUIThemedView>

            <AUIThemedView>
                <SectionTitle>
                    {t(GLOBAL_TRANSLATION_LABEL.choose_your_language_to_learn)}
                </SectionTitle>
                <LanguageList
                    data={countryResponse?.docs}
                    selectedLanguage={selectedLanguage}
                    setSelectedLanguage={setSelectedLanguage}
                />
            </AUIThemedView>

            <AUIThemedView>
                <SectionTitle viewAll="(home)/course/AllCoursesScreen">
                    {t(GLOBAL_TRANSLATION_LABEL.popular_courses)}
                </SectionTitle>
                <CourseList data={courseResponse?.docs.slice(0, 4)} />
            </AUIThemedView>

            <AUIThemedView>
                <SectionTitle>{t(GLOBAL_TRANSLATION_LABEL.increase_your_chances)}</SectionTitle>
                <IncreaseChanceList data={lastChanceResponse?.docs} />
            </AUIThemedView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    dotsContainer: {
        position: "absolute",
        bottom: "5%",
        gap: 10,
    },
    dot: { backgroundColor: "#fff", borderRadius: 100, width: 20, height: 3 },
    centeredContainer: {
        // flexDirection: "row",
        // justifyContent: "center",
        // alignItems: "center",
        // width: "100%",
        // paddingHorizontal: 20,
        // marginVertical: 10,
    },
});
