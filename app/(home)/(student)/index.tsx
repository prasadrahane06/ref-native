import { get } from "@/app/services/axiosClient";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import CarouselSlide from "@/components/home/common/CarouselSlide";
import CourseList from "@/components/home/common/CourseList";
import DestinationList from "@/components/home/common/DestinationList";
import DotIndicator from "@/components/home/common/DotsIndicator";
import LanguageList from "@/components/home/common/LanguageList";
import LastChanceList from "@/components/home/common/LastChanceList";
import SchoolList from "@/components/home/common/SchoolList";
import SectionTitle from "@/components/home/common/SectionTitle";
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
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";
import { useDispatch, useSelector } from "react-redux";

export default function HomeScreen() {
    const dispatch = useDispatch();
    const [selectedPage, setSelectedPage] = useState(0);
    const [selectedLanguage, setSelectedLanguage] = useState(languagesData[0].code);
    const navigation = useNavigation();
    const displayedCourses = coursesData.slice(0, 4);

    const { requestFn } = useApiRequest();
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

    return (
        <ScrollView>
            <AUIThemedView>
                <PagerView
                    style={styles.pagerView}
                    initialPage={0}
                    onPageSelected={(e) => setSelectedPage(e.nativeEvent.position)}
                >
                    {carouselData.map((slide) => (
                        <CarouselSlide
                            key={slide.key}
                            imageSource={slide.imageSource}
                            text={slide.text}
                        />
                    ))}
                </PagerView>
                <View style={styles.dotsContainer}>
                    {carouselData.map((_, index) => (
                        <DotIndicator key={index} selected={selectedPage === index} />
                    ))}
                </View>
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
    pagerView: {
        height: 200,
    },
    dotsContainer: {
        position: "absolute",
        bottom: -5,
        left: 140,
        flexDirection: "row",
    },
});
