import LastChance from "@/components/LastChance";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

interface LastChanceListProps {
    data: any[];
}

const LastChanceList: React.FC<LastChanceListProps> = ({ data }) => {
    return (
        <AUIThemedView style={styles.container}>
            <FlatList
                horizontal
                data={data}
                renderItem={({ item }) => (
                    <LastChance title={item.title} subTitle={item.subTitle} />
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

export default LastChanceList;
