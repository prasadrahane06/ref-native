import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME } from "@/constants/Colors";
import { countriesInfo } from "@/constants/countriesInfo";
import { CountryData } from "@/constants/dummyData";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import {
    StyleSheet,
    Text,
    Image,
    FlatList,
    View,
    ImageBackground,
    ScrollView,
} from "react-native";
import PagerView from "react-native-pager-view";

export default function HomeScreen() {
    const Item = ({ title, image }: any) => (
        <AUIThemedView style={styles.destinationItem}>
            <Image style={styles.destinationImage} source={image} />
            <AUIThemedText style={styles.destinationImageText}>
                {title}
            </AUIThemedText>
        </AUIThemedView>
    );

    const Course = ({ title }: any) => (
        <AUIThemedView style={styles.courseItem}>
            <Image
                style={styles.courseImage}
                source={require("@/assets/images/studentHomePage/course-image.png")}
            />
            <AUIThemedView style={{ paddingLeft: 10 }}>
                <AUIThemedText style={styles.courseTitle}>
                    {title}
                </AUIThemedText>
                <AUIThemedText style={{ fontSize: 13 }}>
                    <AUIThemedText style={styles.courseCaption}>
                        Starting from:{" "}
                    </AUIThemedText>
                    20-04-2024
                </AUIThemedText>
            </AUIThemedView>
        </AUIThemedView>
    );

    const Flag = ({ countryName, countryCode }: any) => (
        <AUIThemedView style={styles.destinationItem}>
            <Image
                source={{
                    uri: `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`,
                }}
                style={{ width: 70, height: 70, borderRadius: 100 }}
            />
            <AUIThemedText style={styles.flagNames}>
                {countryName}
            </AUIThemedText>
        </AUIThemedView>
    );

    return (
        <ScrollView>
            <AUIThemedView>
                <PagerView style={styles.pagerView} initialPage={0}>
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

                <AUIThemedView
                    style={{ paddingHorizontal: 10, paddingTop: 15 }}
                >
                    <AUIThemedText style={styles.title}>
                        Find your destination for learning English
                    </AUIThemedText>
                    <FlatList
                        horizontal
                        data={CountryData}
                        renderItem={({ item }) => (
                            <Item title={item.country} image={item.image} />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </AUIThemedView>

                <AUIThemedView style={styles.popularTitle}>
                    <AUIThemedText style={styles.title}>
                        Popular Courses (EN)
                    </AUIThemedText>
                    <Link href={"#"} style={styles.viewAll}>
                        View All
                    </Link>
                </AUIThemedView>

                <AUIThemedView style={styles.courseContainer}>
                    <Course title={"Intensive English course"} />
                    <Course title={"Intensive English course"} />
                    <Course title={"Intensive English course"} />
                    <Course title={"Intensive English course"} />
                </AUIThemedView>

                <AUIThemedView
                    style={{ paddingHorizontal: 10, paddingTop: 15 }}
                >
                    <AUIThemedText style={styles.title}>
                        Choose your language to learn
                    </AUIThemedText>
                    <FlatList
                        horizontal
                        data={countriesInfo}
                        renderItem={({ item }) => (
                            <Flag
                                countryName={item.name}
                                countryCode={item.countryCode}
                            />
                        )}
                        keyExtractor={(item) => item.countryCode}
                    />
                </AUIThemedView>
            </AUIThemedView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    pagerView: {
        height: 180,
    },
    carouselImage: {
        width: "100%",
        height: 180,
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
        paddingHorizontal: 10,
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
    destinationItem: {
        paddingVertical: 10,
        marginRight: 18,
    },
    destinationImage: {
        width: 90,
        height: 90,
        borderRadius: 7,
    },
    destinationImageText: {
        position: "absolute",
        color: "white",
        top: 65,
        left: 20,
        fontWeight: "800",
    },

    courseContainer: {
        paddingHorizontal: 5,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    courseItem: {
        maxWidth: 170,
        // maxHeight: 100,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: APP_THEME.primary.first,
        margin: 7,
    },
    courseImage: {
        width: 170,
        height: 80,
        objectFit: "fill",
    },
    courseTitle: {
        fontSize: 13,
        fontWeight: "bold",
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

    flagImage: {
        borderRadius: 100,
    },
    flagNames: { fontWeight: "600", fontSize: 15, textAlign: "center" },
});
