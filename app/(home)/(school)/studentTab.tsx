import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME, TEXT_THEME } from "@/constants/Colors";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import useDebounce from "@/customHooks/useDebounce";
import AUISearchBar from "@/components/common/AUISearchBar";

export default function TabTwoScreen() {
    const { requestFn } = useApiRequest();
    const [page, setPage] = useState<any>(1);
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const debouncedSearchPhrase = useDebounce(searchPhrase, 500);
    const schoolPurchaseCourse = useLangTransformSelector(
        (state: RootState) => state.api.schoolPurchaseCourse || {}
    );

    console.log("schoolPurchaseCourse", JSON.stringify(schoolPurchaseCourse));

    useEffect(() => {
        requestFn(API_URL.purchaseCourse, "schoolPurchaseCourse", {
            client: true,
            page: `${page}`,
        });
    }, [page]);

    useEffect(() => {
        if (debouncedSearchPhrase) {
            requestFn(API_URL.schoolStudentSearch, "schoolPurchaseCourse", {
                client: true,
                student: debouncedSearchPhrase,
            });
        } else {
            requestFn(API_URL.purchaseCourse, "schoolPurchaseCourse", { client: true, page: "1" });
            setPage(1);
        }
    }, [debouncedSearchPhrase]);

    return (
        <AUIThemedView style={styles.root}>
            <AUIThemedView style={{ paddingBottom: 20 }}>
                <AUISearchBar
                    clicked={clicked}
                    searchPhrase={searchPhrase}
                    setSearchPhrase={setSearchPhrase}
                    setClicked={setClicked}
                    containerStyle={{ width: "100%", marginVertical: 0 }}
                />
            </AUIThemedView>
            <ScrollView>
                <AUIThemedView>
                    <AUIThemedText style={styles.title}>
                        Students Admitted through App
                    </AUIThemedText>
                    <AUIThemedView>
                        {schoolPurchaseCourse.docs && Array.isArray(schoolPurchaseCourse.docs) ? (
                            schoolPurchaseCourse.docs.map((item: any) => (
                                <TouchableOpacity
                                    key={item._id}
                                    style={styles.layout}
                                    onPress={() =>
                                        router.push({
                                            pathname: `(home)/studentInfo/${item.user._id}`,
                                            params: { student: JSON.stringify(item) },
                                        })
                                    }
                                >
                                    <AUIThemedText style={styles.name}>
                                        {item.user?.name || "No name available"}
                                    </AUIThemedText>
                                    <AUIThemedText style={styles.id}>
                                        ID: {item.user?._id || "No ID available"}
                                    </AUIThemedText>
                                    <MaterialIcons
                                        name="keyboard-arrow-right"
                                        size={24}
                                        color="black"
                                    />
                                </TouchableOpacity>
                            ))
                        ) : (
                            <AUIThemedText style={styles.noData}>No data available</AUIThemedText>
                        )}
                    </AUIThemedView>
                    <TouchableOpacity
                        style={{ padding: 10 }}
                        disabled={page === schoolPurchaseCourse.totalPages}
                        onPress={() => {
                            setPage(page + 1);
                        }}
                    >
                        <AUIThemedText>
                            {page === schoolPurchaseCourse.totalPages
                                ? "You are Cought Up"
                                : "Load More"}
                        </AUIThemedText>
                    </TouchableOpacity>
                </AUIThemedView>
            </ScrollView>
        </AUIThemedView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 17,
        letterSpacing: 2,
    },
    layout: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: APP_THEME.light.primary.second,
        padding: 10,
        margin: 8,
        borderRadius: 10,
    },
    name: {
        fontWeight: "bold",
        flex: 1,
        color: "#000",
    },
    id: {
        flex: 1,
        fontWeight: "bold",
        color: "#000",
    },
    noData: {
        padding: 10,
        fontSize: 16,
        color: TEXT_THEME.light.danger,
    },
    centeredContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
    },
});
