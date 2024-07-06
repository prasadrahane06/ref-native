import Destination from "@/components/Destination";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

interface DestinationListProps {
    data: any[];
}

const DestinationList: React.FC<DestinationListProps> = ({ data }) => {
    return (
        <FlatList
            horizontal
            data={data}
            renderItem={({ item }) => (
                <Destination title={item.name?.ar} image={item.images[0]} id={item._id} />
            )}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
    },
});

export default DestinationList;
