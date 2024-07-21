import { APP_THEME } from "@/constants/Colors";
import { Entypo, Feather } from "@expo/vector-icons";
import React from "react";
import { Keyboard, StyleSheet, TextInput, View, FlatList, TouchableOpacity , Text } from "react-native";
import { AUIThemedText } from "./AUIThemedText";
import { AUIThemedView } from "./AUIThemedView";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { router, useNavigation } from "expo-router";

interface SearchBarProps {
    clicked: boolean;
    searchPhrase: string;
    setSearchPhrase: (text: string) => void;
    setClicked: (value: boolean) => void;
    results?: {
        country?: any[];
        course?: any[];
        school?: any[];
    };
}

const AUISearchBar: React.FC<SearchBarProps> = ({
    clicked,
    searchPhrase,
    setSearchPhrase,
    setClicked,
    results,
}) => {
    const theme = useSelector((state: RootState) => state.global.theme);

    const handleNavigation =  (type : string, item : any) => {
        switch (type) {
            case "country":
                router.push({
                    pathname: `(home)/cityDetails/${item._id}`,
                });
                break;
            case "course":
                router.push({
                    pathname: `(home)/courseDetails/${item._id}`,
                });
                break;
            case "school":
                router.push({
                    pathname: `(home)/schoolDetails/${item._id}`,
                });
                break;
        }
        setSearchPhrase(""); 
        setClicked(false); 
    }



    const renderResultItem = (type: string, item: any) => (
        <TouchableOpacity
            style={styles.resultItem}
            onPress={() => handleNavigation(type, item)}
        >
           
            <Text>{type === "course" ? item.courseName : item.name}</Text>
        </TouchableOpacity>
    );
    

    return (
        <View>
            <AUIThemedView style={[styles.container, { borderColor: APP_THEME[theme].primary.first }]}>
                <AUIThemedView
                    style={clicked ? styles.searchBar__clicked : styles.searchBar__unclicked}
                >
                    <TextInput
                        style={styles.input}
                        value={searchPhrase}
                        onChangeText={setSearchPhrase}
                        onFocus={() => {
                            setClicked(true);
                        }}
                    />
                    {!clicked && (
                        <Feather name="search" size={25} color={APP_THEME[theme].primary.first} />
                    )}
                    {clicked && (
                        <Entypo
                            name="cross"
                            size={20}
                            color="black"
                            style={{ padding: 1 }}
                            onPress={() => {
                                setSearchPhrase("");
                                setClicked(false); // Also close the search results
                            }}
                        />
                    )}
                </AUIThemedView>
                {clicked && (
                    <AUIThemedView style={styles.cancelButton}>
                        <AUIThemedText
                            style={styles.cancelText}
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
            {
                (results && searchPhrase.length > 0) && (
                    <View style={styles.resultsContainer}>
                        {results?.country && (
                            <View>
                                <AUIThemedText style={styles.sectionTitle}>Countries</AUIThemedText>
                                <FlatList
                                    scrollEnabled={false}
                                    data={results.country}
                                    keyExtractor={(item) => item._id}
                                    renderItem={({ item }) => renderResultItem('country', item)}
                                />
                            </View>
                        )}
                        {results.course && (
                            <View>
                                <AUIThemedText style={styles.sectionTitle}>Courses</AUIThemedText>
                                <FlatList
                                    scrollEnabled={false}
                                    data={results.course}
                                    keyExtractor={(item) => item._id}
                                    renderItem={({ item }) => renderResultItem('course', item)}
                                />
                            </View>
                        )}
                        {results.school && (
                            <View>
                                <AUIThemedText style={styles.sectionTitle}>Schools</AUIThemedText>
                                <FlatList
                                    scrollEnabled={false}
                                    data={results.school}
                                    keyExtractor={(item) => item._id}
                                    renderItem={({ item }) => renderResultItem('school', item)}
                                />
                            </View>
                        )}
                    </View>
                )
            }
        </View>
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
    cancelButton: {
        paddingHorizontal: 10,
        backgroundColor: "transparent",
    },
    cancelText: {
        color: "#0F80FF",
        paddingVertical: 10,
        borderRadius: 100,
    },
    resultsContainer: {
        marginTop: 5,
        backgroundColor: "#fff",
        borderRadius: 5,
        elevation: 5,
        position: "absolute",
        top: 70,
        width: "85%",
        zIndex: 1,
        padding: 10,
    },
    resultItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    sectionTitle: {
        fontWeight: "bold",
        paddingVertical: 5,
    },
});
