import { APP_THEME, BACKGROUND_THEME, TEXT_THEME } from "@/constants/Colors";
import { RootState } from "@/redux/store";
import { Fontisto, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { useSelector } from "react-redux";
import AUISearchBar from "../common/AUISearchBar";
import { AUIThemedView } from "../common/AUIThemedView";
import { API_URL } from "@/constants/urlProperties";
import useDebounce from "@/customHooks/useDebounce";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import useApiRequest from "@/customHooks/useApiRequest";
import { AUIThemedText } from "../common/AUIThemedText";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { router } from "expo-router";
import AUIImage from "../common/AUIImage";
import { Asset } from "expo-asset";

interface HeaderIconsProps {
    onNotificationPress: () => void;
}

function SearchModal({ isVisible, onClose }: any) {
    const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;

    const { requestFn } = useApiRequest();

    const theme = useSelector((state: RootState) => state.global.theme);

    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);

    const results = useLangTransformSelector((state: RootState) => state.api.searchResults || {});
    const debouncedSearchPhrase = useDebounce(searchPhrase, 500);

    useEffect(() => {
        if (debouncedSearchPhrase) {
            requestFn(API_URL.search, "searchResults", {
                all: true,
                search: debouncedSearchPhrase,
            });
        }
    }, [debouncedSearchPhrase]);

    const handleNavigation = (type: string, item: any) => {
        switch (type) {
            case "country":
                router.push({
                    pathname: `(home)/cityDetails/${item?._id}`,
                });
                break;
            case "course":
                router.push({
                    pathname: `(home)/courseDetails/${item?._id}`,
                });
                break;
            case "school":
                router.push({
                    pathname: `(home)/schoolDetails/${item?._id}`,
                });
                break;
        }
        setSearchPhrase("");
        setClicked(false);
    };

    const renderResultItem = (type: string, item: any) => (
        <TouchableOpacity
            style={searchStyles.resultItem}
            onPress={() => handleNavigation(type, item)}
        >
            <AUIThemedText style={{ fontWeight: "bold" }}>
                {type === "course" ? item.courseName : item.name}
            </AUIThemedText>
        </TouchableOpacity>
    );

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <AUIThemedView
                style={
                    Platform.OS === "ios"
                        ? searchStyles.iosModalContent
                        : searchStyles.andoridModalContent
                }
            >
                <AUIThemedView style={searchStyles.titleContainer}>
                    <AUIThemedText style={searchStyles.title}>{GLOBAL_TEXT.search}</AUIThemedText>
                    <Pressable onPress={onClose} style={{ padding: 10 }}>
                        <MaterialIcons name="close" color={TEXT_THEME[theme].primary} size={22} />
                    </Pressable>
                </AUIThemedView>

                <KeyboardAvoidingView
                    style={{
                        flex: 1,
                        backgroundColor: BACKGROUND_THEME[theme].background,
                    }}
                    behavior="padding"
                    keyboardVerticalOffset={keyboardVerticalOffset}
                >
                    <AUISearchBar
                        clicked={clicked}
                        searchPhrase={searchPhrase}
                        setSearchPhrase={setSearchPhrase}
                        setClicked={setClicked}
                        containerStyle={{ width: "90%" }}
                        iconSize={20}
                    />
                    <AUIThemedView>
                        {results && searchPhrase.length > 0 && (
                            <AUIThemedView style={searchStyles.resultsContainer}>
                                {results?.country && (
                                    <AUIThemedView style={searchStyles.sectionContainer}>
                                        <AUIThemedText style={searchStyles.sectionTitle}>
                                            Countries
                                        </AUIThemedText>

                                        {results.country.length === 0 && (
                                            <AUIThemedText style={searchStyles.noResults}>
                                                No results
                                            </AUIThemedText>
                                        )}

                                        <FlatList
                                            scrollEnabled={false}
                                            data={results.country}
                                            keyExtractor={(item) => item?._id}
                                            renderItem={({ item }) =>
                                                renderResultItem("country", item)
                                            }
                                        />
                                    </AUIThemedView>
                                )}
                                {results.course && (
                                    <AUIThemedView style={searchStyles.sectionContainer}>
                                        <AUIThemedText style={searchStyles.sectionTitle}>
                                            Courses
                                        </AUIThemedText>

                                        {results.course.length === 0 && (
                                            <AUIThemedText style={searchStyles.noResults}>
                                                No results
                                            </AUIThemedText>
                                        )}
                                        <FlatList
                                            scrollEnabled={false}
                                            data={results.course}
                                            keyExtractor={(item) => item?._id}
                                            renderItem={({ item }) =>
                                                renderResultItem("course", item)
                                            }
                                        />
                                    </AUIThemedView>
                                )}
                                {results.school && (
                                    <AUIThemedView style={searchStyles.sectionContainer}>
                                        <AUIThemedText style={searchStyles.sectionTitle}>
                                            Schools
                                        </AUIThemedText>

                                        {results.school.length === 0 && (
                                            <AUIThemedText style={searchStyles.noResults}>
                                                No results
                                            </AUIThemedText>
                                        )}
                                        <FlatList
                                            scrollEnabled={false}
                                            data={results.school}
                                            keyExtractor={(item) => item?._id}
                                            renderItem={({ item }) =>
                                                renderResultItem("school", item)
                                            }
                                        />
                                    </AUIThemedView>
                                )}
                            </AUIThemedView>
                        )}
                    </AUIThemedView>
                </KeyboardAvoidingView>
            </AUIThemedView>
        </Modal>
    );
}

const HeaderIcons: React.FC<HeaderIconsProps> = ({ onNotificationPress }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const userData = useSelector((state: RootState) => state.global.user);
    const isClient = userData?.client;

    return (
        <AUIThemedView
            style={{
                flexDirection: "row",
                marginRight: 15,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {!isClient && (
                <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                    <Ionicons
                        name="search"
                        size={25}
                        style={{ marginRight: 20 }}
                        color={APP_THEME.light.primary.first}
                    />
                </TouchableOpacity>
            )}

            <TouchableOpacity onPress={onNotificationPress}>
                <Ionicons name="notifications" size={25} color={APP_THEME.light.primary.first} />
            </TouchableOpacity>

            <SearchModal
                isVisible={isModalVisible}
                onClose={() => {
                    setIsModalVisible(false);
                }}
            />
        </AUIThemedView>
    );
};

export default HeaderIcons;

const searchStyles = StyleSheet.create({
    sectionContainer: {
        padding: 10,
    },
    noResults: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        color: "gray",
    },
    sectionTitle: {
        paddingVertical: 5,
        fontSize: 20,
    },
    resultsContainer: {
        padding: 10,
    },
    resultItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },

    andoridModalContent: {
        height: "100%",
        width: "100%",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    iosModalContent: {
        position: "absolute",
        bottom: 0,
        height: "90%",
        width: "100%",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    titleContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    title: {
        fontSize: 19,
        fontWeight: "bold",
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    footerContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        justifyContent: "center",
    },
});
