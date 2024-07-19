import AUIButton from "@/components/common/AUIButton";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { FacilitiesList } from "@/components/home/schoolDetails/FacilitiesList";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import { StyleSheet } from "react-native";

export default function TabFourScreen() {
    const school = useLangTransformSelector((state: RootState) => state.api.MySchoolDetails || {});
    const facilities = school[0]?.facilities || [];

    return (
        <AUIThemedView style={styles.root}>
            <AUIThemedText style={styles.title}>Facilities</AUIThemedText>
            <AUIButton title="Add New Facilities" selected style={styles.button} />
            <AUIThemedView style={styles.container}>
                {facilities.length > 0 ? (
                    <FacilitiesList data={facilities} />
                ) : (
                    <AUIThemedText style={styles.noData}>No facilities available</AUIThemedText>
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
    button: {
        marginTop: 20,
    },
    container: {
        marginTop: 20,
    },
    noData: {
        fontSize: 16,
        color: "#FF0000",
    },
});
