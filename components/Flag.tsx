import { APP_THEME } from "@/constants/Colors";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { AUIThemedText } from "./common/AUIThemedText";
import { AUIThemedView } from "./common/AUIThemedView";

const Flag = ({ countryName, countryCode, isSelected, onSelect }: any) => (
    <TouchableOpacity onPress={onSelect}>
        <AUIThemedView style={styles.container}>
            <AUIThemedView style={[styles.flagImageContainer, isSelected && styles.selectedFlag]}>
                <Image
                    source={{
                        uri: `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`,
                    }}
                    style={[styles.flagImage]}
                />
            </AUIThemedView>
            <AUIThemedText style={styles.flagNames}>{countryName}</AUIThemedText>
        </AUIThemedView>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        marginRight: 10,
    },
    flagImage: {
        width: 70,
        height: 70,
        borderRadius: 100,
    },
    flagNames: {
        fontSize: 13,
        textAlign: "center",
        fontFamily: "GilroyMedium",
        letterSpacing: 1,
        opacity: 0.8,
    },
    flagImageContainer: {
        padding: 5,
        elevation: 20,
        shadowColor: APP_THEME.ternary.first,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        borderRadius: 100,
        marginHorizontal: 2,
    },
    selectedFlag: {
        borderWidth: 2,
        borderColor: APP_THEME.primary.first,
        borderRadius: 100,
    },
});

export default Flag;
