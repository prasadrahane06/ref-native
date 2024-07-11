import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { RootState } from "@/redux/store";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function TabTwoScreen() {
    const { requestFn } = useApiRequest();
    const schoolPurchaseCourse = useSelector((state: RootState) => state.api.schoolPurchaseCourse || {});

    useEffect(() => {
        requestFn(API_URL.purchaseCourse, "schoolPurchaseCourse", { client: true });
    }, []);

    console.log("schoolPurchaseCourse", JSON.stringify(schoolPurchaseCourse));
    return (
        <AUIThemedView style={styles.root}>
            <AUIThemedText style={styles.title}>Students Admitted through App</AUIThemedText>
            <AUIThemedView>
                {schoolPurchaseCourse.docs && Array.isArray(schoolPurchaseCourse.docs) ? (
                    schoolPurchaseCourse.docs.map((item : any ) => (
                        <AUIThemedView key={item._id} style={styles.layout}>
                            <AUIThemedText style={styles.name}>{item.user?.name || 'No name available'}</AUIThemedText>
                            <AUIThemedText style={styles.id}>ID: {item.user?._id || 'No ID available'}</AUIThemedText>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                        </AUIThemedView>
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
        backgroundColor: "#ffffff",
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
        backgroundColor: "#D3FFE7", //APP_THEME.primary.first,
        padding: 10,
        margin: 8,
        borderRadius: 10,
    },
    name: {
        fontWeight: "bold",
        flex: 1,
    },
    id: {
        flex: 1,
        fontWeight: "bold",
    },
    noData: {
        padding: 10,
        fontSize: 16,
        color: "#FF0000",
    },
});
