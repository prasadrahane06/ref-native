import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME, TEXT_THEME } from "@/constants/Colors";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function TabTwoScreen() {
    const { requestFn } = useApiRequest();
    const schoolPurchaseCourse = useLangTransformSelector(
        (state: RootState) => state.api.schoolPurchaseCourse || {}
    );

    useEffect(() => {
        requestFn(API_URL.purchaseCourse, "schoolPurchaseCourse", { client: true });
    }, []);

    return (
        <AUIThemedView style={styles.root}>
            <AUIThemedText style={styles.title}>Students Admitted through App</AUIThemedText>
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
                            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                        </TouchableOpacity>
                    ))
                ) : (
                    <AUIThemedText style={styles.noData}>No data available</AUIThemedText>
                )}
            </AUIThemedView>
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
});
