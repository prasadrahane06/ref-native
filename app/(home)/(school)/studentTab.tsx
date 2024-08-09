import AUISearchBar from "@/components/common/AUISearchBar";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME, BACKGROUND_THEME, TEXT_THEME } from "@/constants/Colors";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import useDebounce from "@/customHooks/useDebounce";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { t } from "i18next";
import { useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";

export default function TabTwoScreen() {
    const { requestFn } = useApiRequest();
    const [page, setPage] = useState<any>(1);
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [showMessage, setShowMessage] = useState(true);
    const debouncedSearchPhrase = useDebounce(searchPhrase, 500);

    const theme = useSelector((state: RootState) => state.global.theme);
    const schoolPurchaseCourse = useLangTransformSelector(
        (state: RootState) => state.api.schoolPurchaseCourse || {}
    );

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

    useEffect(() => {
        if (page === schoolPurchaseCourse.totalPages) {
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 5000);
            return () => clearTimeout(timer);
        } else {
            setShowMessage(true);
        }
    }, [page, schoolPurchaseCourse.totalPages]);

    const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
    console.log("schoolPurchaseCourse.docs ", JSON.stringify(schoolPurchaseCourse.docs));

    return (
        // <KeyboardAvoidingView
        //     style={{ flex: 1, backgroundColor: BACKGROUND_THEME[theme].background }}
        //     behavior="padding"
        //     // keyboardVerticalOffset={keyboardVerticalOffset}
        // >
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
                        {t("students_admitted_through_app")}
                    </AUIThemedText>
                    <AUIThemedView>
                        {schoolPurchaseCourse.docs && Array.isArray(schoolPurchaseCourse.docs) ? (
                            schoolPurchaseCourse.docs.map((item: any) => (
                                <TouchableOpacity
                                    key={item?._id}
                                    style={styles.layout}
                                    onPress={() =>
                                        router.push({
                                            // @ts-ignore
                                            pathname: `/(home)/studentInfo/${item?._id}`,
                                            params: { student: JSON.stringify(item) },
                                        })
                                    }
                                >
                                    <AUIThemedText style={styles.name}>
                                        {item.user?.name || "No name available"}
                                    </AUIThemedText>
                                    <AUIThemedText style={styles.id}>
                                        {t("id")}:{" "}
                                        {item.user?.studentId || `${t("no_id_available")}`}
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
                </AUIThemedView>
            </ScrollView>
            <TouchableOpacity
                style={{ padding: 10, alignItems: "center" }}
                disabled={page === schoolPurchaseCourse.totalPages}
                onPress={() => setPage((prevPage: any) => prevPage + 1)}
            >
                {page === schoolPurchaseCourse.totalPages ? (
                    showMessage && <AUIThemedText>{`${t("you_are_caught_up")}`}</AUIThemedText>
                ) : (
                    <AUIThemedText>{`${t("load_more")}`}</AUIThemedText>
                )}
            </TouchableOpacity>
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
        letterSpacing: 1,
        fontWeight: "bold",
        marginLeft: 10,
    },
    layout: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: APP_THEME.light.primary.first,
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
