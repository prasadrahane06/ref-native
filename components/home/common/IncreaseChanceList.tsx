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
                        courseId={item?._id}
                        courseName={item?.courseName}
                        schoolName={item?.client?.name}
                        image={item?.image}
                        daysRemaining={item?.startDate}
                    />
                )}
                keyExtractor={(item) => item?._id}
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
