import Destination from "@/components/Destination";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

interface DestinationListProps {
    data: any[];
}

const DestinationList: React.FC<DestinationListProps> = ({ data }) => {
    return (
        <AUIThemedView style={styles.container}>
            <FlatList
                horizontal
                data={data}
                renderItem={({ item }) => (
                    <Destination title={item.country} image={item.image} />
                )}
                keyExtractor={(item) => item.id}
            />
        </AUIThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 14,
    },
});

export default DestinationList;
