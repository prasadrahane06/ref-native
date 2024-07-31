import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { StyleSheet } from "react-native";

const Help = () => {
    return (
        <AUIThemedView style={style.container}>
            <AUIThemedText>Help Page</AUIThemedText>
        </AUIThemedView>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default Help;
