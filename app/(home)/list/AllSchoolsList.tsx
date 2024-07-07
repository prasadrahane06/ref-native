import School from "@/components/School";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import React from "react";
import { FlatList, ListRenderItem, StyleSheet, View, ViewStyle } from "react-native";

interface SchoolData {
    id: string;
    name: string;
    image: any;
    caption?: string;
    favorite?: boolean;
}

interface SchoolListProps {
    data: SchoolData[];
    style?: ViewStyle;
}

const AllSchoolsList: React.FC<SchoolListProps> = ({ data, style }) => {
    const renderItem: ListRenderItem<SchoolData> = ({ item }) => (
        <View style={styles.schoolItem}>
            <School
                id={item.id}
                title={item.name}
                caption={item.caption}
                image={item.image}
                favorite={item.favorite}
                style={{ width: 165, height: 160 }}
            />
        </View>
    );

    return (
        <AUIThemedView style={styles.schoolContainer}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.schoolContainer}
                scrollEnabled={false}
            />
        </AUIThemedView>
    );
};

export default AllSchoolsList;

const styles = StyleSheet.create({
    schoolContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "transparent",
        alignItems: "center",
        marginVertical: 5,
    },
    schoolItem: {
        width: "48%",
    },
});
