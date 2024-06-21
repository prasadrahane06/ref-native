import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import CoursesTab from "@/components/home/schoolDetails/Courses";
import OverviewTab from "@/components/home/schoolDetails/Overview";
import { APP_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT } from "@/constants/Properties";
import {
    FontAwesome,
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Asset } from "expo-asset";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import { Pressable, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset
} from "react-native-reanimated";

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
                        selectedTab === "overview"
                            ? tabStyles.activeTab
                            : tabStyles.inactiveTab,
                        {
                            borderTopLeftRadius: 7,
                            borderBottomLeftRadius: 7,
                            flex: 1,
                        },
                    ]}
                >
                    <AUIThemedText
                        style={[
                            tabStyles.tabLabel,
                            {
                                color:
                                    selectedTab === "overview"
                                        ? "#fff"
                                        : "#000",
                            },
                        ]}
                    >
                        {GLOBAL_TEXT.overview}
                    </AUIThemedText>
                </Pressable>

                <Pressable
                    onPress={() => handleTabClick("courses")}
                    style={[
                        selectedTab === "courses"
                            ? tabStyles.activeTab
                            : tabStyles.inactiveTab,
                        {
                            borderTopRightRadius: 7,
                            borderBottomRightRadius: 7,
                            flex: 1,
                        },
                    ]}
                >
                    <AUIThemedText
                        style={[
                            tabStyles.tabLabel,
                            {
                                color:
                                    selectedTab === "courses" ? "#fff" : "#000",
                            },
                        ]}
                    >
                        {GLOBAL_TEXT.courses}
                    </AUIThemedText>
                </Pressable>
            </AUIThemedView>

            <AUIThemedView>
                {selectedTab === "overview" && (
                    <OverviewTab schoolId={schoolId} />
                )}
                {selectedTab === "courses" && <CoursesTab />}
            </AUIThemedView>
        </AUIThemedView>
    );
}

export default function SchoolDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    console.log(id);

    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const navigation = useNavigation();
    const scrollOffset = useScrollViewOffset(scrollRef);

    const headerBackgroundAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollOffset.value,
                [0, IMG_HEIGHT / 1.5],
                [0, 1]
            ),
        };
    }, []);

    const headerTitleAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollOffset.value,
                [IMG_HEIGHT / 2, IMG_HEIGHT],
                [0, 1]
            ),
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
                    scale: interpolate(
                        scrollOffset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [2, 1, 1]
                    ),
                },
            ],
        };
    });

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: true,

            headerBackground: () => (
                <Animated.View
                    style={[headerBackgroundAnimatedStyle, styles.screenHeader]}
                />
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
                        <Ionicons
                            name="heart"
                            size={24}
                            color={APP_THEME.secondary.first}
                        />
                    </AUIThemedView>
                </TouchableOpacity>
            ),

            headerTitle: () => (
                <Animated.Text
                    style={[headerTitleAnimatedStyle, styles.screenTitle]}
                >
                    The Manchester School
                </Animated.Text>
            ),
        });
    }, []);

    return (
        <AUIThemedView>
            <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
                <AUIThemedView style={styles.container}>
                    <Animated.Image
                        source={{
                            uri: Asset.fromModule(
                                require("@/assets/images/schoolDetailsPage/school.png")
                            ).uri,
                        }}
                        style={[styles.image, imageAnimatedStyle]}
                        resizeMode="cover"
                    />

                    <AUIThemedView style={styles.infoContainer}>
                        <AUIThemedText style={styles.name}>
                            The Manchester School
                        </AUIThemedText>

                        <AUIThemedView style={styles.ratingsContainer}>
                            <Ionicons
                                name="star"
                                size={20}
                                color={APP_THEME.primary.first}
                            />
                            <AUIThemedText style={styles.ratingsText}>
                                4.0
                            </AUIThemedText>
                            <AUIThemedText style={styles.viewsText}>
                                150 Views
                            </AUIThemedText>
                        </AUIThemedView>

                        <AUIThemedView style={styles.contactsContainer}>
                            <AUIThemedText style={styles.contact}>
                                {GLOBAL_TEXT.contact_details}
                            </AUIThemedText>

                            <AUIThemedView
                                style={{
                                    paddingVertical: 5,
                                    backgroundColor: APP_THEME.background,
                                }}
                            >
                                <AUIThemedView style={styles.contacts}>
                                    <FontAwesome
                                        name="phone"
                                        size={20}
                                        color={APP_THEME.primary.first}
                                    />
                                    <AUIThemedText
                                        style={[
                                            styles.contactText,
                                            { fontWeight: "bold" },
                                        ]}
                                    >
                                        +44 987-986-5443
                                    </AUIThemedText>
                                </AUIThemedView>

                                <AUIThemedView style={styles.contacts}>
                                    <MaterialCommunityIcons
                                        name="email"
                                        size={20}
                                        color={APP_THEME.primary.first}
                                    />
                                    <AUIThemedText style={styles.contactText}>
                                        connecto@mancha.com
                                    </AUIThemedText>
                                </AUIThemedView>

                                <AUIThemedView style={styles.contacts}>
                                    <Ionicons
                                        name="globe-outline"
                                        size={20}
                                        color={APP_THEME.primary.first}
                                    />
                                    <AUIThemedText style={styles.contactText}>
                                        www.manchesterschool.com
                                    </AUIThemedText>
                                </AUIThemedView>
                            </AUIThemedView>
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
        marginHorizontal: 12,
    },
    tabLabel: { fontSize: 17, fontWeight: "500", paddingHorizontal: 25 },
    activeTab: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
        backgroundColor: "#0A152F",
        borderWidth: 1,
        borderColor: "#0A152F",
    },
    inactiveTab: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#0A152F",
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
    name: {
        fontSize: 22,
        fontWeight: "bold",
    },
    contactsContainer: {
        paddingTop: 15,
    },
    contact: {
        fontSize: 15,
        fontWeight: "bold",
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
        gap: 8,
        marginTop: 10,
        alignItems: "center",
    },
    ratingsText: {
        fontSize: 16,
        fontWeight: "600",
    },
    viewsText: {
        fontSize: 16,
        textDecorationLine: "underline",
        color: "#9DA1AC",
    },
});
