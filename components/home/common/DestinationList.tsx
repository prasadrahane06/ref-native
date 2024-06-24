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
            renderItem={({ item }) => <Destination title={item.country} image={item.image} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
});

export default DestinationList;
