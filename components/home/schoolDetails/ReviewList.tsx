import { AUIThemedView } from "@/components/common/AUIThemedView";
import React from "react";
import { FlatList } from "react-native";
import { Review } from "../../Review";
import { AUIThemedText } from "@/components/common/AUIThemedText";

interface ReviewProps {
    data: any[];
    horizontal?: boolean;
}

export const ReviewList: React.FC<ReviewProps> = ({ data, horizontal = false }) => {
    return (
        <AUIThemedView style={{ paddingLeft: 15 }}>
            {data?.length > 0 ? (
                <FlatList
                    horizontal={horizontal}
                    data={data}
                    renderItem={({ item }) => (
                        <Review
                            name={item.name}
                            role={item.role}
                            image={item.image}
                            comment={item.comment}
                            ratings={item.rating}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                />
            ) : (
                <AUIThemedText>No Reviews...</AUIThemedText>
            )}
        </AUIThemedView>
    );
};
