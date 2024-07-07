import Destination from "@/components/Destination";
import { RootState } from "@/redux/store";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

interface DestinationListProps {
    data: any[];
}

const DestinationList: React.FC<DestinationListProps> = ({ data }) => {
    const isRTL = useSelector((state: RootState) => state.global.isRTL || {});

    return (
        <FlatList
            horizontal
            data={data}
            renderItem={({ item }) => (
                <Destination
                    title={isRTL ? item.name?.en : item.name?.ar}
                    image={item.images[0]}
                    id={item._id}
                />
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
