import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME } from "@/constants/Colors";
// import { countriesInfo } from "@/constants/countriesInfo";
// import { CountryData } from "@/constants/dummyData";
import { countriesData } from "@/constants/countriesData";
import { coursesData } from "@/constants/coursesData";
import { destinationData } from "@/constants/destinationData";
import { schoolsData } from "@/constants/schoolsData";
import { Octicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
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

    const Destination = ({ title, image }: any) => (
        <AUIThemedView style={styles.item}>
            <AUIThemedView style={styles.imageContainer}>
                <ImageBackground style={styles.image} source={image}>
                    <LinearGradient
                        colors={[
                            "rgba(72,77,72, 1)",
                            "rgba(149,207,156, 0.5)",
                            "rgba(149,207,156, 0.3)",
                            "rgba(149,207,156, 0.2)",
                            "transparent",
                        ]}
                        style={styles.gradient}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 0, y: 0 }}
                    />
                    <AUIThemedText style={styles.destinationImageText}>
                        {title}
                    </AUIThemedText>
                </ImageBackground>
            </AUIThemedView>
        </AUIThemedView>
    );

    const Course = ({ title, image }: any) => (
        <AUIThemedView>
            <Image style={styles.courseImage} source={image} />
            <AUIThemedView style={{ paddingLeft: 10 }}>
                <Text style={styles.courseTitle}>{title}</Text>
                <AUIThemedText style={{ fontSize: 13 }}>
                    <AUIThemedText style={styles.courseCaption}>
                        Starting from:{" "}
                    </AUIThemedText>
                    20-04-2024
                </AUIThemedText>
            </AUIThemedView>
        </AUIThemedView>
    );

    const Flag = ({ countryName, countryCode, isSelected, onSelect }: any) => (
        <TouchableOpacity onPress={onSelect}>
            <AUIThemedView
                style={{
                    paddingVertical: 10,
                    marginRight: 10,
                }}
            >
                <AUIThemedView
                    style={[
                        styles.flagImageContainer,
                        isSelected && styles.selectedFlag,
                    ]}
                >
                    <Image
                        source={{
                            uri: `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`,
                        }}
                        style={[styles.flagImage]}
                    />
                </AUIThemedView>
                <AUIThemedText style={styles.flagNames}>
                    {countryName}
                </AUIThemedText>
            </AUIThemedView>
        </TouchableOpacity>
    );

    const School = ({ title, image, caption }: any) => (
        <AUIThemedView style={styles.schoolContainer}>
            <AUIThemedView style={styles.schoolItem}>
                <ImageBackground style={styles.image} source={image}>
                    <LinearGradient
                        colors={[
                            "rgba(10, 21, 47, 0.9)",
                            "rgba(10, 21, 47, 0.6)",
                            "rgba(91, 216, 148, 0.3)",
                            "transparent",
                        ]}
                        style={styles.gradient}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 0, y: 0 }}
                    />
                    <AUIThemedText style={styles.schoolTitle}>
                        {title}
                    </AUIThemedText>
                    <AUIThemedText style={styles.schoolCaption}>
                        {caption}
                    </AUIThemedText>
                </ImageBackground>
            </AUIThemedView>
        </AUIThemedView>
    );

    const DotIndicator = ({ selected }: any) => {
        return (
            <Octicons
                style={[styles.dot]}
                name="dash"
                size={40}
                color={selected ? "#5BD894" : "white"}
            />
        );
    };

    const lastChanceData = [
        {
            id: "a1",
            title: "Last 2 Days to remaining",
            subTitle: "English Learning Course",
        },
        {
            id: "a2",
            title: "Last 5 Days to remaining",
            subTitle: "Intensive English course",
        },
    ];
    const LastChance = ({ title, subTitle }: any) => (
        <AUIThemedView style={styles.schoolContainer}>
            <AUIThemedView style={styles.lastChanceItem}>
                <LinearGradient
                    colors={[
                        "rgba(91, 216, 148, 0.8)",
                        "rgba(91, 216, 148, 1)",
                    ]}
                    style={styles.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                />
                <AUIThemedText
                    style={{
                        fontSize: 12,
                        color: "white",
                        paddingTop: 25,
                        paddingLeft: 10,
                    }}
                >
                    {title}
                </AUIThemedText>
                <AUIThemedText
                    style={{
                        fontSize: 15,
                        fontWeight: "500",
                        color: "white",
                        paddingLeft: 10,
                    }}
                >
                    {subTitle}
                </AUIThemedText>
            </AUIThemedView>
        </AUIThemedView>
    );

    return (
        <ScrollView>
            <AUIThemedView>
                <AUIThemedView>
                    <PagerView
                        style={styles.pagerView}
                        initialPage={0}
                        onPageSelected={(e) =>
                            setSelectedPage(e.nativeEvent.position)
                        }
                    >
                        <AUIThemedView key="1">
                            <ImageBackground
                                source={require("@/assets/images/studentHomePage/carousel-1-image.png")}
                                style={styles.carouselImage}
                            >
                                <AUIThemedText style={styles.imageText}>
                                    LEARN A LANGUAGE ABROAD
                                </AUIThemedText>
                            </ImageBackground>
                        </AUIThemedView>

                        <AUIThemedView key="2">
                            <ImageBackground
                                source={require("@/assets/images/studentHomePage/carousel-1-image.png")}
                                style={styles.carouselImage}
                            >
                                <AUIThemedText style={styles.imageText}>
                                    LEARN A LANGUAGE ABROAD
                                </AUIThemedText>
                            </ImageBackground>
                        </AUIThemedView>

                        <AUIThemedView key="3">
                            <ImageBackground
                                source={require("@/assets/images/studentHomePage/carousel-1-image.png")}
                                style={styles.carouselImage}
                            >
                                <AUIThemedText style={styles.imageText}>
                                    LEARN A LANGUAGE ABROAD
                                </AUIThemedText>
                            </ImageBackground>
                        </AUIThemedView>
                    </PagerView>
                    <View style={styles.dotsContainer}>
                        <DotIndicator selected={selectedPage === 0} />
                        <DotIndicator selected={selectedPage === 1} />
                        <DotIndicator selected={selectedPage === 2} />
                    </View>
                </AUIThemedView>

                <AUIThemedView
                    style={{ paddingHorizontal: 15, paddingTop: 15 }}
                >
                    <AUIThemedText style={styles.title}>
                        Find your destination for learning English
                    </AUIThemedText>
                    <FlatList
                        horizontal
                        data={destinationData}
                        renderItem={({ item }) => (
                            <Destination
                                title={item.country}
                                image={item.image}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </AUIThemedView>

                <AUIThemedView>
                    <AUIThemedView style={styles.popularTitle}>
                        <AUIThemedText style={styles.title}>
                            Popular Schools
                        </AUIThemedText>
                        <Link href={"#"} style={styles.viewAll}>
                            View All
                        </Link>
                    </AUIThemedView>

                    <AUIThemedView style={{ paddingLeft: 14 }}>
                        <FlatList
                            horizontal
                            data={schoolsData}
                            renderItem={({ item }) => (
                                <School
                                    title={item.school}
                                    image={item.image}
                                    caption={item.caption}
                                />
                            )}
                            keyExtractor={(item) => item.id}
                        />
                    </AUIThemedView>
                </AUIThemedView>

                <AUIThemedView
                    style={{ paddingHorizontal: 10, paddingTop: 15 }}
                >
                    <AUIThemedText style={styles.title}>
                        Choose your language to learn
                    </AUIThemedText>
                    <FlatList
                        horizontal
                        data={countriesData}
                        renderItem={({ item }) => (
                            <Flag
                                countryName={item.language.name}
                                countryCode={item.code}
                                isSelected={item.code === selectedLanguage}
                                onSelect={() => setSelectedLanguage(item.code)}
                            />
                        )}
                        keyExtractor={(item) => item.uniqueId}
                    />
                </AUIThemedView>

                <AUIThemedView>
                    <AUIThemedView style={styles.popularTitle}>
                        <AUIThemedText style={styles.title}>
                            Popular Courses (EN)
                        </AUIThemedText>
                        <Link href={"#"} style={styles.viewAll}>
                            View All
                        </Link>
                    </AUIThemedView>

                    <AUIThemedView style={styles.courseContainer}>
                        {coursesData.map((item) => (
                            <AUIThemedView
                                key={item.id}
                                style={styles.courseItem}
                            >
                                <Course title={item.name} image={item.image} />
                            </AUIThemedView>
                        ))}
                    </AUIThemedView>
                </AUIThemedView>

                <AUIThemedView>
                    <AUIThemedView style={styles.popularTitle}>
                        <AUIThemedText style={styles.title}>
                            Last Chance to apply
                        </AUIThemedText>
                        <Link href={"#"} style={styles.viewAll}>
                            View All
                        </Link>
                    </AUIThemedView>

                    <AUIThemedView style={{ paddingLeft: 10 }}>
                        <FlatList
                            horizontal
                            data={lastChanceData}
                            renderItem={({ item }) => (
                                <LastChance
                                    title={item.title}
                                    subTitle={item.subTitle}
                                />
                            )}
                            keyExtractor={(item) => item.id}
                        />
                    </AUIThemedView>
                </AUIThemedView>
            </AUIThemedView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    flagImage: {
        width: 70,
        height: 70,
        borderRadius: 100,
    },
    flagNames: {
        fontWeight: "600",
        fontSize: 15,
        textAlign: "center",
    },
    flagImageContainer: {
        padding: 5,
    },
    selectedFlag: {
        borderWidth: 2,
        borderColor: "#93D1BF",
        borderRadius: 100,
    },

    lastChanceItem: {
        width: 270,
        height: 90,
        borderRadius: 10,
        overflow: "hidden",
    },

    schoolContainer: { paddingVertical: 10, marginRight: 18 },
    schoolItem: {
        width: 270,
        height: 160,
        borderRadius: 10,
        overflow: "hidden",
    },
    schoolTitle: {
        top: 100,
        textAlign: "center",
        color: "white",
        fontSize: 14,
        fontWeight: "600",
    },
    schoolCaption: {
        top: 95,
        textAlign: "center",
        color: "white",
        fontSize: 13,
        fontWeight: "400",
    },

    pagerView: {
        height: 200,
    },
    dotsContainer: {
        position: "absolute",
        bottom: -5,
        left: 140,
        flexDirection: "row",
    },
    dot: {
        marginHorizontal: 5,
    },
    selectedDot: {
        backgroundColor: "white",
    },
    carouselImage: {
        width: "100%",
        height: 200,
    },
    imageText: {
        top: 130,
        left: 70,
        color: "white",
        fontWeight: "900",
        fontSize: 18,
    },

    popularTitle: {
        flexDirection: "row",
        paddingHorizontal: 15,
        paddingTop: 15,
        justifyContent: "space-between",
    },

    innerContainer: {
        padding: 10,
    },

    title: {
        fontWeight: "bold",
        fontSize: 17,
    },

    item: {
        paddingVertical: 10,
        marginRight: 18,
    },
    imageContainer: {
        position: "relative",
        width: 90,
        height: 90,
        borderRadius: 7,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 7,
    },
    gradient: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: "100%",
        borderRadius: 7,
    },
    destinationImageText: {
        color: "white",
        top: 60,
        textAlign: "center",
        fontSize: 15,
        fontWeight: "600",
    },

    courseContainer: {
        paddingLeft: 10,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    courseItem: {
        width: 165,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: APP_THEME.primary.first,
        margin: 5,
    },
    courseImage: {
        width: "100%",
        objectFit: "fill",
    },
    courseTitle: {
        fontSize: 14,
        fontWeight: "700",
    },
    courseCaption: {
        fontSize: 13,
        fontWeight: "bold",
    },
    viewAll: {
        textDecorationLine: "underline",
        paddingRight: 10,
        fontSize: 17,
        fontWeight: "500",
    },
});
