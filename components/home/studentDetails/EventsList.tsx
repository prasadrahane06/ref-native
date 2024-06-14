import { AUIThemedView } from "@/components/common/AUIThemedView";
import React from "react";
import { StyleSheet } from "react-native";
import { Events } from "../../Events";

interface EventsListProps {
    data: any[];
}

export const EventsList: React.FC<EventsListProps> = ({ data }) => {
    return (
        <AUIThemedView style={eventListStyles.container}>
            {data.map((item) => (
                <AUIThemedView key={item.id} style={eventListStyles.item}>
                    <Events title={item.title} image={item.image} />
                </AUIThemedView>
            ))}
        </AUIThemedView>
    );
};

const eventListStyles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    item: {
        width: "45%",
        margin: 5,
    },
});
