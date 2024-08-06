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
import { t } from "i18next";
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

const SearchSchool: React.FC = () => {
    const dispatch = useDispatch();
    const route = useRoute<SearchSchoolRouteProp>();
    const { compareSlot } = route.params;

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
    const [favoriteDropdownVisible, setFavoriteDropdownVisible] = useState<boolean>(false);

    const schoolsResponse = useLangTransformSelector((state: RootState) => state.api.school || {});
    const recentSearchedSchools =
        useLangTransformSelector((state: RootState) => state.api.recentSearchedSchools) || [];
    const getfavorite = useLangTransformSelector((state: RootState) => state.api.favorite || {});
    const theme = useSelector((state: RootState) => state.global.theme);
    const fav = getfavorite?.docs?.[0] || { clients: [] };

    const setSelectedSchool1 = (school: School) =>
        setResponse({ storeName: "compareSchool1", data: school });

    const setRecentSearches = (school: any) =>
        setResponse({
            storeName: "recentSearchedSchools",
            data: [...recentSearchedSchools, school],
        });

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
            dispatch(setRecentSearches(school));
            dispatch(setSelectedSchool1(school));
        } else if (compareSlot === "compareSchool2") {
            dispatch(setRecentSearches(school));
            dispatch(setSelectedSchool2(school));
        }
        router.push("/(home)/compare/compareSchools");
        setSearchQuery("");
    };

    const toggleFavoriteDropdown = () => {
        setFavoriteDropdownVisible(!favoriteDropdownVisible);
    };

    const closeFavoriteDropdown = () => {
        setFavoriteDropdownVisible(false);
    };

    const renderDropdownItem = (item: any) => {
        return (
            <TouchableOpacity onPress={() => handleSelectSchool(item)} style={styles.dropdownItem}>
                <AUIThemedText>{item.name}</AUIThemedText>
            </TouchableOpacity>
        );
    };
    const renderRecentItems = ({ item }: { item: any }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    if (compareSlot === "compareSchool1") {
                        dispatch(setSelectedSchool1(item));
                    } else if (compareSlot === "compareSchool2") {
                        dispatch(setSelectedSchool2(item));
                    }

                    router.push("/(home)/compare/compareSchools");
                }}
                style={[
                    styles.recentItem,
                    {
                        backgroundColor: APP_THEME[theme].background,
                    },
                ]}
            >
                <AUIImage
                    style={styles.schoolImage}
                    path={Asset.fromModule(require("@/assets/images/local/group_11.png"))}
                    contentFit="contain"
                />
                <AUIThemedView style={[styles.recentItemText]}>
                    <AUIThemedText style={styles.recentItemName}>{item.name}</AUIThemedText>
                    <AUIThemedText
                        style={styles.recentItemdescription}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                    >
                        {item.description}
                    </AUIThemedText>
                </AUIThemedView>
            </TouchableOpacity>
        );
    };

    return (
        <TouchableWithoutFeedback onPress={closeFavoriteDropdown}>
            <AUIThemedView style={styles.container}>
                <AUIThemedText style={styles.searchschoolText}>{t("search_school")}</AUIThemedText>
                <AUIThemedView style={styles.searchContainer}>
                    <Ionicons
                        name="search"
                        size={26}
                        color={APP_THEME.light.primary.first}
                        style={styles.searchIcon}
                    />
                    <AUIInputField
                        placeholder={t("which_school_are_you_looking")}
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
                            keyExtractor={(item) => item?.id}
                            renderItem={({ item }) => renderDropdownItem(item)}
                        />
                    </AUIThemedView>
                )}

                <AUIThemedView
                    style={[styles.orContainer, { backgroundColor: APP_THEME[theme].background }]}
                >
                    <AUIThemedView style={styles.line} />
                    <AUIThemedText style={styles.orText}>{t("or")}</AUIThemedText>
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
                        {t("choose_from_your_favorite")}
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
                            data={fav?.clients}
                            keyExtractor={(item) => item?._id}
                            renderItem={({ item }) => renderDropdownItem(item)}
                        />
                    </AUIThemedView>
                )}

                <AUIThemedText style={styles.recentText}>{t("recently_searched_schools")}</AUIThemedText>

                <FlatList
                    data={recentSearchedSchools}
                    keyExtractor={(item) => item.id}
                    renderItem={renderRecentItems}
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
        alignItems: "center",
        marginVertical: 8,
        marginTop: 15,
        borderRadius: 10,
        padding: 10,
    },
    schoolImage: {
        width: 40,
        height: 40,
        marginRight: 5,
    },
    recentItemText: {
        marginLeft: 8,
    },
    recentItemName: {
        fontSize: 20,
        fontWeight: "bold",
    },
    recentItemdescription: {
        marginTop: 5,
        fontSize: 13,
        fontWeight: "bold",
    },
});
