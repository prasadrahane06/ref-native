import { APP_THEME, TEXT_THEME } from "@/constants/Colors";
import { RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import AUISearchBar from "../common/AUISearchBar";
import { AUIThemedView } from "../common/AUIThemedView";
import { API_URL } from "@/constants/urlProperties";
import useDebounce from "@/customHooks/useDebounce";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import useApiRequest from "@/customHooks/useApiRequest";

interface HeaderIconsProps {
    onNotificationPress: () => void;
}

const HeaderIcons: React.FC<HeaderIconsProps> = ({ onNotificationPress }) => {
    const { requestFn } = useApiRequest();

    const theme = useSelector((state: RootState) => state.global.theme);
    const userData = useSelector((state: RootState) => state.global.user);
    const isClient = userData.client;

    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);

    const searchResults = useLangTransformSelector(
        (state: RootState) => state.api.searchResults || {}
    );

    console.log("searchResults", JSON.stringify(searchResults));

    const debouncedSearchPhrase = useDebounce(searchPhrase, 500);

    useEffect(() => {
        if (debouncedSearchPhrase) {
            requestFn(API_URL.search, "searchResults", {
                all: true,
                search: debouncedSearchPhrase,
            });
        }
    }, [debouncedSearchPhrase]);

    return (
        <AUIThemedView
            style={{
                flexDirection: "row",
                marginRight: 15,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {/* <TouchableOpacity onPress={() => alert("Search")}>
                <Ionicons
                    name="search"
                    size={25}
                    style={{ marginRight: 20 }}
                    color={APP_THEME.light.primary.first}
                />
            </TouchableOpacity> */}

            {!isClient && (
                <AUIThemedView>
                    <AUISearchBar
                        clicked={clicked}
                        searchPhrase={searchPhrase}
                        setSearchPhrase={setSearchPhrase}
                        setClicked={setClicked}
                        results={searchResults}
                        containerStyle={{ marginVertical: 7, width: "100%" }}
                        iconSize={20}
                    />
                </AUIThemedView>
            )}

            <TouchableOpacity onPress={onNotificationPress}>
                <Ionicons name="notifications" size={25} color={APP_THEME.light.primary.first} />
            </TouchableOpacity>
        </AUIThemedView>
    );
};

export default HeaderIcons;
