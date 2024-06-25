import { get } from "@/app/services/axiosClient";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import CarouselSlide from "@/components/home/common/CarouselSlide";
import CourseList from "@/components/home/common/CourseList";
import DestinationList from "@/components/home/common/DestinationList";
import LanguageList from "@/components/home/common/LanguageList";
import LastChanceList from "@/components/home/common/LastChanceList";
import SchoolList from "@/components/home/common/SchoolList";
import SectionTitle from "@/components/home/common/SectionTitle";
import { APP_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { carouselData } from "@/constants/dummy data/carouselData";
import { coursesData } from "@/constants/dummy data/coursesData";
import { destinationData } from "@/constants/dummy data/destinationData";
import { languagesData } from "@/constants/dummy data/languagesData";
import { lastChanceData } from "@/constants/dummy data/lastChance";
import { schoolsData } from "@/constants/dummy data/schoolsData";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { setLoader } from "@/redux/globalSlice";
import { RootState } from "@/redux/store";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import { useDispatch, useSelector } from "react-redux";

export default function HomeScreen() {
    const dispatch = useDispatch();
    const { requestFn } = useApiRequest();
    const width = Dimensions.get("window").width;
    const progress = useSharedValue<number>(0);
    const ref = useRef<ICarouselInstance>(null);

    const [selectedLanguage, setSelectedLanguage] = useState(languagesData[0].code);
    const displayedCourses = coursesData.slice(0, 4);

    const schoolsResponse = useSelector((state: RootState) => state.api.school || {});
    const courseResponse = useSelector((state: RootState) => state.api.course || {});

    useEffect(() => {
        dispatch(setLoader(true));
        requestFn(get(API_URL.popularSchool, { limit: 4 }), "school");
        dispatch(setLoader(false));
        // requestFn(get(API_URL.course, {limit : 4}) , "course")
    }, []);

    useEffect(() => {
        console.log("schoolsResponse", schoolsResponse);
    }, [schoolsResponse]);

    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
            count: index - progress.value,
            animated: true,
        });
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
                    activeDotStyle={styles.activeDot}
                    onPress={onPressPagination}
                />
            </AUIThemedView>

            <AUIThemedView>
                <SectionTitle>{GLOBAL_TEXT.find_your_destination}</SectionTitle>
                <DestinationList data={destinationData} />
            </AUIThemedView>

            <AUIThemedView>
                <SectionTitle
                    viewAll="(home)/school/AllSchoolsScreen"
                    style={{ paddingBottom: 10 }}
                >
                    {GLOBAL_TEXT.popular_schools}
                </SectionTitle>
                <SchoolList data={schoolsResponse.docs} dummyData={schoolsData} />
            </AUIThemedView>

            <AUIThemedView>
                <SectionTitle>{GLOBAL_TEXT.choose_your_language}</SectionTitle>
                <LanguageList
                    data={languagesData}
                    selectedLanguage={selectedLanguage}
                    setSelectedLanguage={setSelectedLanguage}
                />
            </AUIThemedView>

            <AUIThemedView>
                <SectionTitle viewAll="(home)/course/AllCoursesScreen">
                    {GLOBAL_TEXT.popular_courses} (EN)
                </SectionTitle>
                <CourseList data={displayedCourses} />
            </AUIThemedView>

            <AUIThemedView>
                <SectionTitle>{GLOBAL_TEXT.last_chance_to_apply}</SectionTitle>
                <LastChanceList data={lastChanceData} />
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
    activeDot: { backgroundColor: APP_THEME.primary.first },
});
