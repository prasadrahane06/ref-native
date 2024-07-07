import AUIButton from "@/components/common/AUIButton";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { FacilitiesList } from "@/components/home/schoolDetails/FacilitiesList";
import { facilitiesData } from "@/constants/dummy data/facilitiesData";
import { StyleSheet } from "react-native";

export default function TabFourScreen() {
    return (
        <AUIThemedView style={styles.root}>
            <AUIThemedText style={styles.title}>Facilities</AUIThemedText>
            <AUIButton title="Add New Facilities" selected style={styles.button} />
            <AUIThemedView style={styles.container}>
                <FacilitiesList data={facilitiesData} />
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
        fontSize: 25,
        letterSpacing: 2,
    },
    button: {
        marginTop: 20,
    },
    container: {
        marginTop: 20,
    },
});
