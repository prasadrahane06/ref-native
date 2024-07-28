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
            {data?.map((item) => (
                <AUIThemedView key={item?._id} style={eventListStyles.item}>
                    <Events title={item.eventName} image={item.eventImage} />
                </AUIThemedView>
            ))}
        </AUIThemedView>
    );
};

const eventListStyles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    item: {
        width: "45%",
        margin: 7,
    },
});
