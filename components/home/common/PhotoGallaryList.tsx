import PhotoGallary from "@/components/PhotoGallary";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME } from "@/constants/Colors";
import { RootState } from "@/redux/store";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
interface PhotoGallaryListProps {
    data: any[];
}
const PhotoGallaryList: React.FC<PhotoGallaryListProps> = ({ data }) => {
    const theme = useSelector((state: RootState) => state.global.theme);

    return (
        <AUIThemedView style={[styles.container, { backgroundColor: APP_THEME[theme].background }]}>
            <FlatList
                horizontal
                data={data}
                renderItem={({ item }) => <PhotoGallary image={item} />}
                keyExtractor={(item) => item.id}
            />
        </AUIThemedView>
    );
};
export default PhotoGallaryList;
const styles = StyleSheet.create({
    container: {
        paddingLeft: 14,
        // backgroundColor: APP_THEME.background,
    },
});
