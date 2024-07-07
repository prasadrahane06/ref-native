import useAxios from "@/app/services/axiosClient";
import AUIImage from "@/components/common/AUIImage";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { ApiErrorToast, ApiSuccessToast } from "@/components/common/AUIToast";
import PhotoGallaryList from "@/components/home/common/PhotoGallaryList";
import SchoolList from "@/components/home/common/SchoolList";
import SectionTitle from "@/components/home/common/SectionTitle";
import { APP_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { RootState } from "@/redux/store";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
} from "react-native-reanimated";
import { useSelector } from "react-redux";

export default function CityDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    console.log("country id =>", id);

    if (!id) {
        return (
            <AUIThemedView style={{ justifyContent: "center", alignItems: "center" }}>
                <AUIThemedText>City not found</AUIThemedText>
            </AUIThemedView>
        );
    }

    const [readMore, setReadMore] = useState(false);
    const [country, setCountry] = useState<any>({});
    const [photoGallary, setPhotoGallary] = useState<any>([]);
    const [aboutText, setAboutText] = useState("");

    const { requestFn } = useApiRequest();

    const { post } = useAxios();

    const schoolsResponse = useSelector((state: RootState) => state.api.countrySchool);
    const individualCountry = useSelector((state: RootState) => state.api.individualCountry);

    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const navigation = useNavigation();
    const scrollOffset = useScrollViewOffset(scrollRef);

    const headerBackgroundAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
        };
    }, []);
    const headerTitleAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(scrollOffset.value, [IMG_HEIGHT / 2, IMG_HEIGHT], [0, 1]),
        };
    }, []);
    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
                        [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
                    ),
                },
                {
                    scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1]),
                },
            ],
        };
    });

    useEffect(() => {
        requestFn(API_URL.country, "individualCountry", { id: id });
        requestFn(API_URL.popularSchool , "countrySchool" , { location: id })
    }, [id]);

    useEffect(() => {
        if (individualCountry?.docs && individualCountry.docs.length > 0) {
            setAboutText(individualCountry.docs[0].about || "");
            setCountry(individualCountry.docs[0]);
            setPhotoGallary(individualCountry.docs[0].images || []);
        }
    }, [individualCountry]);

    console.log("individualCountry =>", individualCountry?.docs?.[0]);

    const wordsLimit = 50;
    const truncatedText = aboutText.split(" ").slice(0, wordsLimit).join(" ");

    const handleFavoriteClick = (id: string, type: string) => {
        post(API_URL.favorite, { id: id, type: type })
            .then((res: any) => {
                ApiSuccessToast(res.message);
                console.log("response ", res.data);
            })
            .catch((e: any) => {
                ApiErrorToast(e.response?.data?.message);
                console.log(e);
            });

        console.log(id, type);
    };
    const population = country?.population;
    const formattedPopulation =
        population && population >= 1000000
            ? (population / 1000000).toFixed(1) + "M"
            : population && population > 0
            ? population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : null;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: true,

            headerBackground: () => (
                <Animated.View style={[headerBackgroundAnimatedStyle, styles.screenHeader]} />
            ),

            headerLeft: () => (
                <Ionicons
                    name="arrow-back"
                    size={30}
                    color={"#fff"}
                    style={{
                        position: "absolute",
                        left: -57,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onPress={() => navigation.goBack()}
                />
            ),
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => {
                        handleFavoriteClick(country._id, "country");
                    }}
                >
                    <AUIThemedView
                        style={{
                            backgroundColor: "rgba(91, 216, 148, 0.3)",
                            borderRadius: 50,
                            padding: 10,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Ionicons name="heart" size={24} color={APP_THEME.secondary.first} />
                    </AUIThemedView>
                </TouchableOpacity>
            ),

            headerTitle: () => (
                <Animated.Text style={[headerTitleAnimatedStyle, styles.screenTitle]}>
                    {country?.name?.en}
                </Animated.Text>
            ),
        });
    }, [id, country]);

    return (
        <AUIThemedView>
            <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
                <AUIThemedView style={styles.container}>
                    <AUIThemedView>
                        <Animated.Image
                            source={{
                                uri: country?.images?.[0],
                            }}
                            style={[styles.image, imageAnimatedStyle]}
                            resizeMode="cover"
                        />
                    </AUIThemedView>

                    <AUIThemedView style={styles.infoContainer}>
                        <AUIThemedText style={styles.name}>
                            Why study in {country?.name?.ar}
                        </AUIThemedText>
                        <AUIThemedView style={styles.headingContainer}>
                            <AUIThemedView style={styles.headingImageContainer}>
                                <AUIImage
                                    path={country?.flag}
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
                                    path={photoGallary[0]}
                                    style={styles.iconImage}
                                    resizeMode="cover"
                                />
                                <AUIThemedView style={styles.iconTextContainer}>
                                    <AUIThemedText style={styles.iconText}>Capital</AUIThemedText>
                                    <AUIThemedText style={styles.iconSubText}>
                                        {country?.capital}
                                    </AUIThemedText>
                                </AUIThemedView>
                            </View>

                            <View style={styles.iconWrapper}>
                                <AUIImage
                                    path={photoGallary[0]}
                                    style={styles.iconImage}
                                    resizeMode="cover"
                                />
                                <AUIThemedView style={styles.iconTextContainer}>
                                    <AUIThemedText style={styles.iconText}>
                                        Population
                                    </AUIThemedText>
                                    <AUIThemedText style={styles.iconSubText}>
                                        {formattedPopulation}
                                    </AUIThemedText>
                                </AUIThemedView>
                            </View>
                            <View style={styles.iconWrapper}>
                                <AUIImage
                                    path={photoGallary[0]}
                                    style={styles.iconImage}
                                    resizeMode="cover"
                                />
                                <AUIThemedView style={styles.iconTextContainer}>
                                    <AUIThemedText style={styles.iconText}>Language</AUIThemedText>
                                    <AUIThemedText style={styles.iconSubText}>
                                        {country?.language?.name}
                                    </AUIThemedText>
                                </AUIThemedView>
                            </View>
                        </AUIThemedView>

                        <AUIThemedView style={styles.aboutContainer}>
                            <AUIThemedText style={styles.aboutTitle}>
                                About {country?.name?.ar}
                            </AUIThemedText>
                            <AUIThemedText style={styles.aboutDescription}>
                                {readMore ? truncatedText : aboutText}
                                <AUIThemedText
                                    onPress={() => setReadMore(!readMore)}
                                    style={styles.readMoreText}
                                >
                                    {readMore ? "Read Less" : "Read More"}
                                </AUIThemedText>
                            </AUIThemedText>
                        </AUIThemedView>
                    </AUIThemedView>

                    <AUIThemedView style={styles.photoGalleryContainer}>
                        <AUIThemedView style={styles.photoGalleryheader}>
                            <AUIThemedText style={styles.photoGalleryText}>
                                {GLOBAL_TEXT.photo_gallery}
                            </AUIThemedText>
                        </AUIThemedView>
                        <PhotoGallaryList data={country?.images} />
                    </AUIThemedView>

                    <AUIThemedView style={styles.popularSchoolsContainer}>
                        <SectionTitle viewAll="#">{GLOBAL_TEXT.popular_schools}</SectionTitle>
                        <SchoolList data={schoolsResponse?.docs} />
                    </AUIThemedView>
                </AUIThemedView>
            </Animated.ScrollView>
        </AUIThemedView>
    );
}

const IMG_HEIGHT = 200;
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: APP_THEME.background },
    screenHeader: {
        backgroundColor: APP_THEME.primary.first,
        height: 100,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: APP_THEME.gray,
    },
    screenTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
    image: {
        height: IMG_HEIGHT,
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
        lineHeight: 20,
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
