import School from "@/components/School";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { Asset } from "expo-asset";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

interface SchoolListProps {
    data: any[];
}
const SchoolList: React.FC<SchoolListProps> = ({ data }) => {
    return (
        <AUIThemedView style={styles.container}>
            <FlatList
                horizontal
                data={data}
                renderItem={({ item }) => (
                    <AUIThemedView key={item?._id}>
                        <School
                            id={item?._id}
                            title={item.name}
                            image={
                                item?.banner
                                    ? item?.banner
                                    : Asset.fromModule(
                                          require("@/assets/images/schoolDetailsPage/school.png")
                                      ).uri
                            }
                            caption={item?.description}
                            style={{
                                width: 270,
                                height: 160,
                                marginHorizontal: 6,
                            }}
                        />
                    </AUIThemedView>
                )}
                keyExtractor={(item) => item?._id}
            />
        </AUIThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
    },
});

export default SchoolList;
