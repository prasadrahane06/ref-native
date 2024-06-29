import AUIImage from "@/components/common/AUIImage";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { ApiSuccessToast } from "@/components/common/AUIToast";
import PlanComponent from "@/components/home/courseDetails/PlanComponent";
import { APP_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { planOne } from "@/constants/dummy data/planOne";
import { planThree } from "@/constants/dummy data/planThree";
import { planTwo } from "@/constants/dummy data/planTwo";
import { similarCoursesData } from "@/constants/dummy data/similarCoursesData";
import { addItemToCart } from "@/redux/cartSlice";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import { Pressable, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
} from "react-native-reanimated";
import { useDispatch } from "react-redux";

function CoursePlanTabs({ courseId }: { courseId: string }) {
    const [selectedPlan, setSelectedPlan] = useState(GLOBAL_TEXT.plan_one);

    const handlePlanClick = (planName: string) => {
        setSelectedPlan(planName);
    };

    return (
        <AUIThemedView style={{ marginBottom: 20 }}>
            <AUIThemedView style={planTabsStyles.tabsContainer}>
                <Pressable
                    onPress={() => handlePlanClick(GLOBAL_TEXT.plan_one)}
                    style={
                        selectedPlan === GLOBAL_TEXT.plan_one
                            ? planTabsStyles.activeTab
                            : planTabsStyles.inactiveTab
                    }
                >
                    <AUIThemedText
                        style={[
                            planTabsStyles.tabLabel,
                            {
                                color: selectedPlan === GLOBAL_TEXT.plan_one ? "#fff" : "#5BD894",
                            },
                        ]}
                    >
                        {GLOBAL_TEXT.plan_one}
                    </AUIThemedText>
                </Pressable>

                <Pressable
                    onPress={() => handlePlanClick(GLOBAL_TEXT.plan_two)}
                    style={
                        selectedPlan === GLOBAL_TEXT.plan_two
                            ? planTabsStyles.activeTab
                            : planTabsStyles.inactiveTab
                    }
                >
                    <AUIThemedText
                        style={[
                            planTabsStyles.tabLabel,
                            {
                                color: selectedPlan === GLOBAL_TEXT.plan_two ? "#fff" : "#5BD894",
                            },
                        ]}
                    >
                        {GLOBAL_TEXT.plan_two}
                    </AUIThemedText>
                </Pressable>

                <Pressable
                    onPress={() => handlePlanClick(GLOBAL_TEXT.plan_three)}
                    style={
                        selectedPlan === GLOBAL_TEXT.plan_three
                            ? planTabsStyles.activeTab
                            : planTabsStyles.inactiveTab
                    }
                >
                    <AUIThemedText
                        style={[
                            planTabsStyles.tabLabel,
                            {
                                color: selectedPlan === GLOBAL_TEXT.plan_three ? "#fff" : "#5BD894",
                            },
                        ]}
                    >
                        {GLOBAL_TEXT.plan_three}
                    </AUIThemedText>
                </Pressable>
            </AUIThemedView>
            <AUIThemedView>
                {selectedPlan === GLOBAL_TEXT.plan_one && (
                    <PlanComponent
                        courseId={courseId}
                        plan={planOne}
                        scheduleDescription="All courses are Monday to Friday, with morning and afternoon classes"
                        lessonDescription="45-minute lessons"
                        similarCourses={similarCoursesData}
                    />
                )}
                {selectedPlan === GLOBAL_TEXT.plan_two && (
                    <PlanComponent
                        courseId={courseId}
                        plan={planTwo}
                        scheduleDescription="All courses are Monday to Friday, with morning and afternoon classes"
                        lessonDescription="45-minute lessons"
                        similarCourses={similarCoursesData}
                    />
                )}
                {selectedPlan === GLOBAL_TEXT.plan_three && (
                    <PlanComponent
                        courseId={courseId}
                        plan={planThree}
                        scheduleDescription="All courses are Monday to Friday, with morning and afternoon classes"
                        lessonDescription="45-minute lessons"
                        similarCourses={similarCoursesData}
                    />
                )}
            </AUIThemedView>
        </AUIThemedView>
    );
}

export default function CourseDetails() {
    const dispatch = useDispatch();
    const { id } = useLocalSearchParams<{ id: string }>();
    console.log(id);

    // if (!id) {
    //     return (
    //         <AUIThemedView
    //             style={{ justifyContent: "center", alignItems: "center" }}
    //         >
    //             <AUIThemedText>Course not found</AUIThemedText>
    //         </AUIThemedView>
    //     );
    // }

    // const { requestFn } = useApiRequest();

    // requestFn(
    //     get("http://localhost:4000/dev/school?id=666846b7b1340aee251deff5"),
    //     "courseDetails"
    // );

    // const courseDetails = useSelector(
    //     (state: RootState) => state.api.courseDetails
    // );

    // console.log("courseDetails", courseDetails);

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

            headerTitle: () => (
                <Animated.Text style={[headerTitleAnimatedStyle, styles.screenTitle]}>
                    Exam preparation course
                </Animated.Text>
            ),
        });
    }, []);

    const handleAddToCart = () => {
        // Replace with actual course details
        const courseDetails = {
            courseId: Math.random().toString(36).substring(7),
            title: "Exam preparation course",
            startingDate: "20-06-2024",
            image: Asset.fromModule(
                require("@/assets/images/studentHomePage/popularSchools/school-1.png")
            ).uri,
        };
        // @ts-ignore
        dispatch(addItemToCart(courseDetails));
        console.log("Item added to cart");
        ApiSuccessToast("✅ Added to cart");
    };

    return (
        <AUIThemedView>
            <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
                <AUIThemedView style={styles.container}>
                    <Animated.Image
                        source={{
                            uri: Asset.fromModule(
                                require("@/assets/images/studentHomePage/popularSchools/school-1.png")
                                // require("@/assets/images/schoolDetailsPage/courses/image-1.png")
                            ).uri,
                        }}
                        style={[styles.image, imageAnimatedStyle]}
                        resizeMode="cover"
                    />

                    <AUIThemedView style={styles.infoContainer}>
                        <AUIThemedView style={styles.headerContainer}>
                            <AUIThemedView style={styles.header}>
                                <AUIImage
                                    path={
                                        Asset.fromModule(require("@/assets/icons/course.png")).uri
                                    }
                                    icon
                                    style={{ width: 40 }}
                                />
                                <AUIThemedView style={styles.courseInfo}>
                                    <AUIThemedText style={styles.title}>
                                        Embark on a French Odyssey{" "}
                                    </AUIThemedText>
                                    <AUIThemedText style={styles.startingDate}>
                                        Starting from: 20-06-2024
                                    </AUIThemedText>
                                </AUIThemedView>
                            </AUIThemedView>
                            <TouchableOpacity onPress={handleAddToCart}>
                                <AUIThemedView style={styles.cartIconContainer}>
                                    <AUIImage
                                        path={
                                            Asset.fromModule(require("@/assets/icons/cart.png")).uri
                                        }
                                        icon
                                        style={{ width: 20, height: 20 }}
                                    />
                                </AUIThemedView>
                            </TouchableOpacity>
                        </AUIThemedView>
                    </AUIThemedView>
                    {/* <AUIThemedView style={{ paddingHorizontal: 15, marginBottom: 10 }}>
                        <AUIThemedText
                            style={[
                                styles.startingDate,
                                {
                                    lineHeight: 20,
                                    fontSize: 18,
                                    color: APP_THEME.primary.first,
                                    fontWeight: "bold",
                                },
                            ]}
                        >
                            Live like a Parisian, sip coffee, speak French, become a local.
                        </AUIThemedText>
                    </AUIThemedView> */}
                    <AUIThemedView style={styles.planContainer}>
                        <AUIThemedText style={styles.planText}>
                            {GLOBAL_TEXT.select_your_plan}
                        </AUIThemedText>

                        {/* remove this ignore after API integration */}
                        {/* @ts-ignore */}
                        <CoursePlanTabs courseId={id} />
                    </AUIThemedView>
                </AUIThemedView>
            </Animated.ScrollView>
        </AUIThemedView>
    );
}

const planTabsStyles = StyleSheet.create({
    tabsContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginHorizontal: 12,
        marginVertical: 10,
        gap: 10,
    },
    tabLabel: { fontWeight: "500", paddingHorizontal: 25 },
    activeTab: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: "#5BD894",
        borderRadius: 7,
        borderWidth: 1,
        borderColor: "#5BD894",
    },
    inactiveTab: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: "#fff",
        borderRadius: 7,
        borderWidth: 1,
        borderColor: "#5BD894",
    },
});

const IMG_HEIGHT = 200;

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

    container: {
        flex: 1,
    },
    image: {
        height: IMG_HEIGHT,
        width: "auto",
    },
    infoContainer: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: APP_THEME.background,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        backgroundColor: APP_THEME.background,
    },
    header: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
    },
    courseInfo: {
        backgroundColor: APP_THEME.background,
    },
    cartIconContainer: {
        backgroundColor: APP_THEME.primary.first,
        borderRadius: 50,
        padding: 10,
    },
    title: {
        fontSize: 18,
        // width: "80%",
        fontWeight: "bold",
    },
    startingDate: {
        fontSize: 14,
        color: "#6c757d",
    },
    planContainer: {
        backgroundColor: APP_THEME.background,
        paddingVertical: 10,
    },
    planText: {
        fontWeight: "bold",
        marginHorizontal: 12,
    },
});
