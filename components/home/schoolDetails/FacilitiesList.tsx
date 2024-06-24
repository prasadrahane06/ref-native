import { AUIThemedView } from "@/components/common/AUIThemedView";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Facilities } from "../../Facilities";

interface FacilitiesListProps {
    data: any[];
}

export const FacilitiesList: React.FC<FacilitiesListProps> = ({ data }) => {
    return (
        <AUIThemedView style={facilitiesListStyles.container}>
            <FlatList
                scrollEnabled={false}
                data={data}
                numColumns={3}
                renderItem={({ item }) => <Facilities title={item.title} image={item.image} />}
                keyExtractor={(item) => item.id}
            />
        </AUIThemedView>
    );
};

const facilitiesListStyles = StyleSheet.create({
    container: { paddingVertical: 10 },
});
