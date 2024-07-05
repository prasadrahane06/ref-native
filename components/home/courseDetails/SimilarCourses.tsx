import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";

interface SimilarCoursesProps {
    title: string;
    subtitle: string;
    image: any;
}
interface SimilarCoursesListProps {
    data: any[];
}

function SimilarCourses({ title, subtitle, image }: SimilarCoursesProps) {
    return (
        <AUIThemedView style={similarCoursesStyle.item}>
            <ImageBackground
                source={{
                    uri: image,
                }}
                style={similarCoursesStyle.image}
            >
                <LinearGradient
                    colors={[
                        "transparent",
                        "rgba(10, 21, 47, 0.5)",
                        "rgba(10, 21, 47, 0.6)",
                        "rgba(10, 21, 47, 1)",
                    ]}
                    style={similarCoursesStyle.gradient}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                />
                <AUIThemedText style={similarCoursesStyle.title}>{title}</AUIThemedText>
                <AUIThemedText style={similarCoursesStyle.subtitle}>{subtitle}</AUIThemedText>
            </ImageBackground>
        </AUIThemedView>
    );
}

export default function SimilarCoursesList({ data }: SimilarCoursesListProps) {
    const router = useRouter();
    return (
        <AUIThemedView style={similarCoursesStyle.container}>
            <FlatList
                horizontal
                data={data}
                renderItem={({ item }) => (
                    <TouchableOpacity
                    onPress={()=>{
                        router.push({
                            pathname: `(home)/courseDetails/${item._id}`,
                        })
                        
                    }}
                    
                    >
                        <SimilarCourses
                            image={item.image}
                            title={item.courseName}
                            subtitle={item.description}
                        />
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item._id}
            />
        </AUIThemedView>
    );
}

const similarCoursesStyle = StyleSheet.create({
    container: { paddingVertical: 20 },
    item: {
        width: 270,
        height: 120,
        borderRadius: 10,
        overflow: "hidden",
        marginRight: 18,
    },
    title: {
        fontSize: 17,
        fontWeight: "500",
        color: "#fff",
        paddingTop: 45,
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
});
