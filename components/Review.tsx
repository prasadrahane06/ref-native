import React from "react";
import { StyleSheet } from "react-native";
import AUIImage from "./common/AUIImage";
import { AUIThemedText } from "./common/AUIThemedText";
import { AUIThemedView } from "./common/AUIThemedView";
import { StarRatingDisplay } from "react-native-star-rating-widget";

export const Review = ({ name, role, image, comment, ratings }: any) => {

    return (
        <AUIThemedView style={reviewStyle.container}>
            <AUIThemedView style={reviewStyle.item}>
                <AUIThemedView style={reviewStyle.row}>
                    <AUIImage icon path={image} />
                    <AUIThemedView style={reviewStyle.textContainer}>
                        <AUIThemedText style={reviewStyle.name}>{name}</AUIThemedText>
                        <AUIThemedText style={[reviewStyle.role]}>{role}</AUIThemedText>
                    </AUIThemedView>
                    <StarRatingDisplay starSize={20} rating={ratings} style={reviewStyle.rating} />
                </AUIThemedView>
                <AUIThemedView>
                    <AUIThemedText style={reviewStyle.comment}>{comment}</AUIThemedText>
                </AUIThemedView>
            </AUIThemedView>
        </AUIThemedView>
    );
};

const reviewStyle = StyleSheet.create({
    container: {
        paddingVertical: 10,
        marginRight: 18,
    },
    item: {
        width: 380,
        borderRadius: 10,
        overflow: "hidden",
        padding: 15,
        backgroundColor: "#D3FFE7",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#D3FFE7",
    },
    textContainer: {
        paddingLeft: 10,
        backgroundColor: "#D3FFE7",
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
    role: {
        fontSize: 13,
        color: "#000",
    },
    comment: {
        paddingTop: 10,
        fontSize: 14,
        fontWeight: "400",
        backgroundColor: "#D3FFE7",
        color: "#000",
    },
    rating: {
        position: "absolute",
        fontSize: 14,
        height:12,
        top: 5,
        right: 5,
    },
});
