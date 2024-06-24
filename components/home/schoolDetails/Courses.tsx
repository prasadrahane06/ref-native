import AUIFilter from "@/components/common/AUIFilter";
import AUISearchBar from "@/components/common/AUISearchBar";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { Asset } from "expo-asset";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { AvailableCoursesList } from "./AvailableCoursesList";

export const data = [
    {
        id: "1",
        image: Asset.fromModule(require("@/assets/images/schoolDetailsPage/courses/image-1.png"))
            .uri,
        courseTitle: "Embark on a French-Speaking Odyssey",
        courseDesciption: "Live like a Parisian, sip coffee, speak French, become a local.",
    },
    {
        id: "2",
        image: Asset.fromModule(require("@/assets/images/schoolDetailsPage/courses/image-2.png"))
            .uri,
        courseTitle: "Long term English courses",
        courseDesciption: "Immerse yourself in an English-speaking culture for up to a full year.",
    },
    {
        id: "3",
        image: Asset.fromModule(require("@/assets/images/schoolDetailsPage/courses/image-3.png"))
            .uri,
        courseTitle: "Become a Berliner Berghain Bouncer",
        courseDesciption: "Castle Crawl: Master German & conquer medieval fortresses",
    },
    {
        id: "4",
        image: Asset.fromModule(require("@/assets/images/schoolDetailsPage/courses/image-4.png"))
            .uri,
        courseTitle: "Online English course",
        courseDesciption: "Learn a language no matter where you are",
    },
    {
        id: "5",
        image: Asset.fromModule(require("@/assets/images/schoolDetailsPage/courses/image-1.png"))
            .uri,
        courseTitle: "Online English course",
        courseDesciption: "Learn a language no matter where you are",
    },
];

export default function CoursesTab() {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    //   const courseResponse = useSelector(
    //     (state: RootState) => state.api.course || {}
    //   );
    //   console.log("course api", courseResponse);
    return (
        <AUIThemedView>
            <AUIThemedView style={styles.container}>
                <AUISearchBar
                    searchPhrase={searchPhrase}
                    setSearchPhrase={setSearchPhrase}
                    clicked={clicked}
                    setClicked={setClicked}
                />

                <AUIFilter />
            </AUIThemedView>

            <AUIThemedView>
                <AvailableCoursesList data={data} />
            </AUIThemedView>
        </AUIThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 15,
    },
});
