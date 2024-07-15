import useAxios from "@/app/services/axiosClient";
import AUIImage from "@/components/common/AUIImage";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { ApiErrorToast, ApiSuccessToast } from "@/components/common/AUIToast";
import PlanComponent from "@/components/home/courseDetails/PlanComponent";
import { APP_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { similarCoursesData } from "@/constants/dummy data/similarCoursesData";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { addItemToCart, removeItemFromCart } from "@/redux/cartSlice";
import { addToFavorite, removeFromFavorite } from "@/redux/favoriteSlice";
import { RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Pressable, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";

interface CoursePlanTabsProps {
    courseId: string;
    clientId: string;
}

function CoursePlanTabs({ courseId, clientId }: CoursePlanTabsProps) {
    const [plans, setPlans] = useState<any[]>([]);
    const [selectedPlan, setSelectedPlan] = useState("");

    const individualCourse = useSelector((state: RootState) => state.api.individualCourse);
    const similarCourse = useSelector((state: RootState) => state.api.similarCourse);


    useEffect(() => {
        if (individualCourse && individualCourse.docs && individualCourse.docs.length > 0) {
            const plans = individualCourse.docs[0].plan;
            setPlans(plans);
            if (plans?.length > 0) {
                setSelectedPlan(plans[0]?.name);
            }
        }
    }, [individualCourse]);


    const handlePlanClick = (planName: string) => {
        setSelectedPlan(planName);
    };

    return (
        <AUIThemedView>
            <AUIThemedView style={planTabsStyles.tabsContainer}>
                {plans.map((plan: any, index: number) => (
                    <Pressable
                        key={plan._id}
                        onPress={() => handlePlanClick(plan.name)}
                        style={
                            selectedPlan === plan.name
                                ? planTabsStyles.activeTab
                                : planTabsStyles.inactiveTab
                        }
                    >
                        <AUIThemedText
                            style={[
                                planTabsStyles.tabLabel,
                                {
                                    color: selectedPlan === plan.name ? "#fff" : "#5BD894",
                                },
                            ]}
                        >
                            {/* {plan.name} */}
                            {`Plan ` + (index + 1)}
                        </AUIThemedText>
                    </Pressable>
                ))}
            </AUIThemedView>
            <AUIThemedView>
                {plans.map(
                    (plan: any) =>
                        selectedPlan === plan.name && (
                            <PlanComponent
                                clientId={clientId}
                                key={plan._id}
                                planId={plan._id}
                                courseId={courseId}
                                plan={plan}
                                scheduleDescription={plan.schedule}
                                lessonDescription={plan.lessonsHour}
                                similarCourses={similarCourse?.docs}
                            />
                        )
                )}
            </AUIThemedView>
        </AUIThemedView>
    );
}

export default function CourseDetails() {
    const { requestFn } = useApiRequest();
    const dispatch = useDispatch();

    const [course, setCourse] = useState<any>({});
    const [clientId, setClientId] = useState<any>({});

    const { id } = useLocalSearchParams<{ id: string }>();
    const { post, del } = useAxios();
    console.log(id);

    if (!id) {
        return (
            <AUIThemedView style={{ justifyContent: "center", alignItems: "center" }}>
                <AUIThemedText>Course not found</AUIThemedText>
            </AUIThemedView>
        );
    }

    useEffect(() => {
        requestFn(API_URL.course, "individualCourse", { id: id });
    }, []);

    const favorite = useSelector((state: RootState) => state.favorite.items);
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const individualCourse = useSelector((state: RootState) => state.api.individualCourse);
    const theme = useSelector((state: RootState) => state.global.theme);

    useEffect(() => {
        if (individualCourse && individualCourse.docs && individualCourse.docs.length > 0) {
            const course = individualCourse.docs[0];
            const clientId = course.client._id;

            setCourse(course);
            requestFn(API_URL.course, "similarCourse", { similar: course.language, limit: 4 });
            setClientId(clientId);
        }
    }, [individualCourse]);

    const isCourseFavorited = (id: string) => {
        return favorite.courses.some((favCourse: any) => favCourse._id === id);
    };
    const isCourseInCart = (id: string) => {
        return cartItems.courses.some((cartItem: any) => cartItem.course._id === id);
    };

    const handleFavoriteClick = (id: string, type: string) => {
        if (isCourseFavorited(id)) {
            // Remove from favorites

            del(API_URL.favorite, { id: id, type: type })
                .then((res: any) => {
                    dispatch(removeFromFavorite({ id, type: "courses" }));

                    ApiSuccessToast(res.message);
                })
                .catch((e: any) => {
                    ApiErrorToast(e.response?.data?.message);
                    console.log(e);
                });
        } else {
            // Add to favorites

            post(API_URL.favorite, { id: id, type: type })
                .then((res: any) => {
                    dispatch(addToFavorite({ countries: [], courses: [course], clients: [] }));

                    ApiSuccessToast(res.message);
                })
                .catch((e: any) => {
                    ApiErrorToast(e.response?.data?.message);
                    console.log(e);
                });
        }
    };

    const handleAddToCart = () => {
        if (isCourseInCart(id)) {
            // Remove from cart

            del(API_URL.cart, { course: id })
                .then((res: any) => {
                    dispatch(removeItemFromCart({ id: id }));

                    ApiSuccessToast(res.message);
                })
                .catch((e: any) => {
                    ApiErrorToast(e.response?.data?.message);
                    console.log(e);
                });
        } else {
            // Add to cart

            post(API_URL.cart, { course: id })
                .then((res: any) => {
                    const courseToAdd = {
                        course: {
                            _id: course._id,
                            client: course.client,
                            courseName: course.courseName,
                            description: course.description,
                            language: course.language,
                            numberOfSeats: course.numberOfSeats,
                            image: course.image,
                            startDate: course.startDate,
                            endDate: course.endDate,
                            currencyType: course.currencyType,
                            category: course.category,
                            plan: course.plan,
                            status: course.status,
                            createdAt: course.createdAt,
                            updatedAt: course.updatedAt,
                            __v: course.__v,
                        },
                        _id: id,
                        addedAt: new Date().toISOString(),
                    };

                    dispatch(addItemToCart({ courses: [courseToAdd] }));

                    ApiSuccessToast(res.message);
                })
                .catch((e: any) => {
                    ApiErrorToast(e.response?.data?.message);
                    console.log(e);
                });
        }
    };

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
                <Animated.View
                    style={[
                        headerBackgroundAnimatedStyle,
                        [
                            styles.screenHeader,
                            {
                                backgroundColor: APP_THEME[theme].primary.first,
                                borderColor: APP_THEME[theme].gray,
                            },
                        ],
                    ]}
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
                <TouchableOpacity
                    onPress={() => {
                        handleFavoriteClick(id, "course");
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
                        <Ionicons
                            name={isCourseFavorited(id) ? "heart" : "heart-outline"}
                            size={24}
                            color={APP_THEME[theme].secondary.first}
                        />
                    </AUIThemedView>
                </TouchableOpacity>
            ),

            headerTitle: () => (
                <Animated.Text style={[headerTitleAnimatedStyle, styles.screenTitle]}>
                    {course.courseName}
                </Animated.Text>
            ),
        });
    }, [course, id, favorite]);

    const startingDate: string = new Date(course.startDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    });

    return (
        <AUIThemedView>
            <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
                <AUIThemedView style={styles.container}>
                    <Animated.Image
                        source={{
                            uri: course.image,
                        }}
                        style={[styles.image, imageAnimatedStyle]}
                        resizeMode="cover"
                    />

                    <AUIThemedView
                        style={[
                            styles.infoContainer,
                            { backgroundColor: APP_THEME[theme].background },
                        ]}
                    >
                        <AUIThemedView
                            style={[
                                styles.headerContainer,
                                { backgroundColor: APP_THEME[theme].background },
                            ]}
                        >
                            <AUIThemedView style={styles.header}>
                                <AUIImage
                                    path={
                                        Asset.fromModule(require("@/assets/icons/course.png")).uri
                                    }
                                    icon
                                    style={{ width: 40 }}
                                />
                                <AUIThemedView
                                    style={{ backgroundColor: APP_THEME[theme].background }}
                                >
                                    <AUIThemedText style={styles.title}>
                                        {course.courseName}
                                    </AUIThemedText>
                                    <AUIThemedText style={styles.startingDate}>
                                        Starting from: {startingDate}
                                    </AUIThemedText>
                                </AUIThemedView>
                            </AUIThemedView>
                            <TouchableOpacity onPress={handleAddToCart}>
                                <AUIThemedView
                                    style={[
                                        styles.cartIconContainer,
                                        { backgroundColor: APP_THEME[theme].primary.first },
                                    ]}
                                >
                                    <Ionicons
                                        name={isCourseInCart(id) ? "cart" : "cart-outline"}
                                        size={24}
                                        color="#fff"
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
                            {course.description}
                        </AUIThemedText>
                    </AUIThemedView> */}
                    <AUIThemedView
                        style={[
                            styles.planContainer,
                            { backgroundColor: APP_THEME[theme].background },
                        ]}
                    >
                        <AUIThemedText style={styles.planText}>
                            {GLOBAL_TEXT.select_your_plan}
                        </AUIThemedText>

                        <CoursePlanTabs courseId={id} clientId={clientId} />
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
        // backgroundColor: "#fff",
        borderRadius: 7,
        borderWidth: 1,
        borderColor: "#5BD894",
    },
});

const IMG_HEIGHT = 200;
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
        // backgroundColor: APP_THEME.background,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        // backgroundColor: APP_THEME.background,
    },
    header: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
    },
    cartIconContainer: {
        // backgroundColor: APP_THEME.primary.first,
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
        // backgroundColor: APP_THEME.background,
        paddingVertical: 10,
    },
    planText: {
        fontWeight: "bold",
        marginHorizontal: 12,
    },
});
