import { AUIThemedView } from "@/components/common/AUIThemedView";
import { ReviewList } from "@/components/home/schoolDetails/ReviewList";
import { reviewsData } from "@/constants/dummy data/reviewsData";
import React from "react";

const AUIRatingsAndReview = () => {
    return (
        <AUIThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ReviewList data={reviewsData} />
        </AUIThemedView>
    );
};

export default AUIRatingsAndReview;
