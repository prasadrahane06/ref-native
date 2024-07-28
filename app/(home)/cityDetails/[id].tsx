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
import useIsomorphicLayoutEffect from "@/customHooks/useIsomorphicLayoutEffect";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { setResponse } from "@/redux/apiSlice";
import { addToFavorite, removeFromFavorite } from "@/redux/favoriteSlice";
import { RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";

export default function cityDetails() {
    const effect = useIsomorphicLayoutEffect();
    const { id } = useLocalSearchParams<{ id: any }>();

    const [readMore, setReadMore] = useState(false);
    const [country, setCountry] = useState<any>({});
    const [photoGallary, setPhotoGallary] = useState<any>([]);
    const [aboutText, setAboutText] = useState("");
    const { requestFn } = useApiRequest();
    const dispatch = useDispatch();
    const { post, del } = useAxios();
    const favorite = useLangTransformSelector((state: RootState) => state.favorite.items);
    const schoolsResponse = useLangTransformSelector((state: RootState) => state.api.countrySchool);
    const individualCountry = useLangTransformSelector(
        (state: RootState) => state.api.individualCountry
    );
    const isRTL = useSelector((state: RootState) => state.global.isRTL);
    const theme = useSelector((state: RootState) => state.global.theme);
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
        requestFn(API_URL.school, "countrySchool", { location: id });
    }, []);

    useEffect(() => {
        if (individualCountry?.docs && individualCountry.docs.length > 0) {
            setAboutText(individualCountry.docs[0].about || "");
            setCountry(individualCountry.docs[0]);
            setPhotoGallary(individualCountry.docs[0].images || []);
        }
    }, [individualCountry]);

    const wordsLimit = 50;
    const truncatedText = aboutText.split(" ").slice(0, wordsLimit).join(" ");
    const isTruncated = aboutText.split(" ").length > wordsLimit;

    const isCountryFavorited = (id: string) => {
        return favorite.countries.some((favCountry: any) => favCountry._id === id);
    };

    const handleFavoriteClick = (id: string, type: string) => {
        if (isCountryFavorited(id)) {
            // Remove from favorites
            del(API_URL.favorite, { id, type })
                .then((res: any) => {
                    dispatch(removeFromFavorite({ id, type: "countries" }));
                    ApiSuccessToast(res.message);
                })
                .catch((e: any) => {
                    ApiErrorToast(e.response?.data?.message);
                    console.log(e);
                });
        } else {
            // Add to favorites
            post(API_URL.favorite, { id, type })
                .then((res: any) => {
                    dispatch(addToFavorite({ countries: [country], courses: [], clients: [] }));
                    ApiSuccessToast(res.message);
                })
                .catch((e: any) => {
                    ApiErrorToast(e.response?.data?.message);
                    console.log(e);
                });
        }
    };

    const population = country?.population;
    const formattedPopulation =
        population && population >= 1000000
            ? (population / 1000000).toFixed(1) + "M"
            : population && population > 0
            ? population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : null;

    effect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerBackVisible: false,

            headerBackground: () => (
                <Animated.View
                    style={[
                        headerBackgroundAnimatedStyle,
                        styles.screenHeader,
                        {
                            backgroundColor: APP_THEME[theme].primary.first,
                            borderColor: APP_THEME[theme].gray,
                        },
                    ]}
                />
            ),
            headerRight: () => (
                <TouchableOpacity onPress={() => handleFavoriteClick(id, "country")}>
                    <AUIThemedView
                        style={{
                            backgroundColor: "rgba(91, 216, 148, 0.3)",
                            borderRadius: 50,
                            padding: 10,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Ionicons
                            name={isCountryFavorited(id) ? "heart" : "heart-outline"}
                            size={24}
                            color={
                                isCountryFavorited(id) ? "red" : APP_THEME[theme].secondary.first
                            }
                        />
                    </AUIThemedView>
                </TouchableOpacity>
            ),
            headerTitle: () => (
                <Animated.Text style={[headerTitleAnimatedStyle, styles.screenTitle]}>
                    {country?.name}
                </Animated.Text>
            ),
        });
    }, [
        id,
        country,
        headerBackgroundAnimatedStyle,
        headerTitleAnimatedStyle,
        isCountryFavorited,
        navigation,
        theme,
    ]);

    if (!id) {
        return (
            <AUIThemedView style={{ justifyContent: "center", alignItems: "center" }}>
                <AUIThemedText>City not found</AUIThemedText>
            </AUIThemedView>
        );
    }

    return (
        <AUIThemedView>
            <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
                <AUIThemedView
                    style={[styles.container, { backgroundColor: APP_THEME[theme].background }]}
                >
                    <AUIThemedView>
                        <Animated.Image
                            source={{
                                uri:
                                    country?.images?.[0] ||
                                    Asset.fromModule(require("@/assets/images/common/no_image.png"))
                                        .uri,
                            }}
                            style={[styles.image, imageAnimatedStyle]}
                            resizeMode="cover"
                        />
                    </AUIThemedView>

                    <AUIThemedView
                        style={[
                            styles.infoContainer,
                            { backgroundColor: APP_THEME[theme].background },
                        ]}
                    >
                        <AUIThemedText style={styles.name}>
                            Why study in {country?.name}
                        </AUIThemedText>
                        <AUIThemedView
                            style={[
                                styles.headingContainer,
                                { backgroundColor: APP_THEME[theme].background },
                            ]}
                        >
                            <AUIThemedView style={{ backgroundColor: APP_THEME[theme].background }}>
                                <AUIImage
                                    path={country?.flag}
                                    style={styles.headingImage}
                                    resizeMode="cover"
                                />
                            </AUIThemedView>
                            <AUIThemedView
                                style={[
                                    styles.nestedContainer,
                                    { backgroundColor: APP_THEME[theme].background },
                                ]}
                            >
                                <AUIThemedText style={styles.headingName}>
                                    200+ Universities
                                </AUIThemedText>
                                <AUIThemedText style={styles.headingName}>
                                    367,343 international student
                                </AUIThemedText>
                            </AUIThemedView>
                        </AUIThemedView>

                        <AUIThemedView
                            style={[
                                styles.iconContainer,
                                { backgroundColor: APP_THEME[theme].background },
                            ]}
                        >
                            <View style={styles.iconWrapper}>
                                <AUIImage
                                    path={photoGallary[0]}
                                    style={styles.iconImage}
                                    resizeMode="cover"
                                />
                                <AUIThemedView style={styles.iconTextContainer}>
                                    <AUIThemedText style={styles.iconText}>Capital</AUIThemedText>
                                    <AUIThemedText style={styles.iconSubText} numberOfLines={1}>
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

                        <AUIThemedView
                            style={[
                                styles.aboutContainer,
                                { backgroundColor: APP_THEME[theme].background },
                            ]}
                        >
                            <AUIThemedText style={styles.aboutTitle}>
                                About {isRTL ? country?.name?.en : country?.name?.ar}
                            </AUIThemedText>
                            <AUIThemedText style={styles.aboutDescription}>
                                {readMore ? aboutText : truncatedText}
                                {isTruncated && (
                                    <AUIThemedText
                                        onPress={() => setReadMore(!readMore)}
                                        style={styles.readMoreText}
                                    >
                                        {readMore ? "Read Less" : "Read More"}
                                    </AUIThemedText>
                                )}
                            </AUIThemedText>
                        </AUIThemedView>
                    </AUIThemedView>

                    <AUIThemedView style={{ backgroundColor: APP_THEME[theme].background }}>
                        <AUIThemedView
                            style={[
                                styles.photoGalleryheader,
                                { backgroundColor: APP_THEME[theme].background },
                            ]}
                        >
                            <AUIThemedText style={styles.photoGalleryText}>
                                {GLOBAL_TEXT.photo_gallery}
                            </AUIThemedText>
                        </AUIThemedView>
                        <PhotoGallaryList data={country?.images} />
                    </AUIThemedView>

                    <AUIThemedView
                        style={[
                            styles.popularSchoolsContainer,
                            { backgroundColor: APP_THEME[theme].background },
                        ]}
                    >
                        <SectionTitle viewAll="(home)/school/AllSchoolsScreen">
                            {GLOBAL_TEXT.popular_schools}
                        </SectionTitle>
                        <SchoolList data={schoolsResponse?.docs} />
                    </AUIThemedView>
                </AUIThemedView>
            </Animated.ScrollView>
        </AUIThemedView>
    );
}

const IMG_HEIGHT = 200;
const styles = StyleSheet.create({
    container: { flex: 1 },
    screenHeader: {
        height: 100,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    screenTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: APP_THEME.light.background,
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
    },
    name: {
        fontSize: 17,
        fontWeight: "bold",
    },
    headingContainer: {
        flex: 1,
        flexDirection: "row",
        marginVertical: 10,
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
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    iconWrapper: {
        alignItems: "center",
        backgroundColor: APP_THEME.light.primary.third,
        paddingHorizontal: 25,
        borderRadius: 10,
        width: 100,
    },
    iconImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginTop: 8,
    },
    iconTextContainer: {
        marginBottom: 5,
        width: 90,
        backgroundColor: APP_THEME.light.primary.third,
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
    photoGalleryheader: {
        marginBottom: 10,
    },
    photoGalleryText: {
        paddingLeft: 14,
        fontSize: 16,
        fontWeight: "bold",
        paddingVertical: 5,
    },
    popularSchoolsContainer: {
        marginBottom: 15,
    },
});
