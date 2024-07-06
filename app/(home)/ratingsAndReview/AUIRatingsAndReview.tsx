import { View, Text } from "react-native";
import React from "react";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import SectionTitle from "@/components/home/common/SectionTitle";
import { GLOBAL_TRANSLATION_LABEL } from "@/constants/Properties";
import { ReviewList } from "@/components/home/schoolDetails/ReviewList";
import { reviewsData } from "@/constants/dummy data/reviewsData";

const AUIRatingsAndReview = () => {
    return (
        <AUIThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ReviewList data={reviewsData} />
        </AUIThemedView>
    );
};

export default AUIRatingsAndReview;
