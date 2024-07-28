import AUIImage from "@/components/common/AUIImage";
import AUIInputField from "@/components/common/AUIInputField";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME, TEXT_THEME } from "@/constants/Colors";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { setResponse, setSelectedSchool2 } from "@/redux/apiSlice";
import { RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Asset } from "expo-asset";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { useDispatch, useSelector } from "react-redux";

interface School {
    id: string;
    name: string;
    address: string;
}

type RootStackParamList = {
    TabThreeScreen: undefined;
    SearchSchool: { compareSlot: "compareSchool1" | "compareSchool2" };
};

type SearchSchoolRouteProp = RouteProp<RootStackParamList, "SearchSchool">;

const setSelectedSchool1 = (school: School) =>
    setResponse({ storeName: "compareSchool1", data: school });

const SearchSchool: React.FC = () => {
    const dispatch = useDispatch();
    const route = useRoute<SearchSchoolRouteProp>();
    const { compareSlot } = route.params;
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [recentSearches, setRecentSearches] = useState<School[]>([
        {
            id: "1",
            name: "The Manchester Schools",
            address:
                "East, Academy The East, 60 Grey Mare Ln, Greater, Beswick, Manchester M11 3DS, United Kingdom",
        },
        {
            id: "2",
            name: "Henley Business School",
            address:
                "East, Academy The East, 60 Grey Mare Ln, Greater, Beswick, Manchester M11 3DS, United Kingdom",
        },
    ]);
    const [favoriteDropdownVisible, setFavoriteDropdownVisible] = useState<boolean>(false);
    const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
    const schoolsResponse = useLangTransformSelector((state: RootState) => state.api.school || {});
    const compareSchool1 = useLangTransformSelector((state: RootState) => state.api.compareSchool1);
    const compareSchool2 = useLangTransformSelector((state: RootState) => state.api.compareSchool2);
    const getfavorite = useLangTransformSelector((state: RootState) => state.api.favorite || {});
    const theme = useSelector((state: RootState) => state.global.theme);
    const fav = getfavorite?.docs?.[0] || { clients: [] };

    useEffect(() => {
        if (searchQuery) {
            const filtered = schoolsResponse.docs.filter((school: School) =>
                school.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredSchools(filtered);
        } else {
            setFilteredSchools([]);
        }
    }, [searchQuery, schoolsResponse]);

    const handleSelectSchool = (school: School) => {
        setSearchQuery(school.name);
        if (compareSlot === "compareSchool1") {
            dispatch(setSelectedSchool1(school));
        } else if (compareSlot === "compareSchool2") {
            dispatch(setSelectedSchool2(school));
        }
        router.push("(home)/compare/compareSchools");
        setSearchQuery("");
    };

    const toggleFavoriteDropdown = () => {
        setFavoriteDropdownVisible(!favoriteDropdownVisible);
    };

    const closeFavoriteDropdown = () => {
        setFavoriteDropdownVisible(false);
    };

    const renderDropdownItem = ({ item }: { item: School }) => (
        <TouchableOpacity onPress={() => handleSelectSchool(item)} style={styles.dropdownItem}>
            <AUIThemedText>{item.name}</AUIThemedText>
        </TouchableOpacity>
    );

    const renderItem = ({ item }: { item: School }) => (
        <AUIThemedView
            style={[styles.recentItem, { backgroundColor: APP_THEME[theme].background }]}
        >
            <AUIImage
                style={styles.schoolImage}
                path={Asset.fromModule(require("@/assets/images/compareScreen/group_11.png")).uri}
                resizeMode="contain"
            />
            <AUIThemedView
                style={[styles.recentItemText, { backgroundColor: APP_THEME[theme].background }]}
            >
                <AUIThemedText style={styles.recentItemName}>{item.name}</AUIThemedText>
                <AUIThemedText style={styles.recentItemAddress}>{item.address}</AUIThemedText>
            </AUIThemedView>
        </AUIThemedView>
    );

    return (
        <TouchableWithoutFeedback onPress={closeFavoriteDropdown}>
            <AUIThemedView style={styles.container}>
                <AUIThemedText style={styles.searchschoolText}>Search school</AUIThemedText>
                <AUIThemedView style={styles.searchContainer}>
                    <Ionicons
                        name="search"
                        size={26}
                        color={APP_THEME.light.primary.first}
                        style={styles.searchIcon}
                    />
                    <AUIInputField
                        placeholder="Which school are you looking?"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        style={styles.searchInput}
                        inputStyle={styles.inputField}
                    />
                    {/* <TouchableOpacity>
                        <FontAwesome name="microphone" size={24} color="black" />
                    </TouchableOpacity> */}
                </AUIThemedView>

                {filteredSchools.length > 0 && (
                    <AUIThemedView style={styles.dropdown}>
                        <FlatList
                            data={filteredSchools}
                            keyExtractor={(item) => item.id}
                            renderItem={renderDropdownItem}
                        />
                    </AUIThemedView>
                )}

                <AUIThemedView
                    style={[styles.orContainer, { backgroundColor: APP_THEME[theme].background }]}
                >
                    <AUIThemedView style={styles.line} />
                    <AUIThemedText style={styles.orText}>OR</AUIThemedText>
                    <AUIThemedView style={styles.line} />
                </AUIThemedView>

                <TouchableOpacity style={styles.favoriteContainer} onPress={toggleFavoriteDropdown}>
                    <Ionicons
                        name="heart-outline"
                        style={styles.favoriteIcon}
                        size={24}
                        color={APP_THEME.light.lightGray}
                    />
                    <AUIThemedText style={styles.favoriteText}>
                        Choose from your favorite...
                    </AUIThemedText>
                    <Ionicons
                        name="chevron-down-outline"
                        size={24}
                        color={TEXT_THEME[theme].primary}
                    />
                </TouchableOpacity>

                {favoriteDropdownVisible && (
                    <AUIThemedView style={styles.dropdown1}>
                        <FlatList
                            data={fav.clients}
                            keyExtractor={(item) => item?._id}
                            renderItem={({ item }) =>
                                renderDropdownItem({
                                    item: { id: item?._id, name: item.name, address: item.address },
                                })
                            }
                        />
                    </AUIThemedView>
                )}

                <AUIThemedText style={styles.recentText}>Recently searched schools</AUIThemedText>

                <FlatList
                    data={recentSearches}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
            </AUIThemedView>
        </TouchableWithoutFeedback>
    );
};
export default SearchSchool;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    searchschoolText: {
        fontWeight: "500",
        marginBottom: 6,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: APP_THEME.light.lightGray,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    searchIcon: {},
    searchInput: {
        flex: 1,
    },
    inputField: {
        height: 40,
        borderWidth: 0,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        position: "absolute",
        top: 85,
        left: 16,
        right: 16,
        zIndex: 1000,
        maxHeight: 220,
    },
    dropdown1: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        position: "absolute",
        top: 180,
        left: 16,
        right: 16,
        zIndex: 1000,
        maxHeight: 220,
    },
    dropdownItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    orContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 16,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: APP_THEME.light.primary.first,
    },
    orText: {
        marginHorizontal: 8,
    },
    favoriteContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: APP_THEME.light.lightGray,
        borderRadius: 8,
        padding: 8,
    },
    favoriteText: {
        flex: 1,
        paddingLeft: 8,
    },
    favoriteIcon: {
        marginRight: 5,
    },
    recentText: {
        marginTop: 30,
        marginBottom: 8,
        fontSize: 16,
        fontWeight: "bold",
    },
    recentItem: {
        flexDirection: "row",
        marginVertical: 8,
        marginTop: 15,
    },
    schoolImage: {
        width: 25,
        height: 25,
        marginRight: 5,
    },
    recentItemText: {
        marginLeft: 8,
    },
    recentItemName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    recentItemAddress: {},
});
