import { APP_THEME } from "@/constants/Colors";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { AUIThemedText } from "./common/AUIThemedText";
import { AUIThemedView } from "./common/AUIThemedView";

const Flag = ({ countryName, countryCode, isSelected, onSelect }: any) => (
    <TouchableOpacity onPress={onSelect}>
        <AUIThemedView
            style={{
                paddingVertical: 10,
                marginRight: 10,
            }}
        >
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
    flagImage: {
        width: 70,
        height: 70,
        borderRadius: 100,
    },
    flagNames: {
        fontWeight: "600",
        fontSize: 15,
        textAlign: "center",
    },
    flagImageContainer: {
        padding: 5,
    },
    selectedFlag: {
        borderWidth: 2,
        borderColor: APP_THEME.primary.first,
        borderRadius: 100,
    },
});

export default Flag;
