import useAxios from "@/app/services/axiosClient";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { ApiErrorToast, ApiSuccessToast } from "@/components/common/AUIToast";
import CoursesTab from "@/components/home/schoolDetails/Courses";
import OverviewTab from "@/components/home/schoolDetails/Overview";
import { APP_THEME, TEXT_THEME } from "@/constants/Colors";
import { GLOBAL_TRANSLATION_LABEL } from "@/constants/Properties";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import useIsomorphicLayoutEffect from "@/customHooks/useIsomorphicLayoutEffect";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { addToFavorite, removeFromFavorite } from "@/redux/favoriteSlice";
import { RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
} from "react-native-reanimated";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { useDispatch, useSelector } from "react-redux";

import { ChatBot } from "at-chatbot-native";

interface TabProps {
    courseId: string;
    clientId: string;
}

const IMG_HEIGHT = 250;
const width = Dimensions.get("window").width;

function StudentDetailsTabs({ courseId, clientId }: TabProps) {
    const schoolsResponse = useLangTransformSelector(
        (state: RootState) => state.api.individualSchool || {}
    );
    const theme = useSelector((state: RootState) => state.global.theme);
    const [selectedTab, setSelectedTab] = useState("overview");
    const { t } = useTranslation();

    const handleTabClick = (tabName: string) => {
        setSelectedTab(tabName);
    };

    return (
        <AUIThemedView style={{ marginBottom: 20 }}>
            <AUIThemedView
                style={[
                    tabStyles.tabsContainer,
                    { borderBottomColor: APP_THEME[theme].primary.first },
                ]}
            >
                <Pressable
                    onPress={() => handleTabClick("overview")}
                    style={[
                        tabStyles.tab,
                        selectedTab === "overview"
                            ? [
                                  tabStyles.activeTab,
                                  { borderBottomColor: APP_THEME[theme].primary.first },
                              ]
                            : tabStyles.inactiveTab,
                    ]}
                >
                    <AUIThemedText
                        style={[
                            tabStyles.tabLabel,
                            selectedTab === "overview"
                                ? { color: TEXT_THEME[theme].primary }
                                : { color: TEXT_THEME[theme].secondary },
                        ]}
                    >
                        {t(GLOBAL_TRANSLATION_LABEL.overview)}
                    </AUIThemedText>
                </Pressable>

                <Pressable
                    onPress={() => handleTabClick("courses")}
                    style={[
                        tabStyles.tab,
                        selectedTab === "courses"
                            ? [
                                  tabStyles.activeTab,
                                  { borderBottomColor: APP_THEME[theme].primary.first },
                              ]
                            : tabStyles.inactiveTab,
                    ]}
                >
                    <AUIThemedText
                        style={[
                            tabStyles.tabLabel,
                            selectedTab === "courses"
                                ? { color: TEXT_THEME[theme].primary }
                                : { color: TEXT_THEME[theme].secondary },
                        ]}
                    >
                        {t(GLOBAL_TRANSLATION_LABEL.courses)}
                    </AUIThemedText>
                </Pressable>
            </AUIThemedView>

            <AUIThemedView>
                {selectedTab === "overview" && (
                    <OverviewTab
                        schoolOverView={schoolsResponse[0]}
                        courseId={courseId}
                        clientId={clientId}
                    />
                )}
                {selectedTab === "courses" && <CoursesTab schoolCourses={schoolsResponse[0]} />}
            </AUIThemedView>
        </AUIThemedView>
    );
}

export default function SchoolDetails() {
    const { id } = useLocalSearchParams<{ id: any }>();
    const { post, del } = useAxios();
    const { requestFn } = useApiRequest();
    const dispatch = useDispatch();
    // const { t, i18n } = useTranslation();
    const effect = useIsomorphicLayoutEffect();

    // chatbot
    const [config, setConfig] = useState({});

    const user = useLangTransformSelector((state: RootState) => state.global.user);
    const favorite = useLangTransformSelector((state: RootState) => state.favorite.items);
    const school = useLangTransformSelector((state: RootState) => state.api.individualSchool || {});
    const ratingsOfTheSchool = useLangTransformSelector(
        (state: RootState) => state.api.ratingsOfTheSchool || {}
    );
    const isRTL = useSelector((state: RootState) => state.global.isRTL);
    const theme = useSelector((state: RootState) => state.global.theme);
    const [overallRatings, setRatings] = useState(0);

    useEffect(() => {
        if (ratingsOfTheSchool?.docs) {
            let overallRatings = 0;
            ratingsOfTheSchool?.docs.forEach((rtng: any) => {
                overallRatings += rtng?.rating;
            });
            setRatings(overallRatings / ratingsOfTheSchool?.docs?.length);
        }
    }, [ratingsOfTheSchool]);

    const schoolsResponse = school[0];
    const rating = schoolsResponse?.averageRating;

    useEffect(() => {
        requestFn(API_URL.schoolOverview, "individualSchool", { client: id });
    }, [id]);

    useEffect(() => {
        requestFn(API_URL.rating, "ratingsOfTheSchool", { client: id ? id : {} });
    }, [id]);

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

    const isSchoolFavorited = (id: string) =>
        favorite.clients.some((favClient: any) => favClient._id === id);

    const handleFavoriteClick = (id: string, type: string) => {
        if (isSchoolFavorited(id)) {
            // Remove from favorites
            del(API_URL.favorite, { id, type })
                .then((res: any) => {
                    dispatch(removeFromFavorite({ id, type: "clients" }));
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
                    dispatch(
                        addToFavorite({ countries: [], courses: [], clients: [schoolsResponse] })
                    );
                    ApiSuccessToast(res.message);
                })
                .catch((e: any) => {
                    ApiErrorToast(e.response?.data?.message);
                    console.log(e);
                });
        }
    };

    // const handlePhonePress = (phoneNumber: string) => {
    //     Linking.openURL(`tel:${phoneNumber}`);
    // };

    // const handleEmailPress = (emailAddress: string) => {
    //     Linking.openURL(`mailto:${emailAddress}`);
    // };

    const estimatedCharWidth = 18;
    const maxChars = Math.floor(width / estimatedCharWidth);
    const displayedText =
        schoolsResponse?.name.length > maxChars
            ? `${schoolsResponse?.name.slice(0, maxChars)}...`
            : schoolsResponse?.name;

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
                <TouchableOpacity onPress={() => handleFavoriteClick(id, "client")}>
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
                            name={isSchoolFavorited(id) ? "heart" : "heart-outline"}
                            size={24}
                            color={isSchoolFavorited(id) ? "red" : APP_THEME[theme].secondary.first}
                        />
                    </AUIThemedView>
                </TouchableOpacity>
            ),
            headerTitle: () => (
                <Animated.Text style={[headerTitleAnimatedStyle, styles.screenTitle]}>
                    {displayedText}
                </Animated.Text>
            ),
        });
    }, [
        schoolsResponse,
        id,
        theme,
        navigation,
        favorite,
        headerBackgroundAnimatedStyle,
        headerTitleAnimatedStyle,
    ]);

    if (!id) {
        return (
            <AUIThemedView>
                <AUIThemedText>course not found</AUIThemedText>
            </AUIThemedView>
        );
    }

    // chatbot code below
    const consumerId = id;

    // const consumerId: string = "667276fdb4001407af7aa8a2";

    // Keep it for future chatbot use
    // Bilal : 66683f4f7a4338e3c14339ab
    // Agent : 667278245b62c3824a62e12f
    // const userId = "667278245b62c3824a62e12f";

    // useEffect(() => {
    //     get("https://example.com") // get bot configs
    //         .then((res) => {
    //             console.log(res);

    //             // dummy configs
    //             const botConfigs = {
    //                 _id: "667276fdb4001407af7aa8a2",
    //                 name: "School 1",
    //                 owner: "School 1",
    //                 config: {
    //                     color: "green",
    //                     language: "english",
    //                 },
    //             };

    //             setConfig(botConfigs);
    //         })
    //         .catch((err) => {
    //             console.log("Error in get /bot =>", err);
    //         });
    // }, []);

    return (
        <AUIThemedView style={{ flex: 1 }}>
            <ChatBot consumerId={consumerId} config={config} user={user} />

            <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
                <AUIThemedView style={styles.container}>
                    <Animated.Image
                        source={{
                            uri:
                                schoolsResponse?.banner ||
                                Asset.fromModule(require("@/assets/images/local/no_image.png"))
                                    ?.uri ||
                                Asset.fromModule(require("@/assets/images/local/no_image.png"))
                                    ?.localUri,
                        }}
                        style={[styles.image, imageAnimatedStyle]}
                        resizeMode="cover"
                    />

                    <AUIThemedView style={styles.infoContainer}>
                        <AUIThemedView
                            style={[
                                styles.headerContainer,
                                isRTL && {
                                    flexDirection: "row-reverse",
                                    justifyContent: "space-between",
                                },
                            ]}
                        >
                            <AUIThemedText style={styles.name}>
                                {schoolsResponse?.name}
                            </AUIThemedText>
                            <AUIThemedText style={styles.viewsText}>
                                {school?.view} view
                            </AUIThemedText>
                        </AUIThemedView>

                        <AUIThemedView
                            style={[
                                styles.ratingsContainer,
                                isRTL && {
                                    flexDirection: "row-reverse",
                                },
                            ]}
                        >
                            <StarRatingDisplay
                                color={APP_THEME.light.primary.first}
                                rating={rating}
                            />
                            <AUIThemedText>{schoolsResponse?.totalRatings}</AUIThemedText>
                        </AUIThemedView>

                        <AUIThemedView style={styles.contactsContainer}>
                            <AUIThemedText>
                                <AUIThemedText style={styles.description}>
                                    {schoolsResponse?.description}
                                </AUIThemedText>
                            </AUIThemedText>
                        </AUIThemedView>
                    </AUIThemedView>

                    <AUIThemedView>
                        <StudentDetailsTabs courseId={id} clientId={schoolsResponse?._id} />
                    </AUIThemedView>
                </AUIThemedView>
            </Animated.ScrollView>
        </AUIThemedView>
    );
}

const tabStyles = StyleSheet.create({
    tabsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        // borderBottomColor: APP_THEME.primary.first,
        borderBottomWidth: 1,
    },
    tab: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
    },
    activeTab: {
        borderTopLeftRadius: 7,
        borderBottomWidth: 5,
        // borderBottomColor: APP_THEME.primary.first,
        // backgroundColor: "#D3FFE7",
    },
    inactiveTab: {
        borderTopRightRadius: 7,
        borderBottomWidth: 0,
        borderBottomColor: "#000",
        // backgroundColor: "#fff",
    },
    tabLabel: {
        fontSize: 17,
        fontWeight: "500",
        paddingHorizontal: 25,
    },
});

const styles = StyleSheet.create({
    screenHeader: {
        // backgroundColor: APP_THEME.primary.first,
        height: 100,
        borderBottomWidth: StyleSheet.hairlineWidth,
        // borderColor: APP_THEME.gray,
    },
    screenTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },

    container: { flex: 1 },
    image: {
        height: IMG_HEIGHT,
        width: "auto",
    },
    infoContainer: {
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    headerContainer: {
        flexDirection: "row",
        gap: 10,
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
        width: "70%",
    },
    contactsContainer: {
        paddingTop: 15,
    },
    description: {
        fontSize: 15,
    },
    contacts: {
        flexDirection: "row",
        gap: 11,
        alignItems: "center",
        paddingTop: 5,
    },
    contactText: {
        fontSize: 13,
    },
    ratingsContainer: {
        flexDirection: "row",
        gap: 5,
        marginTop: 10,
        alignItems: "center",
    },
    ratingsText: {
        fontSize: 16,
        fontWeight: "700",
    },
    rankText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#5BD894",
        textDecorationLine: "underline",
    },
    viewsText: {
        fontSize: 16,
        textDecorationLine: "underline",
        color: "#9DA1AC",
    },
});
