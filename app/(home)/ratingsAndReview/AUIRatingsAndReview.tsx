import { AUIThemedView } from "@/components/common/AUIThemedView";
import { ReviewList } from "@/components/home/schoolDetails/ReviewList";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import { Asset } from "expo-asset";
import { default as React, useEffect, useState } from "react";

const AUIRatingsAndReview = () => {
    const [overallReviews, setReviews] = useState([]);
    const reviewOfTheSchool = useLangTransformSelector(
        (state: RootState) => state.api.ratingsOfTheSchool || {}
    );
    useEffect(() => {
        if (reviewOfTheSchool?.docs) {
            const overallReviewsData = reviewOfTheSchool?.docs.map((rtng: any) => {
                return {
                    id: "a1",
                    name: rtng?.user?.name,
                    image: rtng?.user?.photo
                        ? rtng?.user?.photo
                        : Asset.fromModule(require("@/assets/images/user.png")).uri,
                    role: "Student",
                    comment: rtng?.comment,
                    rating: rtng?.rating,
                };
            });
            setReviews(overallReviewsData);
        }
    }, [reviewOfTheSchool]);
    return (
        <AUIThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ReviewList data={overallReviews} />
        </AUIThemedView>
    );
};

export default AUIRatingsAndReview;
