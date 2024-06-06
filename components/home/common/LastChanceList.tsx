import LastChance from "@/components/LastChance";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import React from "react";
import { FlatList } from "react-native";

interface LastChanceListProps {
    data: any[];
}

const LastChanceList: React.FC<LastChanceListProps> = ({ data }) => {
    return (
        <AUIThemedView style={{ paddingLeft: 10 }}>
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

export default LastChanceList;
