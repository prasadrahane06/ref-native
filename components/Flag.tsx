import { APP_THEME } from "@/constants/Colors";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { AUIThemedText } from "./common/AUIThemedText";
import { AUIThemedView } from "./common/AUIThemedView";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const Flag = ({ countryName, countryCode, isSelected, onSelect, flag }: any) => {
    const theme = useSelector((state: RootState) => state.global.theme);

    return (
        <TouchableOpacity onPress={onSelect}>
            <AUIThemedView style={styles.container}>
                <AUIThemedView
                    style={[
                        styles.flagImageContainer,
                        { shadowColor: APP_THEME[theme].ternary.first },
                        isSelected && [
                            styles.selectedFlag,
                            { borderColor: APP_THEME[theme].primary.first },
                        ],
                    ]}
                >
                    <Image
                        source={{
                            uri: `${flag}`,
                        }}
                        style={[styles.flagImage]}
                    />
                </AUIThemedView>
                <AUIThemedText style={styles.flagNames}>{countryName}</AUIThemedText>
            </AUIThemedView>
        </TouchableOpacity>
    );
};

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
        // shadowColor: APP_THEME.ternary.first,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        borderRadius: 100,
        marginHorizontal: 2,
    },
    selectedFlag: {
        borderWidth: 2,
        // borderColor: APP_THEME.primary.first,
        borderRadius: 100,
    },
});

export default Flag;
