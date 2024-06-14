import { APP_THEME } from "@/constants/Colors";
import { Entypo, Feather } from "@expo/vector-icons";
import React from "react";
import { Keyboard, StyleSheet, TextInput } from "react-native";
import { AUIThemedText } from "./AUIThemedText";
import { AUIThemedView } from "./AUIThemedView";

interface SearchBarProps {
    clicked: boolean;
    searchPhrase: string;
    setSearchPhrase: (text: string) => void;
    setClicked: (value: boolean) => void;
}

const AUISearchBar = ({
    clicked,
    searchPhrase,
    setSearchPhrase,
    setClicked,
}: SearchBarProps) => {
    return (
        <AUIThemedView style={styles.container}>
            <AUIThemedView
                style={
                    clicked
                        ? styles.searchBar__clicked
                        : styles.searchBar__unclicked
                }
            >
                {/* Input field */}
                <TextInput
                    style={styles.input}
                    value={searchPhrase}
                    onChangeText={setSearchPhrase}
                    onFocus={() => {
                        setClicked(true);
                    }}
                />
                {/* search Icon */}
                {!clicked && (
                    <Feather
                        name="search"
                        size={25}
                        color={APP_THEME.primary.first}
                    />
                )}

                {/* cross Icon, depending on whether the search bar is clicked or not */}
                {clicked && (
                    <Entypo
                        name="cross"
                        size={20}
                        color="black"
                        style={{ padding: 1 }}
                        onPress={() => {
                            setSearchPhrase("");
                        }}
                    />
                )}
            </AUIThemedView>
            {/* cancel button, depending on whether the search bar is clicked or not */}
            {clicked && (
                <AUIThemedView
                    style={{
                        paddingHorizontal: 10,
                        backgroundColor: "transparent",
                    }}
                >
                    <AUIThemedText
                        style={{
                            color: "#0F80FF",
                            paddingVertical: 10,
                            borderRadius: 100,
                        }}
                        onPress={() => {
                            Keyboard.dismiss();
                            setClicked(false);
                        }}
                    >
                        Cancel
                    </AUIThemedText>
                </AUIThemedView>
            )}
        </AUIThemedView>
    );
};
export default AUISearchBar;

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "85%",
        borderWidth: 1,
        borderRadius: 100,
        borderColor: APP_THEME.primary.first,
        paddingLeft: 10,
    },
    searchBar__unclicked: {
        paddingVertical: 10,
        flexDirection: "row",
        width: "90%",
        borderRadius: 15,
        alignItems: "center",
    },
    searchBar__clicked: {
        paddingVertical: 10,
        flexDirection: "row",
        width: "75%",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    input: {
        fontSize: 20,
        marginLeft: 10,
        width: "90%",
    },
});
