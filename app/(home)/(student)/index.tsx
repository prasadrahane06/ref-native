import { AUIThemedView } from "@/components/common/AUIThemedView";
import CarouselSlide from "@/components/home/common/CarouselSlide";
import CourseList from "@/components/home/common/CourseList";
import DestinationList from "@/components/home/common/DestinationList";
import IncreaseChanceList from "@/components/home/common/IncreaseChanceList";
import LanguageList from "@/components/home/common/LanguageList";
import SchoolList from "@/components/home/common/SchoolList";
import SectionTitle from "@/components/home/common/SectionTitle";
import { APP_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT, GLOBAL_TRANSLATION_LABEL } from "@/constants/Properties";
import { getUserData } from "@/constants/RNAsyncStore";
import { carouselData } from "@/constants/dummy data/carouselData";
import { coursesData } from "@/constants/dummy data/coursesData";
import { increaseChancesData } from "@/constants/dummy data/increaseChancesData";
import { languagesData } from "@/constants/dummy data/languagesData";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { RootState } from "@/redux/store";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, I18nManager, Platform, ScrollView, StyleSheet } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import { useDispatch, useSelector } from "react-redux";
import RNRestart from "react-native-restart";
import { useNavigation } from "expo-router";
import { CommonActions } from "@react-navigation/native";
import { setIsRTL } from "@/redux/globalSlice";
export default function HomeScreen() {
    const dispatch = useDispatch();
    const { requestFn } = useApiRequest();
    const width = Dimensions.get("window").width;
    const progress = useSharedValue<number>(0);
    const ref = useRef<ICarouselInstance>(null);

    const [destinationData, setDestinationData] = useState([]);
    const { t, i18n } = useTranslation();
    const navigation = useNavigation();
    const [selectedLanguage, setSelectedLanguage] = useState(languagesData[0].language);
    const displayedCourses = coursesData.slice(0, 4);

    const response = useSelector((state: RootState) => state.api || {});
    const theme = useSelector((state: RootState) => state.global.theme);
    console.log("response in index =>", response);
    let schoolsResponse = response?.school;
    const courseResponse = response?.selectedLanguagecourse;
    const countryResponse = response?.country;


    console.log("courseResponse => selected", JSON.stringify(courseResponse));

    const fetchCourses = useCallback(() => {
        requestFn(API_URL.course, "selectedLanguagecourse", { similar: selectedLanguage.name });
    }, [selectedLanguage]);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    useEffect(() => {
        requestFn(API_URL.popularSchool, "school");
        requestFn(API_URL.country, "country");

        getUserData().then((data) => {
            const id = data?.data?.user?._id;
            requestFn(API_URL.user, "userProfileData", { id: id });
        });
    }, []);
    useEffect(() => {
        // i18n.changeLanguage("ar");
        getUserData().then((data) => {
            const id = data?.data?.user?._id;
            requestFn(API_URL.user, "userProfileData", { id: id });
        });
    }, []);
    

    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
            count: index - progress.value,
            animated: true,
        });
    };
    const changeLanguage = (lng: string) => {
        console.log("lng", lng);
        let language = lng === "AR" ? "ar" : "en";
        let RTL = language === "ar";
        i18n.changeLanguage(language);
        dispatch(setIsRTL(RTL));
    };

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
                    activeDotStyle={{ backgroundColor: APP_THEME[theme].primary.first }}
                    onPress={onPressPagination}
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
                    data={countryResponse?.docs}
                    selectedLanguage={selectedLanguage}
                    setSelectedLanguage={setSelectedLanguage}
                />
            </AUIThemedView>

            <AUIThemedView>
                <SectionTitle viewAll="(home)/course/AllCoursesScreen">
                    {t(GLOBAL_TRANSLATION_LABEL.popular_Courses)}
                </SectionTitle>
                <CourseList data={courseResponse?.docs.slice(0, 4)} />
            </AUIThemedView>

            <AUIThemedView>
                <SectionTitle>{t(GLOBAL_TRANSLATION_LABEL.increase_your_chances)}</SectionTitle>
                <IncreaseChanceList data={increaseChancesData} />
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
});
