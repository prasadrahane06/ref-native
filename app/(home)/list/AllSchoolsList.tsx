import School from "@/components/School";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import React from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";

interface SchoolData {
    id: string;
    name: string;
    image: any;
    caption?: string;
    favorite?: boolean;
}

interface SchoolListProps {
    data: SchoolData[];
    schoolWidth: number;
    schoolHeight: number;
}

const AllSchoolsList: React.FC<SchoolListProps> = ({ data, schoolWidth, schoolHeight }) => {
    const renderItem: ListRenderItem<SchoolData> = ({ item }) => (
        <View style={styles.schoolItem}>
            <School
                id={item.id}
                title={item.name}
                caption={item.caption}
                image={item.image}
                favorite={item.favorite}
                schoolWidth={schoolWidth}
                schoolHeight={schoolHeight}
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
        paddingHorizontal: 4,
        paddingBottom: 3,
        backgroundColor: "transparent",
    },
    schoolItem: {
        width: "48%",
        marginVertical: 5,
    },
});
