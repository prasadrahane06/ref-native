import IncreaseChance from "@/components/IncreaseChance";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

interface IncreaseChanceListProps {
    data: any[];
}

const IncreaseChanceList: React.FC<IncreaseChanceListProps> = ({ data }) => {
    return (
        <AUIThemedView style={styles.container}>
            <FlatList
                horizontal
                data={data}
                renderItem={({ item }) => (
                    <IncreaseChance
                        courseName={item.courseName}
                        schoolName={item.schoolName}
                        image={item.image}
                        daysRemaining={item.daysRemaining}
                    />
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

export default IncreaseChanceList;
