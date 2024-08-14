import { AUIThemedView } from "@/components/common/AUIThemedView";
import CarouselSlide from "@/components/home/common/CarouselSlide";
import CourseList from "@/components/home/common/CourseList";
import DestinationList from "@/components/home/common/DestinationList";
import IncreaseChanceList from "@/components/home/common/IncreaseChanceList";
import LanguageList from "@/components/home/common/LanguageList";
import SchoolList from "@/components/home/common/SchoolList";
import SectionTitle from "@/components/home/common/SectionTitle";
import { BACKGROUND_THEME } from "@/constants/Colors";
import { GLOBAL_TRANSLATION_LABEL } from "@/constants/Properties";
import { carouselData } from "@/constants/dummy data/carouselData";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { addItemToCart } from "@/redux/cartSlice";
import { addToFavorite } from "@/redux/favoriteSlice";
import { setselectedLanguage } from "@/redux/globalSlice";
import { RootState } from "@/redux/store";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, ScrollView } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { useDispatch, useSelector } from "react-redux";

export default function HomeScreen() {
    const dispatch = useDispatch();
    const { requestFn } = useApiRequest();
    const width = Dimensions.get("window").width;

    const [selectedLanguage, setSelectedLanguage] = useState("English");
    const [selectedLanguageInEng, setSelectedLanguageInEng] = useState("English");
    const ref = useRef<ICarouselInstance>(null);

    const { t } = useTranslation();

    const response = useLangTransformSelector((state: RootState) => state.api);
    const rawResponse = useSelector((state: RootState) => state.api);
    const theme = useSelector((state: RootState) => state.global.theme);
    const user = useLangTransformSelector((state: RootState) => state.global.user);
    const _id = user?._id;

    let schoolsResponse = response?.school;
    const courseResponse = response?.selectedLanguagecourse;
    const countryResponse = response?.country;
    let lastChanceResponse = response?.lastDateToApply;
    let languageData = response?.language;

    const fetchCourses = useCallback(() => {
        dispatch(setselectedLanguage(selectedLanguage));
        requestFn(API_URL.course, "selectedLanguagecourse", { similar: selectedLanguageInEng });
    }, [selectedLanguage]);

    const setSelectedLanguageFun = (lng: any) => {
        const rawLangObj = rawResponse?.language?.docs?.filter((item: any) =>
            Object.values(item.name).includes(lng)
        )[0];
        setSelectedLanguageInEng(rawLangObj?.name?.en || "English");
        setSelectedLanguage(lng);
    };

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    useEffect(() => {
        requestFn(API_URL.user, "userProfileData", { id: _id });
        requestFn(API_URL.country, "country");
        requestFn(API_URL.school, "school", { status: 2 });
        requestFn(API_URL.language, "language");
        requestFn(API_URL.course, "lastDateToApply", { lastChance: true });
        requestFn(API_URL.favorite, "favorite", { user: true });
        requestFn(API_URL.cart, "cart");
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
        <ScrollView style={{ backgroundColor: BACKGROUND_THEME[theme].background }}>
            <AUIThemedView>
                <Carousel
                    ref={ref}
                    loop
                    width={width}
                    height={width / 2}
                    autoPlay={true}
                    autoPlayInterval={5000}
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
                    data={languageData?.docs}
                    selectedLanguage={selectedLanguage}
                    setSelectedLanguage={setSelectedLanguageFun}
                />
            </AUIThemedView>

            <AUIThemedView>
                <SectionTitle
                    viewAll={
                        courseResponse?.docs?.length > 0
                            ? "(home)/course/AllCoursesScreen"
                            : undefined
                    }
                >
                    {t(GLOBAL_TRANSLATION_LABEL.popular_courses)}
                </SectionTitle>
                <CourseList data={courseResponse?.docs.slice(0, 4)} />
            </AUIThemedView>

            {lastChanceResponse && lastChanceResponse?.docs?.length > 0 && (
                <AUIThemedView>
                    <SectionTitle>{t(GLOBAL_TRANSLATION_LABEL.increase_your_chances)}</SectionTitle>
                    <IncreaseChanceList data={lastChanceResponse?.docs} />
                </AUIThemedView>
            )}
        </ScrollView>
    );
}
