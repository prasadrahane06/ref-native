import { get } from "@/app/services/axiosClient";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import CoursesTab from "@/components/home/schoolDetails/Courses";
import OverviewTab from "@/components/home/schoolDetails/Overview";
import { APP_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { RootState } from "@/redux/store";
import { FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Pressable, StyleSheet, TouchableOpacity, Linking } from "react-native";
import Animated, {
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
} from "react-native-reanimated";
import { useSelector } from "react-redux";

function StudentDetailsTabs({ schoolId }: { schoolId: string }) {
    const [selectedTab, setSelectedTab] = useState("overview");

    const handleTabClick = (tabName: string) => {
        setSelectedTab(tabName);
    };

    return (
        <AUIThemedView style={{ marginBottom: 20 }}>
            <AUIThemedView style={tabStyles.tabsContainer}>
                <Pressable
                    onPress={() => handleTabClick("overview")}
                    style={[
                        tabStyles.tab,
                        selectedTab === "overview" ? tabStyles.activeTab : tabStyles.inactiveTab,
                    ]}
                >
                    <AUIThemedText
                        style={[
                            tabStyles.tabLabel,
                            selectedTab === "overview"
                                ? tabStyles.activeTabLabel
                                : tabStyles.inactiveTabLabel,
                        ]}
                    >
                        {GLOBAL_TEXT.overview}
                    </AUIThemedText>
                </Pressable>

                <Pressable
                    onPress={() => handleTabClick("courses")}
                    style={[
                        tabStyles.tab,
                        selectedTab === "courses" ? tabStyles.activeTab : tabStyles.inactiveTab,
                    ]}
                >
                    <AUIThemedText
                        style={[
                            tabStyles.tabLabel,
                            selectedTab === "courses"
                                ? tabStyles.activeTabLabel
                                : tabStyles.inactiveTabLabel,
                        ]}
                    >
                        {GLOBAL_TEXT.courses}
                    </AUIThemedText>
                </Pressable>
            </AUIThemedView>

            <AUIThemedView>
                {selectedTab === "overview" && <OverviewTab schoolId={schoolId} />}
                {selectedTab === "courses" && <CoursesTab />}
            </AUIThemedView>
        </AUIThemedView>
    );
}

export default function SchoolDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    console.log(id);

    const { requestFn } = useApiRequest();
    const schoolsResponse = useSelector((state: RootState) => state.api.individualSchool || {});
    useEffect(() => {
        console.log("res of school ", schoolsResponse);
    }, [schoolsResponse]);

    useEffect(() => {
        requestFn(get(API_URL.popularSchool, { id: id ? id : {} }), "individualSchool");
    }, []);

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

    const handlePhonePress = (phoneNumber: string) => {
        Linking.openURL(`tel:${phoneNumber}`);
    };

    const handleEmailPress = (emailAddress: string) => {
        Linking.openURL(`mailto:${emailAddress}`);
    };

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
                <TouchableOpacity onPress={router.back}>
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
                    {schoolsResponse?.name || "The Manchester School"}
                </Animated.Text>
            ),
        });
    }, []);

    return (
        <AUIThemedView>
            <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
                <AUIThemedView style={styles.container}>
                    <Animated.Image
                        source={
                            schoolsResponse?.banner
                                ? { uri: schoolsResponse.banner }
                                : {
                                      uri: Asset.fromModule(
                                          require("@/assets/images/schoolDetailsPage/school.png")
                                      ).uri,
                                  }
                        }
                        style={[styles.image, imageAnimatedStyle]}
                        resizeMode="cover"
                    />

                    <AUIThemedView style={styles.infoContainer}>
                        <AUIThemedView style={styles.headerContainer}>
                            <AUIThemedText style={styles.name}>
                                {schoolsResponse?.name || "The Manchester School"}
                            </AUIThemedText>
                            <AUIThemedText style={styles.viewsText}>150 Views</AUIThemedText>
                        </AUIThemedView>

                        <AUIThemedView style={styles.ratingsContainer}>
                            <Ionicons name="star" size={20} color={APP_THEME.primary.first} />
                            <AUIThemedText style={styles.ratingsText}>4.6</AUIThemedText>
                            <AUIThemedText style={styles.rankText}>QS Rank 276</AUIThemedText>
                        </AUIThemedView>

                        <AUIThemedView style={styles.contactsContainer}>
                            <AUIThemedText>
                                <AUIThemedText style={styles.description}>
                                    The Manchester School, UK, is proud to offer dynamic selection
                                    of language program design to ignite your fashion for
                                    communication and open doors to new cultures.
                                </AUIThemedText>
                            </AUIThemedText>
                        </AUIThemedView>
                    </AUIThemedView>

                    <AUIThemedView>
                        <StudentDetailsTabs />
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
        borderBottomColor: APP_THEME.primary.first,
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
        borderBottomWidth: 2,
        borderBottomColor: APP_THEME.primary.first,
        backgroundColor: "#D3FFE7",
    },
    inactiveTab: {
        borderTopRightRadius: 7,
        borderBottomWidth: 0,
        borderBottomColor: "#000",
        backgroundColor: "#fff",
    },
    tabLabel: {
        fontSize: 17,
        fontWeight: "500",
        paddingHorizontal: 25,
    },
    activeTabLabel: {
        color: "#000",
    },
    inactiveTabLabel: {
        color: "#ccc",
    },
});

const IMG_HEIGHT = 250;
const styles = StyleSheet.create({
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

    container: { flex: 1 },
    image: {
        height: IMG_HEIGHT,
        width: "auto",
    },
    infoContainer: {
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    headerContainer: {
        flexDirection: "row",
        gap: 10,
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
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
