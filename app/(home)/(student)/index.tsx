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
import Course from "@/components/Course";
import Destination from "@/components/Destination";
import Flag from "@/components/Flag";
import LastChance from "@/components/LastChance";
import School from "@/components/School";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { LinearGradient } from "expo-linear-gradient";
import { APP_THEME } from "@/constants/Colors";
import { countriesData } from "@/constants/dummy data/countriesData";
import { coursesData } from "@/constants/dummy data/coursesData";
import { destinationData } from "@/constants/dummy data/destinationData";
import { lastChanceData } from "@/constants/dummy data/lastChance";
import { schoolsData } from "@/constants/dummy data/schoolsData";
import { Octicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";

export default function HomeScreen() {
  const [selectedPage, setSelectedPage] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  return (
    <ScrollView>
      <AUIThemedView>
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
          <SectionTitle viewAll="#">{GLOBAL_TEXT.popular_schools}</SectionTitle>
          <SchoolList data={schoolsData} />
        </AUIThemedView>

        <AUIThemedView>
          <SectionTitle>{GLOBAL_TEXT.choose_your_language}</SectionTitle>
          <LanguageList
            data={countriesData}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />
        </AUIThemedView>

        <AUIThemedView>
          <SectionTitle viewAll="#">
            {GLOBAL_TEXT.popular_courses} (EN)
          </SectionTitle>
          <CourseList data={coursesData} />
        </AUIThemedView>

        <AUIThemedView>
          <SectionTitle viewAll="#">
            {GLOBAL_TEXT.last_chance_to_apply}
          </SectionTitle>
          <LastChanceList data={lastChanceData} />
        </AUIThemedView>
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
