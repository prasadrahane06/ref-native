import AUIButton from "@/components/common/AUIButton";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME, TEXT_THEME } from "@/constants/Colors";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import { useFocusEffect } from "expo-router";
import { default as React, useCallback, useState } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import AddNewFacilities from "../addNewFacility/AddFacility";
import { t } from "i18next";

interface Facility {
    _id: string;
    description: string;
    image: string;
    name: string;
    status: number;
}

export default function TabFourScreen() {
    const myFacilitys = useLangTransformSelector((state: RootState) => state.api.myFacilitys || {});
    const { requestFn } = useApiRequest();
    const [isAddFacilityVisible, setAddFacilityVisible] = useState(false);
    const [selectedFacility, setSelectedFacility] = useState<Facility | undefined>(undefined);
    const [page, setPage] = useState<number>(1);

    const refreshFacilities = () => {
        requestFn(API_URL.facility, "myFacilitys", { client: true, page: `${page}` });
        setAddFacilityVisible(false);
    };

    useFocusEffect(
        useCallback(() => {
            refreshFacilities();
        }, [page])
    );

    const handleAddNewFacility = () => {
        setSelectedFacility(undefined);
        setAddFacilityVisible(true);
    };

    const handleEditFacility = (facility: Facility) => {
        setSelectedFacility(facility);
        setAddFacilityVisible(true);
    };

    const renderItem = ({ item }: { item: Facility }) => (
        <TouchableOpacity onPress={() => handleEditFacility(item)}>
            <AUIThemedView style={styles.facility}>
                <Image source={{ uri: item?.image }} style={styles.image} />
                <AUIThemedText style={styles.name}>{item?.name}</AUIThemedText>
            </AUIThemedView>
        </TouchableOpacity>
    );

    return (
        <AUIThemedView style={styles.root}>
            <AUIThemedText style={styles.title}>{t("facilities")}</AUIThemedText>
            <AUIButton
                title={t("add_new_facilities")}
                selected
                style={styles.button}
                onPress={handleAddNewFacility}
            />
            <View style={styles.flatListContainer}>
                <ScrollView>
                    <FlatList
                        data={myFacilitys?.docs}
                        renderItem={renderItem}
                        keyExtractor={(item) => item?._id}
                        numColumns={3}
                        scrollEnabled={false}
                        columnWrapperStyle={styles.row}
                        contentContainerStyle={styles.container}
                    />
                </ScrollView>
            </View>
            <AddNewFacilities
                visible={isAddFacilityVisible}
                onClose={() => setAddFacilityVisible(false)}
                refreshFacilities={refreshFacilities}
                facility={selectedFacility}
            />
             <TouchableOpacity
                        style={{ padding: 10, alignItems: "center" }}
                        disabled={page === myFacilitys.totalPages}
                        onPress={() => {
                            setPage((prevPage) => prevPage + 1);
                        }}
                    >
                        <AUIThemedText>
                            {page === myFacilitys.totalPages ? `${t("you_are_caught_up")}` :`${t("load_more")}`}
                        </AUIThemedText>
                    </TouchableOpacity>
        </AUIThemedView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 17,
        letterSpacing: 2,
    },
    button: {
        marginTop: 20,
    },
    flatListContainer: {
        flex: 1,
        marginTop: 20,
    },
    container: {
        flexGrow: 1,
    },
    row: {
        flex: 1,
        justifyContent: "space-between",
        marginBottom: 20,
    },
    facility: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        marginHorizontal: 5,
        height: 100,
        width: 80,
    },
    name: {
        fontSize: 16,
    },
    noData: {
        fontSize: 16,
        color: TEXT_THEME.light.danger,
    },
    input: { marginBottom: 10 },
    buttonMainContainer: { gap: 5 },
    buttonContainer: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    imagePickerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        borderWidth: 2,
        borderColor: APP_THEME.light.lightGray,
        borderRadius: 5,
        padding: 10,
    },
    uploadButton: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 10,
    },
    uploadButtonText: {
        marginLeft: 5,
        color: APP_THEME.light.primary.first,
    },
    fileName: {},
    image: {
        width: 60,
        height: 60,
        marginTop: 10,
    },
});
