import AUIButton from "@/components/common/AUIButton";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import { Image } from "expo-image";
import { useFocusEffect } from "expo-router";
import { t } from "i18next";
import { default as React, useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import AddNewEvent from "../events/AddNewEvent";

interface event {
    _id: string;
    eventName: string;
    description: string;
    date: string;
    location: string;
    eventImage: string;
}

export default function EventsScreen() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<event | undefined>(undefined);
    const eventData = useLangTransformSelector((state: RootState) => state.api.myEvent || {});
    const [page, setPage] = useState<number>(1);
    const [showMessage, setShowMessage] = useState(true);
    const { requestFn } = useApiRequest();

    const refreshEvents = () => {
        requestFn(API_URL.event, "myEvent", { client: true, page: `${page}` });
    };

    useFocusEffect(
        useCallback(() => {
            refreshEvents();
        }, [page])
    );
    useEffect(() => {
        if (page === eventData?.totalPages) {
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 5000);
            return () => clearTimeout(timer);
        } else {
            setShowMessage(true);
        }
    }, [page, eventData?.totalPages]);

    const handleAddNewEvent = () => {
        setSelectedEvent(undefined);
        setModalVisible(true);
    };
    const handleEditEvent = (event: event) => {
        setSelectedEvent(event);
        setModalVisible(true);
    };
    const handleCloseModal = () => {
        setModalVisible(false);
        refreshEvents();
    };

    const renderItem = ({ item }: { item: event }) => (
        <TouchableOpacity onPress={() => handleEditEvent(item)} style={styles.eventContainer}>
            <AUIThemedView style={styles.event}>
                <Image source={{ uri: item?.eventImage }} style={styles.image} />
                <AUIThemedText style={styles.name} numberOfLines={1}>
                    {item?.eventName}
                </AUIThemedText>
            </AUIThemedView>
        </TouchableOpacity>
    );

    return (
        <AUIThemedView style={styles.mainContainer}>
            <AUIButton
                title={t("add_new_event")}
                selected
                style={styles.AddEventButton}
                onPress={handleAddNewEvent}
            />
            {!eventData?.docs?.length && (
                <AUIThemedText style={styles.noEvents}>{`${t(
                    "no_events_available"
                )}`}</AUIThemedText>
            )}
            <FlatList
                data={eventData?.docs || []}
                renderItem={renderItem}
                keyExtractor={(item) => item?._id}
                numColumns={3}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.container}
            />

            <AUIThemedView>
                <TouchableOpacity
                    style={{ padding: 10, alignItems: "center" }}
                    disabled={page === eventData?.totalPages}
                    onPress={() => setPage((prevPage: any) => prevPage + 1)}
                >
                    {page === eventData?.totalPages ? (
                        showMessage && <AUIThemedText>{`${t("you_are_caught_up")}`}</AUIThemedText>
                    ) : (
                        <AUIThemedText>{`${t("load_more")}`}</AUIThemedText>
                    )}
                </TouchableOpacity>
            </AUIThemedView>
            <AddNewEvent
                visible={isModalVisible}
                onClose={handleCloseModal}
                event={selectedEvent}
                refreshEvents={refreshEvents}
            />
        </AUIThemedView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    closeButton: {
        alignSelf: "flex-end",
        padding: 16,
    },
    AddEventButton: {
        marginHorizontal: 15,
    },
    noEvents: {
        padding: 20,
        textAlign: "center",
    },
    image: {
        width: 60,
        height: 60,
        marginTop: 10,
    },
    event: {
        flex: 1,
        alignItems: "center",
        marginHorizontal: 20,
        height: 100,
        width: 80,
    },
    eventContainer: {
        flex: 1,
        margin: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    name: {
        fontSize: 16,
    },
    row: {
        flex: 1,
        justifyContent: "space-between",
        marginBottom: 20,
    },
    container: {
        marginTop: 20,
    },
});
