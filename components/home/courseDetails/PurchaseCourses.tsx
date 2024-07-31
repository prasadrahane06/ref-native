import AUIBackgroundImage from "@/components/common/AUIBackgroundImage";
import AUIButton from "@/components/common/AUIButton";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

interface PurchaseCoursesProps {
    courseId: string;
    title: string;
    subtitle: string;
    image: any;
    schoolName: string;
    type: string;
}
interface PurchaseCoursesListProps {
    data: any[];
    seatBooking?: boolean;
    completedCourse?: boolean;
}

function PurchaseCourses({
    title,
    subtitle,
    image,
    schoolName,
    type,
    courseId,
}: PurchaseCoursesProps) {
    return (
        <TouchableOpacity
            style={purchaseCoursesStyle.item}
            onPress={() =>
                router.push({
                    pathname: `(home)/courseDetails/${courseId}`,
                })
            }
        >
            <AUIBackgroundImage path={image} style={purchaseCoursesStyle.image}>
                <LinearGradient
                    colors={[
                        "transparent",
                        "rgba(10, 21, 47, 0.5)",
                        "rgba(10, 21, 47, 0.6)",
                        "rgba(10, 21, 47, 1)",
                    ]}
                    style={purchaseCoursesStyle.gradient}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                />
                <AUIThemedText style={purchaseCoursesStyle.title}>{title}</AUIThemedText>
                <AUIThemedText style={purchaseCoursesStyle.subtitle}>{subtitle}</AUIThemedText>
                <View style={purchaseCoursesStyle.schoolStatus}>
                    <AUIThemedText style={{ color: "#fff", width: 150, fontSize: 20 }}>
                        {schoolName}
                    </AUIThemedText>
                    <AUIButton
                        title={
                            type === "BOOKED"
                                ? "Starting from:01-08-2024"
                                : type === "COMPLETED"
                                ? "View Certificate"
                                : "Ongoing"
                        }
                        selected
                        style={{ width: "40%" }}
                        regularText
                    />
                </View>
            </AUIBackgroundImage>
        </TouchableOpacity>
    );
}

export default function PurchaseCoursesList({
    data,
    seatBooking = false,
    completedCourse = false,
}: PurchaseCoursesListProps) {
    const type = seatBooking ? "BOOKED" : completedCourse ? "COMPLETED" : "ONGOING";

    const { t } = useTranslation();

    if (data.length === 0) {
        return (
            <AUIThemedView style={[purchaseCoursesStyle.container, { justifyContent: "center" }]}>
                <AUIThemedText style={purchaseCoursesStyle.noCourseText}>
                    {t("no_courses_found")}
                </AUIThemedText>
            </AUIThemedView>
        );
    }

    return (
        <AUIThemedView style={purchaseCoursesStyle.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <PurchaseCourses
                        courseId={item?.course?._id}
                        image={item?.course?.image}
                        title={item?.course?.courseName}
                        subtitle={item?.course?.description}
                        schoolName={item?.course?.client?.name}
                        type={type}
                    />
                )}
                keyExtractor={(item) => item?._id}
            />
        </AUIThemedView>
    );
}

const { height: windowHeight } = Dimensions.get("window");
const purchaseCoursesStyle = StyleSheet.create({
    container: { flex: 1, padding: 20, height: windowHeight },
    noCourseText: { textAlign: "center", fontSize: 20 },
    item: {
        // width: 270,

        borderRadius: 10,
        overflow: "hidden",
        // marginRight: 18,

        width: "100%", //388,
        height: 200,
        marginBottom: 10,
        // marginHorizontal: 5,
    },
    title: {
        fontSize: 17,
        fontWeight: "500",
        color: "#fff",
        paddingTop: 20,
        paddingLeft: 10,
    },
    subtitle: {
        fontSize: 13,
        color: "#fff",
        paddingTop: 5,
        paddingLeft: 10,
    },
    gradient: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: "100%",
        borderRadius: 7,
    },
    image: {
        width: "auto",
        height: "100%",
    },
    schoolStatus: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        marginVertical: 10,
    },
});
