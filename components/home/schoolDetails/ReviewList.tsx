import { AUIThemedView } from "@/components/common/AUIThemedView";
import React from "react";
import { FlatList } from "react-native";
import { Review } from "../../Review";

interface ReviewProps {
    data: any[];
}

export const ReviewList: React.FC<ReviewProps> = ({ data }) => {
    return (
        <AUIThemedView style={{ paddingLeft: 15 }}>
            <FlatList
                horizontal
                data={data}
                renderItem={({ item }) => (
                    <Review
                        name={item.name}
                        role={item.role}
                        image={item.image}
                        comment={item.comment}
                    />
                )}
                keyExtractor={(item) => item.id}
            />
        </AUIThemedView>
    );
};
