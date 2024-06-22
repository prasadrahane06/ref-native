import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { APP_THEME } from "@/constants/Colors";
import SectionTitle from "@/components/home/common/SectionTitle";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { schoolsData } from "@/constants/dummy data/schoolsData";
import SchoolList from "@/components/home/common/SchoolList";
// import PhotoGallaryList from "@/components/home/common/PhotoGallaryList";
// import { PhotoGallaryData } from "@/constants/dummy data/PhotoGallaryData";
import AUIImage from "@/components/common/AUIImage";
import { Asset } from "expo-asset";
import { MaterialIcons } from "@expo/vector-icons";
import { PhotoGallaryData } from "@/constants/dummy data/PhotoGallaryData";
import PhotoGallaryList from "@/components/home/common/PhotoGallaryList";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function CityDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log(id);

  const schoolsResponse = useSelector(
    (state: RootState) => state.api.school || {}
  );

  const [readMore, setReadMore] = useState(false);
  const aboutText = `Craving an academic adventure? Immerse yourself in the vibrant landscapes of South Africa and master English through real-world experiences. South African universities, known for their academic excellence and diverse programs, offer a prestigious education alongside a unique cultural immersion. From the bustling streets of Johannesburg to the historic charm of Cape Town, explore breathtaking natural wonders, connect with a dynamic international student community, and unlock the secrets of English not just by reading, but by living it. This is your chance to boost your employability, delve into a rich history, and embrace the captivating culture of South Africa - all while mastering a language in demand worldwide.`;
  const wordsLimit = 50;
  const truncatedText = aboutText.split(" ").slice(0, wordsLimit).join(" ");

  return (
    <AUIThemedView>
      <ScrollView>
        <AUIThemedView style={styles.container}>
          <AUIThemedView>
            <AUIImage
              path={
                Asset.fromModule(
                  require("@/assets/images/studentHomePage/cityDetailsPage/Rectangle 13 (1).png")
                ).uri
              }
              style={styles.image}
              resizeMode="cover"
            />
            <AUIThemedView style={styles.favIconContainer}>
              <MaterialIcons
                name="favorite"
                size={18}
                color={APP_THEME.secondary.first}
                style={styles.icon}
              />
            </AUIThemedView>
          </AUIThemedView>

          <AUIThemedView style={styles.infoContainer}>
            <AUIThemedText style={styles.name}>
              Why study in South Africa
            </AUIThemedText>
            <AUIThemedView style={styles.headingContainer}>
              <AUIThemedView style={styles.headingImageContainer}>
                <AUIImage
                  path={
                    // Asset.fromModule(
                    //   require("@/assets/images/studentHomePage/cityDetailsPage/fi_5111640.png")
                    // ).uri
                    "https://cdn.britannica.com/27/4227-050-00DBD10A/Flag-South-Africa.jpg"
                  }
                  style={styles.headingImage}
                  resizeMode="cover"
                />
              </AUIThemedView>
              <AUIThemedView style={styles.nestedContainer}>
                <AUIThemedText style={styles.headingName}>
                  200+ Universities
                </AUIThemedText>
                <AUIThemedText style={styles.headingName}>
                  367,343 international student
                </AUIThemedText>
              </AUIThemedView>
            </AUIThemedView>

            <AUIThemedView style={styles.iconContainer}>
              <View style={styles.iconWrapper}>
                <AUIImage
                  path={
                    Asset.fromModule(
                      require("@/assets/images/studentHomePage/cityDetailsPage/Rectangle 93.png")
                    ).uri
                  }
                  style={styles.iconImage}
                  resizeMode="cover"
                />
                <AUIThemedView style={styles.iconTextContainer}>
                  <AUIThemedText style={styles.iconText}>Capital</AUIThemedText>
                  <AUIThemedText style={styles.iconSubText}>
                    Cape Town
                  </AUIThemedText>
                </AUIThemedView>
              </View>

              <View style={styles.iconWrapper}>
                <AUIImage
                  path={
                    Asset.fromModule(
                      require("@/assets/images/studentHomePage/cityDetailsPage/Rectangle 96.png")
                    ).uri
                  }
                  style={styles.iconImage}
                  resizeMode="cover"
                />
                <AUIThemedView style={styles.iconTextContainer}>
                  <AUIThemedText style={styles.iconText}>
                    Population
                  </AUIThemedText>
                  <AUIThemedText style={styles.iconSubText}>
                    68 Mn
                  </AUIThemedText>
                </AUIThemedView>
              </View>
              <View style={styles.iconWrapper}>
                <AUIImage
                  path={
                    Asset.fromModule(
                      require("@/assets/images/studentHomePage/cityDetailsPage/Rectangle 97.png")
                    ).uri
                  }
                  style={styles.iconImage}
                  resizeMode="cover"
                />
                <AUIThemedView style={styles.iconTextContainer}>
                  <AUIThemedText style={styles.iconText}>
                    Language
                  </AUIThemedText>
                  <AUIThemedText style={styles.iconSubText}>
                    English
                  </AUIThemedText>
                </AUIThemedView>
              </View>
            </AUIThemedView>

            <AUIThemedView style={styles.aboutContainer}>
              <AUIThemedText style={styles.aboutTitle}>
                About South Africa
              </AUIThemedText>
              <AUIThemedText style={styles.aboutDescription}>
                {readMore ? aboutText : `${truncatedText} `}
                {aboutText.split(" ").length > wordsLimit && (
                  <Pressable
                    onPress={() => setReadMore(!readMore)}
                    // style={{ paddingTop: 30 }}
                  >
                    <AUIThemedText style={styles.readMoreText}>
                      {readMore ? "read less" : "read more..."}
                    </AUIThemedText>
                  </Pressable>
                )}
              </AUIThemedText>
            </AUIThemedView>
          </AUIThemedView>

          <AUIThemedView style={styles.photoGalleryContainer}>
            <AUIThemedView style={styles.photoGalleryheader}>
              <AUIThemedText style={styles.photoGalleryText}>
                {GLOBAL_TEXT.photo_gallery}
              </AUIThemedText>
            </AUIThemedView>
            <PhotoGallaryList data={PhotoGallaryData} />
          </AUIThemedView>

          <AUIThemedView style={styles.popularSchoolsContainer}>
            <SectionTitle viewAll="#">
              {GLOBAL_TEXT.popular_schools}
            </SectionTitle>
            <SchoolList data={schoolsResponse.docs} dummyData={schoolsData} />
          </AUIThemedView>
        </AUIThemedView>
      </ScrollView>
    </AUIThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: APP_THEME.background },
  image: {
    height: 200,
    width: "auto",
  },
  favIconContainer: {
    position: "absolute",
    top: 160,
    right: 15,
    backgroundColor: "rgba(91, 216, 148, 0.3)",
    borderRadius: 20,
    padding: 5,
  },
  icon: {
    alignSelf: "center",
  },
  infoContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: APP_THEME.background,
  },
  name: {
    fontSize: 17,
    fontWeight: "bold",
  },
  headingContainer: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 10,
    backgroundColor: APP_THEME.background,
  },
  headingImageContainer: {
    backgroundColor: APP_THEME.background,
  },
  headingImage: {
    height: 55,
    width: 75,
    borderRadius: 5,
  },
  headingName: {
    fontSize: 12,
  },
  nestedContainer: {
    marginVertical: 5,
    marginLeft: 15,
    backgroundColor: APP_THEME.background,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    backgroundColor: APP_THEME.background,
  },
  iconWrapper: {
    alignItems: "center",
    backgroundColor: "#D3FFE7",
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  iconImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: 8,
  },
  iconTextContainer: {
    marginBottom: 5,
    // width: 80,
    backgroundColor: "#D3FFE7",
  },
  iconText: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 12,
  },
  iconSubText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  aboutContainer: {
    marginTop: 15,
    backgroundColor: APP_THEME.background,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  aboutDescription: {
    fontSize: 14,
    textAlign: "justify",
  },
  readMoreText: {
    color: "green",
    fontSize: 14,
    textDecorationLine: "underline",
    lineHeight: 7,
    paddingTop: 10,
  },
  photoGalleryContainer: {
    backgroundColor: APP_THEME.background,
  },
  photoGalleryheader: {
    marginBottom: 10,
    backgroundColor: APP_THEME.background,
  },
  photoGalleryText: {
    paddingLeft: 14,
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 5,
  },
  popularSchoolsContainer: {
    backgroundColor: APP_THEME.background,
    marginBottom: 15,
  },
});
