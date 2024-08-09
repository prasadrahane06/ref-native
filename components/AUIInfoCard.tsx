import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { AUIThemedText } from "./common/AUIThemedText";
import { AUIThemedView } from "./common/AUIThemedView";

interface AUIInfoCardProps {
    title: string;
    subtitle: string;
    navigation?: string;
    cardStyle?: ViewStyle;
    titleStyle?: TextStyle;
    subtitleStyle?: TextStyle;
    key?: any;
}

const AUIInfoCard: React.FC<AUIInfoCardProps> = ({
    title,
    subtitle,
    navigation,
    cardStyle,
    titleStyle,
    subtitleStyle,
    key,
}) => {
    const nav = useNavigation();

    const handlePress = () => {
        if (navigation) {
            // nav.navigate(navigation);
        }
    };

    return (
        <AUIThemedView key={key}>
            <TouchableOpacity
                style={[styles.card, { width: Dimensions.get("window").width / 2 - 24 }, cardStyle]}
                onPress={handlePress}
                activeOpacity={navigation ? 0.7 : 1}
                disabled={!navigation}
            >
                <AUIThemedText style={[styles.title, titleStyle]}>{title}</AUIThemedText>
                <AUIThemedText style={[styles.subtitle, subtitleStyle]}>{subtitle}</AUIThemedText>
            </TouchableOpacity>
        </AUIThemedView>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#D3FFE7",
        padding: 20,
        borderRadius: 10,
        margin: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000",
    },
    subtitle: {
        fontSize: 16,
        color: "#000",
    },
});

export default AUIInfoCard;
