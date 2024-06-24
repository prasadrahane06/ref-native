import AUIBackgroundImage from "@/components/common/AUIBackgroundImage";
import AUIButton from "@/components/common/AUIButton";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

interface PurchaseCoursesProps {
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

function PurchaseCourses({ title, subtitle, image, schoolName, type }: PurchaseCoursesProps) {
    return (
        <AUIThemedView style={purchaseCoursesStyle.item}>
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
                    <AUIThemedText style={{ color: "#fff" }}>{schoolName}</AUIThemedText>
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
        </AUIThemedView>
    );
}

export default function PurchaseCoursesList({
    data,
    seatBooking = false,
    completedCourse = false,
}: PurchaseCoursesListProps) {
    const type = seatBooking ? "BOOKED" : completedCourse ? "COMPLETED" : "ONGOING";
    return (
        <AUIThemedView style={purchaseCoursesStyle.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <PurchaseCourses
                        image={item.image}
                        title={item.title}
                        subtitle={item.subtitle}
                        schoolName={item.schoolName}
                        type={type}
                    />
                )}
                keyExtractor={(item) => item.id}
            />
        </AUIThemedView>
    );
}

const purchaseCoursesStyle = StyleSheet.create({
    container: { padding: 20 },
    item: {
        // width: 270,
        // height: 120,
        borderRadius: 10,
        overflow: "hidden",
        // marginRight: 18,

        width: "100%", //388,
        height: 163,
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
        marginTop: 10,
    },
});
