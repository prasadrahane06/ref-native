import AUIButton from "@/components/common/AUIButton";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME, TEXT_THEME } from "@/constants/Colors";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import React, { useCallback, useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import AddNewFacilities from "../addNewFacility/AddFacility";
import { useFocusEffect } from "expo-router";

interface Facility {
    _id: string;
    description: string | { [key: string]: string };
    image: string;
    name: string | { [key: string]: string };
    status: number;
}

export default function TabFourScreen() {
    const school = useLangTransformSelector((state: RootState) => state.api.myFacilitys || {});
    const { requestFn } = useApiRequest();
    const isRTL = useSelector((state: RootState) => state.global.isRTL || {});
    const [isAddFacilityVisible, setAddFacilityVisible] = useState(false);
    const [selectedFacility, setSelectedFacility] = useState<Facility | undefined>(undefined);
    const [facilities, setFacilities] = useState<Facility[]>([]);

    const refreshFacilities = () => {
        requestFn(API_URL.facility, "myFacilitys", { client: true });
        setAddFacilityVisible(false);
    };

    useFocusEffect(
        useCallback(() => {
            refreshFacilities();
        }, [])
    );

    useEffect(() => {
        if (school?.docs?.length > 0 || !isAddFacilityVisible) {
            setFacilities(school?.docs);
        }
    }, [school?.docs?.length, isAddFacilityVisible]);

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
                <Image source={{ uri: item.image }} style={styles.image} />
                <AUIThemedText style={styles.name}>
                    {typeof item.name === "string"
                        ? item.name
                        : isRTL
                        ? item.name.ar
                        : item.name.en}
                </AUIThemedText>
            </AUIThemedView>
        </TouchableOpacity>
    );

    return (
        <AUIThemedView style={styles.root}>
            <AUIThemedText style={styles.title}>Facilities</AUIThemedText>
            <AUIButton
                title="Add New Facilities"
                selected
                style={styles.button}
                onPress={handleAddNewFacility}
            />
            <FlatList
                data={facilities}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                numColumns={3}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.container}
            />
            <AddNewFacilities
                visible={isAddFacilityVisible}
                onClose={() => setAddFacilityVisible(false)}
                refreshFacilities={refreshFacilities}
                facility={selectedFacility}
            />
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
    container: {
        marginTop: 20,
    },
    row: {
        flex: 1,
        justifyContent: "space-between",
        marginBottom: 20,
    },
    facility: {
        flex: 1,
        alignItems: "center",
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
